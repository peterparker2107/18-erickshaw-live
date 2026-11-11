import { useState } from 'react'
import {
  Zap,
  MapPin,
  Clock,
  Battery,
  Users,
  Compass,
  Phone,
  Star,
  CheckCircle,
  X,
  Gauge,
  Navigation,
} from 'lucide-react'
import { CampusStop, ShuttleVehicle } from '../types'

interface CampusMapViewProps {
  stops: CampusStop[]
  shuttles: ShuttleVehicle[]
  selectedStop: CampusStop | null
  selectedShuttle: ShuttleVehicle | null
  onSelectStop: (stop: CampusStop | null) => void
  onSelectShuttle: (shuttle: ShuttleVehicle | null) => void
}

export function CampusMapView({
  stops,
  shuttles,
  selectedStop,
  selectedShuttle,
  onSelectStop,
  onSelectShuttle,
}: CampusMapViewProps) {
  return (
    <div className="space-y-6">
      {/* Map Canvas and Inspect Panel */}
      <div className="relative rounded-3xl bg-slate-100 dark:bg-[#0c1222] border border-slate-200/80 dark:border-slate-800/80 shadow-inner overflow-hidden p-4 sm:p-6">
        {/* Top Floating Controls */}
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs font-mono shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              TIET Satellite GPS Grid
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">LIVE TELEMETRY</span>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-6 right-6 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-slate-600 dark:text-slate-300">Active Shuttle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-slate-600 dark:text-slate-300">Campus Stop</span>
          </div>
        </div>

        {/* Interactive SVG Campus Map */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 880 560"
            className="w-full min-w-[700px] h-auto select-none transition-all"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' }}
          >
            {/* Background Grid Pattern */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-300/40 dark:text-slate-800/60"
                />
              </pattern>
            </defs>
            <rect width="880" height="560" fill="url(#grid)" />

            {/* Campus Greenery Zones (Decorations) */}
            <rect x="360" y="320" width="120" height="100" rx="16" fill="rgba(16, 185, 129, 0.08)" />
            <text x="420" y="375" textAnchor="middle" className="text-[11px] fill-emerald-600/60 dark:fill-emerald-400/50 font-sans font-semibold">
              TIET Main Lawns
            </text>

            <rect x="640" y="240" width="100" height="80" rx="12" fill="rgba(99, 102, 241, 0.06)" />
            <text x="690" y="285" textAnchor="middle" className="text-[10px] fill-indigo-500/50 font-sans font-medium">
              Jaggi Canteen Hub
            </text>

            {/* Road Network Lines */}
            <path
              d="M 80 420 L 230 340 L 400 250 L 580 190 L 740 140"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-300 dark:text-slate-700/80"
            />
            <path
              d="M 230 340 L 320 480 L 540 380 L 760 350"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-300 dark:text-slate-700/80"
            />
            <path
              d="M 400 250 L 540 380"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray="6 4"
              className="text-slate-300 dark:text-slate-700"
            />
            <path
              d="M 580 190 L 760 350"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeDasharray="6 4"
              className="text-slate-300 dark:text-slate-700"
            />

            {/* Stops */}
            {stops.map((stop) => {
              const isSelected = selectedStop?.id === stop.id
              return (
                <g
                  key={stop.id}
                  onClick={() => {
                    onSelectStop(stop)
                    onSelectShuttle(null)
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse when selected */}
                  {isSelected && (
                    <circle
                      cx={stop.x}
                      cy={stop.y}
                      r="22"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      className="animate-ping"
                    />
                  )}
                  {/* Base stop circle */}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={isSelected ? '14' : '11'}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? 'fill-indigo-600 dark:fill-indigo-500'
                        : 'fill-white dark:fill-slate-800 stroke-indigo-600 dark:stroke-indigo-400 stroke-2 group-hover:fill-indigo-50 dark:group-hover:fill-indigo-950'
                    }`}
                  />
                  {/* Inner dot */}
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="4"
                    className={isSelected ? 'fill-white' : 'fill-indigo-600 dark:fill-indigo-400'}
                  />

                  {/* Stop Label */}
                  <text
                    x={stop.x}
                    y={stop.y + 24}
                    textAnchor="middle"
                    className="text-[11px] font-bold font-sans fill-slate-800 dark:fill-slate-200 pointer-events-none"
                  >
                    {stop.name.split(' (')[0]}
                  </text>
                  <text
                    x={stop.x}
                    y={stop.y + 36}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400 pointer-events-none"
                  >
                    {stop.waitingPassengers} waiting
                  </text>
                </g>
              )
            })}

            {/* Shuttles on Route */}
            {shuttles.map((shuttle) => {
              const isSelected = selectedShuttle?.id === shuttle.id
              return (
                <g
                  key={shuttle.id}
                  onClick={() => {
                    onSelectShuttle(shuttle)
                    onSelectStop(null)
                  }}
                  className="cursor-pointer group"
                >
                  {/* Vehicle Marker */}
                  <circle
                    cx={shuttle.x}
                    cy={shuttle.y}
                    r={isSelected ? '18' : '14'}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? 'fill-emerald-600 stroke-white stroke-2'
                        : 'fill-emerald-500 dark:fill-emerald-400 stroke-white dark:stroke-slate-900 stroke-2 group-hover:scale-110'
                    }`}
                  />

                  {/* E-Rickshaw Icon Simulation */}
                  <path
                    d={`M ${shuttle.x - 5} ${shuttle.y + 3} L ${shuttle.x - 5} ${shuttle.y - 2} L ${shuttle.x} ${shuttle.y - 5} L ${shuttle.x + 5} ${shuttle.y - 2} L ${shuttle.x + 5} ${shuttle.y + 3} Z`}
                    fill="white"
                  />

                  {/* Vehicle Name Pill */}
                  <rect
                    x={shuttle.x - 36}
                    y={shuttle.y - 28}
                    width="72"
                    height="16"
                    rx="8"
                    className="fill-slate-900/90 dark:fill-white/90"
                  />
                  <text
                    x={shuttle.x}
                    y={shuttle.y - 17}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-white dark:fill-slate-900 pointer-events-none"
                  >
                    {shuttle.name.split(' ')[0]} ({shuttle.occupiedSeats}/{shuttle.capacity})
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Selected Stop Drawer */}
        {selectedStop && (
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg animate-in slide-in-from-bottom duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedStop.name}
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                  {selectedStop.shortCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedStop.waitingPassengers} students currently waiting for next e-rickshaw
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Next Shuttle Arriving
                </span>
                <span className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">
                  ~2 mins (Green Cruiser)
                </span>
              </div>
              <button
                onClick={() => onSelectStop(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Selected Shuttle Drawer */}
        {selectedShuttle && (
          <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg animate-in slide-in-from-bottom duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-4 h-4" />
                </span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {selectedShuttle.name}
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  {selectedShuttle.plateNumber}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Driver: {selectedShuttle.driverName}</span>
                <span>•</span>
                <span>⭐ {selectedShuttle.driverRating}</span>
                <span>•</span>
                <span>Heading to: {selectedShuttle.headingTo}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-xs">
                <span className="text-slate-400 block text-[10px] uppercase">Telemetry</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedShuttle.speedKmH} km/h • {selectedShuttle.batteryPercent}% Battery • {selectedShuttle.capacity - selectedShuttle.occupiedSeats} seats left
                </span>
              </div>
              <button
                onClick={() => onSelectShuttle(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
