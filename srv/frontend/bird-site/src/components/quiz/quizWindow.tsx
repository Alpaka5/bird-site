import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios from "axios";

import {birdDetailed, responseQuiz} from "../types/quizGameResponseType.tsx"
import {birdDescription} from "../types/birdResponsesType.tsx";
import BirdDescriptionQuizWindow from "./birdDescriptionQuizWindow.tsx";
import {createContext, useState} from "react";


export const SetQuizStateContext = createContext(() => {
});

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function QuizAnswer({bird, onClick}: { bird: birdDetailed, collapseState: Object, onClick: Function }) {
    const postQuery = useQuery({
        queryKey: [`bird_description_${bird.latin_name}`],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:5000/birds/description/${bird.latin_name}/eng`);
            return await response.data as birdDescription;

        }
    });

    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;

    return (
        <div id={"col_quiz_ans_" + bird.latin_name}
             className="flex justify-center items-center col-start-1 col-end-1 w-full
             answer-button button-gray p-3 rounded-xl"
             onClick={(event) => {
                 onClick(event)
             }}
             data-winning={bird.winning_bird}>
            <span>{capitalizeFirstLetter(bird.english_name)}</span>
        </div>
    )
}

function QuizAnswers({quizQuery}: { quizQuery: UseQueryResult }) {
    const quizAnswers = [];
    const quizGame: responseQuiz = quizQuery.data;
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [allAnswersCounter, setAllAnswersCounter] = useState(1);
    const [birdDescription, setBirdDescription] = useState(() => {
    });

    const [wasPlayed, setWasPlayed] = useState(false);

    function checkCorrectAnswer(event: MouseEvent, bird: birdDetailed) {
        if (!quizAnswered) {
            for (const single_bird of quizGame.birds) {
                let answerItem = document.getElementById("col_quiz_ans_" + single_bird.latin_name);
                if (answerItem.dataset.winning == 'true') {
                    answerItem.classList.replace("button-gray", "button-green");
                } else {
                    answerItem.classList.replace("button-gray", "button-red");
                }


            }
            console.log("Winning bird: " + bird.winning_bird)
            if (bird.winning_bird == true) {
                setCorrectAnswersCounter(correctAnswersCounter + 1);
            }
            let quizBirdDescription = document.getElementById("quiz-bird-description");
            quizBirdDescription.classList.remove("hidden");
            setTimeout(function () {
                quizBirdDescription.classList.replace("quiz-description-hidden", "quiz-description");
            }, 10);
            // let quizAnswerGrid = document.getElementById("quiz-answer-grid");
            // quizAnswerGrid.style.gridTemplateColumns = "1fr 3fr"
            // quizAnswerGrid.style.columnGap = '6rem';
        }

        setBirdDescription(<BirdDescriptionQuizWindow selectedBird={bird}/>)

        let newGameButton: HTMLElement = document.getElementById("new_quiz_button");
        newGameButton.style.visibility = "visible";
        newGameButton.style.opacity = 1;
        setQuizAnswered(true);
    }


    for (const single_bird of quizGame.birds) {
        // I can use useState hook inside loop, because there is always only limited amount of answers!
        quizAnswers.push(<QuizAnswer bird={single_bird}
                                     onClick={(event: MouseEvent) => {
                                         checkCorrectAnswer(event, single_bird)
                                     }}></QuizAnswer>)
    }

    function startNewQuiz(event) {
        setWasPlayed(false);

        let quizBirdSound = document.getElementById("quiz_bird_sound");

        quizQuery.refetch();


        let quizBirdDescription = document.getElementById("quiz-bird-description");

        quizBirdDescription.classList.replace("quiz-description", "quiz-description-hidden");

        setTimeout(function () {
            quizBirdDescription.classList.add("hidden");
        }, 400);
        event.currentTarget.style.visibility = "hidden";

        event.currentTarget.style.opacity = 0;


        setAllAnswersCounter(allAnswersCounter + 1);
        setQuizAnswered(false);
        for (const single_bird of quizGame.birds) {
            let answer_item = document.getElementById("col_quiz_ans_" + single_bird.latin_name);
            answer_item.classList.add("button-gray")
            answer_item.classList.remove("button-red")
            answer_item.classList.remove("button-green")
        }

        setTimeout(function () {
            event.currentTarget.currentTime = 3;
        }, 1200);

        setTimeout(function () {
            quizBirdSound.play();
        }, 1200);

    }


    return (
        <>
            <div className="flex flex-row flex-quiz-box justify-center w-full gap-8">
                <div className="flex flex-col justify-center duration-500 gap-5">
                    {quizAnswers}
                </div>
                <div id="quiz-bird-description"
                     className="quiz-description-hidden hidden self-center p-5"
                >{birdDescription}</div>

            </div>

            <audio id="quiz_bird_sound" controlsList="nodownload" onPlay={(event) => {
                console.log(wasPlayed);
                if (!wasPlayed) {
                    console.log(event.currentTarget.currentTime);
                    for (var i=1;i<=10; i++) {
                        event.currentTarget.currentTime = 3;
                    }
                    console.log(event.currentTarget.currentTime);

                    setWasPlayed(true);
                }
            }} controls>
                <source id="quiz_bird_sound_source" src={"http://localhost:5000/birds/sound/" + quizGame.correct_bird}/>
            </audio>
            <button id="new_quiz_button" className="start-new-game-button m-1 "
                    onClick={(e: MouseEvent) => {
                        startNewQuiz(e)
                    }}>Start new game
            </button>
            <div className="text-xl">{correctAnswersCounter}/{allAnswersCounter}</div>
        </>
    )
}


export default function QuizWindow() {
    setTimeout(function () {
        let quizBirdSoundSource = document.getElementById("quiz_bird_sound_source");

        new MutationObserver(() => {
            let quizBirdSound = document.getElementById("quiz_bird_sound");
            quizBirdSound.pause();
            quizBirdSound.load();
            quizBirdSound.currentTime=3;
        }).observe(quizBirdSoundSource, {attributes: true, attributeFilter: ["src"]});
        console.log("observer done")
    }, 2000);


    const postQuery = useQuery({
        queryKey: ['quiz_game'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:5000/quiz/game');
            return await response.data as responseQuiz;
        }
    });

    if (postQuery.isLoading) return <h1>Loading....</h1>;
    if (postQuery.isError) return <h1>Error loading data!!!</h1>;

    return (
        <>
            <div className="flex flex-col justify-items-start items-center gap-3">
                <QuizAnswers quizQuery={postQuery}/>
            </div>
        </>
    )
}