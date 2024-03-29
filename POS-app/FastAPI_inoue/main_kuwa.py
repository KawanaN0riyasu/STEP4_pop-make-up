#APIのエンドポイントを作成
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

# データベースのセットアップ（SQLAlchemyを使用）
models.Base.metadata.create_all(bind=engine)
# ログの出力設定、エラーログ、デバッグ情報
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# コンソールハンドラを追加
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# ロガーにハンドラを追加
logger.handlers.clear()
logger.addHandler(console_handler)

#FastAPIアプリケーションのセットアップ
app = FastAPI()

# CORSを回避するために追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)

# .envファイルを読み込む（環境変数の読み込み）
load_dotenv()

# Pydanticモデルの定義（データのバリデーション）
class ProductQuery(BaseModel):
    code: str
    
class TransactionData(BaseModel):
    DATETIME: datetime
    EMP_CD: str
    STORE_CD: str
    POS_NO: str
    TOTAL_AMT: int
    TOTAL_AMT_EX_TAX: int

# APIエンドポイント
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get_products", response_model=list[schemas.Product])
async def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@app.post("/ProductVerification/")
def search_product(product_query: ProductQuery = Body(...), db: Session = Depends(get_db)):
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
    return {"Received transactionData": postTransactionData,  "TRD_ID": trd_id }