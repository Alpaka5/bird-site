import {useState, createContext} from 'react'

import './App.css'
import './styles/base.css'
import MainCommandMenu from './components/maincommandmenu.tsx'
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
                <div className="main-grid">
                    <SetMainWindowContext.Provider value={setMainWindowState}>
                        <MainCommandMenu/>
                        {mainWindowState}
                    </SetMainWindowContext.Provider>
                </div>
            </QueryClientProvider>
        </>
    )
}

export default App
