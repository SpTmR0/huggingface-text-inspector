from fastapi import Depends
from sqlalchemy.orm import Session
from models import Base, engine, SessionLocal, AnalysisResult

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


#Loading HuggingFace Models
emotion_model = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions")
toxicity_pipe = pipeline("text-classification", model="s-nlp/roberta_toxicity_classifier")

#input format
class TextRequest(BaseModel):
    text: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#landing route check
@app.get("/")
def root():
    return {"message": "API is running!"}


#route to return scores and store in db
@app.post("/analyze")
def analyze(request: TextRequest, db: Session = Depends(get_db)):
    text = request.text

    emotion = emotion_model(text)[0]
    toxicity = toxicity_pipe(text)[0]

    entry = AnalysisResult(
    input_text=text,
    emotion_label=emotion["label"],
    emotion_score=emotion["score"],
    toxicity_label=toxicity["label"],        
    toxicity_score=toxicity["score"]         
)

    db.add(entry)
    db.commit()

    return {
        "input": text,
        "emotion": {
            "label": emotion["label"],
            "score": round(emotion["score"], 3)
        },
        "toxicity": {
            "label": toxicity["label"],
            "score": round(toxicity["score"], 3)
        }
    }




#route to get history
@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    results = db.query(AnalysisResult).order_by(AnalysisResult.id.desc()).all()
    return [
        {
            "id": r.id,
            "text": r.input_text,
            "emotion": {
                "label": r.emotion_label,
                "score": round(r.emotion_score, 3)
            },
            "toxicity": {
                "label": r.toxicity_label,
                "score": round(r.toxicity_score, 3)
            }
        }
        for r in results
    ]

