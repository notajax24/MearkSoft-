'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Radial glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-neon rounded-full filter blur-3xl opacity-5" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-glow rounded-full filter blur-3xl opacity-5" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-block px-4 py-2 border border-cyan-neon/50 rounded text-sm text-cyan-neon font-mono"
          >
            {'// next generation technology'}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading-xl mb-6 text-cyan-neon drop-shadow-lg"
          >
            Transform Your Business
            <br />
            <span className="text-violet-glow">With Advanced Solutions</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8 leading-relaxed"
          >
            Cutting-edge IT solutions for the digital age. We engineer tomorrow's technology today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 mt-8"
          >
            <button className="px-8 py-3 bg-cyan-neon text-background font-bold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-3 border border-cyan-neon text-cyan-neon font-bold rounded hover:bg-cyan-neon/10 transition-all duration-300">
              Learn More
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-cyan-neon text-sm"
            >
              {'▼ Scroll to explore'}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
