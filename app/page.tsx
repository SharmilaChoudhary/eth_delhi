'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  Heart, 
  Sparkles, 
  Moon, 
  Sun, 
  Zap,
  ArrowRight,
  Play,
  Download,
  Menu,
  X
} from 'lucide-react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      quote: "We are both naturally positive, happy-go-getters, but when you put us together, it feels like there is nothing we can't accomplish.",
      authors: "Leslie & Thomas",
      status: "married in 2025",
      zodiac: "♌ & ♍"
    },
    {
      quote: "The cosmic compatibility feature helped us understand each other on a deeper level from the very beginning.",
      authors: "Sarah & Michael",
      status: "engaged",
      zodiac: "♋ & ♏"
    },
    {
      quote: "Finding someone who shares my passion for astrology and meaningful connections was incredible.",
      authors: "Emma & David",
      status: "dating",
      zodiac: "♊ & ♐"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <main className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <Hero />
      
      <Features />
      
      <Testimonials 
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />
      
      <Footer />
    </main>
  )
}
