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

# CORSを回避するために追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
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
async def create_restaurant(postTransactionData: TransactionData = Body(...)):
    print(f"Received transactionData: {postTransactionData}")
    return {"Hello": "World"}