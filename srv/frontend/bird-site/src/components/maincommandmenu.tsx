import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

export default function MainCommandMenu({ setMainWindowState }: {setMainWindowState: Function}) {
    return (
        <>
            <Command>
                <CommandList>
                    <CommandGroup heading="Birds">
                        <CommandItem onSelect={() => setMainWindowState("quizWindow")}>Quiz</CommandItem>
                        <CommandItem onSelect={() => setMainWindowState("libraryWindow")}>Library</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    )
}