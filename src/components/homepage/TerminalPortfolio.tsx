import { SiteHeader } from "@/components/shared/SiteHeader";

export function TerminalPortfolio() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl border border-green-400/30">
            <span className="text-2xl font-bold text-white font-mono">5</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-mono">Terminal OS</h1>
            <p className="text-green-400 text-lg font-mono">Real terminal, fake operating system</p>
          </div>
          <div className="bg-black/60 backdrop-blur-lg border border-green-500/30 rounded-xl p-6 max-w-lg font-mono">
            <div className="text-green-400 text-left text-sm mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-white/70">terminal</span>
              </div>
              <div className="border-t border-green-500/30 pt-3">
                <div>kapil@portfolio:~$ ls</div>
                <div className="text-white/80 ml-4">about.txt  projects/  skills/  contact.txt</div>
                <div>kapil@portfolio:~$ cat about.txt</div>
                <div className="text-white/80 ml-4">Loading portfolio data...</div>
                <div className="text-green-400 animate-pulse">█</div>
              </div>
            </div>
            <div className="text-white/90 text-sm">
              <h3 className="font-semibold mb-3">Coming Soon Commands:</h3>
              <ul className="text-left space-y-1 text-xs">
                <li><span className="text-green-400">help</span> - Show available commands</li>
                <li><span className="text-green-400">ls</span> - List files and directories</li>
                <li><span className="text-green-400">cat</span> - Read portfolio content</li>
                <li><span className="text-green-400">whoami</span> - Display developer info</li>
                <li><span className="text-green-400">projects</span> - Browse project archive</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}