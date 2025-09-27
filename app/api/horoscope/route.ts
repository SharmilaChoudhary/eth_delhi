import { NextRequest, NextResponse } from 'next/server'
import { ZodiacSign } from '@/types'

// Mock horoscope data - replace with actual astrological calculations
const horoscopeTemplates = {
  'Aries': {
    descriptions: [
      "Your fiery energy is at its peak today, Aries. The stars align to bring you opportunities for leadership and new beginnings.",
      "Mars, your ruling planet, gives you extra courage today. Trust your instincts and take bold action.",
      "Your natural confidence is amplified by cosmic forces. This is a perfect day to start new projects."
    ],
    advice: [
      "Channel your energy into productive activities rather than conflicts.",
      "Your assertiveness will be well-received today, so don't hold back.",
      "Take time to listen to others' perspectives before making decisions."
    ]
  },
  'Taurus': {
    descriptions: [
      "Venus blesses you with harmony and beauty today, Taurus. Focus on creating stability in your relationships.",
      "Your practical nature serves you well as the stars support your grounded approach to life.",
      "The cosmic energy encourages you to indulge in life's pleasures while maintaining your values."
    ],
    advice: [
      "Trust your instincts about financial decisions today.",
      "Your patience will be rewarded, so don't rush important matters.",
      "Take time to appreciate the beauty around you."
    ]
  },
  'Gemini': {
    descriptions: [
      "Mercury enhances your communication skills today, Gemini. Your words have extra power and influence.",
      "The stars encourage your natural curiosity and thirst for knowledge. Learning opportunities abound.",
      "Your adaptability is your greatest strength today. Embrace change and new experiences."
    ],
    advice: [
      "Your social skills are particularly strong today - use them wisely.",
      "Don't overthink decisions - your first instinct is usually right.",
      "Share your ideas with others - they'll be well-received."
    ]
  },
  'Cancer': {
    descriptions: [
      "The Moon's influence makes you especially intuitive today, Cancer. Trust your emotional intelligence.",
      "Your nurturing nature is highlighted by cosmic forces. Focus on caring for loved ones.",
      "Home and family matters take center stage. Your protective instincts serve you well."
    ],
    advice: [
      "Your emotional sensitivity is a gift today - use it to help others.",
      "Don't be afraid to show your vulnerable side to trusted friends.",
      "Trust your gut feelings about people and situations."
    ]
  },
  'Leo': {
    descriptions: [
      "The Sun's energy amplifies your natural charisma today, Leo. You're the center of attention for all the right reasons.",
      "Your creative energy is at its peak. Express yourself boldly and authentically.",
      "Leadership opportunities present themselves. Your confidence and warmth inspire others."
    ],
    advice: [
      "Your dramatic flair will be appreciated today - don't tone it down.",
      "Share your creative projects with others - they'll be impressed.",
      "Your generosity will be returned tenfold."
    ]
  },
  'Virgo': {
    descriptions: [
      "Mercury's analytical energy helps you solve complex problems today, Virgo. Your attention to detail pays off.",
      "The stars support your desire for perfection and organization. Your efforts will be noticed.",
      "Your practical wisdom is especially valuable today. Others seek your advice and guidance."
    ],
    advice: [
      "Don't be too critical of yourself or others today.",
      "Your analytical skills are sharp - use them to help others.",
      "Take time to appreciate the small details that others miss."
    ]
  },
  'Libra': {
    descriptions: [
      "Venus brings harmony and balance to your relationships today, Libra. Your diplomatic skills are enhanced.",
      "The cosmic energy supports your quest for beauty and justice. Your sense of fairness guides you well.",
      "Partnerships and collaborations are highlighted. Your ability to see both sides serves you well."
    ],
    advice: [
      "Your natural charm will help you navigate difficult conversations.",
      "Don't avoid conflict - your mediation skills are needed.",
      "Trust your sense of balance in all decisions."
    ]
  },
  'Scorpio': {
    descriptions: [
      "Pluto's transformative energy empowers you today, Scorpio. You have the power to create positive change.",
      "Your intensity and passion are magnetic. Others are drawn to your authentic energy.",
      "The stars support your desire for deep, meaningful connections. Your intuition is particularly strong."
    ],
    advice: [
      "Your emotional depth is a strength today - don't hide it.",
      "Trust your instincts about people's true intentions.",
      "Your ability to transform situations is powerful - use it wisely."
    ]
  },
  'Sagittarius': {
    descriptions: [
      "Jupiter expands your horizons today, Sagittarius. Adventure and learning opportunities abound.",
      "Your optimistic nature is contagious. Your enthusiasm inspires others to take action.",
      "The cosmic energy supports your quest for truth and meaning. Your philosophical insights are valuable."
    ],
    advice: [
      "Your adventurous spirit will lead you to exciting opportunities.",
      "Share your wisdom and experiences with others - they'll benefit.",
      "Don't be afraid to take calculated risks today."
    ]
  },
  'Capricorn': {
    descriptions: [
      "Saturn's disciplined energy helps you achieve your goals today, Capricorn. Your hard work pays off.",
      "The stars support your practical approach to life. Your leadership skills are recognized.",
      "Your determination and persistence are your greatest assets today. Success is within reach."
    ],
    advice: [
      "Your structured approach will help you overcome obstacles.",
      "Don't be afraid to delegate - others are ready to help.",
      "Your long-term thinking will guide you to the right decisions."
    ]
  },
  'Aquarius': {
    descriptions: [
      "Uranus sparks your innovative thinking today, Aquarius. Your unique ideas will be well-received.",
      "The cosmic energy supports your humanitarian instincts. Your desire to help others is powerful.",
      "Your independence and originality are highlighted. You inspire others to think differently."
    ],
    advice: [
      "Your unconventional ideas will lead to breakthroughs today.",
      "Don't conform to others' expectations - be authentically you.",
      "Your vision for the future is valuable - share it with others."
    ]
  },
  'Pisces': {
    descriptions: [
      "Neptune enhances your intuition and creativity today, Pisces. Your artistic and spiritual side is highlighted.",
      "The stars support your compassionate nature. Your empathy helps others feel understood.",
      "Your connection to the spiritual realm is strong today. Trust your dreams and visions."
    ],
    advice: [
      "Your sensitivity is a gift today - use it to help others.",
      "Don't ignore your creative impulses - they're divinely inspired.",
      "Your spiritual insights are valuable - share them with those who need them."
    ]
  }
}

const moods = ['Happy', 'Excited', 'Romantic', 'Energetic', 'Calm', 'Peaceful', 'Loving', 'Powerful']
const colors = ['Purple', 'Blue', 'Green', 'Yellow', 'Orange', 'Red', 'Pink', 'Gold', 'Silver', 'Turquoise']

const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sign = searchParams.get('sign') as ZodiacSign
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    if (!sign) {
      return NextResponse.json(
        { success: false, error: 'Zodiac sign is required' },
        { status: 400 }
      )
    }

    const signData = horoscopeTemplates[sign]
    if (!signData) {
      return NextResponse.json(
        { success: false, error: 'Invalid zodiac sign' },
        { status: 400 }
      )
    }

    // Generate random scores (1-10)
    const overall = Math.floor(Math.random() * 4) + 6 // 6-10 range
    const love = Math.floor(Math.random() * 4) + 5 // 5-9 range
    const career = Math.floor(Math.random() * 4) + 5 // 5-9 range
    const health = Math.floor(Math.random() * 4) + 5 // 5-9 range
    const luck = Math.floor(Math.random() * 4) + 5 // 5-9 range

    // Get random description and advice
    const description = getRandomElement(signData.descriptions)
    const advice = getRandomElement(signData.advice)
    const mood = getRandomElement(moods)
    const luckyColor = getRandomElement(colors)
    const luckyNumber = Math.floor(Math.random() * 99) + 1

    // Generate compatible signs (3-5 signs)
    const allSigns: ZodiacSign[] = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    const compatibleSigns = allSigns
      .filter(s => s !== sign)
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 3)

    const horoscope = {
      sign,
      date,
      overall,
      love,
      career,
      health,
      luck,
      mood,
      description,
      advice,
      luckyColor,
      luckyNumber,
      compatibility: compatibleSigns
    }

    return NextResponse.json({
      success: true,
      data: horoscope
    })

  } catch (error) {
    console.error('Horoscope generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
