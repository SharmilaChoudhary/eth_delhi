'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Sparkles, ArrowRight, Download, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const profiles = [
    {
      name: "Danna, 28",
      zodiac: "♌ Leo",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face",
      compatibility: "95%"
    },
    {
      name: "Josh, 34",
      zodiac: "♍ Virgo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
      compatibility: "92%"
    },
    {
      name: "Tiana, 30",
      zodiac: "♊ Gemini",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face",
      compatibility: "88%"
    }
  ]

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
        </div>

        {/* Profile Preview */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl overflow-hidden">
              <Image
                src={profiles[0].image}
                alt="Profile preview"
                width={320}
                height={384}
                className="w-full h-full object-cover"
              />
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
