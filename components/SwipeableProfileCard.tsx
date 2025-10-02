'use client'

import { useState, useRef } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { Heart, X, Star, MapPin, Calendar, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface Profile {
  id: string
  name: string
  age?: number
  zodiac?: string
  bio: string
  images?: string[]
  location?: string
  interests?: string[]
  compatibility?: number
  lastActive?: string
}

interface SwipeableProfileCardProps {
  profile: Profile
  onSwipe: (direction: 'left' | 'right') => void
  onLike: () => void
  onPass: () => void
}

export default function SwipeableProfileCard({ 
  profile, 
  onSwipe, 
  onLike, 
  onPass 
}: SwipeableProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotate = useTransform(x, [-300, 300], [-25, 25])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.8, 1, 0.8, 0])
  const scale = useTransform(x, [-300, 0, 300], [0.8, 1, 0.8])
  
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (isAnimating) return
    
    const threshold = 80
    const velocity = info.velocity.x
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 300) {
      const direction = info.offset.x > 0 ? 'right' : 'left'
      setIsAnimating(true)
      
      // Animate card out with more dramatic effect
      const exitX = direction === 'right' ? 400 : -400
      const exitY = Math.random() * 100 - 50 // Add some vertical randomness
      
      x.set(exitX)
      y.set(exitY)
      
      setTimeout(() => {
        onSwipe(direction)
        setIsAnimating(false)
        x.set(0)
        y.set(0)
      }, 400)
    } else {
      // Snap back to center with spring animation
      x.set(0)
      y.set(0)
    }
  }
  
  const handleLike = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Animate with rotation and scale
    x.set(400)
    y.set(-50)
    
    setTimeout(() => {
      onLike()
      setIsAnimating(false)
      x.set(0)
      y.set(0)
    }, 400)
  }
  
  const handlePass = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Animate with rotation and scale
    x.set(-400)
    y.set(50)
    
    setTimeout(() => {
      onPass()
      setIsAnimating(false)
      x.set(0)
      y.set(0)
    }, 400)
  }
  
  const nextImage = () => {
    if (profile.images && currentImageIndex < profile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }
  
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      style={{ x, y, rotate, opacity, scale }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.02,
        zIndex: 10
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Image Container */}
        <div className="relative h-96">
          {profile.images && profile.images.length > 0 ? (
            <Image
              src={profile.images[currentImageIndex]}
              alt={profile.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No Image</span>
            </div>
          )}
          
          {/* Image Navigation */}
          {profile.images && profile.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                disabled={currentImageIndex === 0}
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                disabled={currentImageIndex === profile.images.length - 1}
              >
                →
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {profile.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">
                {profile.name}{profile.age ? `, ${profile.age}` : ''}
              </h2>
              {profile.compatibility && (
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{profile.compatibility}% match</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm opacity-90">
              {profile.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.lastActive && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.lastActive}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Zodiac Badge */}
          {profile.zodiac && (
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-accent-500 to-warm-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {profile.zodiac}
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">{profile.bio}</p>
          
          {/* Interests */}
          {profile.interests && profile.interests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-cosmic-100 to-accent-100 text-cosmic-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 mt-6">
        <motion.button
          onClick={handlePass}
          className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          onClick={handleLike}
          className="w-14 h-14 bg-gradient-to-r from-accent-500 to-warm-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </div>
      
      {/* Swipe Indicators */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg"
          style={{
            opacity: useTransform(x, [-300, -150], [1, 0]),
            scale: useTransform(x, [-300, -150], [1, 0.3]),
            rotate: useTransform(x, [-300, -150], [-15, 0])
          }}
        >
          ✕ PASS
        </motion.div>
        
        <motion.div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg"
          style={{
            opacity: useTransform(x, [150, 300], [0, 1]),
            scale: useTransform(x, [150, 300], [0.3, 1]),
            rotate: useTransform(x, [150, 300], [0, 15])
          }}
        >
          ♥ LIKE
        </motion.div>
      </div>
      
      {/* Swipe Instructions */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-500 text-sm mb-2">Swipe left to pass • Swipe right to like</p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-1 text-red-500">
            <span className="text-lg">←</span>
            <span className="text-xs">Pass</span>
          </div>
          <div className="flex items-center space-x-1 text-green-500">
            <span className="text-xs">Like</span>
            <span className="text-lg">→</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
