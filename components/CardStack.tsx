'use client'

import { motion } from 'framer-motion'
import { Star, Heart, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Profile {
  name: string
  age: number
  zodiac: string
  image: string
  compatibility: string
  bio: string
}

interface CardStackProps {
  isAuthenticated: boolean
}

export default function CardStack({ isAuthenticated }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const profiles: Profile[] = [
    {
      name: "Emma",
      age: 26,
      zodiac: "♌ Leo",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face&q=80",
      compatibility: "95%",
      bio: "Adventure seeker and astrology enthusiast"
    },
    {
      name: "Sophia",
      age: 28,
      zodiac: "♍ Virgo",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face&q=80",
      compatibility: "88%",
      bio: "Creative soul with cosmic vibes"
    },
    {
      name: "Isabella",
      age: 24,
      zodiac: "♊ Gemini",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face&q=80",
      compatibility: "92%",
      bio: "Fitness enthusiast and nature lover"
    },
    {
      name: "Olivia",
      age: 29,
      zodiac: "♋ Cancer",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face&q=80",
      compatibility: "85%",
      bio: "Homebody with a big heart"
    },
    {
      name: "Ava",
      age: 27,
      zodiac: "♎ Libra",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face&q=80",
      compatibility: "90%",
      bio: "Balanced and harmonious soul"
    }
  ]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % profiles.length)
    
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Reset to first card when becoming authenticated
      setCurrentIndex(0)
      
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % profiles.length)
      }, 4000) // Increased to 4 seconds for better user experience
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])


  if (!isAuthenticated) {
    return (
      <motion.div
        className="flex justify-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="relative">
          <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Animated Gradient Background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cosmic-400 via-accent-400 to-warm-400"
              animate={{
                background: [
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)",
                  "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #6366f1 100%)",
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)"
                ]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating animated elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-8 right-8 w-6 h-6 bg-white/30 rounded-full"
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 0
                }}
              />
              <motion.div
                className="absolute top-20 left-10 w-4 h-4 bg-white/40 rounded-full"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                  scale: [1, 0.7, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 1.5
                }}
              />
              <motion.div
                className="absolute bottom-32 right-12 w-8 h-8 bg-white/25 rounded-full"
                animate={{
                  y: [0, -35, 0],
                  x: [0, 18, 0],
                  scale: [1, 1.6, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: 3
                }}
              />
              <motion.div
                className="absolute top-32 left-4 w-3 h-3 bg-white/35 rounded-full"
                animate={{
                  y: [0, 25, 0],
                  x: [0, 12, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 2
                }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{profiles[0].name}</h3>
              <p className="text-lg opacity-90 mb-2">{profiles[0].zodiac}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{profiles[0].compatibility} compatibility</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex justify-center mb-16 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="relative w-80 h-96">
        {/* Background Cards - Show up to 3 cards in stack */}
        {profiles.slice(0, 3).map((profile, index) => {
          const stackIndex = (currentIndex + index) % profiles.length
          const profileData = profiles[stackIndex]
          const isTop = index === 0
          const isMiddle = index === 1
          const isBottom = index === 2
          
          return (
            <motion.div
              key={`${profileData.name}-${stackIndex}`}
              className={`absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden ${
                isTop ? 'z-30' : isMiddle ? 'z-20' : 'z-10'
              }`}
              initial={{ 
                scale: isTop ? 1 : isMiddle ? 0.95 : 0.9,
                y: isTop ? 0 : isMiddle ? 8 : 16,
                opacity: isTop ? 1 : isMiddle ? 0.8 : 0.6,
                rotate: isTop ? 0 : isMiddle ? 1 : 2,
                x: isTop ? 0 : isMiddle ? 2 : 4
              }}
              animate={{ 
                scale: isTop ? 1 : isMiddle ? 0.95 : 0.9,
                y: isTop ? 0 : isMiddle ? 8 : 16,
                opacity: isTop ? 1 : isMiddle ? 0.8 : 0.6,
                rotate: isTop ? 0 : isMiddle ? 1 : 2,
                x: isTop ? 0 : isMiddle ? 2 : 4
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
              whileHover={isTop ? { 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 }
              } : {}}
            >
              <div className="relative w-full h-full">
                {/* Animated Gradient Background instead of images */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-cosmic-400 via-accent-400 to-warm-400"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)",
                      "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #6366f1 100%)",
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)"
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating animated elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="absolute top-12 left-6 w-3 h-3 bg-white/40 rounded-full"
                    animate={{
                      y: [0, 15, 0],
                      x: [0, -8, 0],
                      scale: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                  <motion.div
                    className="absolute bottom-20 right-8 w-5 h-5 bg-white/25 rounded-full"
                    animate={{
                      y: [0, -25, 0],
                      x: [0, 12, 0],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      delay: 2
                    }}
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Profile Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{profileData.name}, {profileData.age}</h3>
                  <p className="text-lg opacity-90 mb-2">{profileData.zodiac}</p>
                  <p className="text-sm opacity-80 mb-3">{profileData.bio}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{profileData.compatibility} compatibility</span>
                  </div>
                </div>
                
                {/* Action Buttons - Only on top card */}
                {isTop && (
                  <div className="absolute bottom-6 right-6 flex space-x-3">
                    <motion.button
                      className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('left')}
                    >
                      <X className="w-7 h-7 text-white" />
                    </motion.button>
                    <motion.button
                      className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('right')}
                    >
                      <Heart className="w-7 h-7 text-white" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
        
        {/* Card Counter */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <span className="text-sm font-medium text-gray-600">
              {Math.min(currentIndex + 1, profiles.length)} of {profiles.length}
            </span>
          </div>
        </div>
        
        {/* Empty state when all cards are swiped */}
        {currentIndex >= profiles.length && (
          <motion.div
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No more profiles!</h3>
            <p className="text-gray-600 mb-6">You've seen all available cosmic connections. Check back later!</p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(0)}
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
