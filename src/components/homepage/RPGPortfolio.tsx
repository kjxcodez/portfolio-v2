import { SiteHeader } from "@/components/shared/SiteHeader";

export function RPGPortfolio() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-2xl font-bold text-white">4</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">RPG World Adventure</h1>
            <p className="text-white/70 text-lg">Top-down pixel game with interactive portfolio NPCs</p>
          </div>
          <div className="bg-emerald-900/30 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6 max-w-md">
            <h3 className="font-semibold text-white mb-3">Coming Soon Features:</h3>
            <ul className="text-white/80 text-sm space-y-2 text-left">
              <li>• Character movement (WASD/Arrow keys)</li>
              <li>• 4 explorable world zones</li>
              <li>• Interactive NPCs with portfolio data</li>
              <li>• Project treasure chests</li>
              <li>• Skills forest with XP system</li>
            </ul>
          </div>
          <div className="text-white/60 text-sm">
            🎮 Walk around • 💬 Talk to NPCs • 📦 Open chests
          </div>
        </div>
      </main>
    </>
  );
}