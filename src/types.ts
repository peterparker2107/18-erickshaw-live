export interface CampusStop {
  id: string
  name: string
  shortCode: string
  x: number // svg coordinate
  y: number // svg coordinate
  waitingPassengers: number
  popularDestinations: string[]
}

export interface ShuttleVehicle {
  id: string
  name: string
  plateNumber: string
  driverName: string
  driverPhone: string
  driverRating: number
  batteryPercent: number
  speedKmH: number
  capacity: number
  occupiedSeats: number
  currentStopId: string
  nextStopId: string
  headingTo: string
  progressToNext: number // 0 to 100%
  status: 'en_route' | 'boarding' | 'charging'
  x: number // current interpolated svg coordinate
  y: number
}

export interface RouteTradeoff {
  originId: string
  destinationId: string
  walkingDistanceMeters: number
  walkingTimeMinutes: number
  caloriesBurned: number
  shuttleWaitMinutes: number
  shuttleRideMinutes: number
  shuttleCost: number
  recommendedMode: 'shuttle' | 'walking'
}

export interface ShuttlePass {
  cardNumber: string
  holderName: string
  rollNumber: string
  balance: number
  ridesThisMonth: number
  lastTapTime: string
  tier: 'Standard' | 'Semester Pass' | 'Hostel Scholar'
}

export interface ShuttleBooking {
  bookingId: string
  pickupStopName: string
  dropStopName: string
  shuttleName: string
  plateNumber: string
  driverName: string
  seatNumber: number
  fare: number
  pin: string
  bookedAt: string
  etaMinutes: number
}
