# モデル作成
# sqlalchemyから必要なモジュールをインポート
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# databaseモジュールからBaseクラスをインポート
from database import Base

# Userモデルの定義
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # UserモデルとItemモデルの関連付け
    items = relationship("Item", back_populates="owner")

# Itemモデルの定義
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")

# 商品マスタモデルの定義
class Product(Base):
    __tablename__ = "products"

    PRD_ID = Column(Integer, primary_key=True, index=True)
    PRD_CODE = Column(String(13), index=True)
    FROM_DATE = Column(DateTime, index=True)
    TO_DATE = Column(DateTime, index=True)
    NAME = Column(String(50), index=True)
    PRICE = Column(Integer, index=True)

    PRM = relationship("PromotionalPlan", back_populates="PRD")


# 販促企画モデルの定義
class PromotionalPlan(Base):
    __tablename__ = "promotions"

    PRM_ID = Column(Integer, primary_key=True, index=True)
    PRM_CODE = Column(String(13), index=True)
    FROM_DATE = Column(DateTime, index=True)
    TO_DATE = Column(DateTime, index=True)
    NAME = Column(String(50), index=True)
    PERCENT = Column(Numeric(precision=5, scale=2), index=True)
    DISCOUNT = Column(Integer, index=True)
    PRD_ID = Column(Integer, ForeignKey("products.PRD_ID"))

    PRD = relationship("Product", back_populates="PRM")


# 取引明細モデルの定義
class TransactionStatement(Base):
    __tablename__ = "transactionStatements"

    TRD_ID = Column(Integer, ForeignKey('transactions.TRD_ID'), primary_key=True, index=True)
    DTL_ID = Column(Integer, primary_key=True, index=True)
    PRD_ID = Column(Integer, index=True)
    PRD_NAME = Column(String(50), index=True)
    PRD_PRICE = Column(Integer, index=True)
    TAC_CD = Column(String(2), index=True)

    TRD = relationship("Transaction", back_populates="TRST2")


# 取引モデルの定義
class Transaction(Base):
    __tablename__ = "transactions"

    TRD_ID = Column(Integer, primary_key=True, index=True)
    DATETIME = Column(DateTime, index=True)
    EMP_CD = Column(String(10), index=True)
    STORE_CD = Column(String(5), index=True)
    POS_NO = Column(String(3), index=True)
    TOTAL_AMT = Column(Integer, index=True)
    TOTAL_AMT_EX_TAX = Column(Integer, index=True)

    TRST2 = relationship("TransactionStatement", back_populates="TRD")


# 税マスタモデルの定義
class Tax(Base):
    __tablename__ = "taxes"

    ID = Column(Integer, primary_key=True, index=True)
    CODE = Column(String(2), index=True)
    NAME = Column(String(20), index=True)
    PERCENT = Column(Numeric(precision=5, scale=2), index=True)