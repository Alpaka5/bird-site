import openpyxl
from fastapi import APIRouter, UploadFile, HTTPException, Depends
from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from database.database import get_db
from database.models import Bird, BirdTextField, Language
from database import schemas, models
from helper.logger import logger

router = APIRouter()


@router.get("/by_latin_name/{bird_latin_name}", response_model=schemas.Bird)
def get_bird_by_id(bird_latin_name: str, db: Session = Depends(get_db)):

    bird = db.execute(select(Bird).where(Bird.latin_name == bird_latin_name)).first()[0]
    if bird:
        return bird
    else:
        raise HTTPException(
            status_code=404, detail=f"Bird with name: {bird_latin_name} doesn't exist"
        )


@router.get("/all_birds", response_model=list[schemas.Bird])
def get_all_birds(db: Session = Depends(get_db)):
    logger.info("DOWNLOADING BIRDS DATA")
    return db.query(select(Bird).subquery()).all()


@router.get(
    "/description/{bird_latin_name}/{language_id}", response_model=schemas.BirdTextField
)
def get_bird_description(
    bird_latin_name: str, language_id: str, db: Session = Depends(get_db)
):
    logger.info(f"Fetching {bird_latin_name} description")
    languages = list(db.query(select(Language).subquery()).all())
    if language_id not in languages:
        raise HTTPException(
            status_code=404,
            detail=f"Language {language_id} not found, use one of {languages}",
        )

    fetched_bird = db.query(
        select(BirdTextField).where(
            and_(
                BirdTextField.bird == bird_latin_name,
                BirdTextField.language == language_id,
            )
        )
    ).first()[0]

    if not fetched_bird:
        return {
            "bird_id": bird_latin_name,
            "language_id": language_id,
            "description": f"Temporary description generated for {bird_latin_name} because I was lazy for now",
        }

    logger.info(fetched_bird)
    return fetched_bird


@router.post("/db/update", tags=["db"])
def update_db_with_birds(file: UploadFile, db: Session = Depends(get_db)):
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(
            status_code=422,
            detail="Unsupported file format. Please upload a .xlsx file",
        )

    workbook: openpyxl.Workbook = openpyxl.load_workbook(file.file)

    for sheet_name in workbook.sheetnames:
        worksheet = workbook[sheet_name]
        current_model = getattr(models, sheet_name)
        db_fields = list(
            list(worksheet.iter_rows(min_row=1, max_row=1, values_only=True))[0]
        )

        for row_values in worksheet.iter_rows(min_row=2, values_only=True):
            row_dict = {field: value for field, value in zip(db_fields, row_values)}
            db.add(current_model(**row_dict))

    db.commit()

    return {"message": "WORKED HELLA FINE"}
