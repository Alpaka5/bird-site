from typing import Sequence

from sqlalchemy.orm import Session
from sqlalchemy import select, and_, Row

from database import models, schemas
from database.models import Language


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
    return db.scalars(select(models.Bird)).all()


def get_birds(db: Session, where_filter):
    return db.scalars(select(models.Bird).where(where_filter)).all()


def get_supported_languages(db: Session) -> Sequence[Language]:
    return db.scalars(select(models.Language)).all()


def get_bird_text_field(db: Session, bird_latin_name: str, language_id: str):
    return db.execute(
        select(models.BirdTextField).where(
            and_(
                models.BirdTextField.bird == bird_latin_name,
                models.BirdTextField.language == language_id,
            )
        )
    ).first()


def add_bird_full(
    db: Session,
    bird: schemas.Bird,
    bird_description_data: schemas.BirdTextField,
    bird_translated_name_english: schemas.BirdTranslatedName,
    bird_translated_name_polish: schemas.BirdTranslatedName,
):
    bird_model = models.Bird(**bird.model_dump())
    db.add(bird_model)

    bird_description_model = models.BirdTextField(**bird_description_data.model_dump())
    db.add(bird_description_model)

    bird_translated_name_english_model = models.BirdNameTranslation(
        **bird_translated_name_english.model_dump()
    )
    db.add(bird_translated_name_english_model)

    bird_translated_name_polish_model = models.BirdNameTranslation(
        **bird_translated_name_polish.model_dump()
    )
    db.add(bird_translated_name_polish_model)

    db.commit()

    return True
