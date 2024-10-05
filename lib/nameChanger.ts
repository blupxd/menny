import {create} from 'zustand'

interface MenuName {
    menuName: string
    setName: (menuName: string) => void
}
export const useSetName = create<MenuName>()((set) => ({
    menuName: "",
    setName: (menuName: string) => set({ menuName })
}))