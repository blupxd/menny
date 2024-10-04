import {create} from 'zustand'

interface SelectedColumns {
    columns: number
    setCols: (columns: number) => void
}
export const useStoreCols = create<SelectedColumns>()((set) => ({
    columns: 2,
    setCols: (columns: number) => set({ columns })
}))