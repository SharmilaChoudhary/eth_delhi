'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Star, Heart, Sparkles, Moon } from 'lucide-react'
import SelfQRSignIn from './SelfQRSignIn'

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {

  const menuItems = [
    { name: 'Date', icon: Heart },
    { name: 'Friends', icon: Star },
    { name: 'Stories', icon: Sparkles },
    { name: 'Events', icon: Moon }
  ]

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">Cosmic</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href="#"
                className="flex items-center space-x-1 text-gray-700 hover:text-cosmic-600 transition-colors duration-200"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Sign In */}
          <div className="hidden md:flex items-center">
            <SelfQRSignIn />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-md border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href="#"
                  className="flex items-center space-x-3 text-gray-700 hover:text-cosmic-600 transition-colors duration-200 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
              <div className="pt-4 border-t">
                <SelfQRSignIn />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    )
}
