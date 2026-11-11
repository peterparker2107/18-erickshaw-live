import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { BentoStats } from './components/BentoStats'
import { CampusMapView } from './components/CampusMapView'
import { StopEtaBoard } from './components/StopEtaBoard'
import { WalkingVsShuttleCalculator } from './components/WalkingVsShuttleCalculator'
import { DigitalSmartPass } from './components/DigitalSmartPass'
import { CAMPUS_STOPS, INITIAL_SHUTTLES, USER_SHUTTLE_PASS } from './data/mockShuttles'
import { CampusStop, ShuttleVehicle, ShuttlePass } from './types'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState<'map' | 'etas' | 'calculator' | 'pass'>('map')
  const [stops] = useState<CampusStop[]>(CAMPUS_STOPS)
  const [shuttles, setShuttles] = useState<ShuttleVehicle[]>(INITIAL_SHUTTLES)
  const [pass, setPass] = useState<ShuttlePass>(USER_SHUTTLE_PASS)
  const [selectedStop, setSelectedStop] = useState<CampusStop | null>(null)
  const [selectedShuttle, setSelectedShuttle] = useState<ShuttleVehicle | null>(null)

  // Sync dark class on document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  // Live GPS simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setShuttles((prev) =>
        prev.map((s) => {
          // Subtle movement jitter towards destination
          const jitterX = (Math.random() - 0.48) * 3
          const jitterY = (Math.random() - 0.5) * 2
          const newSpeed = s.status === 'boarding' ? 0 : Math.round(14 + Math.random() * 8)
          return {
            ...s,
            x: Math.max(70, Math.min(800, s.x + jitterX)),
            y: Math.max(120, Math.min(500, s.y + jitterY)),
            speedKmH: newSpeed,
          }
        })
      )
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const handleTapRide = () => {
    setPass((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - 10),
      ridesThisMonth: prev.ridesThisMonth + 1,
    }))
  }

  const handleTopUp = (amount: number) => {
    setPass((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }))
  }

  const handleSelectStopFromEtaBoard = (stop: CampusStop) => {
    setSelectedStop(stop)
    setSelectedShuttle(null)
    setActiveTab('map')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        passBalance={pass.balance}
        activeShuttlesCount={shuttles.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BentoStats
          activeShuttlesCount={shuttles.length}
          avgWaitMinutes={2.4}
          passBalance={pass.balance}
          temperatureCelsius={33}
        />

        {activeTab === 'map' && (
          <CampusMapView
            stops={stops}
            shuttles={shuttles}
            selectedStop={selectedStop}
            selectedShuttle={selectedShuttle}
            onSelectStop={setSelectedStop}
            onSelectShuttle={setSelectedShuttle}
          />
        )}

        {activeTab === 'etas' && (
          <StopEtaBoard
            stops={stops}
            shuttles={shuttles}
            onSelectStopOnMap={handleSelectStopFromEtaBoard}
          />
        )}

        {activeTab === 'calculator' && (
          <WalkingVsShuttleCalculator
            stops={stops}
            shuttles={shuttles}
            passBalance={pass.balance}
            onBookRide={() => {
              setPass((prev) => ({
                ...prev,
                balance: Math.max(0, prev.balance - 10),
                ridesThisMonth: prev.ridesThisMonth + 1,
              }))
            }}
          />
        )}

        {activeTab === 'pass' && (
          <DigitalSmartPass
            pass={pass}
            onTapRide={handleTapRide}
            onTopUp={handleTopUp}
          />
        )}
      </main>
    </div>
  )
}
