# sqlalchemyから必要なモジュールをインポート
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# データベースのURLを指定
SQLALCHEMY_DATABASE_URL = "sqlite:///SQLite_DB.db"

# create_engineを使用してデータベースエンジンを作成し、接続のオプションを指定
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# sessionmakerを使用してSessionLocalを作成し、データベースへの接続を管理
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# モデルを定義するための基底クラスを作成
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
