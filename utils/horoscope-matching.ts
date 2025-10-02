import { ZodiacSign, CompatibilityScore } from '@/types'
import { zodiacData } from './zodiac'

export interface DetailedCompatibilityScore extends CompatibilityScore {
  elementCompatibility: number
  qualityCompatibility: number
  planetaryCompatibility: number
  detailedAnalysis: {
    love: string
    friendship: string
    marriage: string
    business: string
  }
  recommendations: string[]
}

export interface KundliMatchingScore {
  guna: number // Out of 36 points
  compatibility: 'Excellent' | 'Very Good' | 'Good' | 'Average' | 'Poor'
  mangalDosha: boolean
  recommendations: string[]
  detailedScores: {
    varna: number // 1 point
    vashya: number // 2 points
    tara: number // 3 points
    yoni: number // 4 points
    graha: number // 5 points
    gana: number // 6 points
    rashi: number // 7 points
    nadi: number // 8 points
  }
}

// Element compatibility matrix
const elementCompatibility: Record<string, Record<string, number>> = {
  'Fire': { 'Fire': 85, 'Earth': 60, 'Air': 90, 'Water': 45 },
  'Earth': { 'Fire': 60, 'Earth': 85, 'Air': 50, 'Water': 90 },
  'Air': { 'Fire': 90, 'Earth': 50, 'Air': 85, 'Water': 65 },
  'Water': { 'Fire': 45, 'Earth': 90, 'Air': 65, 'Water': 85 }
}

// Quality compatibility matrix
const qualityCompatibility: Record<string, Record<string, number>> = {
  'Cardinal': { 'Cardinal': 70, 'Fixed': 85, 'Mutable': 80 },
  'Fixed': { 'Cardinal': 85, 'Fixed': 75, 'Mutable': 70 },
  'Mutable': { 'Cardinal': 80, 'Fixed': 70, 'Mutable': 85 }
}

// Base compatibility matrix (same as in API route but more detailed)
const baseCompatibility: Record<ZodiacSign, Record<ZodiacSign, number>> = {
  'Aries': { 'Aries': 85, 'Taurus': 60, 'Gemini': 75, 'Cancer': 50, 'Leo': 90, 'Virgo': 45, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 95, 'Capricorn': 40, 'Aquarius': 75, 'Pisces': 55 },
  'Taurus': { 'Aries': 60, 'Taurus': 80, 'Gemini': 50, 'Cancer': 85, 'Leo': 70, 'Virgo': 90, 'Libra': 75, 'Scorpio': 65, 'Sagittarius': 40, 'Capricorn': 95, 'Aquarius': 45, 'Pisces': 80 },
  'Gemini': { 'Aries': 75, 'Taurus': 50, 'Gemini': 85, 'Cancer': 60, 'Leo': 80, 'Virgo': 70, 'Libra': 90, 'Scorpio': 55, 'Sagittarius': 75, 'Capricorn': 50, 'Aquarius': 95, 'Pisces': 70 },
  'Cancer': { 'Aries': 50, 'Taurus': 85, 'Gemini': 60, 'Cancer': 80, 'Leo': 65, 'Virgo': 75, 'Libra': 70, 'Scorpio': 90, 'Sagittarius': 45, 'Capricorn': 70, 'Aquarius': 55, 'Pisces': 95 },
  'Leo': { 'Aries': 90, 'Taurus': 70, 'Gemini': 80, 'Cancer': 65, 'Leo': 85, 'Virgo': 60, 'Libra': 80, 'Scorpio': 75, 'Sagittarius': 90, 'Capricorn': 55, 'Aquarius': 70, 'Pisces': 60 },
  'Virgo': { 'Aries': 45, 'Taurus': 90, 'Gemini': 70, 'Cancer': 75, 'Leo': 60, 'Virgo': 80, 'Libra': 65, 'Scorpio': 70, 'Sagittarius': 50, 'Capricorn': 95, 'Aquarius': 60, 'Pisces': 75 },
  'Libra': { 'Aries': 70, 'Taurus': 75, 'Gemini': 90, 'Cancer': 70, 'Leo': 80, 'Virgo': 65, 'Libra': 85, 'Scorpio': 60, 'Sagittarius': 75, 'Capricorn': 70, 'Aquarius': 80, 'Pisces': 85 },
  'Scorpio': { 'Aries': 80, 'Taurus': 65, 'Gemini': 55, 'Cancer': 90, 'Leo': 75, 'Virgo': 70, 'Libra': 60, 'Scorpio': 85, 'Sagittarius': 70, 'Capricorn': 80, 'Aquarius': 50, 'Pisces': 90 },
  'Sagittarius': { 'Aries': 95, 'Taurus': 40, 'Gemini': 75, 'Cancer': 45, 'Leo': 90, 'Virgo': 50, 'Libra': 75, 'Scorpio': 70, 'Sagittarius': 85, 'Capricorn': 60, 'Aquarius': 80, 'Pisces': 65 },
  'Capricorn': { 'Aries': 40, 'Taurus': 95, 'Gemini': 50, 'Cancer': 70, 'Leo': 55, 'Virgo': 95, 'Libra': 70, 'Scorpio': 80, 'Sagittarius': 60, 'Capricorn': 80, 'Aquarius': 65, 'Pisces': 70 },
  'Aquarius': { 'Aries': 75, 'Taurus': 45, 'Gemini': 95, 'Cancer': 55, 'Leo': 70, 'Virgo': 60, 'Libra': 80, 'Scorpio': 50, 'Sagittarius': 80, 'Capricorn': 65, 'Aquarius': 85, 'Pisces': 75 },
  'Pisces': { 'Aries': 55, 'Taurus': 80, 'Gemini': 70, 'Cancer': 95, 'Leo': 60, 'Virgo': 75, 'Libra': 85, 'Scorpio': 90, 'Sagittarius': 65, 'Capricorn': 70, 'Aquarius': 75, 'Pisces': 80 }
}

/**
 * Calculate detailed astrological compatibility between two zodiac signs
 */
export function calculateDetailedCompatibility(
  userSign: ZodiacSign,
  partnerSign: ZodiacSign,
  userBirthTime?: string,
  partnerBirthTime?: string
): DetailedCompatibilityScore {
  const userInfo = zodiacData[userSign]
  const partnerInfo = zodiacData[partnerSign]
  
  // Base compatibility
  const baseScore = baseCompatibility[userSign][partnerSign]
  
  // Element compatibility
  const elemCompat = elementCompatibility[userInfo.element][partnerInfo.element]
  
  // Quality compatibility
  const qualCompat = qualityCompatibility[userInfo.quality][partnerInfo.quality]
  
  // Planetary compatibility (simplified)
  const planetaryCompat = calculatePlanetaryCompatibility(userInfo.rulingPlanet, partnerInfo.rulingPlanet)
  
  // Calculate detailed scores
  const sunSign = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 10) - 5))
  const moonSign = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 8) - 4))
  const risingSign = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 6) - 3))
  const venusSign = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 12) - 6))
  const marsSign = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 8) - 4))
  
  const communication = Math.min(100, Math.max(0, (elemCompat + qualCompat) / 2 + Math.floor(Math.random() * 10) - 5))
  const emotional = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 8) - 4))
  const physical = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 12) - 6))
  const spiritual = Math.min(100, Math.max(0, planetaryCompat + Math.floor(Math.random() * 6) - 3))
  
  // Overall score calculation
  const overall = Math.round(
    (sunSign * 0.25 + moonSign * 0.2 + risingSign * 0.15 + 
     communication * 0.15 + emotional * 0.15 + physical * 0.1) / 100 * 100
  )
  
  const compatibility: DetailedCompatibilityScore = {
    overall: Math.min(100, Math.max(0, overall)),
    sunSign,
    moonSign,
    risingSign,
    venusSign,
    marsSign,
    communication,
    emotional,
    physical,
    spiritual,
    elementCompatibility: elemCompat,
    qualityCompatibility: qualCompat,
    planetaryCompatibility: planetaryCompat,
    challenges: getCompatibilityChallenges(userSign, partnerSign),
    strengths: getCompatibilityStrengths(userSign, partnerSign, overall),
    advice: getCompatibilityAdvice(userSign, partnerSign, overall),
    detailedAnalysis: {
      love: getLoveAnalysis(userSign, partnerSign, overall),
      friendship: getFriendshipAnalysis(userSign, partnerSign, overall),
      marriage: getMarriageAnalysis(userSign, partnerSign, overall),
      business: getBusinessAnalysis(userSign, partnerSign, overall)
    },
    recommendations: getRecommendations(userSign, partnerSign, overall)
  }
  
  return compatibility
}

/**
 * Calculate Kundli matching score (Indian astrology)
 */
export function calculateKundliMatching(
  userSign: ZodiacSign,
  partnerSign: ZodiacSign,
  userBirthTime: string,
  partnerBirthTime: string
): KundliMatchingScore {
  // Simplified Kundli matching based on zodiac signs
  // In real implementation, this would use birth charts
  
  const userInfo = zodiacData[userSign]
  const partnerInfo = zodiacData[partnerSign]
  
  // Calculate Ashtakoot scores
  const varna = calculateVarna(userInfo.element, partnerInfo.element)
  const vashya = calculateVashya(userSign, partnerSign)
  const tara = calculateTara(userSign, partnerSign)
  const yoni = calculateYoni(userSign, partnerSign)
  const graha = calculateGraha(userInfo.rulingPlanet, partnerInfo.rulingPlanet)
  const gana = calculateGana(userSign, partnerSign)
  const rashi = calculateRashi(userSign, partnerSign)
  const nadi = calculateNadi(userSign, partnerSign)
  
  const totalGuna = varna + vashya + tara + yoni + graha + gana + rashi + nadi
  
  let compatibility: KundliMatchingScore['compatibility']
  if (totalGuna >= 28) compatibility = 'Excellent'
  else if (totalGuna >= 24) compatibility = 'Very Good'
  else if (totalGuna >= 18) compatibility = 'Good'
  else if (totalGuna >= 12) compatibility = 'Average'
  else compatibility = 'Poor'
  
  // Check for Mangal Dosha (simplified)
  const mangalDosha = checkMangalDosha(userSign, partnerSign)
  
  return {
    guna: totalGuna,
    compatibility,
    mangalDosha,
    recommendations: getKundliRecommendations(totalGuna, mangalDosha),
    detailedScores: {
      varna,
      vashya,
      tara,
      yoni,
      graha,
      gana,
      rashi,
      nadi
    }
  }
}

// Helper functions for compatibility calculations

function calculatePlanetaryCompatibility(planet1: string, planet2: string): number {
  const planetaryMatrix: Record<string, Record<string, number>> = {
    'Mars': { 'Mars': 80, 'Venus': 70, 'Mercury': 60, 'Moon': 50, 'Sun': 85, 'Jupiter': 75, 'Saturn': 65, 'Uranus': 70, 'Neptune': 60, 'Pluto': 90 },
    'Venus': { 'Mars': 70, 'Venus': 85, 'Mercury': 80, 'Moon': 90, 'Sun': 75, 'Jupiter': 85, 'Saturn': 60, 'Uranus': 70, 'Neptune': 85, 'Pluto': 65 },
    'Mercury': { 'Mars': 60, 'Venus': 80, 'Mercury': 85, 'Moon': 70, 'Sun': 80, 'Jupiter': 75, 'Saturn': 70, 'Uranus': 90, 'Neptune': 75, 'Pluto': 60 },
    'Moon': { 'Mars': 50, 'Venus': 90, 'Mercury': 70, 'Moon': 80, 'Sun': 60, 'Jupiter': 85, 'Saturn': 55, 'Uranus': 65, 'Neptune': 95, 'Pluto': 70 },
    'Sun': { 'Mars': 85, 'Venus': 75, 'Mercury': 80, 'Moon': 60, 'Sun': 85, 'Jupiter': 90, 'Saturn': 50, 'Uranus': 75, 'Neptune': 70, 'Pluto': 80 },
    'Jupiter': { 'Mars': 75, 'Venus': 85, 'Mercury': 75, 'Moon': 85, 'Sun': 90, 'Jupiter': 85, 'Saturn': 70, 'Uranus': 80, 'Neptune': 85, 'Pluto': 75 },
    'Saturn': { 'Mars': 65, 'Venus': 60, 'Mercury': 70, 'Moon': 55, 'Sun': 50, 'Jupiter': 70, 'Saturn': 80, 'Uranus': 75, 'Neptune': 65, 'Pluto': 85 },
    'Uranus': { 'Mars': 70, 'Venus': 70, 'Mercury': 90, 'Moon': 65, 'Sun': 75, 'Jupiter': 80, 'Saturn': 75, 'Uranus': 85, 'Neptune': 80, 'Pluto': 70 },
    'Neptune': { 'Mars': 60, 'Venus': 85, 'Mercury': 75, 'Moon': 95, 'Sun': 70, 'Jupiter': 85, 'Saturn': 65, 'Uranus': 80, 'Neptune': 85, 'Pluto': 80 },
    'Pluto': { 'Mars': 90, 'Venus': 65, 'Mercury': 60, 'Moon': 70, 'Sun': 80, 'Jupiter': 75, 'Saturn': 85, 'Uranus': 70, 'Neptune': 80, 'Pluto': 85 }
  }
  
  return planetaryMatrix[planet1]?.[planet2] || 70
}

function getCompatibilityChallenges(sign1: ZodiacSign, sign2: ZodiacSign): string[] {
  const challengeMap: Record<string, string[]> = {
    'Fire-Earth': ['Different paces of life', 'Fire\'s impulsiveness vs Earth\'s caution'],
    'Fire-Water': ['Emotional expression differences', 'Fire\'s directness vs Water\'s sensitivity'],
    'Fire-Air': ['Commitment levels', 'Fire\'s intensity vs Air\'s detachment'],
    'Earth-Water': ['Practical vs emotional decision making', 'Different communication styles'],
    'Earth-Air': ['Routine vs spontaneity', 'Different social needs'],
    'Air-Water': ['Logic vs intuition', 'Different emotional needs']
  }
  
  const sign1Info = zodiacData[sign1]
  const sign2Info = zodiacData[sign2]
  
  const key = `${sign1Info.element}-${sign2Info.element}`
  const reverseKey = `${sign2Info.element}-${sign1Info.element}`
  
  return challengeMap[key] || challengeMap[reverseKey] || ['Different perspectives on life', 'Communication style differences']
}

function getCompatibilityStrengths(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string[] {
  if (score >= 85) {
    return [
      'Natural understanding and harmony',
      'Complementary strengths and weaknesses',
      'Strong emotional and intellectual connection',
      'Shared values and life goals'
    ]
  } else if (score >= 70) {
    return [
      'Good communication and understanding',
      'Mutual respect and admiration',
      'Balanced relationship dynamics',
      'Potential for growth together'
    ]
  } else if (score >= 55) {
    return [
      'Learning opportunities from differences',
      'Potential for personal growth',
      'Interesting contrast in personalities'
    ]
  } else {
    return [
      'Opportunity to learn patience',
      'Challenge that can lead to growth'
    ]
  }
}

function getCompatibilityAdvice(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string[] {
  const advice = []
  
  if (score >= 85) {
    advice.push('This is a highly compatible match with great potential for a lasting relationship.')
    advice.push('Focus on nurturing your natural connection and supporting each other\'s dreams.')
  } else if (score >= 70) {
    advice.push('You have good compatibility with room for growth.')
    advice.push('Work on open communication and understanding each other\'s perspectives.')
  } else if (score >= 55) {
    advice.push('This relationship will require effort but can be rewarding.')
    advice.push('Focus on finding common ground and appreciating your differences.')
  } else {
    advice.push('This match will require significant work and compromise.')
    advice.push('Consider whether your core values and life goals align.')
  }
  
  return advice
}

function getLoveAnalysis(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string {
  if (score >= 85) {
    return 'Your romantic connection is deeply harmonious with natural chemistry and mutual understanding. You inspire each other and create a loving, supportive partnership.'
  } else if (score >= 70) {
    return 'Your love compatibility is strong with good potential for romance. You appreciate each other\'s qualities and can build a meaningful relationship with effort.'
  } else if (score >= 55) {
    return 'Your romantic compatibility requires work but can be fulfilling. Focus on understanding each other\'s love languages and emotional needs.'
  } else {
    return 'Romance between you may face challenges. Consider whether you\'re truly compatible for a long-term romantic relationship.'
  }
}

function getFriendshipAnalysis(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string {
  if (score >= 85) {
    return 'You make excellent friends with natural understanding and shared interests. Your friendship is likely to be long-lasting and mutually beneficial.'
  } else if (score >= 70) {
    return 'Your friendship has good potential with mutual respect and interesting dynamics. You can learn from each other and enjoy each other\'s company.'
  } else if (score >= 55) {
    return 'As friends, you may have some challenges but can appreciate each other\'s different perspectives and grow from the relationship.'
  } else {
    return 'Friendship may require significant effort to maintain. You may be better as casual acquaintances than close friends.'
  }
}

function getMarriageAnalysis(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string {
  if (score >= 85) {
    return 'Marriage compatibility is excellent with strong potential for a lasting, harmonious partnership. You share similar values and complement each other well.'
  } else if (score >= 70) {
    return 'Marriage potential is good with some areas to work on. Focus on communication and understanding each other\'s needs for a successful partnership.'
  } else if (score >= 55) {
    return 'Marriage will require significant effort and compromise. Consider pre-marital counseling to understand and work through your differences.'
  } else {
    return 'Marriage compatibility is challenging. Carefully consider whether you share the fundamental values and goals needed for a lifelong partnership.'
  }
}

function getBusinessAnalysis(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string {
  if (score >= 85) {
    return 'Business partnership potential is excellent. You complement each other\'s skills and have similar work ethics and goals.'
  } else if (score >= 70) {
    return 'You could work well together in business with clear role definitions and good communication about expectations and goals.'
  } else if (score >= 55) {
    return 'Business partnership may work in specific circumstances but requires clear agreements and defined responsibilities.'
  } else {
    return 'Business partnership is not recommended due to different work styles and approaches to decision-making.'
  }
}

function getRecommendations(sign1: ZodiacSign, sign2: ZodiacSign, score: number): string[] {
  const recommendations = []
  
  if (score >= 85) {
    recommendations.push('Continue nurturing your natural connection')
    recommendations.push('Support each other\'s individual growth')
    recommendations.push('Plan for your future together')
  } else if (score >= 70) {
    recommendations.push('Work on open and honest communication')
    recommendations.push('Learn about each other\'s zodiac traits')
    recommendations.push('Find activities you both enjoy')
  } else if (score >= 55) {
    recommendations.push('Practice patience and understanding')
    recommendations.push('Focus on your shared values')
    recommendations.push('Consider couples counseling if serious')
  } else {
    recommendations.push('Honestly evaluate your compatibility')
    recommendations.push('Consider if this relationship serves both of you')
    recommendations.push('Seek guidance from trusted friends or counselors')
  }
  
  return recommendations
}

// Kundli matching helper functions (simplified versions)

function calculateVarna(element1: string, element2: string): number {
  const varnaMap: Record<string, number> = {
    'Fire': 4, 'Air': 3, 'Water': 2, 'Earth': 1
  }
  
  const varna1 = varnaMap[element1] || 1
  const varna2 = varnaMap[element2] || 1
  
  return varna1 >= varna2 ? 1 : 0
}

function calculateVashya(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const vashyaGroups: Record<string, ZodiacSign[]> = {
    'Chatuspad': ['Aries', 'Taurus', 'Leo', 'Sagittarius'],
    'Jalchar': ['Cancer', 'Scorpio', 'Pisces'],
    'Manav': ['Gemini', 'Virgo', 'Libra', 'Aquarius'],
    'Vanchar': ['Capricorn']
  }
  
  for (const group of Object.values(vashyaGroups)) {
    if (group.includes(sign1) && group.includes(sign2)) {
      return 2
    }
  }
  
  return Math.random() > 0.5 ? 1 : 0
}

function calculateTara(sign1: ZodiacSign, sign2: ZodiacSign): number {
  // Simplified Tara calculation
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  
  const index1 = signs.indexOf(sign1)
  const index2 = signs.indexOf(sign2)
  
  const difference = Math.abs(index1 - index2)
  
  if ([2, 4, 6, 8, 10].includes(difference)) {
    return 3
  } else if ([1, 3, 5, 7, 9, 11].includes(difference)) {
    return 1.5
  }
  
  return 0
}

function calculateYoni(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const yoniMap: Record<ZodiacSign, string> = {
    'Aries': 'Mesha', 'Taurus': 'Vrishabha', 'Gemini': 'Mithuna',
    'Cancer': 'Karka', 'Leo': 'Simha', 'Virgo': 'Kanya',
    'Libra': 'Tula', 'Scorpio': 'Vrishchika', 'Sagittarius': 'Dhanu',
    'Capricorn': 'Makara', 'Aquarius': 'Kumbha', 'Pisces': 'Meena'
  }
  
  if (yoniMap[sign1] === yoniMap[sign2]) {
    return 4
  }
  
  return Math.floor(Math.random() * 3) + 1
}

function calculateGraha(planet1: string, planet2: string): number {
  if (planet1 === planet2) {
    return 5
  }
  
  const friendlyPlanets: Record<string, string[]> = {
    'Sun': ['Mars', 'Jupiter'],
    'Moon': ['Mercury', 'Venus'],
    'Mars': ['Sun', 'Jupiter'],
    'Mercury': ['Moon', 'Venus'],
    'Jupiter': ['Sun', 'Mars'],
    'Venus': ['Moon', 'Mercury'],
    'Saturn': ['Mercury', 'Venus']
  }
  
  if (friendlyPlanets[planet1]?.includes(planet2)) {
    return 4
  }
  
  return Math.floor(Math.random() * 3) + 1
}

function calculateGana(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const ganaMap: Record<ZodiacSign, string> = {
    'Aries': 'Rakshasa', 'Taurus': 'Manushya', 'Gemini': 'Deva',
    'Cancer': 'Deva', 'Leo': 'Rakshasa', 'Virgo': 'Manushya',
    'Libra': 'Rakshasa', 'Scorpio': 'Rakshasa', 'Sagittarius': 'Deva',
    'Capricorn': 'Rakshasa', 'Aquarius': 'Deva', 'Pisces': 'Deva'
  }
  
  const gana1 = ganaMap[sign1]
  const gana2 = ganaMap[sign2]
  
  if (gana1 === gana2) {
    return 6
  }
  
  if ((gana1 === 'Deva' && gana2 === 'Manushya') || (gana1 === 'Manushya' && gana2 === 'Deva')) {
    return 5
  }
  
  return 1
}

function calculateRashi(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const signs: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
  
  const index1 = signs.indexOf(sign1)
  const index2 = signs.indexOf(sign2)
  
  const difference = Math.abs(index1 - index2)
  
  if (difference === 6) { // Opposite signs
    return 7
  } else if ([2, 4, 8, 10].includes(difference)) {
    return 4
  }
  
  return 2
}

function calculateNadi(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const nadiMap: Record<ZodiacSign, string> = {
    'Aries': 'Madhya', 'Taurus': 'Antya', 'Gemini': 'Adi',
    'Cancer': 'Adi', 'Leo': 'Madhya', 'Virgo': 'Antya',
    'Libra': 'Madhya', 'Scorpio': 'Antya', 'Sagittarius': 'Adi',
    'Capricorn': 'Antya', 'Aquarius': 'Adi', 'Pisces': 'Madhya'
  }
  
  const nadi1 = nadiMap[sign1]
  const nadi2 = nadiMap[sign2]
  
  if (nadi1 !== nadi2) {
    return 8
  }
  
  return 0 // Same Nadi is not good
}

function checkMangalDosha(sign1: ZodiacSign, sign2: ZodiacSign): boolean {
  const mangalSigns: ZodiacSign[] = ['Aries', 'Scorpio', 'Cancer', 'Leo', 'Sagittarius', 'Capricorn']
  
  const sign1HasMangal = mangalSigns.includes(sign1)
  const sign2HasMangal = mangalSigns.includes(sign2)
  
  // If both have Mangal Dosha, it cancels out
  if (sign1HasMangal && sign2HasMangal) {
    return false
  }
  
  // If only one has Mangal Dosha, it's present
  return sign1HasMangal || sign2HasMangal
}

function getKundliRecommendations(guna: number, mangalDosha: boolean): string[] {
  const recommendations = []
  
  if (guna >= 28) {
    recommendations.push('Excellent match for marriage')
    recommendations.push('Very high compatibility in all aspects')
  } else if (guna >= 24) {
    recommendations.push('Very good match with minor adjustments needed')
    recommendations.push('Strong potential for successful marriage')
  } else if (guna >= 18) {
    recommendations.push('Good match but requires understanding and compromise')
    recommendations.push('Focus on communication and shared goals')
  } else if (guna >= 12) {
    recommendations.push('Average compatibility - proceed with caution')
    recommendations.push('Consider pre-marital counseling')
  } else {
    recommendations.push('Poor compatibility - marriage not recommended')
    recommendations.push('Significant challenges expected')
  }
  
  if (mangalDosha) {
    recommendations.push('Mangal Dosha present - consult with astrologer for remedies')
    recommendations.push('Consider performing recommended rituals before marriage')
  }
  
  return recommendations
}
