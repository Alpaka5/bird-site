import random
from sqlalchemy import and_
from sqlalchemy.orm import Session

from database import crud, models
from database.schemas import BirdDetailed
from engine.quiz.schemas import BirdQuizAnswer


class QuizGame:
    def __init__(self, db: Session):
        self.db: Session = db

    def get_quiz_game(self) -> list[BirdQuizAnswer]:
        # First we need to determine which bird to choose.
        correct_bird: BirdQuizAnswer = self.choose_random_correct_bird()

        # Then get all necessary data about this bird - size, weight, orders etc., photo and sound
        # Then we need to get similar birds
        chosen_birds: list[BirdQuizAnswer] = self.get_similar_birds(correct_bird.bird)
        chosen_birds.append(correct_bird)
        random.shuffle(chosen_birds)
        # Create response with winning bird and losing birds.

        return chosen_birds

    def choose_random_correct_bird(self) -> BirdQuizAnswer:
        """
        Gets random bird from database with all the details
        @return: BirdDetailed object
        """
        birds_names = crud.get_all_birds_names(db=self.db)
        chosen_bird = random.choice(birds_names).latin_name

        bird_data = crud.get_single_bird(db=self.db, bird_latin_name=chosen_bird)[0]

        return self.get_bird_answer(bird_data, correct_answer=True)

    def get_bird_answer(
        self, bird: models.Bird, correct_answer: bool = False
    ) -> BirdQuizAnswer:
        detailed_bird: BirdDetailed = self.get_detailed_bird(bird=bird)
        try:
            with open(
                f"assets/images/{bird.latin_name.replace(' ','_')}.png", "rb"
            ) as bird_image, open(
                f"assets/sounds/{bird.latin_name.replace(' ','_')}.m4a", "rb"
            ) as bird_sound:
                return BirdQuizAnswer(
                    bird=detailed_bird,
                    sound=bird_sound.read(),
                    image=bird_image.read(),
                    correct_bird=correct_answer,
                )
        except FileNotFoundError as err:
            raise err

    def get_detailed_bird(self, bird: models.Bird) -> BirdDetailed:
        return BirdDetailed(
            latin_name=bird.latin_name,
            length_min_mm=bird.length_min_mm,
            length_max_mm=bird.length_max_mm,
            weight_min_g=bird.weight_min_g,
            weight_max_g=bird.weight_min_g,
            family=bird.family,
            order=bird.family_rel.suborder_rel.order_rel.latin_name,
            suborder=bird.family_rel.suborder_rel.latin_name,
            tags=[tag.tag for tag in bird.tags],
        )

    def get_similar_birds(self, bird: BirdDetailed) -> list[BirdQuizAnswer]:
        # We will choose similar birds based on size, if we don't find at least 3 birds, we make our margin higher
        chosen_birds: list[BirdQuizAnswer] = []
        size_perc_mult = 0
        similar_birds = []
        for size_perc_mult in range(1, 11):
            similar_birds = crud.get_birds(
                db=self.db,
                where_filter=and_(
                    models.Bird.length_min_mm
                    >= bird.length_min_mm * (1 - (size_perc_mult * 0.1)),
                    models.Bird.length_max_mm
                    <= bird.length_max_mm * (1 + (size_perc_mult * 0.1)),
                ),
            )
            if len(similar_birds) >= 3:
                break
        if len(similar_birds) < 3:
            raise ValueError(f"Couldn't find 3 similar birds to bird {bird.latin_name}")

        random.shuffle(similar_birds)
        return [
            self.get_bird_answer(bird=bird[0], correct_answer=False)
            for bird in similar_birds[0:3]
        ]
