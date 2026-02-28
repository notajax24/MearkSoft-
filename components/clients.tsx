'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef, useState, useEffect } from 'react'

const clients = [
  'TechCorp',
  'FinanceSecure',
  'RetailGlobal',
  'StreamTech',
  'ManufacturePro',
  'SupplyChain',
  'CloudNine',
  'DataVault',
]

export function Clients() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    // target full viewport width scrolling
    setDistance(window.innerWidth);
    // optionally update on resize
    const onResize = () => setDistance(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    // Removed bg-background and added overflow-hidden to contain the new background image
    <section ref={ref} className="relative py-16 md:py-24 border-y border-cyan-neon/20 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-screen"
        style={{ backgroundImage: "url('/bg2.jfif')" }}
      />
      
      {/* GRADIENT OVERLAYS */}
      {/* Top and bottom black fade to seamlessly merge with the rest of the dark site */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black via-transparent to-black opacity-90" />
      {/* Dark overlay to ensure the bright center of the image doesn't wash out the text */}
      <div className="absolute inset-0 z-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2">{'// trusted by industry leaders'}</p>
          {/* Added a drop shadow to the heading for better contrast against the glow */}
          <h2 className="heading-md text-violet-glow drop-shadow-lg">Our Clients</h2>
        </motion.div>

        {/* Animated marquee */}
       <div className="overflow-hidden py-8 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -2000 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center px-8 py-4 min-w-max"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-xl font-bold text-white/60 hover:text-cyan-neon transition-colors duration-300 drop-shadow-md">
                  {'< '}{client}{' />'}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mt-12 text-center"
        >
          {/* Upgraded cards to use a glassmorphism effect */}
          <div className="p-6 border border-cyan-neon/30 rounded-xl bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 duration-300">
            <div className="text-3xl md:text-5xl font-bold text-cyan-neon drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">10+</div>
            <p className="text-sm md:text-base text-white/80 mt-2 font-mono">Projects Delivered</p>
          </div>
          <div className="p-6 border border-violet-glow/30 rounded-xl bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 duration-300">
            <div className="text-3xl md:text-5xl font-bold text-violet-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">4+</div>
            <p className="text-sm md:text-base text-white/80 mt-2 font-mono">Years Experience</p>
          </div>
          <div className="p-6 border border-cyan-neon/30 rounded-xl bg-black/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1 duration-300">
            {/* Swapped magenta-pulse for cyan-neon to keep the color palette cohesive, but you can change it back if you prefer! */}
            <div className="text-3xl md:text-5xl font-bold text-cyan-neon drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">24/7</div>
            <p className="text-sm md:text-base text-white/80 mt-2 font-mono">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}