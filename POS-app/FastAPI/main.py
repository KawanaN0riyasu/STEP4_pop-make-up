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

@app.get("/")
def read_root():
    return {"Hello": "World"}

drink = {
    "PRD_ID":"001",
    "PRD_CD": "4902220772414",
    "PRD_NAME": "クリアアサヒ",
    "PRD_PRICE": "178"
    }

# test用
@app.post("/search_product/")
def search_product(product_query: ProductQuery = Body(...)):
    print(f"Received code: {product_query.code}")
    if product_query.code == drink["PRD_CD"]:
        return {
            "status": "success",
            "message": drink
            }
    else:
        return{
            "status": "failed"
        }

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