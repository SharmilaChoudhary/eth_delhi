import { ZodiacSign } from '@/types'

export interface ZodiacInfo {
  sign: ZodiacSign
  symbol: string
  element: 'Fire' | 'Earth' | 'Air' | 'Water'
  quality: 'Cardinal' | 'Fixed' | 'Mutable'
  rulingPlanet: string
  color: string
  traits: string[]
  compatibility: ZodiacSign[]
  dateRange: string
}

export const zodiacData: Record<ZodiacSign, ZodiacInfo> = {
  'Aries': {
    sign: 'Aries',
    symbol: '♈',
    element: 'Fire',
    quality: 'Cardinal',
    rulingPlanet: 'Mars',
    color: 'Red',
    traits: ['Energetic', 'Courageous', 'Independent', 'Competitive', 'Impulsive'],
    compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    dateRange: 'March 21 - April 19'
  },
  'Taurus': {
    sign: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    quality: 'Fixed',
    rulingPlanet: 'Venus',
    color: 'Green',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Stubborn'],
    compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
    dateRange: 'April 20 - May 20'
  },
  'Gemini': {
    sign: 'Gemini',
    symbol: '♊',
    element: 'Air',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    color: 'Yellow',
    traits: ['Curious', 'Adaptable', 'Communicative', 'Witty', 'Indecisive'],
    compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
    dateRange: 'May 21 - June 20'
  },
  'Cancer': {
    sign: 'Cancer',
    symbol: '♋',
    element: 'Water',
    quality: 'Cardinal',
    rulingPlanet: 'Moon',
    color: 'Silver',
    traits: ['Emotional', 'Intuitive', 'Protective', 'Nurturing', 'Moody'],
    compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
    dateRange: 'June 21 - July 22'
  },
  'Leo': {
    sign: 'Leo',
    symbol: '♌',
    element: 'Fire',
    quality: 'Fixed',
    rulingPlanet: 'Sun',
    color: 'Gold',
    traits: ['Confident', 'Generous', 'Creative', 'Dramatic', 'Arrogant'],
    compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
    dateRange: 'July 23 - August 22'
  },
  'Virgo': {
    sign: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    quality: 'Mutable',
    rulingPlanet: 'Mercury',
    color: 'Navy Blue',
    traits: ['Analytical', 'Practical', 'Helpful', 'Perfectionist', 'Critical'],
    compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
    dateRange: 'August 23 - September 22'
  },
  'Libra': {
    sign: 'Libra',
    symbol: '♎',
    element: 'Air',
    quality: 'Cardinal',
    rulingPlanet: 'Venus',
    color: 'Pink',
    traits: ['Diplomatic', 'Charming', 'Balanced', 'Social', 'Indecisive'],
    compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
    dateRange: 'September 23 - October 22'
  },
  'Scorpio': {
    sign: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    quality: 'Fixed',
    rulingPlanet: 'Pluto',
    color: 'Deep Red',
    traits: ['Intense', 'Passionate', 'Mysterious', 'Loyal', 'Jealous'],
    compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
    dateRange: 'October 23 - November 21'
  },
  'Sagittarius': {
    sign: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    quality: 'Mutable',
    rulingPlanet: 'Jupiter',
    color: 'Purple',
    traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent', 'Impatient'],
    compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    dateRange: 'November 22 - December 21'
  },
  'Capricorn': {
    sign: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    quality: 'Cardinal',
    rulingPlanet: 'Saturn',
    color: 'Brown',
    traits: ['Ambitious', 'Disciplined', 'Practical', 'Responsible', 'Pessimistic'],
    compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    dateRange: 'December 22 - January 19'
  },
  'Aquarius': {
    sign: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    quality: 'Fixed',
    rulingPlanet: 'Uranus',
    color: 'Turquoise',
    traits: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric', 'Detached'],
    compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
    dateRange: 'January 20 - February 18'
  },
  'Pisces': {
    sign: 'Pisces',
    symbol: '♓',
    element: 'Water',
    quality: 'Mutable',
    rulingPlanet: 'Neptune',
    color: 'Sea Green',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Escapist'],
    compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
    dateRange: 'February 19 - March 20'
  }
}

/**
 * Calculate zodiac sign based on birth date
 */
export function calculateZodiacSign(birthDate: string): ZodiacSign {
  const date = new Date(birthDate)
  const month = date.getMonth() + 1 // getMonth() returns 0-11
  const day = date.getDate()

  // Zodiac date ranges
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces'

  // Default fallback (should never reach here)
  return 'Aries'
}

/**
 * Get zodiac information by sign
 */
export function getZodiacInfo(sign: ZodiacSign): ZodiacInfo {
  return zodiacData[sign]
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: string): number {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

/**
 * Validate birth date format and reasonableness
 */
export function validateBirthDate(birthDate: string): { valid: boolean; error?: string } {
  if (!birthDate) {
    return { valid: false, error: 'Birth date is required' }
  }

  const date = new Date(birthDate)
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' }
  }

  const today = new Date()
  const age = calculateAge(birthDate)

  if (age < 18) {
    return { valid: false, error: 'Must be at least 18 years old' }
  }

  if (age > 120) {
    return { valid: false, error: 'Invalid birth date' }
  }

  if (date > today) {
    return { valid: false, error: 'Birth date cannot be in the future' }
  }

  return { valid: true }
}

/**
 * Format birth date for display
 */
export function formatBirthDate(birthDate: string): string {
  const date = new Date(birthDate)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
