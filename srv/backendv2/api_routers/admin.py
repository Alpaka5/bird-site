import jwt
import openpyxl
from fastapi import APIRouter, UploadFile, HTTPException, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from api_routers.users import oauth2schema, JWT_SECRET
from database.database import get_db
from database import schemas, models, crud, users_crud
from helper import file_parser
from helper.logger import logger

router = APIRouter(prefix="/admin")


@router.post("/add_bird/basic")
def add_bird(
    bird_data: schemas.Bird,
    bird_image_file: UploadFile,
    bird_sound_file: UploadFile,
    db: Session = (Depends(get_db)),
    token: str = Depends(oauth2schema),
):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.exceptions.PyJWTError:
        raise HTTPException(status_code=401)
    user: models.User = users_crud.get_user_by_id(db=db, id=payload["id"])

    try:
        if {"id": 1, "name": "admin"} not in user.get_roles():
            raise HTTPException(403)
    except:
        raise HTTPException(401)

    if bird_image_file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(
            400,
            detail="Invalid image file type. Acceptable values are image/png, image/jpeg",
        )

    if bird_sound_file.content_type not in ["audio/mpeg", "audio/m4a"]:
        raise HTTPException(
            400,
            detail="Invalid sound file type. Acceptable values are audio/mpeg and audio/m4a",
        )

    # First we add bird to database
    crud.add_bird(db=db, bird=bird_data)

    # Then we save image

    image_out_file_name = (
        f"{bird_data.latin_name.replace(' ', '_')}.{bird_image_file.filename}"
    )
    file_parser.save_file(output_name=image_out_file_name, in_file=bird_image_file)
    return {"message": "Bird added"}
