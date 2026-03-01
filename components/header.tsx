'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll logic: Hide on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${lastScrollY > 50 ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          
            
            <Image 
              src="/logomain.png" 
              alt="MearkSoft" 
              width={100} 
              height={100} 
              className="transition-transform duration-500 group-hover:scale-110"
            />
          
          
        </motion.div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-[15px] font-mono uppercase tracking-[0.2em] text-white/60 hover:text-cyan-400 transition-colors duration-300"
            >
              {item.label}
            </motion.a>
          ))}
          
          <motion.a
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[15px] ml-4 px-6 py-2 bg-white text-black font-mono font-bold uppercase tracking-widest rounded-sm hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/40"
          >
            Get Started
          </motion.a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <div className={`w-6 h-px bg-cyan-400 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-px bg-cyan-400 transition-all ${isOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-px bg-cyan-400 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-mono text-white/70 hover:text-cyan-400 transition-colors py-2 border-b border-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-cyan-400 text-black text-center font-bold font-mono text-xs uppercase tracking-widest rounded-sm"
              >
                Get Started
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}