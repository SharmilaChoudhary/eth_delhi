'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import ChatComponent from './Chat'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {!showChat ? (
        <>
          <Hero />
          <Features />
          <Footer />
        </>
      ) : (
        <ChatComponent currentUserId="demo-user-123" />
      )}
      
      {/* Toggle button to switch between views */}
      <button 
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      >
        {showChat ? 'Back to Home' : 'View Chat UI'}
      </button>
    </main>
  )
}
