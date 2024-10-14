import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import SessionLocal, engine
from database import models, schemas
from api_routers import birds, quiz

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(birds.router)
app.include_router(quiz.router)

# Dependency
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World"}
