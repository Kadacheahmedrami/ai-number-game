import { GameVisualizer } from "@/components/game-visualizer"
import { GameExplainer } from "@/components/game-explainer"
import { GamePlayer } from "@/components/game-player"
import { ThemeProvider } from "@/components/theme-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppHeader } from "@/components/app-header"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="number-game-theme">
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <AppHeader />
        <div className="container mx-auto px-4 py-4">
          <Tabs defaultValue="play" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800/50">
              <TabsTrigger value="play" className="text-base">
                Play Game
              </TabsTrigger>
              <TabsTrigger value="visualize" className="text-base">
                Visualize Algorithm
              </TabsTrigger>
              <TabsTrigger value="learn" className="text-base">
                Learn Rules
              </TabsTrigger>
            </TabsList>
            <TabsContent value="play" className="mt-0">
              <GamePlayer />
            </TabsContent>
            <TabsContent value="visualize" className="mt-0">
              <GameVisualizer />
            </TabsContent>
            <TabsContent value="learn" className="mt-0">
              <GameExplainer expanded={true} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </ThemeProvider>
  )
}
