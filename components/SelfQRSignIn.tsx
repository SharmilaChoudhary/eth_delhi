'use client'

import Link from "next/link"
import { motion } from 'framer-motion'

export default function SelfQRSignIn() {

  return (
    <Link href="/signin">
      <motion.button
        className="px-6 py-3 bg-gradient-to-r from-cosmic-500 via-accent-500 to-warm-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
      >
        Sign in
      </motion.button>
    </Link>
  )
}

