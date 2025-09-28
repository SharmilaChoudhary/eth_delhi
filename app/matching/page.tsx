'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Sparkles, ArrowLeft, Settings, Loader2, MessageCircle, Zap, X } from 'lucide-react'
import SwipeableProfileCard from '@/components/SwipeableProfileCard'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface Profile {
  id: string
  name: string
  age: number
  bio: string
  image?: string
  date_of_birth: string
  birth_time: string
  created_at: string
  // Additional fields for display
  zodiac: string
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCompatibility, setShowCompatibility] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Fetch profiles from database
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          throw new Error(`Failed to fetch profiles: ${error.message}`)
        }

        if (data && data.length > 0) {
          console.log('Fetched profiles from database:', data)
          
          // Transform database profiles to match the expected format
          const transformedProfiles: Profile[] = data.map((profile: any) => {
            console.log('Processing profile:', profile.name, 'Avatar URL:', profile.image)
            
            return {
              id: profile.id,
              name: profile.name || 'Unknown',
              age: profile.age || 25, // Default age if not provided
              bio: profile.bio || 'No bio available',
              image: profile.image,
              date_of_birth: profile.date_of_birth,
              birth_time: profile.birth_time,
              created_at: profile.created_at,
              // Add display fields with default values
              zodiac: '♈ Aries', // Default zodiac - you can calculate this from birth date
              images: profile.image ? [profile.image] : [], // Avatar from avatars bucket
              location: 'Nearby',
              interests: ['Astrology', 'Dating', 'Cosmic Connections'],
              compatibility: Math.floor(Math.random() * 20) + 80, // Random compatibility 80-100
              lastActive: 'Recently'
            }
          })
          
          console.log('Transformed profiles for display:', transformedProfiles)
          setProfiles(transformedProfiles)
        } else {
          setProfiles([])
        }
      } catch (err) {
        console.error('Error fetching profiles:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profiles')
      } finally {
        setLoading(false)
      }
    }

    fetchProfiles()
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
    setShowCompatibility(false)
    setShowChat(false)
  }

  const handleCompatibilityCheck = () => {
    setShowCompatibility(true)
    setShowChat(false)
  }

  const handleStartChat = () => {
    setShowChat(true)
    setShowCompatibility(false)
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
            <h1 className="text-xl font-bold gradient-text">Cosmic</h1>
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
        {/* Progress Bar - Only show when not loading and profiles exist */}
        {!loading && profiles.length > 0 && (
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
        )}

        {loading ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Loading Profiles...</h2>
            <p className="text-gray-600">
              Finding your cosmic connections from the database
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Profiles</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : profiles.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Profiles Found</h2>
            <p className="text-gray-600 mb-8">
              No profiles are available in the database yet. Be the first to create a profile!
            </p>
            <Link href="/profile-setup">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Profile
              </motion.button>
            </Link>
          </motion.div>
        ) : currentIndex < profiles.length ? (
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
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeMatch}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {!showCompatibility && !showChat ? (
                // Initial match screen
                <>
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Heart className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">It's a Match!</h2>
                  <p className="text-gray-600 mb-8">
                    You and {matchedProfile.name} liked each other. What would you like to do?
                  </p>
                  
                  <div className="space-y-4">
                    <motion.button
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCompatibilityCheck}
                    >
                      <Zap className="w-5 h-5" />
                      <span>Check Compatibility</span>
                    </motion.button>
                    
                    <motion.button
                      className="w-full px-6 py-4 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleStartChat}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Start Chatting</span>
                    </motion.button>
                    
                    <motion.button
                      className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeMatch}
                    >
                      Keep Swiping
                    </motion.button>
                  </div>
                </>
              ) : showCompatibility ? (
                // Compatibility check screen
                <>
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Zap className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Compatibility Analysis</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Overall Compatibility</span>
                        <span className="text-lg font-bold text-purple-600">{matchedProfile.compatibility}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${matchedProfile.compatibility}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="font-medium text-blue-800">Communication</div>
                        <div className="text-blue-600">92%</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-medium text-green-800">Values</div>
                        <div className="text-green-600">88%</div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="font-medium text-yellow-800">Interests</div>
                        <div className="text-yellow-600">85%</div>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="font-medium text-red-800">Lifestyle</div>
                        <div className="text-red-600">78%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      onClick={() => setShowCompatibility(false)}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      onClick={handleStartChat}
                    >
                      Start Chat
                    </motion.button>
                  </div>
                </>
              ) : (
                // Chat interface screen
                <>
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <MessageCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Start Chatting</h2>
                  <p className="text-gray-600 mb-6">
                    Send your first message to {matchedProfile.name}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-left">
                      <div className="text-sm text-gray-500 mb-2">Suggested icebreakers:</div>
                      <div className="space-y-2">
                        <div className="text-sm bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                          "Hey! I noticed we both love astrology. What's your favorite constellation?"
                        </div>
                        <div className="text-sm bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                          "Hi! Your bio caught my attention. Tell me more about your cosmic interests!"
                        </div>
                        <div className="text-sm bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                          "Hello! I'd love to know what drew you to cosmic connections."
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      onClick={() => setShowChat(false)}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      onClick={closeMatch}
                    >
                      Open Chat
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
