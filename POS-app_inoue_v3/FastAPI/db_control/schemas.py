from pydantic import BaseModel, constr
from datetime import datetime
from decimal import Decimal

class ItemBase(BaseModel):
    title: str
    description: str | None = None
class ItemCreate(ItemBase):
    pass
class Item(ItemBase):
    id: int
    owner_id: int
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: str
class UserCreate(UserBase):
    password: str
class User(UserBase):
    id: int
    is_active: bool
    items: list[Item] = []
    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    PRD_CODE: str
    FROM_DATE: datetime
    TO_DATE:  datetime
    NAME: str
    PRICE: int
class ProductCreate(ProductBase):
    pass
class Product(ProductBase):
    PRD_ID: int
    class Config:
        orm_mode = True

class PromotionalPlanBase(BaseModel):
    PRM_CODE: constr(max_length=13)
    FROM_DATE: datetime
    TO_DATE:  datetime
    NAME: constr(max_length=50)
    PERCENT: Decimal
    DISCOUNT: int
class PromotionalPlanCreate(PromotionalPlanBase):
    pass
class PromotionalPlan(PromotionalPlanBase):
    PRM_ID: int
    PRD_ID: int
    class Config:
        orm_mode = True

class TransactionStatementBase(BaseModel):
    PRD_NAME: constr(max_length=50)
    PRD_PRICE: int
    TAC_CD : constr(max_length=2)
class TransactionStatementCreate(TransactionStatementBase):
    pass
class TransactionStatement(TransactionStatementBase):
    TRD_ID : int
    DTL_ID : int
    PRD_ID : int
    class Config:
        orm_mode = True

class TransactionBase(BaseModel):
    DATETIME: datetime
    EMP_CD: constr(max_length=10)
    STORE_CD : constr(max_length=5)
    POS_NO : constr(max_length=3)
    TOTAL_AMT : int
    TOTAL_AMT_EX_TAX : int
class TransactionCreate(TransactionBase):
    pass
class Transaction(TransactionBase):
    TRD_ID : int
    class Config:
        orm_mode = True

class TaxBase(BaseModel):
    CODE: constr(max_length=2)
    NAME: constr(max_length=20)
    PERCENT : Decimal
class TaxCreate(TaxBase):
    pass
class Tax(TaxBase):
    ID : int
    class Config:
        orm_mode = True