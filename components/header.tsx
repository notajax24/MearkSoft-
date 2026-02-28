'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Smart scroll logic
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down past 80px -> hide header
        setIsVisible(false)
        // Close mobile menu if it's open while scrolling down
        if (isOpen) setIsOpen(false) 
      } else {
        // Scrolling up -> show header
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, isOpen])

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-b border-cyan-neon/20 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold text-cyan-neon"
        >
        MearkSoft
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-foreground/80 hover:text-cyan-neon transition-colors duration-300 text-sm"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:inline-block px-6 py-2 bg-cyan-neon text-background font-bold rounded text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        >
          Get Started
        </motion.a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-neon text-2xl"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-card border-b border-cyan-neon/20 p-4 space-y-2"
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-foreground/80 hover:text-cyan-neon transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-4 bg-cyan-neon text-background font-bold rounded text-sm mt-2"
          >
            Get Started
          </a>
        </motion.nav>
      )}
    </header>
  )
}