import { Zap, Clock, ThermometerSun, Leaf, Users, ShieldCheck } from 'lucide-react'

interface BentoStatsProps {
  activeShuttlesCount: number
  avgWaitMinutes: number
  passBalance: number
  temperatureCelsius: number
}

export function BentoStats({
  activeShuttlesCount,
  avgWaitMinutes,
  passBalance,
  temperatureCelsius,
}: BentoStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Tile 1: Active Fleet */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Active EV Fleet</span>
          <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {activeShuttlesCount} / 5
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            100% In Service
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Green Cruiser, Campus Dart & Volt Express
        </p>
      </div>

      {/* Tile 2: Avg Campus ETA */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Average Stop ETA</span>
          <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Clock className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {avgWaitMinutes.toFixed(1)} mins
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            High Frequency
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Continuous loop across Gate 1, Hostels & Library
        </p>
      </div>

      {/* Tile 3: Patiala Heat Index & Recommendation */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Campus Weather Advisory</span>
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ThermometerSun className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {temperatureCelsius}°C
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Shuttle Preferred
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          High afternoon index — avoid walking long stretches
        </p>
      </div>

      {/* Tile 4: SmartPass NFC Balance */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>NFC Pass Balance</span>
          <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            ₹{passBalance.toFixed(2)}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            14 Rides left
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          ₹10 flat campus transit fare via TIET SmartPass
        </p>
      </div>
    </div>
  )
}
