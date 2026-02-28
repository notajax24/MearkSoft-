'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-background border-y border-cyan-neon/20">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2">{'// trusted by industry leaders'}</p>
          <h2 className="heading-md text-violet-glow">Our Clients</h2>
        </motion.div>

        {/* Animated marquee */}
        <div className="overflow-hidden py-8">
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
                <div className="text-xl font-bold text-cyan-neon/60 hover:text-cyan-neon transition-colors duration-300">
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
          <div className="p-4 border border-cyan-neon/20 rounded bg-card/50">
            <div className="text-3xl md:text-4xl font-bold text-cyan-neon">50+</div>
            <p className="text-sm text-foreground/60 mt-2">Projects Delivered</p>
          </div>
          <div className="p-4 border border-cyan-neon/20 rounded bg-card/50">
            <div className="text-3xl md:text-4xl font-bold text-violet-glow">8+</div>
            <p className="text-sm text-foreground/60 mt-2">Years Experience</p>
          </div>
          <div className="p-4 border border-cyan-neon/20 rounded bg-card/50">
            <div className="text-3xl md:text-4xl font-bold text-magenta-pulse">24/7</div>
            <p className="text-sm text-foreground/60 mt-2">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
