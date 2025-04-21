from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///results.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False)
Base = declarative_base()

#defining schema
class AnalysisResult(Base):
    __tablename__ = "results"

    id = Column(Integer, primary_key=True, index=True)
    input_text = Column(String, nullable=False)
    emotion_label = Column(String)
    emotion_score = Column(Float)
    toxicity_label = Column(String)           
    toxicity_score = Column(Float)            

