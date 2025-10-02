'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, MapPin, Calendar, Clock, Sparkles, User, Info, Zap } from 'lucide-react'
import { ZodiacSign } from '@/types'
import { calculateZodiacSign, getZodiacInfo, calculateAge, formatBirthDate } from '@/utils/zodiac'
import { calculateDetailedCompatibility } from '@/utils/horoscope-matching'

export interface EnhancedProfile {
  id: string
  name: string
  age?: number
  bio: string
  image?: string
  date_of_birth: string
  birth_time?: string
  location?: string
  interests?: string[]
  verified: boolean
  zodiacSign?: ZodiacSign
  compatibility?: number
  lastActive?: string
}

interface EnhancedProfileCardProps {
  profile: EnhancedProfile
  currentUserSign?: ZodiacSign
  onSwipe?: (direction: 'left' | 'right') => void
  onLike?: () => void
  onPass?: () => void
  showCompatibility?: boolean
}

export default function EnhancedProfileCard({ 
  profile, 
  currentUserSign,
  onSwipe, 
  onLike, 
  onPass,
  showCompatibility = true
}: EnhancedProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [zodiacInfo, setZodiacInfo] = useState<any>(null)
  const [compatibilityData, setCompatibilityData] = useState<any>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Calculate zodiac sign and compatibility
  useEffect(() => {
    if (profile.date_of_birth) {
      const zodiac = calculateZodiacSign(profile.date_of_birth)
      const info = getZodiacInfo(zodiac)
      setZodiacInfo(info)
      
      // Calculate compatibility if current user sign is available
      if (currentUserSign && showCompatibility) {
        const compatibility = calculateDetailedCompatibility(currentUserSign, zodiac)
        setCompatibilityData(compatibility)
      }
    }
  }, [profile.date_of_birth, currentUserSign, showCompatibility])

  const images = profile.image ? [profile.image] : []
  const calculatedAge = profile.age || (profile.date_of_birth ? calculateAge(profile.date_of_birth) : null)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    const threshold = 100
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left'
      onSwipe?.(direction)
      
      if (direction === 'right') {
        onLike?.()
      } else {
        onPass?.()
      }
    }
    
    setDragOffset({ x: 0, y: 0 })
  }

  const getCompatibilityColor = (score: number) => {
    if (score >= 85) return 'text-green-500 bg-green-100'
    if (score >= 70) return 'text-blue-500 bg-blue-100'
    if (score >= 55) return 'text-yellow-500 bg-yellow-100'
    return 'text-red-500 bg-red-100'
  }

  const getCompatibilityText = (score: number) => {
    if (score >= 85) return 'Excellent Match'
    if (score >= 70) return 'Great Match'
    if (score >= 55) return 'Good Match'
    return 'Challenging'
  }

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ y: -5 }}
      style={{
        rotate: isDragging ? dragOffset.x * 0.1 : 0,
      }}
    >
      {/* Drag Indicators */}
      <AnimatePresence>
        {isDragging && (
          <>
            <motion.div
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: dragOffset.x < -50 ? 1 : 0,
                scale: dragOffset.x < -50 ? 1 : 0.8 
              }}
            >
              PASS
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: dragOffset.x > 50 ? 1 : 0,
                scale: dragOffset.x > 50 ? 1 : 0.8 
              }}
            >
              LIKE
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Image */}
      <div className="relative h-96 bg-gradient-to-br from-cosmic-100 to-accent-100">
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={`${profile.name}'s photo`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-24 h-24 text-gray-400" />
          </div>
        )}
        
        {/* Verification Badge */}
        {profile.verified && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full">
            <Star className="w-4 h-4" fill="currentColor" />
          </div>
        )}

        {/* Image Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Compatibility Score */}
        {compatibilityData && showCompatibility && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold ${getCompatibilityColor(compatibilityData.overall)}`}
          >
            {compatibilityData.overall}% Match
          </motion.div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">
              {profile.name}
              {calculatedAge && <span className="text-xl font-normal">, {calculatedAge}</span>}
            </h2>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Zodiac Sign */}
        {zodiacInfo && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">{zodiacInfo.symbol}</span>
            <span className="font-medium">{zodiacInfo.sign}</span>
            <span className="text-sm text-white/80">({zodiacInfo.element})</span>
          </div>
        )}

        {/* Location */}
        {profile.location && (
          <div className="flex items-center space-x-1 mb-2">
            <MapPin className="w-4 h-4 text-white/80" />
            <span className="text-sm text-white/90">{profile.location}</span>
          </div>
        )}

        {/* Bio Preview */}
        <p className="text-sm text-white/90 line-clamp-2 mb-3">
          {profile.bio}
        </p>

        {/* Quick Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {profile.lastActive && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-white/80">{profile.lastActive}</span>
              </div>
            )}
          </div>
          
          {compatibilityData && (
            <div className="text-xs text-white/80">
              {getCompatibilityText(compatibilityData.overall)}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex space-x-3">
        <motion.button
          onClick={onPass}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
        
        <motion.button
          onClick={onLike}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-green-500 hover:bg-white transition-colors shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-6 h-6" fill="currentColor" />
        </motion.button>
      </div>

      {/* Detailed Info Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute inset-0 bg-white z-30 overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Profile Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Profile Summary */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
                  {images.length > 0 ? (
                    <img src={images[0]} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  {profile.name}
                  {calculatedAge && <span>, {calculatedAge}</span>}
                </h4>
                {zodiacInfo && (
                  <p className="text-gray-600">
                    {zodiacInfo.symbol} {zodiacInfo.sign} • {zodiacInfo.element} Sign
                  </p>
                )}
              </div>

              {/* Birth Details */}
              {profile.date_of_birth && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cosmic-500" />
                    Birth Details
                  </h5>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Birth Date:</span>
                        <p className="font-medium">{formatBirthDate(profile.date_of_birth)}</p>
                      </div>
                      {profile.birth_time && (
                        <div>
                          <span className="text-gray-600">Birth Time:</span>
                          <p className="font-medium">{profile.birth_time}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Zodiac Info */}
              {zodiacInfo && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-cosmic-500" />
                    Zodiac Profile
                  </h5>
                  <div className="bg-gradient-to-br from-cosmic-50 to-accent-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{zodiacInfo.symbol}</span>
                        <div>
                          <p className="font-semibold text-gray-800">{zodiacInfo.sign}</p>
                          <p className="text-sm text-gray-600">{zodiacInfo.dateRange}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{zodiacInfo.element} • {zodiacInfo.quality}</p>
                        <p>Ruled by {zodiacInfo.rulingPlanet}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Traits:</p>
                      <div className="flex flex-wrap gap-2">
                        {zodiacInfo.traits?.map((trait: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/80 text-cosmic-600 text-xs rounded-full"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Compatibility Analysis */}
              {compatibilityData && currentUserSign && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-cosmic-500" />
                    Compatibility Analysis
                  </h5>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        {compatibilityData.overall}%
                      </div>
                      <p className="text-sm text-gray-600">
                        {getCompatibilityText(compatibilityData.overall)}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Communication</div>
                        <div className="font-semibold text-purple-600">
                          {compatibilityData.communication}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Emotional</div>
                        <div className="font-semibold text-purple-600">
                          {compatibilityData.emotional}%
                        </div>
                      </div>
                    </div>
                    
                    {compatibilityData.strengths?.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Strengths:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {compatibilityData.strengths.slice(0, 2).map((strength: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-1">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bio */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">About</h5>
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Interests */}
              {profile.interests && profile.interests.length > 0 && (
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">Interests</h5>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cosmic-100 text-cosmic-700 text-sm rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <motion.button
                  onClick={() => {
                    onPass?.()
                    setShowDetails(false)
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Pass
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    onLike?.()
                    setShowDetails(false)
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Like
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
