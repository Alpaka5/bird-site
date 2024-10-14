import {useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {post} from "axios";

import {birdDetailed, responseQuiz} from "../types/quizGameResponseType.tsx"
import {birdDescription} from "../types/birdResponsesType.tsx";
import BirdDescriptionWindow from "../birdDescriptionWindow.tsx";
import {createContext, useState} from "react";

export const SetQuizStateContext = createContext(() => {
});

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function CollapsibleQuizAnswer(props: any) {
    const open = props.collapseState["value"];
    const setOpen = props.collapseState["setter"]
    function toggle(event: MouseEvent) {
        props.onClick(event);
        console.log("COLLAPSE STATE " + props.collapseState["value"])
        setOpen(!open);
    }


    return (
        <div>
            <button id={props.id} className={props.className} onClick={(event) => {
                toggle(event)
            }}
                    data-winning={props.winning}>{props.label}</button>
            {open &&
                <div>{props.children}</div>}
        </div>
    );
}

function QuizAnswer({bird, collapseState, onClick}: { bird: birdDetailed, collapseState: Object, onClick: Function }) {


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
        <CollapsibleQuizAnswer id={"col_quiz_ans_" + bird.latin_name} className={"bg-gray-300 m-1 "}
                               label={capitalizeFirstLetter(bird.latin_name)} onClick={onClick} collapseState={collapseState}
                               winning={bird.winning_bird}>
            <BirdDescriptionWindow selectedBird={bird}></BirdDescriptionWindow>
        </CollapsibleQuizAnswer>
    )
}

function QuizAnswers({quizQuery}: { quizQuery: UseQueryResult }) {
    const quizAnswers = [];
    const quizGame: responseQuiz = quizQuery.data;
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);
    const [allAnswersCounter, setAllAnswersCounter] = useState(1);

    function checkCorrectAnswer(event: MouseEvent) {

        console.log(event.currentTarget.getAttribute('data-winning'));
        let isPressedBirdWinning: string = event.currentTarget.getAttribute('data-winning');
        for (const single_bird of quizGame.birds) {
            let answerItem = document.getElementById("col_quiz_ans_" + single_bird.latin_name);

            if (answerItem.dataset.winning == 'true') {
                answerItem.style.backgroundColor = "green";
            } else {
                answerItem.style.backgroundColor = "red";
            }

        }
        if (isPressedBirdWinning == "true") {
            if (!quizAnswered) {
                setCorrectAnswersCounter(correctAnswersCounter + 1);
            }
        } else {

        }
        let newGameButton: HTMLElement = document.getElementById("new_quiz_button");
        newGameButton.hidden = false;

        setQuizAnswered(true);
    }

    let collapseStateList: Array = [];
    for (const single_bird of quizGame.birds) {
        // I can use useState hook inside loop, because there is always only limited amount of answers!
        let [collapseState, setCollapseState] = useState(false);
        collapseStateList.push({"value": collapseState, "setter": setCollapseState});
        quizAnswers.push(<QuizAnswer bird={single_bird}
                                     collapseState={{"value": collapseState, "setter": setCollapseState}}
                                     onClick={(event: MouseEvent) => {
                                         checkCorrectAnswer(event)
                                     }}></QuizAnswer>)
    }

    function startNewQuiz(event) {
        event.currentTarget.setAttribute("hidden", true);
        quizQuery.refetch();
        setAllAnswersCounter(allAnswersCounter + 1);
        setQuizAnswered(false);
        for (const single_bird of quizGame.birds) {
            let answer_item = document.getElementById("col_quiz_ans_" + single_bird.latin_name);
            answer_item.style.backgroundColor = "lightgray";
        }
        for (const collapseState of collapseStateList){
            collapseState["setter"](false);
        }
    }


    return (
        <>
            {quizAnswers}
            <button id="new_quiz_button" className="bg-orange-300 m-5" hidden={true}
                    onClick={(e: MouseEvent) => {
                        startNewQuiz(e)
                    }}>Start new game
            </button>
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
            <div className="flex-col">
                The amazing BIRD QUIZ!
                <QuizAnswers quizQuery={postQuery}/>
            </div>
        </>
    )
}