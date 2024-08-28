import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function QuizImage() {
    return (
        <>
            <img src={reactLogo} className="logo react" alt="React logo"/>
        </>
    )
}

function QuizAnswers() {
    return (
        <>
            <form class='base-flex.col'>
                <p>Choose your answer</p>
                <input type='radio' id='quiz_answer_1' name="quiz_answer"></input>
                <label htmlFor="quiz_answer_1">Answer 1</label><br/>
                <input type='radio' id='quiz_answer_2' name="quiz_answer"></input>
                <label htmlFor="quiz_answer_2">Answer 2</label><br/>
                <input type='radio' id='quiz_answer_3' name="quiz_answer"></input>
                <label htmlFor="quiz_answer_3">Answer 3</label><br/>
            </form>
        </>
    )
}

function QuizButton(){
    return (
        <>
            <button>
                Check your answer
            </button>
        </>
    )
}

function QuizWindow() {
    return (
        <>
            <div className="base-flex.col">
                <QuizImage/>
                <QuizAnswers/>
                <QuizButton/>
            </div>
        </>
    )
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <QuizWindow/>
            </div>
        </>
    )
}

export default App
