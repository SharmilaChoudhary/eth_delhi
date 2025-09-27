'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion'
import { SelfQRcodeWrapper, SelfAppBuilder } from '@selfxyz/qrcode'
import { v4 as uuidv4 } from 'uuid'

export default function SelfQRSignIn() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(null)
  const [selfApp, setSelfApp] = useState<any | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isVisible && !selfApp) {
      try {
        const newUserId = uuidv4()
        setUserId(newUserId)
        
        const app = new SelfAppBuilder({
          version: 2,
          appName: "Cosmic Connections",
          scope: "self-workshop",
          endpoint: "0x4E0E06726521396edF446967d8E697c15F58AC9C",
          logoBase64: "https://i.postimg.cc/mrmVf9hm/self.png",
          userId: newUserId,
          endpointType: "celo",
          userIdType: "uuid",
          userDefinedData: "Welcome to Cosmic Connections!",
          disclosures: {
            minimumAge: 18,
            ofac: false,
            excludedCountries: ['USA'],
          }
        }).build()
        
        setSelfApp(app)
      } catch (error) {
        console.error("Failed to initialize Self app:", error)
        setVerificationError("Failed to initialize verification")
      }
    }
  }, [isVisible])

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
    
    // Close modal after a short delay and redirect
    setTimeout(() => {
      setIsVisible(false)
      router.push("/dashboard")
    }, 2000)
  }

  const handleVerificationError = (error: any) => {
    const errorCode = error.error_code || 'Unknown'
    const reason = error.reason || 'Unknown error'
    console.error(`Error ${errorCode}: ${reason}`)
    setVerificationError(`Verification failed: ${reason}`)
  }

  if (!isVisible) {
    return (
      <motion.button
        onClick={() => setIsVisible(true)}
        className="px-6 py-3 bg-gradient-to-r from-cosmic-500 via-accent-500 to-warm-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign in with Self
      </motion.button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => !isVerified && setIsVisible(false)}>
      <div 
        className="max-w-md w-full mx-4 bg-white rounded-lg shadow-lg p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold" style={{ color: "#1c7f8f" }}>
            Cosmic Connections
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-2 text-black">Verify Your Identity</h1>
          <p className="text-gray-600">Scan this QR code with the Self app to verify you're a real human</p>
        </div>

        {!isVerified ? (
          <div className="text-center">
            {selfApp ? (
              <div className="mb-6">
                <SelfQRcodeWrapper
                  selfApp={selfApp}
                  onSuccess={handleVerificationSuccess}
                  onError={handleVerificationError}
                  size={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
              </div>
            )}

            {verificationError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {verificationError}
              </div>
            )}

            <div className="text-center mb-4">
              <p className="text-xs text-gray-500">
                Your passport data is encrypted and only used for verification
              </p>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">How it works:</h3>
              <ol className="text-xs text-gray-600 space-y-1">
                <li>1. Download the Self app</li>
                <li>2. Scan your passport with the app</li>
                <li>3. Scan the QR code above</li>
                <li>4. Get verified as a real human</li>
              </ol>
            </div>

            {userId && (
              <p className="text-xs text-gray-500 mt-4">
                User ID: {userId.substring(0, 8)}...
              </p>
            )}

            <button
              onClick={() => setIsVisible(false)}
              className="mt-4 w-full px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-500">
              <span className="text-2xl text-white">✓</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-black">Verification Complete!</h2>
            <p className="text-gray-600 mb-6">Welcome to Cosmic Connections. You're now verified as human.</p>
          </div>
        )}
      </div>
    </div>
  )
}

