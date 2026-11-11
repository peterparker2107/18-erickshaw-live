import { useState } from 'react'
import {
  CreditCard,
  Wifi,
  QrCode,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react'
import { ShuttlePass } from '../types'

interface DigitalSmartPassProps {
  pass: ShuttlePass
  onTapRide: () => void
  onTopUp: (amount: number) => void
}

export function DigitalSmartPass({ pass, onTapRide, onTopUp }: DigitalSmartPassProps) {
  const [topUpAmount, setTopUpAmount] = useState(100)
  const [tapSuccessToast, setTapSuccessToast] = useState<string | null>(null)
  const [recentTrips, setRecentTrips] = useState([
    { id: 'TRP-901', from: 'Gate 1', to: 'Central Library', fare: 10, time: 'Today, 2:15 PM' },
    { id: 'TRP-899', from: 'Hostel M', to: 'CSED Complex', fare: 10, time: 'Today, 10:45 AM' },
    { id: 'TRP-874', from: 'Central Library', to: 'Hostel J', fare: 10, time: 'Yesterday, 8:30 PM' },
  ])

  const handleSimulateTap = () => {
    if (pass.balance < 10) {
      alert('Insufficient balance. Please top up your SmartPass!')
      return
    }

    onTapRide()
    const newTrip = {
      id: `TRP-${Math.floor(900 + Math.random() * 100)}`,
      from: 'Current Station (GPS Auto-Detect)',
      to: 'TIET Campus Loop',
      fare: 10,
      time: 'Just now',
    }
    setRecentTrips([newTrip, ...recentTrips])
    setTapSuccessToast('NFC Beep! ₹10.00 debited. Boarding permitted on Green Cruiser (SH-01).')
    setTimeout(() => setTapSuccessToast(null), 4000)
  }

  const handleRecharge = () => {
    onTopUp(topUpAmount)
    setTapSuccessToast(`Recharged ₹${topUpAmount} successfully via UPI!`)
    setTimeout(() => setTapSuccessToast(null), 4000)
  }

  return (
    <div className="space-y-6">
      {tapSuccessToast && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{tapSuccessToast}</p>
          </div>
          <button
            onClick={() => setTapSuccessToast(null)}
            className="text-xs font-semibold px-2 py-1 rounded bg-emerald-200 dark:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Virtual Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-300 fill-emerald-300" />
                <span className="font-mono text-xs tracking-wider uppercase font-semibold text-emerald-100">
                  TIET SmartPass NFC
                </span>
              </div>
              <Wifi className="w-5 h-5 text-emerald-200 rotate-90" />
            </div>

            {/* Chip */}
            <div className="w-11 h-8 rounded-md bg-amber-200/80 border border-amber-300/60 shadow-inner mb-6 relative">
              <div className="w-full h-[1px] bg-amber-400 absolute top-4"></div>
              <div className="h-full w-[1px] bg-amber-400 absolute left-5"></div>
            </div>

            {/* Balance */}
            <div className="mb-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-200 block">
                Current Transit Credits
              </span>
              <span className="font-mono font-extrabold text-3xl tracking-tight">
                ₹{pass.balance.toFixed(2)}
              </span>
            </div>

            {/* Holder details */}
            <div className="flex items-end justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase text-emerald-200 block">Student Name</span>
                <span className="font-bold tracking-wide">{pass.holderName}</span>
                <span className="text-[11px] text-emerald-100 block opacity-80">{pass.rollNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-emerald-200 block">Pass Tier</span>
                <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-semibold">
                  {pass.tier}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tap Simulator Button */}
          <button
            onClick={handleSimulateTap}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Wifi className="w-4 h-4 rotate-90" />
            <span>Simulate NFC Tap on Boarding Console (₹10)</span>
          </button>
        </div>

        {/* Top-up and Ledger (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top-up card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              Instant UPI Pass Recharge
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    topUpAmount === amt
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  +₹{amt}
                </button>
              ))}
            </div>

            <button
              onClick={handleRecharge}
              className="w-full py-2.5 rounded-xl border border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              <span>Recharge ₹{topUpAmount} via GPay / PhonePe / Paytm</span>
            </button>
          </div>

          {/* Ride History */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Recent Campus Shuttle Rides
            </h4>
            <div className="space-y-2">
              {recentTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 dark:text-slate-200">
                      {trip.from} ➔ {trip.to}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">{trip.time}</div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-rose-500">-₹{trip.fare.toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 block">{trip.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
