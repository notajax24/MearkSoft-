'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    // Added overflow-hidden and absolute positioning for the background layers
    <footer className="relative z-10 bg-black overflow-hidden border-t border-white/10">
      
      {/* BACKGROUND IMAGE LAYER */}
      {/* Opacity is kept very low (15%) so it doesn't distract from the text, but adds texture */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-screen grayscale-[50%]"
        style={{ backgroundImage: "url('/neonbg.jfif')" }} 
      />
      
      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/95 to-black/90" />

      {/* Animated Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-50" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-4 tracking-wide text-white drop-shadow-md">
              Meark<span className="text-cyan-400">Soft</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-mono">
              Next-generation digital solutions and enterprise IT architecture for the modern frontier.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-400 mb-6 uppercase tracking-widest font-mono">{'// Services'}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {['Portfolio Architecture', 'UI/UX & Web Design', 'Full-Stack Dev', 'Cloud Hosting'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center hover:text-cyan-400 transition-colors duration-300">
                    <span className="text-cyan-400/0 group-hover:text-cyan-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mr-2">
                      {'>'}
                    </span>
                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-400 mb-6 uppercase tracking-widest font-mono">{'// Resources'}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {['Documentation', 'Case Studies', 'System Status', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center hover:text-cyan-400 transition-colors duration-300">
                    <span className="text-cyan-400/0 group-hover:text-cyan-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mr-2">
                      {'>'}
                    </span>
                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-400 mb-6 uppercase tracking-widest font-mono">{'// Connect'}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {['LinkedIn', 'GitHub', 'Twitter / X'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center hover:text-cyan-400 transition-colors duration-300">
                    <span className="text-cyan-400/0 group-hover:text-cyan-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mr-2">
                      {'>'}
                    </span>
                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-mono tracking-wide">
          <p>{'© '}{currentYear}{' MearkSoft. All protocols active.'}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
        
      </div>
    </footer>
  )
}