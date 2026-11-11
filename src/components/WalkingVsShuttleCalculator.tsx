import { useState, useMemo } from 'react'
import {
  Compass,
  Footprints,
  Zap,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  ThermometerSun,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
} from 'lucide-react'
import { CampusStop, ShuttleVehicle, ShuttleBooking } from '../types'
import { ShuttleBookingModal } from './ShuttleBookingModal'

interface WalkingVsShuttleCalculatorProps {
  stops: CampusStop[]
  shuttles?: ShuttleVehicle[]
  passBalance?: number
  onBookRide?: (booking: ShuttleBooking) => void
}

export function WalkingVsShuttleCalculator({
  stops,
  shuttles = [],
  passBalance = 140,
  onBookRide,
}: WalkingVsShuttleCalculatorProps) {
  const [originId, setOriginId] = useState(stops[0]?.id || '')
  const [destinationId, setDestinationId] = useState(stops[2]?.id || '')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const originStop = stops.find((s) => s.id === originId) || stops[0]
  const destinationStop = stops.find((s) => s.id === destinationId) || stops[1]

  // Calculate distance based on SVG delta approximation (1 SVG unit approx 2.5 meters)
  const calculation = useMemo(() => {
    if (originStop.id === destinationStop.id) {
      return {
        distanceMeters: 0,
        walkingMinutes: 0,
        calories: 0,
        shuttleWaitMinutes: 0,
        shuttleRideMinutes: 0,
        totalShuttleMinutes: 0,
        timeSavedMinutes: 0,
        recommendation: 'same_stop' as const,
      }
    }

    const dx = originStop.x - destinationStop.x
    const dy = originStop.y - destinationStop.y
    const euclidean = Math.sqrt(dx * dx + dy * dy)

    // Campus pathways factor (1.3x Euclidean)
    const distanceMeters = Math.round(euclidean * 2.8)

    // Walking speed: 4.8 km/h = 80 m/min
    const walkingMinutes = Math.max(2, Math.round(distanceMeters / 80))

    // Calories: approx 0.055 kcal / meter for student brisk walk
    const calories = Math.round(distanceMeters * 0.055)

    // Shuttle wait: approx 1.5 to 2.5 mins
    const shuttleWaitMinutes = 2
    // Shuttle ride: avg speed 16 km/h = 266 m/min
    const shuttleRideMinutes = Math.max(1, Math.round(distanceMeters / 266))
    const totalShuttleMinutes = shuttleWaitMinutes + shuttleRideMinutes

    const timeSavedMinutes = Math.max(0, walkingMinutes - totalShuttleMinutes)

    const recommendation =
      distanceMeters > 500 || timeSavedMinutes >= 5 ? ('shuttle' as const) : ('walk' as const)

    return {
      distanceMeters,
      walkingMinutes,
      calories,
      shuttleWaitMinutes,
      shuttleRideMinutes,
      totalShuttleMinutes,
      timeSavedMinutes,
      recommendation,
    }
  }, [originStop, destinationStop])

  return (
    <div className="space-y-6">
      {/* Selector Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-500" />
          Campus Transit vs Walking Tradeoff Simulator
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Compare physical walking exertion against electric shuttle wait times and travel speed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Pickup Origin
            </label>
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            >
              {stops.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Destination Stop
            </label>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
            >
              {stops.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Walking Card */}
        <div
          className={`p-6 rounded-3xl border shadow-sm transition-all flex flex-col justify-between ${
            calculation.recommendation === 'walk'
              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/50 ring-1 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Footprints className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">Walking Route</h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Via campus pathways & lawns
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                ₹0.00
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Total Distance:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {calculation.distanceMeters} meters (~{(calculation.distanceMeters / 1000).toFixed(2)} km)
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Estimated Walk Time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {calculation.walkingMinutes} mins
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Calorie Burn:
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  ~{calculation.calories} kcal
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500 flex items-center gap-1">
                  <ThermometerSun className="w-3.5 h-3.5 text-rose-500" /> Heat Exertion Index:
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {calculation.distanceMeters > 500 ? 'Moderate (High Sweat)' : 'Low (Pleasant)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
            Great for staying active between nearby blocks.
          </div>
        </div>

        {/* E-Rickshaw Shuttle Card */}
        <div
          className={`p-6 rounded-3xl border shadow-sm transition-all flex flex-col justify-between ${
            calculation.recommendation === 'shuttle'
              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-500/50 ring-1 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">Electric Shuttle</h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    High-speed zero-emission transit
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-500/20">
                ₹10.00 Pass
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Wait at Stop:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ~{calculation.shuttleWaitMinutes} mins
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Transit Ride Time:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ~{calculation.shuttleRideMinutes} mins
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Total Travel Time:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ~{calculation.totalShuttleMinutes} mins
                </span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <span className="text-slate-500">Time Saved vs Walk:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  +{calculation.timeSavedMinutes} minutes saved
                </span>
              </div>
            </div>

            {/* Fare Breakdown & Booking CTA */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-mono space-y-1.5">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Campus Fare Estimate:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">₹10.00 Flat</span>
              </div>
              <div className="flex justify-between text-[11px] text-emerald-600 dark:text-emerald-400">
                <span>NFC Student Subsidy:</span>
                <span>Active</span>
              </div>
            </div>

            <button
              onClick={() => setShowBookingModal(true)}
              disabled={originStop.id === destinationStop.id}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <Zap className="w-4 h-4" />
              <span>Book Campus E-Shuttle Seat (₹10)</span>
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
            Shaded ride with USB phone charging onboard.
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-semibold px-2 py-1 rounded bg-emerald-200 dark:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Shuttle Booking Confirmation Modal */}
      {showBookingModal && (
        <ShuttleBookingModal
          originStop={originStop}
          destinationStop={destinationStop}
          approachingShuttle={shuttles[0] || {
            id: 'sh-default',
            name: 'Green Cruiser (SH-01)',
            plateNumber: 'PB-11-ER-4091',
            driverName: 'Satnam Singh',
            driverPhone: '+91 98142-XXXXX',
            driverRating: 4.9,
            batteryPercent: 88,
            speedKmH: 18,
            capacity: 6,
            occupiedSeats: 2,
            currentStopId: 'stop-1',
            nextStopId: 'stop-2',
            headingTo: 'Jaggi Canteen Hub',
            progressToNext: 60,
            status: 'en_route',
            x: 230,
            y: 340,
          }}
          distanceMeters={calculation.distanceMeters}
          travelMinutes={calculation.totalShuttleMinutes}
          passBalance={passBalance}
          onClose={() => setShowBookingModal(false)}
          onConfirmBooking={(booking) => {
            onBookRide?.(booking)
            setToastMessage(`Ride confirmed! Boarding PIN: ${booking.pin} • Seat #${booking.seatNumber}`)
            setTimeout(() => setToastMessage(null), 6000)
          }}
        />
      )}

      {/* AI Recommendation Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[11px] block">
              Recommendation Engine
            </span>
            <span className="font-medium">
              {calculation.recommendation === 'shuttle'
                ? `Take the E-Rickshaw — Save ${calculation.timeSavedMinutes} mins and avoid walking ${calculation.distanceMeters}m in 33°C Patiala heat!`
                : `Enjoy the walk! It is only ${calculation.distanceMeters}m (~${calculation.walkingMinutes} mins) and burns ${calculation.calories} calories.`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
