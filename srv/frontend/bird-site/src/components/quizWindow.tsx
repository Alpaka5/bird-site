import reactLogo from '../assets/react.svg'

function QuizImage() {
    return (
        <>
            <img src={reactLogo} alt="React logo"/>
        </>
    )
}

function QuizAnswers() {
    return (
        <>
            <form className="flex-col">
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

function QuizButton() {
    return (
        <>
            <button>
                Check your answer
            </button>
        </>
    )
}

export default function QuizWindow() {
    return (
        <>
            <div className="flex-col">
                <QuizImage/>
                <QuizAnswers/>
                <QuizButton/>
            </div>
        </>
    )
}