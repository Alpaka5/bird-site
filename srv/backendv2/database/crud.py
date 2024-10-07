from sqlalchemy.orm import Session
from sqlalchemy import select, and_, Row

from database import models, schemas


def get_single_bird(db: Session, bird_latin_name: str) -> Row[models.Bird]:
    """
    Gets single bird by its latin name

    @param db: Session to database
    @param bird_latin_name: Latin name of bird
    @return:
    """
    return db.execute(
        select(models.Bird).where(models.Bird.latin_name == bird_latin_name)
    ).first()


def get_all_birds_names(db: Session) -> list[Row]:
    return db.query(select(models.Bird.latin_name).subquery()).all()


def get_all_birds(db: Session):
    return db.query(select(models.Bird).subquery()).all()


def get_birds(db: Session, where_filter):
    return db.execute(select(models.Bird).where(where_filter)).all()


def get_supported_languages(db: Session):
    return db.query(select(models.Language).subquery()).all()


def get_bird_text_field(db: Session, bird_latin_name: str, language_id: str):
    return db.query(
        select(models.BirdTextField).where(
            and_(
                models.BirdTextField.bird == bird_latin_name,
                models.BirdTextField.language == language_id,
            )
        )
    ).first()
