'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Sparkles, ArrowRight, Download, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import CardStack from './CardStack'

export default function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated by looking for verified user data in localStorage
    const checkAuthStatus = () => {
      const verifiedUserData = localStorage.getItem('verifiedUserData')
      if (verifiedUserData) {
        const userData = JSON.parse(verifiedUserData)
        setIsAuthenticated(userData.isVerified)
      }
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
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-20">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="gradient-text">Cosmic</span>
            <br />
            <span className="text-gray-800">Connections</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find meaningful relationships through the stars
          </motion.p>

          {isAuthenticated ? (
            <Link href="/matching">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Start Matching
              </motion.button>
            </Link>
          ) : (
            <motion.button
              className="px-8 py-4 bg-gray-400 text-white rounded-full font-semibold text-lg cursor-not-allowed transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              disabled
            >
              Sign in to Start Matching
            </motion.button>
          )}
        </div>

        {/* Card Stack */}
        <CardStack isAuthenticated={isAuthenticated} />

        {/* Key Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
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
