from fastapi import FastAPI, HTTPException, Body, Depends
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from sqlalchemy import desc
from sqlalchemy.orm import Session, joinedload
from db_control import crud, models, schemas
from database import SessionLocal, engine, get_db
import pymysql
import os
from datetime import datetime
from dotenv import load_dotenv
from typing import List, Optional


models.Base.metadata.create_all(bind=engine)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# コンソールハンドラを追加
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# ロガーにハンドラを追加
logger.handlers.clear()
logger.addHandler(console_handler)

app = FastAPI()

# 通信許可するドメインリスト
origins = [
    "http://localhost:3000",
    "http://localhost:3000/kawana",
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

# .envファイルを読み込む
load_dotenv()

class ProductStocks(BaseModel):
    ID: int
    PRD_ID: str
    PLC_ID: str
    LOT: datetime
    BEST_BY_DAY: datetime
    PIECES: int

class Products(BaseModel):
    PRD_ID: int
    PRD_CODE: str
    PRD_IMAGE: Optional[str]
    NAME: str
    DESCRIPTION: Optional[str]
    PRICE: int
    #カロリー
    CAL: float
    SALINITY: float
    ALLERGY: Optional[int]

class ReservationData(BaseModel):
    RSV_TIME: datetime
    PRD_ID: str
    USER_ID: str
    PRM_ID: str
    #購入方法
    MET: int



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

@app.get("/")
def read_root():
    return {"Hello": "World"}

# 在庫情報をとってくる（=02_MenuListと連携）
@app.get("/ProductStocks/", response_model=List[Products])
async def stock_product(db: Session = Depends(get_db)):
    # stocksTable内のレコードを取得
    stocks = crud.get_all_stocks(db)
    #return stocks

    # 在庫情報リストから PRD_ID を取得
    prd_ids = [stock.PRD_ID for stock in stocks]
    print(prd_ids)

    # PRD_ID に対応する製品レコードをデータベースから取得
    products = []
    for prd_id in prd_ids:
        product = crud.get_product_by_id(db, prd_id)
        # print(product)
        if product:
            products.append(product)
        else:
            # 製品が見つからなかった場合はエラーを発生させるか、無視します
            # ここではエラーを発生させる例を示します
            raise HTTPException(status_code=404, detail=f"Product with PRD_ID {prd_id} not found")
    return products

# 予約リストに追加（=予約ボタンを押した時）
@app.post("/Reservation/")
async def create_ReservationData(postReservationData: ReservationData = Body(...), db: Session = Depends(get_db)):
    print(f"Received ReservationData: {postReservationData}")
    try:
        RSV = models.ReservationData(
            RSV_TIME = postReservationData.RSV_TIME, 
            PRD_ID = postReservationData.PRD_ID, 
            USER_ID = postReservationData.USER_ID, 
            PRM_ID = postReservationData.PRM_ID,
            MET = postReservationData.MET,
        )
        db.add(RSV)
        db.commit()
        # 自動採番されたRSV.IDを取得
        rsv_id = RSV.ID
        # RSV.IDをレスポンスに含める
        return {"RSV_ID": rsv_id }

    except Exception as e:
        logger.error(f"A transactionData error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")
    

# 予約リストを表示する（=01_YoyakuListを開いた時）
@app.get("/Reservation/", response_model=List[Products])
# パスパラメータとしてuser_idを取得する
async def reservation_product(user_id: str, db: Session = Depends(get_db)):
    reservations = crud.get_all_reservation_products(db, user_id)
    #return reservations

    # 予約リストから PRD_ID を取得
    prd_ids = [reservation.PRD_ID for reservation in reservations]
    print(prd_ids)

    # PRD_ID に対応する製品レコードをデータベースから取得
    products = []
    for prd_id in prd_ids:
        product = crud.get_product_by_id(db, prd_id)
        # print(product)
        if product:
            products.append(product)
        else:
            # 製品が見つからなかった場合はエラーを発生させるか、無視します
            # ここではエラーを発生させる例を示します
            raise HTTPException(status_code=404, detail=f"Product with PRD_ID {prd_id} not found")
    return products




# 商品コードを直接入力
@app.post("/ProductVerification/")
async def search_product(product_query: ProductQuery = Body(...), db: Session = Depends(get_db)):
    print(f"Received code: {product_query.code}")
    product = crud.get_product_by_code(db, product_query.code)
    if product:
        return {
            "status": "success",
            "message": product
        }
    else:
        return {"status": "failed", "message": None}

# 購入データ＝商品を受け取った時
@app.post("/transactionData/")
async def create_transactionData(postTransactionData: TransactionData = Body(...), db: Session = Depends(get_db)):
    print(f"Received transactionData: {postTransactionData}")
    try:
        trd = models.Transaction(
            DATETIME = postTransactionData.DATETIME, 
            EMP_CD = postTransactionData.EMP_CD, 
            STORE_CD = postTransactionData.STORE_CD, 
            POS_NO = postTransactionData.POS_NO, 
            TOTAL_AMT = postTransactionData.TOTAL_AMT,
            TOTAL_AMT_EX_TAX = postTransactionData.TOTAL_AMT_EX_TAX,
        )
        db.add(trd)
        db.commit()
        # 自動採番されたTRD_IDを取得
        trd_id = trd.TRD_ID
        # TRD_IDをレスポンスに含める
        return {"TRD_ID": trd_id }

    except Exception as e:
        logger.error(f"A transactionData error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")

@app.post("/transactionStatementData/")
async def create_transactionStatementData(postTransactionStatements: List[TransactionStatementData] = Body(...), db: Session = Depends(get_db)):
    print(f"Received transactionStatementData: {postTransactionStatements}")
    try:
        list_TransactionStatement = []
        for postTransactionStatement in postTransactionStatements:
            transactionStatement = models.TransactionStatement(
                TRD_ID = postTransactionStatement.TRD_ID, 
                PRD_NAME = postTransactionStatement.PRD_NAME, 
                PRD_PRICE = postTransactionStatement.PRD_PRICE,
                TAC_CD = postTransactionStatement.TAC_CD,
            )
            db.add(transactionStatement)
            list_TransactionStatement.append(transactionStatement)
        db.commit()
        for transactionStatement in list_TransactionStatement:
            db.refresh(transactionStatement)
        return list_TransactionStatement
    
    except Exception as e:
        logger.error(f"A transactionStatementData error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing data: {e}")