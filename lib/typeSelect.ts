import {create} from 'zustand'

interface SelectedType {
    menuType: string
    setType: (menuType: string) => void
}
export const useSetType = create<SelectedType>()((set) => ({
    menuType: "cafe",
    setType: (menuType: string) => set({ menuType })
}))