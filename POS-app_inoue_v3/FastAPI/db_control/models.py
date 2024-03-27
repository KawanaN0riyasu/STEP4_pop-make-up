# モデル作成
# sqlalchemyから必要なモジュールをインポート
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Numeric, Float, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

# databaseモジュールからBaseクラスをインポート
from database import Base

# Userモデルの定義
class User(Base):
    __tablename__ = "users"

    ID = Column(Integer, primary_key=True, index=True)
    USER_ID = Column(String(13), index=True)
    EMAIL = Column(String, unique=True, index=True)
    PASSWORD = Column(String)
    IS_ACTIVE = Column(Boolean, default=True)


# 商品マスタモデルの定義
class Product(Base):
    __tablename__ = "products"

    ID = Column(Integer, primary_key=True, index=True)
    PRD_CODE = Column(String(13), index=True)
    PRD_IMAGE = Column(String, index=True, nullable=True)
    NAME = Column(String(50), index=True)
    DESCRIPTION = Column(String, index=True, nullable=True)
    PRICE = Column(Integer, index=True)
    CAL = Column(Float, index=True)
    SALINITY = Column(Float, index=True)
    ALLERGY_ID = Column(Integer, ForeignKey('allergies.ID'), index=True, nullable=True)

    PRM = relationship("PromotionalPlan", back_populates="PRD")
    TRST = relationship("TransactionStatement", back_populates="PRD2")


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
    PRD_ID = Column(Integer, ForeignKey("products.PRD_CODE"))

    PRD = relationship("Product", back_populates="PRM")


# 取引明細モデルの定義
class TransactionStatement(Base):
    __tablename__ = "transactionStatements"

    TRD_ID = Column(Integer, ForeignKey('transactions.TRD_ID'), index=True)
    DTL_ID = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    PRD_ID = Column(Integer, ForeignKey('products.PRD_CODE'), index=True)
    PRD_NAME = Column(String(50), index=True)
    PRD_PRICE = Column(Integer, index=True)
    TAC_CD = Column(String(2), index=True)

    TRD = relationship("Transaction", back_populates="TRST2")
    PRD2 = relationship("Product", back_populates="TRST")


# 取引モデルの定義
class Transaction(Base):
    __tablename__ = "transactions"

    TRD_ID = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
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

# ProductStocksモデルの定義
class ProductStocks(Base):
    __tablename__ = "stocks"

    ID = Column(Integer, primary_key=True, index=True)
    PRD_ID = Column(String(13), ForeignKey('products.PRD_CODE'), index=True)
    STORE_ID = Column(String(13), index=True)
    LOT = Column(Date, index=True)
    BEST_BY_DAY = Column(Date, index=True)
    PIECES = Column(Integer, index=True)

# ReservationDataモデルの定義
class ReservationData(Base):
    __tablename__ = "reservations"

    ID = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    RSV_TIME = Column(Date, index=True)
    STOCK_ID = Column(Integer, index=True)
    USER_ID = Column(String(13), ForeignKey('users.USER_ID'), index=True)
    COUPON_ID = Column(String(13), ForeignKey('coupons.ID'), index=True)
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