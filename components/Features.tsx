'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Users, Calendar, Shield, Sparkles, Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      title: "Cosmic Date",
      description: "Whether you're new to dating or ready to try again, Cosmic Date is built to bring you closer to love safely and meaningfully through astrological compatibility.",
      icon: Heart,
      color: "from-yellow-400 to-orange-500",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      cta: "Find your cosmic soulmate"
    },
    {
      title: "Cosmic Friends",
      description: "Whether you've moved to a new city or just want to expand your circle, Cosmic Friends makes it easy to meet like-minded people who match your cosmic vibe.",
      icon: Users,
      color: "from-orange-400 to-red-500",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
      cta: "Find your cosmic tribe"
    },
    {
      title: "Cosmic Events",
      description: "Join our cosmic IRL events where you can stop typing and start talking. Come solo or bring a friend—and leave with a new cosmic connection.",
      icon: Calendar,
      color: "from-yellow-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      cta: "Meet in person"
    }
  ]

  const zodiacSigns = [
    { name: "Aries", symbol: "♈", color: "from-red-400 to-red-600" },
    { name: "Taurus", symbol: "♉", color: "from-green-400 to-green-600" },
    { name: "Gemini", symbol: "♊", color: "from-yellow-400 to-yellow-600" },
    { name: "Cancer", symbol: "♋", color: "from-blue-400 to-blue-600" },
    { name: "Leo", symbol: "♌", color: "from-orange-400 to-orange-600" },
    { name: "Virgo", symbol: "♍", color: "from-green-400 to-green-600" },
    { name: "Libra", symbol: "♎", color: "from-pink-400 to-pink-600" },
    { name: "Scorpio", symbol: "♏", color: "from-purple-400 to-purple-600" },
    { name: "Sagittarius", symbol: "♐", color: "from-indigo-400 to-indigo-600" },
    { name: "Capricorn", symbol: "♑", color: "from-gray-400 to-gray-600" },
    { name: "Aquarius", symbol: "♒", color: "from-cyan-400 to-cyan-600" },
    { name: "Pisces", symbol: "♓", color: "from-teal-400 to-teal-600" }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to find your cosmic match
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Zodiac Signs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-6">All 12 Zodiac Signs</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {zodiacSigns.map((sign, index) => (
              <motion.div
                key={sign.name}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${sign.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-lg">{sign.symbol}</span>
                </div>
                <p className="text-xs font-medium text-gray-600">{sign.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
