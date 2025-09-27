'use client'

import { motion } from 'framer-motion'
import { Heart, Star, Users, Calendar, Shield, Sparkles, Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export default function Features() {
  const features = [
    {
      title: "Cosmic Date",
      description: "Find love through astrology",
      icon: Heart,
      color: "from-yellow-400 to-orange-500",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      cta: "Find your cosmic soulmate"
    },
    {
      title: "Cosmic Friends",
      description: "Meet like-minded cosmic people",
      icon: Users,
      color: "from-orange-400 to-red-500",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
      cta: "Find your cosmic tribe"
    },
    {
      title: "Cosmic Events",
      description: "Join real-life cosmic events",
      icon: Calendar,
      color: "from-yellow-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      cta: "Meet in person"
    }
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

      </div>
    </section>
  )
}
