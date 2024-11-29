import jwt
import openpyxl
import sqlalchemy.exc as sqlExc
from fastapi import APIRouter, UploadFile, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from api_routers.users import oauth2schema, JWT_SECRET
from database.database import get_db
from database import schemas, models, crud, users_crud
from helper import file_parser
from helper.logger import logger

router = APIRouter(prefix="/admin")


def _validate_admin_rights(db: Session, token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.exceptions.PyJWTError:
        raise HTTPException(status_code=401)
    user: models.User = users_crud.get_user_by_id(db=db, id=payload["id"])

    try:
        if {"id": 1, "name": "admin"} not in user.get_roles():
            raise HTTPException(403, detail="")
    except:
        raise HTTPException(401)


@router.post("/add_bird/basic")
async def add_bird(
    bird_data: schemas.BirdUpload,
    bird_description_data: schemas.BirdTextFieldUpload,
    bird_translated_name_english: schemas.BirdTranslatedNameUpload,
    bird_translated_name_polish: schemas.BirdTranslatedNameUpload,
    bird_image_file: UploadFile,
    bird_sound_file: UploadFile,
    db: Session = (Depends(get_db)),
    token: str = Depends(oauth2schema),
):
    _validate_admin_rights(db=db, token=token)

    if bird_image_file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(
            400,
            detail="Invalid image file type. Acceptable values are image/png, image/jpeg",
        )

    if bird_sound_file.content_type not in ["audio/mpeg", "audio/m4a", "audio/x-m4a"]:
        raise HTTPException(
            400,
            detail="Invalid sound file type. Acceptable values are audio/mpeg, audio/x-m4a and audio/m4a",
        )

    # First we add bird to database
    try:
        crud.add_bird_full(
            db=db,
            bird=bird_data,
            bird_description_data=bird_description_data,
            bird_translated_name_english=bird_translated_name_english,
            bird_translated_name_polish=bird_translated_name_polish,
        )
    except sqlExc.IntegrityError as e:
        raise HTTPException(
            409,
            detail="Bird already exists.",
        )

    # Then we save image
    image_extension = bird_image_file.filename.split(".")[-1]
    image_path = "./assets/images"
    image_out_file_name = f"{bird_data.latin_name.replace(' ', '_')}.{image_extension}"
    await file_parser.save_file(
        path=image_path, output_name=image_out_file_name, in_file=bird_image_file
    )

    # Then sound
    sound_extension = bird_sound_file.filename.split(".")[-1]
    sound_path = "./assets/sounds"
    sound_out_file_name = f"{bird_data.latin_name.replace(' ', '_')}.{sound_extension}"
    await file_parser.save_file(
        path=sound_path, output_name=sound_out_file_name, in_file=bird_sound_file
    )

    return {"detail": "Bird added"}
