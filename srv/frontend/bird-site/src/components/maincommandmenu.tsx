import { useContext } from 'react';
import {SetMainWindowContext} from '../App.tsx'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import QuizWindow from "./quiz/quizWindow.tsx";
import LibraryWindow from "./libraryWindow.tsx";

export default function MainCommandMenu() {
    const setMainWindowState: Function = useContext(SetMainWindowContext);
    return (
        <>
            <Command>
                <CommandList>
                    <CommandGroup heading="Birds">
                        <CommandItem onSelect={() => setMainWindowState(<QuizWindow/>)}>Quiz</CommandItem>
                        <CommandItem onSelect={() => setMainWindowState(<LibraryWindow />)}>Library</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    )
}