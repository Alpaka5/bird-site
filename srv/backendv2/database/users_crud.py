from typing import Sequence

from sqlalchemy.orm import Session
from sqlalchemy import select, and_, Row
from passlib import hash

from database import models, schemas
from database.models import Language


def get_user_by_email(db: Session, email: str) -> Row[models.User]:
    """
    Gets single user by email

    @param db: Session to database
    @param email: Email address of user
    @return:
    """
    return db.execute(select(models.User).where(models.User.email == email)).first()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    user_obj = models.User(
        email=user.email, hashed_password=hash.bcrypt.hash(user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj
