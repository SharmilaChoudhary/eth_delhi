'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  quote: string
  authors: string
  status: string
  zodiac: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  currentTestimonial: number
  setCurrentTestimonial: (index: number) => void
}

export default function Testimonials({ 
  testimonials, 
  currentTestimonial, 
  setCurrentTestimonial 
}: TestimonialsProps) {
  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1
    )
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cosmic-50 via-warm-50 to-accent-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-lg text-gray-600">
            Real couples who found love through the stars
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Quote Icon */}
            <div className="absolute top-6 left-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-4 mb-2">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {testimonials[currentTestimonial].authors}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-lg text-purple-600 font-medium mb-2">
                    {testimonials[currentTestimonial].status}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[currentTestimonial].zodiac}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial
                    ? 'bg-purple-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-1">2M+</div>
            <p className="text-sm text-gray-600">Connections</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-1">500K+</div>
            <p className="text-sm text-gray-600">Couples</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-1">95%</div>
            <p className="text-sm text-gray-600">Success</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
