'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Sparkles, ArrowRight, Download, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    // Check if user is authenticated by looking for verified user data in localStorage
    const checkAuthStatus = () => {
      const verifiedUserData = localStorage.getItem('verifiedUserData')
      const profileCompleted = localStorage.getItem('profileCompleted')
      const userProfile = localStorage.getItem('userProfile')
      
      if (verifiedUserData) {
        const userData = JSON.parse(verifiedUserData)
        setIsAuthenticated(userData.isVerified)
      }
      
      // Check if user has completed their profile
      setHasProfile(profileCompleted === 'true' || !!userProfile)
    }

    // Initial check
    checkAuthStatus()

    // Listen for storage changes (when verification completes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'verifiedUserData') {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Listen for custom verification event
    const handleUserVerified = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('userVerified', handleUserVerified)
    
    // Also check periodically in case events don't fire
    const interval = setInterval(checkAuthStatus, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userVerified', handleUserVerified)
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content with Cards Layout */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* Left Card */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -10 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="w-64 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400"
                animate={{
                  background: [
                    "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
                    "linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #f59e0b 100%)",
                    "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-1">Emma, 26</h3>
                <p className="text-sm opacity-90 mb-2">♌ Leo</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">95% match</span>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute top-6 right-6 w-4 h-4 bg-white/30 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block"
            initial={{ opacity: 0, x: 100, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 10 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-64 h-80 bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400"
                animate={{
                  background: [
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-1">Sophia, 28</h3>
                <p className="text-sm opacity-90 mb-2">♍ Virgo</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">88% match</span>
                </div>
              </div>
              {/* Floating elements */}
              <motion.div
                className="absolute top-8 left-6 w-3 h-3 bg-white/40 rounded-full"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1
                }}
              />
            </div>
          </motion.div>

          {/* Center Content */}
          <div className="text-center z-10 max-w-4xl mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text">Cosmic</span>
              <br />
              <span className="text-gray-800">Connections</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find meaningful relationships through the stars
            </motion.p>

            {isAuthenticated && hasProfile ? (
              <Link href="/matching">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Heart className="w-5 h-5" />
                  <span>Find Your Match</span>
                </motion.button>
              </Link>
            ) : isAuthenticated && !hasProfile ? (
              <Link href="/profile-setup">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Star className="w-5 h-5" />
                  <span>Complete Your Profile</span>
                </motion.button>
              </Link>
            ) : (
              <Link href="/signin">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Cards - Show below text on smaller screens */}
          <div className="lg:hidden absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              <motion.div
                className="w-40 h-52 bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)",
                      "linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #f59e0b 100%)",
                      "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #ef4444 100%)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold mb-1">Emma, 26</h3>
                  <p className="text-xs opacity-90">♌ Leo • 95% match</p>
                </div>
              </motion.div>
              
              <motion.div
                className="w-40 h-52 bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)"
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-bold mb-1">Sophia, 28</h3>
                  <p className="text-xs opacity-90">♍ Virgo • 88% match</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Spacer for mobile cards */}
        <div className="lg:hidden h-40"></div>

        {/* Key Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-20 lg:mt-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Astrological Matching</h3>
            <p className="text-gray-600 text-sm">Find your cosmic soulmate</p>
          </div>

          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-warm-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Cosmic Insights</h3>
            <p className="text-gray-600 text-sm">Personalized horoscopes</p>
          </div>

          <div>
            <div className="w-16 h-16 bg-gradient-to-r from-warm-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Meaningful Connections</h3>
            <p className="text-gray-600 text-sm">Authentic relationships</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
