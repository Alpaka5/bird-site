from fastapi import APIRouter, UploadFile, HTTPException, Depends
from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Bird, BirdTextField, Language
from database import schemas, models
from helper.logger import logger

router = APIRouter(prefix="/quiz")


@router.get("/game")
def get_quiz_game(db: Session = Depends(get_db)):
    pass
