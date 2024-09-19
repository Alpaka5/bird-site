import {useState} from 'react'

import './App.css'
import './styles/base.css'
import MainCommandMenu from './components/maincommandmenu.tsx'
import QuizWindow from './components/quizWindow.tsx'
import LibraryWindow from './components/libraryWindow.tsx'

function MainWindow({windowToRender}: {windowToRender: any}) {

    return (
        <div>
            {windowToRender === "quizWindow" ? (
                <QuizWindow/>
            ) : windowToRender === "libraryWindow" ? (
                <LibraryWindow/>
            ) : (
                "Page not found!"
            )}
        </div>
    )
}

function App() {
    const [mainWindowState, setMainWindowState] = useState("quizWindow");
    return (
        <>

            <div className="main-grid">
                <MainCommandMenu setMainWindowState={setMainWindowState}/>
                <MainWindow windowToRender={mainWindowState}/>
            </div>
        </>
    )
}

export default App
