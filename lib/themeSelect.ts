import {create} from 'zustand'

interface Theme {
    name: string | null,
    primary: string,
    secondary: string,
    background: string,
    text: string,
}
interface SelectedTheme {
    theme: Theme
    setTheme: (theme: Theme) => void
}
export const useGenerationStore = create<SelectedTheme>()((set) => ({
    theme: {
        name: "",
        primary: "",
        secondary: "",
        background: "",
        text: ""
    },
    setTheme: (theme: Theme) => set({ theme })
}))