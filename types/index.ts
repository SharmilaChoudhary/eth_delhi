// User and Profile Types
export interface User {
  id: string
  name: string
  age: number
  email: string
  zodiacSign: ZodiacSign
  birthDate: Date
  birthTime?: string
  birthLocation?: string
  bio: string
  photos: string[]
  interests: string[]
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  displayName: string
  age: number
  zodiacSign: ZodiacSign
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  risingSign: ZodiacSign
  bio: string
  photos: Photo[]
  interests: Interest[]
  preferences: UserPreferences
  isActive: boolean
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}

// Astrology Types
export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces'

export interface ZodiacInfo {
  sign: ZodiacSign
  symbol: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  quality: 'Cardinal' | 'Fixed' | 'Mutable'
  rulingPlanet: string
  color: string
  traits: string[]
  compatibility: ZodiacSign[]
}

export interface BirthChart {
  userId: string
  sunSign: ZodiacSign
  moonSign: ZodiacSign
  risingSign: ZodiacSign
  mercurySign: ZodiacSign
  venusSign: ZodiacSign
  marsSign: ZodiacSign
  jupiterSign: ZodiacSign
  saturnSign: ZodiacSign
  uranusSign: ZodiacSign
  neptuneSign: ZodiacSign
  plutoSign: ZodiacSign
  houses: House[]
  aspects: Aspect[]
}

export interface House {
  number: number
  sign: ZodiacSign
  cusp: number
  planets: string[]
}

export interface Aspect {
  planet1: string
  planet2: string
  type: 'Conjunction' | 'Opposition' | 'Trine' | 'Square' | 'Sextile'
  orb: number
  strength: number
}

// Compatibility Types
export interface CompatibilityScore {
  overall: number
  sunSign: number
  moonSign: number
  risingSign: number
  venusSign: number
  marsSign: number
  communication: number
  emotional: number
  physical: number
  spiritual: number
  challenges: string[]
  strengths: string[]
  advice: string[]
}

export interface Match {
  id: string
  user1Id: string
  user2Id: string
  compatibilityScore: CompatibilityScore
  matchType: 'cosmic' | 'friendship' | 'romance'
  status: 'pending' | 'matched' | 'unmatched' | 'blocked'
  createdAt: Date
  updatedAt: Date
}

// Media Types
export interface Photo {
  id: string
  url: string
  isPrimary: boolean
  order: number
  uploadedAt: Date
}

export interface Interest {
  id: string
  name: string
  category: 'hobby' | 'lifestyle' | 'spiritual' | 'activity'
  icon?: string
}

// User Preferences
export interface UserPreferences {
  ageRange: {
    min: number
    max: number
  }
  maxDistance: number
  zodiacSigns: ZodiacSign[]
  interests: string[]
  relationshipType: 'casual' | 'serious' | 'friendship' | 'all'
  showMe: 'everyone' | 'verified' | 'premium'
}

// Chat and Messaging
export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'gif' | 'sticker'
  timestamp: Date
  isRead: boolean
  isDeleted: boolean
}

export interface Chat {
  id: string
  participants: string[]
  lastMessage?: Message
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Events
export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  type: 'cosmic' | 'social' | 'spiritual' | 'dating'
  maxAttendees: number
  attendees: string[]
  organizerId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface SignUpForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  birthDate: string
  birthTime?: string
  birthLocation?: string
  zodiacSign: ZodiacSign
  interests: string[]
  bio: string
}

export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface ProfileUpdateForm {
  displayName: string
  bio: string
  interests: string[]
  photos: File[]
  preferences: UserPreferences
}

// Component Props Types
export interface Testimonial {
  quote: string
  authors: string
  status: string
  zodiac: string
}

export interface FeatureCard {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  image: string
  cta: string
}
