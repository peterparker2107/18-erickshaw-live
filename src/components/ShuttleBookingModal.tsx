import { useState } from 'react'
import {
  X,
  Zap,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowRight,
  User,
} from 'lucide-react'
import { CampusStop, ShuttleVehicle, ShuttleBooking } from '../types'

interface ShuttleBookingModalProps {
  originStop: CampusStop
  destinationStop: CampusStop
  approachingShuttle: ShuttleVehicle
  distanceMeters: number
  travelMinutes: number
  passBalance: number
  onClose: () => void
  onConfirmBooking: (booking: ShuttleBooking) => void
}

export function ShuttleBookingModal({
  originStop,
  destinationStop,
  approachingShuttle,
  distanceMeters,
  travelMinutes,
  passBalance,
  onClose,
  onConfirmBooking,
}: ShuttleBookingModalProps) {
  const [confirmedBooking, setConfirmedBooking] = useState<ShuttleBooking | null>(null)
  const [isBooking, setIsBooking] = useState(false)

  const fare = 10.0

  const handleBook = () => {
    setIsBooking(true)
    const bookingId = `RIDE-${Math.floor(1000 + Math.random() * 9000)}`
    const pin = `${Math.floor(10 + Math.random() * 90)}-${Math.floor(10 + Math.random() * 90)}`
    const seatNumber = Math.floor(1 + Math.random() * 4)

    setTimeout(() => {
      const booking: ShuttleBooking = {
        bookingId,
        pickupStopName: originStop.name,
        dropStopName: destinationStop.name,
        shuttleName: approachingShuttle.name,
        plateNumber: approachingShuttle.plateNumber,
        driverName: approachingShuttle.driverName,
        seatNumber,
        fare,
        pin,
        bookedAt: 'Just now',
        etaMinutes: 2,
      }
      setConfirmedBooking(booking)
      setIsBooking(false)
      onConfirmBooking(booking)
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-mono uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 text-emerald-300" />
            {confirmedBooking ? 'Confirmed Shuttle Pass' : 'Campus E-Shuttle Booking'}
          </div>
          <h3 className="text-xl font-bold">
            {confirmedBooking ? 'Booking Confirmed! Ready to Board' : 'Confirm Your Shuttle Seat'}
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1">
            {confirmedBooking
              ? `Boarding PIN: ${confirmedBooking.pin} • Seat #${confirmedBooking.seatNumber}`
              : `${originStop.name} ➔ ${destinationStop.name}`}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {!confirmedBooking ? (
            <>
              {/* Trip Route Details */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="w-0.5 h-7 bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Pickup Location
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {originStop.name} ({originStop.shortCode})
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Drop Destination
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {destinationStop.name} ({destinationStop.shortCode})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span>Distance: {distanceMeters}m</span>
                  <span>Transit Time: ~{travelMinutes} mins</span>
                </div>
              </div>

              {/* Shuttle Vehicle & Driver */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {approachingShuttle.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      Driver: {approachingShuttle.driverName} • ⭐ {approachingShuttle.driverRating}
                    </span>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold block">
                    ~2 mins away
                  </span>
                  <span className="text-slate-400 text-[10px]">{approachingShuttle.plateNumber}</span>
                </div>
              </div>

              {/* Real-time Fare Estimate Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-xs">
                <span className="font-semibold text-emerald-900 dark:text-emerald-300 block">
                  Fare Estimate & Payment Summary
                </span>
                <div className="flex justify-between font-mono text-slate-600 dark:text-slate-400">
                  <span>Standard Campus Route Flat Fare:</span>
                  <span>₹10.00</span>
                </div>
                <div className="flex justify-between font-mono text-emerald-600 dark:text-emerald-400 text-[11px]">
                  <span>TIET Student NFC Pass Discount:</span>
                  <span>Applied</span>
                </div>
                <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/60 flex items-baseline justify-between font-bold">
                  <span className="text-slate-900 dark:text-white">Total Amount Due</span>
                  <span className="font-mono text-base text-emerald-600 dark:text-emerald-400">
                    ₹{fare.toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Wallet Balance: ₹{passBalance.toFixed(2)} (Debited automatically upon boarding)
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isBooking || passBalance < fare}
                  onClick={handleBook}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isBooking ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Reserving Seat...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>Confirm & Book Ride</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Booking Confirmation Boarding Pass */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-base text-emerald-950 dark:text-emerald-200">
                  Seat Confirmed: Seat #{confirmedBooking.seatNumber}
                </h4>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                  Present Boarding PIN to Driver {confirmedBooking.driverName} on {confirmedBooking.shuttleName}
                </p>
                <div className="py-2 px-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 inline-block">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Boarding PIN</span>
                  <span className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest">
                    {confirmedBooking.pin}
                  </span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="p-3 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-1 h-9 w-full max-w-xs mb-1">
                  {[3, 1, 5, 2, 4, 1, 7, 2, 3, 4, 1, 6, 2, 3, 5, 1, 4, 2].map((w, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 dark:bg-slate-200 h-full rounded-[1px]"
                      style={{ width: `${w * 2.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] tracking-widest text-slate-400">
                  *{confirmedBooking.bookingId}*
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-colors"
              >
                Done & Track on Live GPS Map
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
