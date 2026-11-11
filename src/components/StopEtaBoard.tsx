import { useState, useEffect } from 'react'
import {
  Clock,
  MapPin,
  Zap,
  Users,
  Bell,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { CampusStop, ShuttleVehicle } from '../types'

interface StopEtaBoardProps {
  stops: CampusStop[]
  shuttles: ShuttleVehicle[]
  onSelectStopOnMap: (stop: CampusStop) => void
}

export function StopEtaBoard({ stops, shuttles, onSelectStopOnMap }: StopEtaBoardProps) {
  // Live simulated timer decrement
  const [secondsTick, setSecondsTick] = useState(140)
  const [subscribedStops, setSubscribedStops] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTick((prev) => (prev > 10 ? prev - 1 : 180))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleAlert = (stopId: string) => {
    setSubscribedStops((prev) => ({
      ...prev,
      [stopId]: !prev[stopId],
    }))
  }

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}m ${s < 10 ? '0' : ''}${s}s`
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            Live Stop Arrival Board & Seat Inventory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time countdown powered by GPS fleet transponders. Average wait under 3 minutes across campus.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Next cycle refresh: {formatTime(secondsTick % 45)}</span>
        </div>
      </div>

      {/* Grid of Stops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stops.map((stop, index) => {
          // Assign simulated approaching shuttle
          const assignedShuttle = shuttles[index % shuttles.length]
          const etaSecs = ((secondsTick + index * 42) % 240) + 35
          const availableSeats = Math.max(0, assignedShuttle.capacity - assignedShuttle.occupiedSeats)
          const isSubscribed = !!subscribedStops[stop.id]

          return (
            <div
              key={stop.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-slate-900 dark:text-white text-sm border border-slate-200 dark:border-slate-700">
                      {stop.shortCode}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                        {stop.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                        {stop.waitingPassengers} waiting at stop
                      </div>
                    </div>
                  </div>

                  {/* Arrival Countdown Badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Approaching
                    </span>
                    <span className="font-mono font-extrabold text-lg text-emerald-600 dark:text-emerald-400">
                      {formatTime(etaSecs)}
                    </span>
                  </div>
                </div>

                {/* Shuttle Info Card */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-500" />
                      {assignedShuttle.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {assignedShuttle.plateNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span
                        className={`font-semibold ${
                          availableSeats > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
                        }`}
                      >
                        {availableSeats > 0 ? `${availableSeats} Seats Available` : 'Full Shuttle'}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Battery: {assignedShuttle.batteryPercent}%
                    </span>
                  </div>
                </div>

                {/* Popular routes from this stop */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs mb-3">
                  <span className="text-slate-400 text-[11px]">Frequent drops:</span>
                  {stop.popularDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400"
                    >
                      {dest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => toggleAlert(stop.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isSubscribed
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{isSubscribed ? 'Alert Set (1m away)' : 'Set 1m Alert'}</span>
                </button>

                <button
                  onClick={() => onSelectStopOnMap(stop)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Locate on Map</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
