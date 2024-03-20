from fastapi import FastAPI, HTTPException, Depends
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, DATE
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import logging 
import config 
import traceback

app = FastAPI()

# 通信許可するドメインリスト
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://localhost:3000/kawana",
    "http://localhost:3000/kawana_Lv3",
    "http://localhost:3000/02_MenuList",
    "*",
]

# CORSを回避するために追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,   # ブラウザからリクエスト受けた時の認証情報サーバー送信可否指定。Trueの場合は許可
    allow_methods=["*"],      # 許可するHTTPメソッドリスト(Get,Post,Putなど) ["*"]と指定することですべてのHTTPメソッドを許可
    allow_headers=["*"]       # 許可するHTTPヘッダーリスト  ["*"]と指定することですべてのHTTPヘッダーを許可
)

# ロガーのインスタンスを作成する
logger = logging.getLogger(__name__)

# MySQL設定(Azure)
#MYSQL_SERVER = config.MYSQL_SERVER_ONASURE
#MYSQL_USER = config.MYSQL_USER_ONASURE
#MYSQL_PASSWORD = config.MYSQL_PASSWORD_ONASURE
#MYSQL_DB = config.MYSQL_DB_ONASURE

# MySQL設定(Local)
#MYSQL_SERVER = config.MYSQL_SERVER
#MYSQL_USER = config.MYSQL_USER
#MYSQL_PASSWORD = config.MYSQL_PASSWORD
#MYSQL_DB = config.MYSQL_DB

# SSLの設定
SSL_CONFIG = config.MYSQL_SSL_CONFIG 

# データベースに接続する
#engine = create_engine(f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_SERVER}/{MYSQL_DB}?ssl_ca={SSL_CONFIG}", echo=True)

# SQLiteの場合
DB_FILE = "pop-make-up_DB.db"
engine =  create_engine(f"sqlite:///{DB_FILE}", echo=True)

# Sessionオブジェクトを作成する
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# データベースのテーブルを定義する
Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    ID = Column(Integer, primary_key=True, index=True)
    PRD_CODE = Column(String)
    PRD_NAME = Column(String)
    PRD_IMAGE = Column(String)
    DESCRIPTION = Column(String)
    PRICE = Column(Integer)
    CAL = Column(Float)
    SALINITY = Column(Float)
    ALLERGY_ID = Column(Integer)

class Stock(Base):
    __tablename__ = 'stocks'
    ID = Column(Integer, primary_key=True, index=True)
    PRD_ID = Column(Integer)
    STORE_ID = Column(Integer)
    DATE_ID = Column(Integer)
    LOT = Column(DATE)
    BEST_BY_DAY = Column(DATE)
    PIECES = Column(Integer)

# データベーステーブルを作成
Base.metadata.create_all(bind=engine)

# SQLAlchemyのモデルインスタンスを辞書に変換するヘルパー関数
def to_dict(row):
    return {column.name: getattr(row, column.name) for column in row.__table__.columns}

# データベース接続を取得する依存関係
def get_db_connection():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

# /Stock/というエンドポイントにPOSTリクエストを送るとデータベースから在庫情報リストを取得
@app.post("/Stock/")
async def get_product(db: Session = Depends(get_db_connection)):
    try:
        stocks_result = db.query(Stock).all()
        if stocks_result:
            combined_data = []
            for stock in stocks_result:
                product_data = db.query(Product).filter(Product.ID == stock.PRD_ID).first()
                stock_dict = to_dict(stock)
                product_dict = to_dict(product_data)
                combined_dict = {**product_dict, **stock_dict}  # 2つの辞書を結合
                combined_data.append(combined_dict)
            return {"status": "success", "data": combined_data}

        else:
            # HTTPExceptionを発生させて、ステータスコードを404にし、詳細を"Product not found"にする
            raise HTTPException(status_code=404, detail="Product not found")
            
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")