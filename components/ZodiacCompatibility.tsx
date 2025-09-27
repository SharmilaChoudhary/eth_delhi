'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Sparkles, Zap } from 'lucide-react'
import { ZodiacSign, CompatibilityScore } from '@/types'

interface ZodiacCompatibilityProps {
  userSign: ZodiacSign
  partnerSign: ZodiacSign
  compatibility: CompatibilityScore
}

export default function ZodiacCompatibility({ 
  userSign, 
  partnerSign, 
  compatibility 
}: ZodiacCompatibilityProps) {
  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'from-green-400 to-emerald-500'
    if (score >= 80) return 'from-blue-400 to-cyan-500'
    if (score >= 70) return 'from-yellow-400 to-orange-500'
    if (score >= 60) return 'from-orange-400 to-red-500'
    return 'from-red-400 to-red-600'
  }

  const getCompatibilityText = (score: number) => {
    if (score >= 90) return 'Cosmic Soulmates'
    if (score >= 80) return 'Highly Compatible'
    if (score >= 70) return 'Good Match'
    if (score >= 60) return 'Moderate Compatibility'
    return 'Challenging Match'
  }

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">Cosmic Compatibility</h3>
        <div className="flex items-center justify-center space-x-4 text-xl">
          <span className="font-semibold text-purple-600">{userSign}</span>
          <Heart className="w-6 h-6 text-pink-500" />
          <span className="font-semibold text-purple-600">{partnerSign}</span>
        </div>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: '0 251.2' }}
              animate={{ strokeDasharray: `${(compatibility.overall / 100) * 251.2} 251.2` }}
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
            <span className="text-3xl font-bold gradient-text">
              {compatibility.overall}%
            </span>
          </div>
        </div>
        <p className="text-xl font-semibold text-gray-700">
          {getCompatibilityText(compatibility.overall)}
        </p>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Sun Sign</span>
              <span className="text-sm font-semibold">{compatibility.sunSign}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.sunSign)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.sunSign}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Moon Sign</span>
              <span className="text-sm font-semibold">{compatibility.moonSign}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.moonSign)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.moonSign}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Rising Sign</span>
              <span className="text-sm font-semibold">{compatibility.risingSign}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.risingSign)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.risingSign}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Communication</span>
              <span className="text-sm font-semibold">{compatibility.communication}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.communication)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.communication}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Emotional</span>
              <span className="text-sm font-semibold">{compatibility.emotional}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.emotional)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.emotional}%` }}
                transition={{ duration: 1, delay: 1.0 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Physical</span>
              <span className="text-sm font-semibold">{compatibility.physical}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${getCompatibilityColor(compatibility.physical)}`}
                initial={{ width: 0 }}
                animate={{ width: `${compatibility.physical}%` }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strengths and Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center text-green-600">
            <Sparkles className="w-5 h-5 mr-2" />
            Strengths
          </h4>
          <ul className="space-y-2">
            {compatibility.strengths.map((strength, index) => (
              <motion.li
                key={index}
                className="text-sm text-gray-600 flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              >
                <Star className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                {strength}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center text-orange-600">
            <Zap className="w-5 h-5 mr-2" />
            Challenges
          </h4>
          <ul className="space-y-2">
            {compatibility.challenges.map((challenge, index) => (
              <motion.li
                key={index}
                className="text-sm text-gray-600 flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              >
                <Zap className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                {challenge}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advice */}
      {compatibility.advice.length > 0 && (
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <h4 className="text-lg font-semibold mb-2 text-purple-700">Cosmic Advice</h4>
          <p className="text-sm text-gray-700">{compatibility.advice[0]}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
