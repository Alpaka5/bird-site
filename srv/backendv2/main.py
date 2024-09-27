import logging

from fastapi import FastAPI
from database.database import SessionLocal, engine
from database import models, schemas
from api_routers import birds

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(birds.router)

# Dependency


@app.get("/")
def root():
    return {"message": "Hello World"}
