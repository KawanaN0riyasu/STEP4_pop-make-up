from fastapi import FastAPI, HTTPException, Body, Depends
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Date, Float, ForeignKey, Boolean
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import date, datetime
from typing import List, Optional
import logging 
import config 
import traceback

app = FastAPI()

# 通信許可するドメインリスト
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8001",
    "http://localhost:3000/kawana",
    "http://localhost:3000/kawana_Lv3",
    "http://localhost:3000/02_MenuList",
    "http://localhost:3000/05_MenuDetail",
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

# データベースへの接続を取得
def get_db_connection():
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
    session = sessionmaker(bind=engine)()

    # 接続を返す
    return session

# SQLAlchemyのモデルインスタンスを辞書に変換するヘルパー関数
def to_dict(row):
    return {column.name: getattr(row, column.name) for column in row.__table__.columns}


class ProductQuery(BaseModel):
    code: str

class TransactionData(BaseModel):
    DATETIME: datetime
    EMP_CD: str
    STORE_CD: str
    POS_NO: str
    TOTAL_AMT: int
    TOTAL_AMT_EX_TAX: int

class TransactionStatementData(BaseModel):
    TRD_ID: int
    PRD_NAME: str
    PRD_PRICE: int
    TAC_CD: str

class ProductStocks(BaseModel):
    ID: int
    PRD_ID: str
    STORE_ID: int
    DATE_ID: int
    LOT: date
    BEST_BY_DAY: date
    PIECES: int

class Products(BaseModel):
    ID: int
    PRD_CODE: str
    PRD_IMAGE: Optional[str]
    PRD_NAME: str
    DESCRIPTION: Optional[str]
    PRICE: int
    #カロリー
    CAL: float
    SALINITY: float
    ALLERGY_ID: Optional[int]

class ReservationData(BaseModel):
    RSV_TIME: date
    STOCK_ID: int
    USER_ID: str
    MY_COUPON_ID: str
    #購入方法
    MET: int

class Coupons(BaseModel):
    ID: int
    NAME: str
    DESCRIPTION: str
    EXPIRATION: int
    PRICE: int


# データベースのテーブルを定義する
Base = declarative_base()

# Userモデルの定義
class User(Base):
    __tablename__ = "users"

    ID = Column(Integer, primary_key=True, index=True)
    USER_NAME = Column(String(13), index=True)
    EMAIL = Column(String, unique=True, index=True)
    PASSWORD = Column(String)
    IS_ACTIVE = Column(Boolean, default=True)

class Product(Base):
    __tablename__ = "products"
    ID = Column(Integer, primary_key=True, index=True)
    PRD_CODE = Column(String(13), index=True)
    PRD_IMAGE = Column(String, index=True, nullable=True)
    PRD_NAME = Column(String(50), index=True)
    DESCRIPTION = Column(String, index=True, nullable=True)
    PRICE = Column(Integer, index=True)
    CAL = Column(Float, index=True)
    SALINITY = Column(Float, index=True)
    ALLERGY_ID = Column(Integer, ForeignKey('allergies.ID'), index=True, nullable=True)

# ProductStocksモデルの定義
class ProductStocks(Base):
    __tablename__ = "stocks"

    ID = Column(Integer, primary_key=True, index=True)
    PRD_ID = Column(String(13), ForeignKey('products.PRD_CODE'), index=True)
    STORE_ID = Column(Integer, index=True)
    DATE_ID = Column(Integer, index=True, nullable=True)
    LOT = Column(Date, index=True)
    BEST_BY_DAY = Column(Date, index=True)
    PIECES = Column(Integer, index=True)

# ReservationDataモデルの定義
class Reservation(Base):
    __tablename__ = "reservations"

    ID = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    RSV_TIME = Column(Date, index=True)
    STOCK_ID = Column(Integer, index=True)
    USER_ID = Column(String(13), ForeignKey('users.ID'), index=True)
    MY_COUPON_ID = Column(String(13), ForeignKey('coupons.ID'), index=True)
    #購入方法
    MET = Column(Integer, index=True)

# クーポンモデルの定義
class Coupon(Base):
    __tablename__ = "coupons"

    ID = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    NAME = Column(String(50), index=True)
    IMAGE = Column(String, index=True, nullable=True)
    DESCRIPTION = Column(String, index=True, nullable=True)
    EXPIRATION = Column(Integer, index=True)
    PRICE = Column(Integer, index=True)



@app.get("/")
def read_root():
    return {"Hello": "World"}

# 在庫情報をとってくる（=02_MenuListと連携）
@app.post("/ProductStocks/")
async def stock_product(
    db: Session = Depends(get_db_connection)):

    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with db:
            # stocksTable内のレコードを取得
            stocks = db.query(ProductStocks).all()
            # return stocks

            # PRD_ID に対応する製品レコードをデータベースから取得
        if stocks:
            combined_data = []
            for stock in stocks:
                product_data = db.query(Product).filter(Product.ID == stock.PRD_ID).first()
                stock_dict = to_dict(stock)
                product_dict = to_dict(product_data)
                combined_dict = {**product_dict, **stock_dict}  # 2つの辞書を結合
                combined_data.append(combined_dict)
            return {"status": "success", "data": combined_data}
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")

# 商品詳細ページ
@app.post("/Products/")
# クエリパラメータとしてuser_idを取得する
async def reservation_product(
    ID: int, 
    db: Session = Depends(get_db_connection)):
    try:
        with db:
            # ユーザーIDが一致する予約情報を取得
            product = db.query(Product).filter(Product.ID == ID).first()
            print(product)
            return {"status": "success", "data": product}

    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")
    

# 予約リストに追加（=購入ボタンを押した時）
@app.post("/Reservation/")
async def create_ReservationData(
    postReservationData: ReservationData = Body(...), 
    db: Session = Depends(get_db_connection)):

    # print(f"Received ReservationData: {postReservationData}")

    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with db:

            RSV = Reservation(
                RSV_TIME = postReservationData.RSV_TIME, 
                STOCK_ID = postReservationData.STOCK_ID, 
                USER_ID = postReservationData.USER_ID, 
                MY_COUPON_ID = postReservationData.MY_COUPON_ID,
                MET = postReservationData.MET,
            )
            db.add(RSV)
            db.commit()
            # 自動採番されたRSV.IDを取得
            rsv_id = RSV.ID
            # RSV.IDをレスポンスに含める
            return {"RSV_ID": rsv_id }
        
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")

# 予約リストを表示する（=01_YoyakuListを開いた時）
@app.get("/Reservation/")
# クエリパラメータとしてuser_idを取得する
async def reservation_product(
    user_id: str, 
    db: Session = Depends(get_db_connection)):

    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with db:
            # ユーザーIDが一致する予約情報を取得
            reservations = db.query(Reservation).filter(Reservation.USER_ID == user_id).all()
            # return reservations

            # 予約リストから STOCK_ID を取得
            stk_ids = [reservation.STOCK_ID for reservation in reservations]
            print(stk_ids)

            # PRD_ID に対応する製品レコードをデータベースから取得
            products = []
            for stk_id in stk_ids:
                stock = db.query(ProductStocks).filter(ProductStocks.ID == stk_id).first()
                # print(stock)
                if stock:
                    product = db.query(Product).filter(Product.ID == stock.PRD_ID).first()
                    products.append(product)

                else:
                    # 製品が見つからなかった場合はエラーを発生させるか、無視します
                    # ここではエラーを発生させる例を示します
                    raise HTTPException(status_code=404, detail=f"Product with PRD_ID {stk_id} not found")
            return products
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")


# 商品コードを直接入力（SQLite）
# @app.post("/ProductVerification/")
# async def search_product(product_query: ProductQuery = Body(...), db: Session = Depends(get_db)):
#     print(f"Received code: {product_query.code}")
#     product = crud.get_product_by_code(db, product_query.code)
#     if product:
#         return {
#             "status": "success",
#             "message": product
#         }
#     else:
#         return {"status": "failed", "message": None}
    
# /ProductVerification/というエンドポイントにPOSTリクエストを送ると、商品コードを受け取って、データベースから商品情報を検索
@app.post("/ProductVerification/")
async def search_product(
    product_query: ProductQuery = Body(...), 
    connection: Session = Depends(get_db_connection),
):
    # 商品コードを取得
    code = product_query.code

    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with connection as session:

            # 商品コードを検索するためのSQLAlchemyのクエリを作成
            result = session.query(Product).filter_by(PRD_CODE=code).first()

            # 検索結果があれば
            if result:
                print(result)
                # ステータスとメッセージをレスポンスとして返す
                return {
                    "status": "success",
                    "message": {
                        "ID": result.ID,
                        "PRD_CODE": result.PRD_CODE,
                        "NAME": result.NAME,
                        "PRICE": result.PRICE,
                    },
                }
            # 検索結果がなければ
            else:
                # HTTPExceptionを発生させて、ステータスコードを404にし、詳細を"Product not found"にする
                raise HTTPException(status_code=404, detail="Product not found")

    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")

# /transactionData/にPOSTリクエストを送るとTransactionData型のデータを受け取ってDBに保存
@app.post("/transactionData/")
async def create_transactionData(
    postTransactionData: TransactionData = Body(...), 
    db: Session = Depends(get_db_connection)
):
    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with db:
            # Transactionクラスのインスタンスを作成する
            trd = TransactionData(
                DATETIME = postTransactionData.DATETIME, 
                EMP_CD = postTransactionData.EMP_CD, 
                STORE_CD = postTransactionData.STORE_CD, 
                POS_NO = postTransactionData.POS_NO, 
                TOTAL_AMT = postTransactionData.TOTAL_AMT,
                TOTAL_AMT_EX_TAX = postTransactionData.TOTAL_AMT_EX_TAX,
            )

            # データベースにインスタンスを追加
            db.add(trd)
            # データベースに変更をコミット
            db.commit()
            # 自動採番されたTRD_IDを取得
            trd_id = trd.TRD_ID
            # TRD_IDをレスポンスに含める
            return {"TRD_ID": trd_id }
        
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")


# /transactionStatementData/というエンドポイントにPOSTリクエストを送ると、取引明細データのリストを受け取って、データベースに保存
@app.post("/transactionStatementData/")
async def create_transactionStatementData(
    postTransactionStatements: List[TransactionStatementData] = Body(...), 
    db: Session = Depends(get_db_connection)
):
    # 受け取ったデータをログに出力する
    logger.info(f"Received transactionStatementData: {postTransactionStatements}")
    try:
        # with文を使って、データベースへの接続を自動的に閉じるようにする
        with db:
            # 受け取ったデータのリストをループで処理
            for postTransactionStatement in postTransactionStatements:
                # TransactionStatementクラスのインスタンスを作成する
                transactionStatement =TransactionStatementData(
                    TRD_ID = postTransactionStatement.TRD_ID,
                    PRD_NAME = postTransactionStatement.PRD_NAME, 
                    PRD_PRICE = postTransactionStatement.PRD_PRICE,
                    TAC_CD = postTransactionStatement.TAC_CD,
                )
                # データベースにインスタンスを追加
                db.add(transactionStatement)
            # データベースに変更をコミット
            db.commit()
            # 返すデータのリストを作成する
            return_data = []
            # 受け取ったデータのリストをループで処理
            for postTransactionStatement in postTransactionStatements:
                # 返すデータの辞書を作成する
                data = {
                    "TRD_ID": postTransactionStatement.TRD_ID,
                    "PRD_NAME": postTransactionStatement.PRD_NAME,
                    "PRD_PRICE": postTransactionStatement.PRD_PRICE,
                    "TAC_CD": postTransactionStatement.TAC_CD,
                    "id": postTransactionStatement.id # id属性はdb.addメソッドで付与される
                }
                # 返すデータのリストに辞書を追加
                return_data.append(data)
            # 返すデータのリストをレスポンスとして返す
            return return_data
        
    # 例外が発生した場合
    except Exception as e:
        # ログにエラーを出力
        logger.error(f"A transactionData error occurred: {e}", exc_info=True)
        # tracebackモジュールをインポート
        import traceback
        # エラーのスタックトレースを文字列に変換
        error_trace = traceback.format_exc()
        # HTTPExceptionを発生させて、ステータスコードを500にし、詳細をエラーとスタックトレースにする
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}\n{error_trace}")