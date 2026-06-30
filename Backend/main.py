from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables
from auth import router
from reports import router as reports_router

create_tables()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(reports_router)

@app.get("/")
def home():
    return {"message": "AI Phishing Guard Backend Running"}
