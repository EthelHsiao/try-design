import { createContext, useContext, useState } from "react"

type View = { key: string; title?: string; render: () => React.ReactNode }

const SidebarViewContext = createContext<{
    stack: View[]
    push: (view: View) => void
    pop: () => void
}>({ stack: [], push: () => {}, pop: () => {} })

export function SidebarViewProvider({ children }: { children: React.ReactNode }) {
    const [stack, setStack] = useState<View[]>([])

    const push = (view: View) => setStack((prev) => [...prev, view])
    const pop = () => setStack((prev) => prev.slice(0, -1))

    return (
        <SidebarViewContext.Provider value={{ stack, push, pop }}>
            {children}
        </SidebarViewContext.Provider>
    )
}

export function useSidebarView() {
    return useContext(SidebarViewContext)
}
