import random
from sqlalchemy import and_
from sqlalchemy.orm import Session

from database import crud, models
from database.schemas import BirdDetailed
from engine.quiz.schemas import BirdQuizAnswer


class QuizGame:
    def __init__(self, db: Session):
        self.db: Session = db

    def get_quiz_game(self) -> BirdQuizAnswer:
        # First we need to determine which bird to choose.
        correct_bird: BirdDetailed = self.choose_random_correct_bird()

        # Then get all necessary data about this bird - size, weight, orders etc., photo and sound
        # Then we need to get similar birds
        chosen_birds: list[BirdDetailed] = self.get_similar_birds(correct_bird)
        chosen_birds.append(correct_bird)
        random.shuffle(chosen_birds)
        # Create response with winning bird and losing birds.

        return BirdQuizAnswer(correct_bird=correct_bird.latin_name, birds=chosen_birds)

    def choose_random_correct_bird(self) -> BirdDetailed:
        """
        Gets random bird from database with all the details
        @return: BirdDetailed object
        """
        birds_names = crud.get_all_birds_names(db=self.db)
        chosen_bird = random.choice(birds_names).latin_name

        bird_data = crud.get_single_bird(db=self.db, bird_latin_name=chosen_bird)[0]

        return self.get_detailed_bird(bird=bird_data, winning_bird=True)

    def get_detailed_bird(
        self, bird: models.Bird, winning_bird: bool = False
    ) -> BirdDetailed:
        return BirdDetailed(
            latin_name=bird.latin_name,
            english_name=[
                name_translation.name
                for name_translation in bird.name_translations
                if name_translation.language == "eng"
            ][0],
            polish_name=[
                name_translation.name
                for name_translation in bird.name_translations
                if name_translation.language == "pol"
            ][0],
            length_min_mm=bird.length_min_mm,
            length_max_mm=bird.length_max_mm,
            weight_min_g=bird.weight_min_g,
            weight_max_g=bird.weight_max_g,
            family=bird.family,
            order=bird.family_rel.suborder_rel.order_rel.latin_name,
            suborder=bird.family_rel.suborder_rel.latin_name,
            tags=[tag.tag for tag in bird.tags],
            winning_bird=winning_bird,
        )

    def get_similar_birds(self, bird: BirdDetailed) -> list[BirdDetailed]:
        # We will choose similar birds based on size, if we don't find at least 3 birds, we make our margin higher
        similar_birds: list[BirdDetailed] = []
        for size_perc_mult in range(1, 11):
            similar_birds = crud.get_birds(
                db=self.db,
                where_filter=and_(
                    models.Bird.length_min_mm
                    >= bird.length_min_mm * (1 - (size_perc_mult * 0.1)),
                    models.Bird.length_max_mm
                    <= bird.length_max_mm * (1 + (size_perc_mult * 0.1)),
                    models.Bird.latin_name != bird.latin_name,
                ),
            )
            if len(similar_birds) >= 3:
                break
        if len(similar_birds) < 3:
            raise ValueError(f"Couldn't find 3 similar birds to bird {bird.latin_name}")

        random.shuffle(similar_birds)
        return [self.get_detailed_bird(bird) for bird in similar_birds[0:3]]
