import {useState, createContext} from 'react'

import './App.css'
import './styles/base.css'
import './styles/quiz_styles.css'
import MainCommandMenu from './components/maincommandmenu.tsx'
import MainBanner from './components/mainBanner.tsx'
import QuizWindow from './components/quiz/quizWindow.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

export const SetMainWindowContext = createContext(() => {
});


function App() {
    const [mainWindowState, setMainWindowState] = useState(<QuizWindow/>);
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    }
                }
            })
    );

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className="main-grid h-screen w-screen p-0 justify-center items-center">
                    <SetMainWindowContext.Provider value={setMainWindowState}>
                        <MainCommandMenu/>
                        <div className="w-full h-full">{mainWindowState}</div>
                    </SetMainWindowContext.Provider>
                </div>
            </QueryClientProvider>
        </>
    )
}

export default App
