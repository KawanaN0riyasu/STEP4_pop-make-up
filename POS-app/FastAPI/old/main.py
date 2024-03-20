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
from typing import List

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