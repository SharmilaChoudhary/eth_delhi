'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowLeft, Settings } from 'lucide-react'
import SwipeableProfileCard from '@/components/SwipeableProfileCard'
import Link from 'next/link'

interface Profile {
  id: string
  name: string
  age: number
  zodiac: string
  bio: string
  images: string[]
  location: string
  interests: string[]
  compatibility: number
  lastActive: string
}

export default function MatchingPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([])
  const [passedProfiles, setPassedProfiles] = useState<Profile[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)
  const [lastAction, setLastAction] = useState<'like' | 'pass' | null>(null)

  // Mock profiles data
  useEffect(() => {
    const mockProfiles: Profile[] = [
      {
        id: '1',
        name: 'Emma',
        age: 26,
        zodiac: '♌ Leo',
        bio: 'Adventure seeker and astrology enthusiast. Love hiking, yoga, and stargazing. Looking for someone who shares my passion for the cosmos and outdoor adventures.',
        images: [
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face'
        ],
        location: '2 miles away',
        interests: ['Yoga', 'Astrology', 'Hiking', 'Photography', 'Meditation'],
        compatibility: 95,
        lastActive: 'Active now'
      },
      {
        id: '2',
        name: 'Sophia',
        age: 28,
        zodiac: '♍ Virgo',
        bio: 'Creative soul with a love for art and music. I believe in the power of cosmic connections and meaningful conversations. Let\'s explore the universe together!',
        images: [
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face'
        ],
        location: '5 miles away',
        interests: ['Art', 'Music', 'Astrology', 'Cooking', 'Travel'],
        compatibility: 88,
        lastActive: '2 hours ago'
      },
      {
        id: '3',
        name: 'Isabella',
        age: 24,
        zodiac: '♊ Gemini',
        bio: 'Fitness enthusiast and nature lover. I\'m always up for trying new things and meeting interesting people. Let\'s create some cosmic magic together!',
        images: [
          'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'
        ],
        location: '1 mile away',
        interests: ['Fitness', 'Nature', 'Dancing', 'Astrology', 'Reading'],
        compatibility: 92,
        lastActive: '30 minutes ago'
      },
      {
        id: '4',
        name: 'Olivia',
        age: 29,
        zodiac: '♋ Cancer',
        bio: 'Homebody with a big heart. I love cozy nights in, cooking, and deep conversations. Looking for someone who appreciates the little things in life.',
        images: [
          'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&crop=face'
        ],
        location: '3 miles away',
        interests: ['Cooking', 'Movies', 'Astrology', 'Gardening', 'Books'],
        compatibility: 85,
        lastActive: '1 hour ago'
      },
      {
        id: '5',
        name: 'Ava',
        age: 27,
        zodiac: '♎ Libra',
        bio: 'Balanced and harmonious soul seeking meaningful connections. I love art, music, and exploring new places. Let\'s find our cosmic balance together!',
        images: [
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face'
        ],
        location: '4 miles away',
        interests: ['Art', 'Music', 'Travel', 'Astrology', 'Fashion'],
        compatibility: 90,
        lastActive: 'Active now'
      }
    ]
    
    setProfiles(mockProfiles)
  }, [])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      handleLike()
    } else {
      handlePass()
    }
  }

  const handleLike = () => {
    if (currentIndex < profiles.length) {
      const profile = profiles[currentIndex]
      setLikedProfiles([...likedProfiles, profile])
      setLastAction('like')
      
      // Simulate match (30% chance)
      if (Math.random() < 0.3) {
        setTimeout(() => {
          setMatchedProfile(profile)
          setShowMatch(true)
        }, 500) // Delay to show the swipe animation first
      }
      
      setCurrentIndex(currentIndex + 1)
      
      // Reset action after animation
      setTimeout(() => setLastAction(null), 1000)
    }
  }

  const handlePass = () => {
    if (currentIndex < profiles.length) {
      const profile = profiles[currentIndex]
      setPassedProfiles([...passedProfiles, profile])
      setLastAction('pass')
      setCurrentIndex(currentIndex + 1)
      
      // Reset action after animation
      setTimeout(() => setLastAction(null), 1000)
    }
  }

  const closeMatch = () => {
    setShowMatch(false)
    setMatchedProfile(null)
  }

  const currentProfile = profiles[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">Cosmic Connections</h1>
          </div>
          
          <motion.button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Profile {currentIndex + 1} of {profiles.length}</span>
            <span>{Math.round(((currentIndex + 1) / profiles.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cosmic-500 to-accent-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / profiles.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {currentIndex < profiles.length ? (
          <div className="relative">
            {/* Next Card Preview */}
            {currentIndex + 1 < profiles.length && (
              <motion.div
                className="absolute inset-0 scale-95 opacity-50 -z-10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 0.95, opacity: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-3xl shadow-lg h-96 opacity-50" />
              </motion.div>
            )}
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProfile?.id}
                initial={{ opacity: 0, scale: 0.9, y: 50, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50, rotateY: -15 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="relative z-10"
              >
                <SwipeableProfileCard
                  profile={currentProfile}
                  onSwipe={handleSwipe}
                  onLike={handleLike}
                  onPass={handlePass}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Action Feedback Overlay */}
            <AnimatePresence>
              {lastAction && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`px-8 py-4 rounded-full text-white font-bold text-2xl shadow-2xl ${
                      lastAction === 'like' 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                    }`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: lastAction === 'like' ? [0, 10, -10, 0] : [0, -10, 10, 0]
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {lastAction === 'like' ? '♥ LIKED!' : '✕ PASSED'}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No more profiles!</h2>
            <p className="text-gray-600 mb-8">
              You've seen all available profiles. Check back later for new cosmic connections!
            </p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(0)}
            >
              Start Over
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatch && matchedProfile && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMatch}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">It's a Match!</h2>
              <p className="text-gray-600 mb-6">
                You and {matchedProfile.name} liked each other. Start a conversation!
              </p>
              
              <div className="flex space-x-4">
                <motion.button
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeMatch}
                >
                  Keep Swiping
                </motion.button>
                <motion.button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeMatch}
                >
                  Send Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
