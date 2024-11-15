from fastapi import APIRouter, Depends, HTTPException, security
import jwt
from sqlalchemy import Row

from sqlalchemy.orm import Session

from database import users_crud, schemas, models
from database.database import get_db

JWT_SECRET = "myjwtsecret"
router = APIRouter(prefix="/users")

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/users/token")


def create_token(user: models.User) -> dict:
    user_obj = schemas.User.model_validate(user)

    token = jwt.encode(user_obj.model_dump(), JWT_SECRET)

    return {"access_token": token, "token_type": "bearer"}


@router.post("/create")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)) -> dict:
    db_user = users_crud.get_user_by_email_or_username(
        db=db, email=user.email, username=user.username
    )
    if db_user:
        raise HTTPException(status_code=400, detail="Email or username already in use")

    user = users_crud.create_user(
        db=db,
        user=user,
    )

    return create_token(user)


@router.post("/token")
def generate_token(
    form_data: security.OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user: models.User = users_crud.authenticate_user(
        db,
        form_data.username,
        form_data.password,
    )

    if not user:
        raise HTTPException(status_code=401, detail="Invalid Credentials")

    return create_token(user)


@router.get("/me", response_model=schemas.User)
def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2schema),
) -> schemas.User:
    """
    Gets current user
    @param db: Session to database
    @param token: Session token
    @return: models.User or None if invalid token
    """

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.exceptions.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid Token")
    user = users_crud.get_user_by_id(db=db, id=payload["id"])
    if not user:
        raise HTTPException(status_code=401, detail="Invalid Email or Password")

    return schemas.User.model_validate(user)
