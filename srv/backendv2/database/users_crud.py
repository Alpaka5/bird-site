from typing import Sequence

from sqlalchemy.orm import Session
from sqlalchemy import select, or_
from passlib import hash

from database import models, schemas
from database.models import Language


def get_user_by_email(db: Session, email: str) -> models.User | None:
    """
    Gets single user by email

    @param db: Session to database
    @param email: Email address of user
    @return: models.User object or None if not present in database
    """
    user = db.execute(select(models.User).where(models.User.email == email)).first()
    if user:
        return user[0]
    else:
        return None


def get_user_by_email_or_username(
    db: Session, email: str, username: str
) -> models.User | None:
    """
    Gets users by either email or username

    @param db: Session to database
    @param email: Email address of user
    @return: models.User object or None if not present in database
    """
    users = db.execute(
        select(models.User).where(
            or_(models.User.email == email, models.User.username == username)
        )
    ).first()
    if users:
        return users
    else:
        return None


def get_user_by_id(db: Session, id: int) -> models.User | None:
    user = db.get(models.User, id)
    return user


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    user_obj = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash.bcrypt.hash(user.hashed_password),
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


def authenticate_user(db: Session, email: str, password: str) -> models.User | None:
    """
    Authenticates user by email and password, returns None if user is not authenticated
    @param db: Session to database
    @param email: email of user
    @param password: password of user
    @return: Row[models.User] object when authentication was successful or None otherwise
    """
    user: models.User = get_user_by_email(email=email, db=db)
    if not user:
        return None

    if not user.verify_password(password):
        return None

    return user
