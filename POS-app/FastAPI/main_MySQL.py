from fastapi import FastAPI, HTTPException, Body, Depends
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import List
import logging 
import config 

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
    DB_FILE = "SQLite_DB.db"
    engine =  create_engine(f"sqlite:///{DB_FILE}", echo=True)

    # Sessionオブジェクトを作成する
    session = sessionmaker(bind=engine)()

    # 接続を返す
    return session


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

# データベースのテーブルを定義する
Base = declarative_base()

class Product(Base):
    __tablename__ = "PRODUCTS"
    PRD_ID = Column(Integer, primary_key=True, index=True)
    PRD_CODE = Column(String(13), index=True)
    FROM_DATE = Column(DateTime, index=True)
    TO_DATE = Column(DateTime, index=True)
    NAME = Column(String(50), index=True)
    PRICE = Column(Integer, index=True)


@app.get("/")
def read_root():
    return {"Hello": "World"}


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
                        "PRD_ID": result.PRD_ID,
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