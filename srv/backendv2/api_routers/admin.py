import openpyxl
from fastapi import APIRouter, UploadFile, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database.database import get_db
from database import schemas, models, crud
from helper.logger import logger

router = APIRouter(prefix="/admin")


@router.post("/add_bird")
def add_bird(bird_data: schemas.Bird):
    db: Session = (Depends(get_db),)
    token: str = Depends(oauth2schema)
