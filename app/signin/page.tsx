'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion'
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode'
import { v4 as uuidv4 } from 'uuid'
import { ethers } from 'ethers'
import { ArrowLeft, Star, Heart, Sparkles } from 'lucide-react'

export default function SignInPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [selfApp, setSelfApp] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Initialize Self app when component mounts
    try {
      const newUserId = ethers.ZeroAddress
      setUserId(newUserId)
      
      const app = new SelfAppBuilder({
        version: 2,
        appName: "Cosmic",
        scope: "self-workshop",
        endpoint: "0x4e0e06726521396edf446967d8e697c15f58ac9c",
        logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
        userId: newUserId,
        endpointType: "celo",
        userIdType: "hex",
        userDefinedData: "Welcome to Cosmic!",
        disclosures: {
          minimumAge: 18,
          ofac: false,
          excludedCountries: ["USA"]
        }
      }).build()
      
      setSelfApp(app)
    } catch (error) {
      console.error("Failed to initialize Self app:", error)
      setVerificationError("Failed to initialize verification")
    }
  }, [])

  const handleVerificationSuccess = () => {
    const verificationDate = new Date().toISOString()
    
    // Store verified user data
    localStorage.setItem('verifiedUserData', JSON.stringify({
      userId: userId,
      isVerified: true,
      verificationDate: verificationDate
    }))
    
    setIsVerified(true)
    setVerificationError(null)
    
    // Redirect to profile setup page after a short delay
    setTimeout(() => {
      router.push("/profile-setup")
    }, 3000)
  }

  const handleVerificationError = (error: any) => {
    const errorCode = error.error_code || 'Unknown'
    const reason = error.reason || 'Unknown error'
    console.error(`Error ${errorCode}: ${reason}`)
    setVerificationError(`Verification failed: ${reason}`)
  }

  // Floating animation components
  const FloatingElement = ({ children, delay = 0, duration = 3 }: { children: React.ReactNode, delay?: number, duration?: number }) => (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0} duration={4}>
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cosmic-300 to-accent-300 rounded-full opacity-20 blur-xl" />
        </FloatingElement>
        <FloatingElement delay={1} duration={5}>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-accent-300 to-warm-300 rounded-full opacity-15 blur-2xl" />
        </FloatingElement>
        <FloatingElement delay={2} duration={3.5}>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-warm-300 to-cosmic-300 rounded-full opacity-25 blur-xl" />
        </FloatingElement>
        <FloatingElement delay={0.5} duration={4.5}>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-cosmic-400 to-accent-400 rounded-full opacity-30 blur-lg" />
        </FloatingElement>
        
        {/* Floating Icons */}
        <FloatingElement delay={1.5} duration={6}>
          <Star className="absolute top-32 right-32 w-8 h-8 text-cosmic-300 opacity-40" />
        </FloatingElement>
        <FloatingElement delay={2.5} duration={4}>
          <Heart className="absolute bottom-32 left-32 w-6 h-6 text-accent-300 opacity-50" />
        </FloatingElement>
        <FloatingElement delay={0.8} duration={5.5}>
          <Sparkles className="absolute top-60 left-16 w-7 h-7 text-warm-300 opacity-45" />
        </FloatingElement>
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/">
            <motion.button
              className="flex items-center space-x-2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5 text-cosmic-600" />
              <span className="font-medium text-cosmic-700">Back to Home</span>
            </motion.button>
          </Link>
          
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-cosmic-500 to-accent-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white font-bold">✨</span>
            </motion.div>
            <span className="text-3xl font-bold gradient-text">Cosmic</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          className="max-w-lg w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {!isVerified ? (
            <div className="text-center">
              {/* Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cosmic-600 to-accent-600 bg-clip-text text-transparent">
                  Verify Your Identity
                </h1>
                <p className="text-gray-600 text-lg">
                  Scan this QR code with the Self app to verify you're a real human
                </p>
              </motion.div>

              {/* QR Code Section */}
              {selfApp ? (
                <motion.div 
                  className="mb-8 p-8 bg-gradient-to-br from-cosmic-50 via-accent-50 to-warm-50 rounded-3xl border-2 border-cosmic-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-2xl shadow-lg">
                      <SelfQRcodeWrapper
                        selfApp={selfApp}
                        onSuccess={handleVerificationSuccess}
                        onError={handleVerificationError}
                        size={300}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Scan with the Self app to verify your identity
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-cosmic-50 to-accent-50 rounded-3xl mb-8">
                  <motion.div 
                    className="animate-spin w-12 h-12 border-3 border-cosmic-200 border-t-cosmic-500 rounded-full mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-gray-700 font-medium text-lg">Initializing verification...</p>
                  <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
                </div>
              )}

              {/* Error Message */}
              {verificationError && (
                <motion.div 
                  className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {verificationError}
                </motion.div>
              )}

              {/* Privacy Note */}
              <div className="text-center mb-6">
                <p className="text-xs text-gray-500">
                  Your passport data is encrypted and only used for verification
                </p>
              </div>

              {/* Instructions */}
              <motion.div 
                className="p-6 bg-gradient-to-r from-cosmic-50 via-accent-50 to-warm-50 rounded-2xl border border-cosmic-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-bold text-lg mb-4 text-cosmic-700">How it works:</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-gradient-to-r from-cosmic-500 to-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">1</div>
                    <span className="font-medium">Download Self app</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-gradient-to-r from-accent-500 to-warm-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">2</div>
                    <span className="font-medium">Scan passport</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-gradient-to-r from-warm-500 to-cosmic-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">3</div>
                    <span className="font-medium">Scan QR code</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-gradient-to-r from-cosmic-600 to-accent-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">4</div>
                    <span className="font-medium">Get verified</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="text-center p-8 bg-gradient-to-br from-green-50 via-emerald-50 to-cosmic-50 rounded-3xl border-2 border-green-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <span className="text-4xl text-white">✓</span>
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Verification Complete!
              </h2>
              <p className="text-gray-700 mb-6 text-lg font-medium">
                Welcome to Cosmic. You're now verified as human.
              </p>
              <motion.div
                className="w-full h-2 bg-gradient-to-r from-cosmic-500 via-accent-500 to-green-500 rounded-full shadow-md"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, delay: 0.5 }}
              />
              <p className="text-sm text-gray-600 mt-4">Redirecting you to profile setup...</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
