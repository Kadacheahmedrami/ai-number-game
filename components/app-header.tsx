import { Brain } from "lucide-react"

export function AppHeader() {
  return (
    <header className="w-full bg-blue-900/80 border-b border-blue-800 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">
            Number Game
          </h1>
        </div>
        <div className="text-sm text-blue-300">Minimax Algorithm Visualizer</div>
      </div>
    </header>
  )
}
