import datetime as dt
import enum
from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, mapped_column, Mapped
from passlib import hash

from .database import Base


class Language(Base):
    __tablename__ = "languages"

    code: Mapped[str] = mapped_column(
        primary_key=True,
    )


class BirdOrder(Base):
    __tablename__ = "birdorder"

    latin_name: Mapped[str] = mapped_column(primary_key=True)

    suborders: Mapped[List["BirdSuborder"]] = relationship(back_populates="order_rel")


class BirdOrderTranslation(Base):
    __tablename__ = "birdordertranslation"

    order: Mapped[str] = mapped_column(
        ForeignKey("birdorder.latin_name"), primary_key=True
    )
    language: Mapped[str] = mapped_column(
        ForeignKey("languages.code"), primary_key=True
    )
    name: Mapped[str]


class BirdSuborder(Base):
    __tablename__ = "birdsuborder"

    latin_name: Mapped[str] = mapped_column(primary_key=True)
    order: Mapped[str] = mapped_column(ForeignKey("birdorder.latin_name"))

    order_rel: Mapped["BirdOrder"] = relationship(back_populates="suborders")
    families: Mapped[List["BirdFamily"]] = relationship(
        "BirdFamily", back_populates="suborder_rel"
    )


class BirdSuborderTranslation(Base):
    __tablename__ = "birdsubordertranslation"

    suborder: Mapped[str] = mapped_column(
        ForeignKey("birdsuborder.latin_name"), primary_key=True
    )
    language: Mapped[str] = mapped_column(
        ForeignKey("languages.code"), primary_key=True
    )
    name: Mapped[str]


class BirdFamily(Base):
    __tablename__ = "birdfamily"

    latin_name: Mapped[str] = mapped_column(primary_key=True)
    suborder: Mapped[str] = mapped_column(ForeignKey("birdsuborder.latin_name"))

    suborder_rel: Mapped["BirdSuborder"] = relationship(back_populates="families")
    birds: Mapped[List["Bird"]] = relationship(back_populates="family_rel")


class BirdFamilyTranslation(Base):
    __tablename__ = "birdfamilytranslation"

    family: Mapped[str] = mapped_column(
        ForeignKey("birdfamily.latin_name"), primary_key=True
    )
    language: Mapped[str] = mapped_column(
        ForeignKey("languages.code"), primary_key=True
    )
    name: Mapped[str]


class Bird(Base):
    __tablename__ = "bird"

    latin_name: Mapped[str] = mapped_column(primary_key=True)
    length_min_mm: Mapped[int]
    length_max_mm: Mapped[int]
    weight_min_g: Mapped[float]
    weight_max_g: Mapped[float]
    family: Mapped[str] = mapped_column(ForeignKey("birdfamily.latin_name"))

    family_rel: Mapped["BirdFamily"] = relationship(back_populates="birds")
    sounds_url: Mapped[List["BirdSoundsURL"]] = relationship()
    text_fields: Mapped[List["BirdTextField"]] = relationship()
    name_translations: Mapped[List["BirdNameTranslation"]] = relationship(
        back_populates="bird_rel"
    )
    tags: Mapped[List["BirdTag"]] = relationship(back_populates="bird_rel")

    def __str__(self):
        return self.latin_name


class SoundType(enum.Enum):
    SONG = "song"
    CALL = "call"
    MIXED = "mixed"


class BirdSoundsURL(Base):
    __tablename__ = "birdsoundsurl"

    id: Mapped[int] = mapped_column(primary_key=True)
    bird: Mapped[str] = mapped_column(ForeignKey("bird.latin_name"))
    url: Mapped[str]
    type: Mapped[SoundType] = mapped_column()


class BirdTextField(Base):
    __tablename__ = "birdtextfield"

    bird: Mapped[str] = mapped_column(ForeignKey("bird.latin_name"), primary_key=True)
    language: Mapped[str] = mapped_column(
        ForeignKey("languages.code"), primary_key=True
    )
    description: Mapped[str]


class BirdNameTranslation(Base):
    __tablename__ = "birdnametranslation"

    bird: Mapped[str] = mapped_column(ForeignKey("bird.latin_name"), primary_key=True)
    language: Mapped[str] = mapped_column(
        ForeignKey("languages.code"), primary_key=True
    )
    name: Mapped[str]

    bird_rel: Mapped["Bird"] = relationship(back_populates="name_translations")


class BirdTag(Base):
    __tablename__ = "birdtag"

    bird: Mapped[str] = mapped_column(ForeignKey("bird.latin_name"), primary_key=True)
    tag: Mapped[str] = mapped_column(primary_key=True)

    bird_rel: Mapped["Bird"] = relationship(back_populates="tags")


class User(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(unique=True, index=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    hashed_password: Mapped[str]

    user_profile: Mapped["UserProfile"] = relationship(back_populates="user")
    user_roles: Mapped[List["UserRole"]] = relationship(back_populates="user")

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "user_roles": [
                {"id": single_role.role_id, "name": single_role.role.role_name}
                for single_role in self.user_roles
            ],
        }

    def get_roles(self):
        return [
            {"id": single_role.role_id, "name": single_role.role.role_name}
            for single_role in self.user_roles
        ]


class UserProfile(Base):
    __tablename__ = "userprofile"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    first_name: Mapped[str] = mapped_column(index=True)
    last_name: Mapped[str] = mapped_column(index=True)
    note: Mapped[str] = mapped_column(default="")
    date_created: Mapped[dt.datetime] = mapped_column(default=dt.datetime.now(dt.UTC))
    date_last_updated: Mapped[dt.datetime] = mapped_column(
        default=dt.datetime.now(dt.UTC)
    )

    user: Mapped["User"] = relationship(back_populates="user_profile")


class Role(Base):
    __tablename__ = "role"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    role_name: Mapped[str] = mapped_column(index=True)
    user_roles: Mapped[List["UserRole"]] = relationship(back_populates="role")


class UserRole(Base):
    __tablename__ = "userrole"
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), primary_key=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), primary_key=True)
    user: Mapped["User"] = relationship(back_populates="user_roles")
    role: Mapped["Role"] = relationship(back_populates="user_roles")
