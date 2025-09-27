import { NextRequest, NextResponse } from 'next/server'
import { ZodiacSign, CompatibilityScore } from '@/types'

// Mock compatibility data - replace with actual astrological calculations
const compatibilityMatrix: Record<string, Record<string, number>> = {
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

const getCompatibilityAdvice = (score: number): string[] => {
  if (score >= 90) {
    return [
      "You have incredible cosmic chemistry",
      "Your energies complement each other perfectly",
      "This is a rare and special connection"
    ]
  } else if (score >= 80) {
    return [
      "You have strong astrological compatibility",
      "Your relationship has great potential",
      "Focus on communication to strengthen your bond"
    ]
  } else if (score >= 70) {
    return [
      "You have good compatibility with some challenges",
      "Work on understanding each other's differences",
      "Patience and compromise will be key"
    ]
  } else if (score >= 60) {
    return [
      "You have moderate compatibility",
      "Focus on your shared values and interests",
      "Be patient as you learn to work together"
    ]
  } else {
    return [
      "This relationship will require extra effort",
      "Focus on communication and understanding",
      "Consider if your core values align"
    ]
  }
}

const getCompatibilityChallenges = (sign1: ZodiacSign, sign2: ZodiacSign): string[] => {
  const challenges: Record<string, string[]> = {
    'Aries-Taurus': ['Different approaches to change', 'Aries impatience vs Taurus stability'],
    'Gemini-Cancer': ['Communication styles', 'Gemini logic vs Cancer emotions'],
    'Leo-Virgo': ['Attention to detail', 'Leo drama vs Virgo practicality'],
    'Libra-Scorpio': ['Decision making', 'Libra indecision vs Scorpio intensity'],
    'Sagittarius-Capricorn': ['Life goals', 'Sagittarius freedom vs Capricorn structure'],
    'Aquarius-Pisces': ['Reality vs dreams', 'Aquarius logic vs Pisces intuition']
  }
  
  const key1 = `${sign1}-${sign2}`
  const key2 = `${sign2}-${sign1}`
  
  return challenges[key1] || challenges[key2] || ['Different communication styles', 'Different life approaches']
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userSign, partnerSign } = body

    if (!userSign || !partnerSign) {
      return NextResponse.json(
        { success: false, error: 'Both zodiac signs are required' },
        { status: 400 }
      )
    }

    // Get base compatibility score
    const baseScore = compatibilityMatrix[userSign]?.[partnerSign] || 50
    
    // Calculate detailed scores with some variation
    const sunSign = baseScore + Math.floor(Math.random() * 10) - 5
    const moonSign = baseScore + Math.floor(Math.random() * 8) - 4
    const risingSign = baseScore + Math.floor(Math.random() * 6) - 3
    const venusSign = baseScore + Math.floor(Math.random() * 12) - 6
    const marsSign = baseScore + Math.floor(Math.random() * 8) - 4
    
    // Calculate other aspects
    const communication = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 10) - 5))
    const emotional = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 8) - 4))
    const physical = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 12) - 6))
    const spiritual = Math.min(100, Math.max(0, baseScore + Math.floor(Math.random() * 6) - 3))
    
    // Overall score is weighted average
    const overall = Math.round(
      (sunSign * 0.25 + moonSign * 0.2 + risingSign * 0.15 + 
       communication * 0.15 + emotional * 0.15 + physical * 0.1) / 100
    )

    const compatibility: CompatibilityScore = {
      overall: Math.min(100, Math.max(0, overall)),
      sunSign: Math.min(100, Math.max(0, sunSign)),
      moonSign: Math.min(100, Math.max(0, moonSign)),
      risingSign: Math.min(100, Math.max(0, risingSign)),
      venusSign: Math.min(100, Math.max(0, venusSign)),
      marsSign: Math.min(100, Math.max(0, marsSign)),
      communication: Math.min(100, Math.max(0, communication)),
      emotional: Math.min(100, Math.max(0, emotional)),
      physical: Math.min(100, Math.max(0, physical)),
      spiritual: Math.min(100, Math.max(0, spiritual)),
      challenges: getCompatibilityChallenges(userSign as ZodiacSign, partnerSign as ZodiacSign),
      strengths: getCompatibilityAdvice(overall),
      advice: [
        `As ${userSign} and ${partnerSign}, you have a ${overall}% cosmic compatibility.`,
        overall >= 80 ? "This is a highly compatible match with great potential for a lasting relationship." :
        overall >= 60 ? "This relationship has good potential but will require effort and understanding." :
        "This relationship will require significant effort and compromise from both partners."
      ]
    }

    return NextResponse.json({
      success: true,
      data: compatibility
    })

  } catch (error) {
    console.error('Compatibility calculation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
