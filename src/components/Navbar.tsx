import { Zap, Moon, Sun, MapPin, Compass, Clock, CreditCard } from 'lucide-react'

interface NavbarProps {
  activeTab: 'map' | 'etas' | 'calculator' | 'pass'
  setActiveTab: (tab: 'map' | 'etas' | 'calculator' | 'pass') => void
  isDark: boolean
  toggleDark: () => void
  passBalance: number
  activeShuttlesCount: number
}

export function Navbar({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  passBalance,
  activeShuttlesCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#090d16]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  ERickshawLive
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {activeShuttlesCount} EV Shuttles Live
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                TIET Patiala Campus Electric Transit & Dynamic GPS Telemetry
              </p>
            </div>
          </div>

          {/* Tab Navigation Switcher */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'map'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setActiveTab('etas')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'etas'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Live Stop ETAs
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Walk vs Shuttle Tradeoff
            </button>
            <button
              onClick={() => setActiveTab('pass')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'pass'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SmartPass NFC
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* NFC Pass Balance */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Pass:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                ₹{passBalance.toFixed(2)}
              </span>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-200/60 dark:border-slate-800/60">
          {(['map', 'etas', 'calculator', 'pass'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab === 'map' && 'Map'}
              {tab === 'etas' && 'Stop ETAs'}
              {tab === 'calculator' && 'Walk vs Ride'}
              {tab === 'pass' && 'SmartPass'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
