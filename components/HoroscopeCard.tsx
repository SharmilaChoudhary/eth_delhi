'use client'

import { motion } from 'framer-motion'
import { Star, Moon, Sun, Sparkles, TrendingUp, Heart, Zap } from 'lucide-react'
import { ZodiacSign } from '@/types'

interface HoroscopeData {
  sign: ZodiacSign
  date: string
  overall: number
  love: number
  career: number
  health: number
  luck: number
  mood: string
  description: string
  advice: string
  luckyColor: string
  luckyNumber: number
  compatibility: ZodiacSign[]
}

interface HoroscopeCardProps {
  horoscope: HoroscopeData
  isToday?: boolean
}

export default function HoroscopeCard({ horoscope, isToday = false }: HoroscopeCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-500'
    if (score >= 6) return 'text-yellow-500'
    if (score >= 4) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'from-green-400 to-emerald-500'
    if (score >= 6) return 'from-yellow-400 to-orange-500'
    if (score >= 4) return 'from-orange-400 to-red-500'
    return 'from-red-400 to-red-600'
  }

  const getMoodIcon = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy':
      case 'excited':
        return <Sparkles className="w-6 h-6 text-yellow-500" />
      case 'romantic':
      case 'loving':
        return <Heart className="w-6 h-6 text-pink-500" />
      case 'energetic':
      case 'powerful':
        return <Zap className="w-6 h-6 text-blue-500" />
      case 'calm':
      case 'peaceful':
        return <Moon className="w-6 h-6 text-purple-500" />
      default:
        return <Sun className="w-6 h-6 text-orange-500" />
    }
  }

  return (
    <motion.div
      className={`relative bg-white rounded-3xl shadow-2xl p-8 ${
        isToday ? 'ring-4 ring-purple-200' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{horoscope.sign}</h3>
          <p className="text-gray-600">{horoscope.date}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getMoodIcon(horoscope.mood)}
          <span className="text-sm font-medium text-gray-600">{horoscope.mood}</span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="35"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="35"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 219.8' }}
              animate={{ strokeDasharray: `${(horoscope.overall / 10) * 219.8} 219.8` }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor(horoscope.overall)}`}>
              {horoscope.overall}/10
            </span>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-700">Overall Energy</p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Love</span>
          </div>
          <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${getScoreBgColor(horoscope.love)} flex items-center justify-center`}>
            <span className="text-white font-bold">{horoscope.love}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Career</span>
          </div>
          <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${getScoreBgColor(horoscope.career)} flex items-center justify-center`}>
            <span className="text-white font-bold">{horoscope.career}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Sun className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Health</span>
          </div>
          <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${getScoreBgColor(horoscope.health)} flex items-center justify-center`}>
            <span className="text-white font-bold">{horoscope.health}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-600">Luck</span>
          </div>
          <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${getScoreBgColor(horoscope.luck)} flex items-center justify-center`}>
            <span className="text-white font-bold">{horoscope.luck}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed">{horoscope.description}</p>
      </div>

      {/* Advice */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
        <h4 className="text-sm font-semibold text-purple-700 mb-2">Cosmic Advice</h4>
        <p className="text-sm text-gray-700">{horoscope.advice}</p>
      </div>

      {/* Lucky Elements */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Lucky Color:</span>
          <div 
            className="w-6 h-6 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: horoscope.luckyColor }}
          />
          <span className="font-medium">{horoscope.luckyColor}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Lucky Number:</span>
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold">
            {horoscope.luckyNumber}
          </span>
        </div>
      </div>

      {/* Compatibility */}
      {horoscope.compatibility.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Best Matches Today</h4>
          <div className="flex flex-wrap gap-2">
            {horoscope.compatibility.map((sign, index) => (
              <motion.span
                key={sign}
                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {sign}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Today Badge */}
      {isToday && (
        <div className="absolute -top-3 -right-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  )
}
