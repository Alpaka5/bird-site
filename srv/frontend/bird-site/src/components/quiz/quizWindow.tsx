import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {post} from "axios";

import {birdDetailed, responseQuiz} from "../types/quizGameResponseType.tsx"
import {birdDescription} from "../types/birdResponsesType.tsx";
import BirdDescriptionWindow from "../birdDescriptionWindow.tsx";
import {createContext, useState} from "react";
import {BirdEntry} from "../birds/columns.tsx";
import AudioPlayer from "../ui/audioPlayer.tsx";

export const SetQuizStateContext = createContext(() => {
});

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// function CollapsibleQuizAnswer(props: any) {
//     const open = props.collapseState["value"];
//
//     function toggle(event: MouseEvent) {
//         props.onClick(event);
//     }
//
//
//     return (
//         <div className="w-1/2">
//             <div id={props.id}
//                  className=" bg-gray-300 p-5 rounded-xl  hover:outline-gray-500 hover:outline hover:outline-2"
//                  onClick={(event) => {
//                      toggle(event)
//                  }}
//                  data-winning={props.winning} data-label={props.label}>{props.label}</div>
//             {open &&
//                 <div>{props.children}</div>}
//         </div>
//     );
// }

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
             className="flex justify-center items-center col-start-1 col-end-1 max-w-64 w-full
             answer-button-gray p-5 rounded-xl hover:outline-gray-500 hover:outline hover:outline-2"
             onClick={(event) => {
                 onClick(event)
             }}
             data-winning={bird.winning_bird}>
            <>{capitalizeFirstLetter(bird.latin_name)}</>
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

    function checkCorrectAnswer(event: MouseEvent, bird: birdDetailed) {
        if (!quizAnswered) {
            for (const single_bird of quizGame.birds) {
                let answerItem = document.getElementById("col_quiz_ans_" + single_bird.latin_name);
                if (answerItem.dataset.winning == 'true') {
                    answerItem.classList.replace("answer-button-gray", "answer-button-green");
                } else {
                    answerItem.classList.replace("answer-button-gray", "answer-button-red");
                }


            }
            console.log("Winning bird: " + bird.winning_bird)
            if (bird.winning_bird == true) {
                setCorrectAnswersCounter(correctAnswersCounter + 1);
            }
            let quizBirdDescription = document.getElementById("quiz-bird-description");
            quizBirdDescription.hidden = false;

            let quizAnswerGrid = document.getElementById("quiz-answer-grid");
            quizAnswerGrid.style.gridTemplateColumns = "1fr 3fr"
            quizAnswerGrid.style.columnGap='6rem';
        }

        setBirdDescription(<BirdDescriptionWindow selectedBird={bird}/>)

        let newGameButton: HTMLElement = document.getElementById("new_quiz_button");
        newGameButton.hidden = false;

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
        let quizBirdSound: HTMLElement = document.getElementById("quiz_bird_sound")
        quizBirdSound.pause()
        quizBirdSound.currentTime = 0

        let quizBirdDescription = document.getElementById("quiz-bird-description");
        quizBirdDescription.hidden = true;

        let quizAnswerGrid = document.getElementById("quiz-answer-grid");
        quizAnswerGrid.style.gridTemplateColumns = "1fr 0fr"
        quizAnswerGrid.style.columnGap='0rem';

        event.currentTarget.setAttribute("hidden", true);
        quizQuery.refetch();
        setAllAnswersCounter(allAnswersCounter + 1);
        setQuizAnswered(false);
        for (const single_bird of quizGame.birds) {
            let answer_item = document.getElementById("col_quiz_ans_" + single_bird.latin_name);
            answer_item.classList.add("answer-button-gray")
            answer_item.classList.remove("answer-button-red")
            answer_item.classList.remove("answer-button-green")
        }
        for (const collapseState of collapseStateList) {
            collapseState["setter"](false);
        }

        setTimeout(function () {
            quizBirdSound.play();
        }, 1000);

    }


    return (
        <>
            <div className="flex flex-row flex-initial justify-center w-full">
                <div id="quiz-answer-grid" className="answer-grid  ">
                    {quizAnswers}
                    <div id="quiz-bird-description"
                         className="w-full col-start-2 col-end-2 row-start-1 row-end-5 outline p-5 outline-gray-500 outline-2 bg-gray-100"
                         hidden={true}>{birdDescription}</div>
                </div>
            </div>
            <button id="new_quiz_button" className="start-new-game-button m-1" hidden={true}
                    onClick={(e: MouseEvent) => {
                        startNewQuiz(e)
                    }}>Start new game
            </button>
            <audio id="quiz_bird_sound" controlsList="nodownload" controls>
                <source src={"http://localhost:5000/birds/sound/" + quizGame.correct_bird}/>
            </audio>

            <div>{correctAnswersCounter}/{allAnswersCounter}</div>
        </>
    )
}


export default function QuizWindow() {

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
            <div className="flex flex-col flex-initial justify-items-start items-center gap-3">
                <QuizAnswers quizQuery={postQuery}/>
            </div>
        </>
    )
}