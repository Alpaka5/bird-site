import {useContext} from 'react';
import {SetMainWindowContext} from '../App.tsx'

import QuizWindow from "./quiz/quizWindow.tsx";
import LibraryWindow from "./library/libraryWindow.tsx";
import MainBanner from "./mainBanner.tsx";
import UserMenu from "./users/userMenu.tsx"

export default function MainCommandMenu() {
    const setMainWindowState: Function = useContext(SetMainWindowContext);
    return (
        <>

            <div className="main-command-menu gap-10">
                <MainBanner/>
                <div className="flex justify-evenly items-center">
                    <div className="nav-menu-text nav-menu-button" onClick={() => setMainWindowState(<QuizWindow/>)}>Quiz</div>
                    <div className="nav-menu-text nav-menu-button" onClick={() => setMainWindowState(<LibraryWindow/>)}>Library</div>
                </div>
                <UserMenu/>
            </div>
        </>
    )
}