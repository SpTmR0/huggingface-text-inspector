# Text Score (Emotion & Toxicity)  Analyzer (React + FastAPI)

A simple full-stack app that uses **Hugging Face Transformers** to detect emotion and toxicity in user input. Built with **FastAPI (backend)** and **React (frontend)**.

---

## Features

- Analyze emotion score in text using `SamLowe/roberta-base-go_emotions`
- Analyze toxicity score in text using  `s-nlp/roberta_toxicity_classifier`
- Charts for emotion and toxicity distribution
- Paginated history table
- Responsive UI using Bootstrap

---

## Tech Stack

| Layer      | Tech               |
|------------|--------------------|
| Frontend   | React, Bootstrap   |
| Backend    | FastAPI, Transformers (HuggingFace) |
| Database   | SQLite (via SQLAlchemy) |
| Charts     | Chart.js (React wrapper) |

---

## Project Structure
```
huggingFace/
│
├── backend/                   
│   ├── main.py                
│   ├── models.py              
│   ├── requirements.txt       
│   └── results.db             
│                       
│
├── frontend/                  
│   ├── public/               
│   ├── src/                   
│   │   ├── components/        
│   │   │   ├── TextInputForm.jsx
│   │   │   ├── ChartsDashboard.jsx
│   │   │   └── HistoryTable.jsx
│   │   ├── App.js             
│   │   ├── App.css           
│   │   └── index.js           
│   ├── .env                   
│   ├── package.json           
│   └── package-lock.json      
│
├── .gitignore                 
├── README.md                  
└── screenshots/               
```


---

## Setup Instructions

### Backend

1. Navigate to the `backend/` folder:
   ```
   cd backend
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/Scripts/activate  # Windows
   # or
   source venv/bin/activate      # Mac/Linux
3. Install dependencies:
   ```
   pip install -r requirements.txt
4. Start FastAPI server:
   ```
   uvicorn main:app --reload
   
Server runs at: http://127.0.0.1:8000

### Frontend

1. Open new terminal and navigate to `frontend/` folder:
   ```
   cd frontend
2. Install dependencies:
   ```
   npm install
3. Create .env file with url:
   ```
   REACT_APP_API_URL=http://127.0.0.1:8000    #backend server url
4. Start React app:
   ```
   npm start
   
Frontend runs at: http://localhost:3000
