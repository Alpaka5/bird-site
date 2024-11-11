from fastapi import APIRouter, Depends, HTTPException
import jwt

from sqlalchemy.orm import Session

from database import users_crud, schemas, models
from database.database import get_db

JWT_SECRET = "myjwtsecret"
router = APIRouter(prefix="/users")


def create_token(user: models.User) -> dict:
    user_obj = schemas.User.model_validate(user)

    token = jwt.encode(user_obj.model_dump(), JWT_SECRET)

    return {"access_token": token, "token_type": "bearer"}


@router.get("/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)) -> dict:
    db_user = users_crud.get_user_by_email(db=db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already in use")

    user = users_crud.create_user(
        db=db,
        user=user,
    )

    return create_token(user)
