'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

// Ensure these images exist in your public folder
const clients = [
  { logo: "clients/client1.png", name: "Client 1" },
  { logo: "clients/client2.png", name: "Client 2" },
  { logo: "clients/client3.png", name: "Client 3" }, 
  { logo: "clients/client1.png", name: "Client 4" }, // Added a few more to make the marquee look full
  { logo: "clients/client2.png", name: "Client 5" },
  { logo: "clients/client3.png", name: "Client 6" },
  
]

export function Clients() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // We duplicate the array so the marquee loops seamlessly
  const marqueeItems = [...clients, ...clients];

  return (
    <section id='clients' ref={ref} className="relative py-24 md:py-32 border-y border-white/10 overflow-hidden bg-black z-10">
      
      {/* BACKGROUND TEXTURE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-screen grayscale pointer-events-none"
        style={{ backgroundImage: "url('/bg2.gif')" }} // Make sure extension is correct
      />
      
      {/* GRADIENT OVERLAYS (Fixed syntax) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute inset-0 z-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-[10px] font-mono mb-4 uppercase tracking-[0.5em]">
            {'// Network Established'}
          </p>
          <h2 className="text-4xl md:text-6xl font-primary font-bold text-white mb-6 tracking-tighter drop-shadow-lg">
            TRUSTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">PARTNERS</span>
          </h2>
          <div className="w-12 h-[1px] bg-cyan-400/50 mx-auto" />
        </motion.div>

        {/* CSS/Framer Motion Seamless Marquee */}
        <div className="overflow-hidden py-8 relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }} // Perfectly scrolls exactly half its width, then seamlessly resets
            transition={{
              duration: 25, // Adjust speed here
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex w-fit gap-16 md:gap-24 items-center pr-16 md:pr-24"
          >
            {marqueeItems.map((client, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center min-w-[120px] md:min-w-[150px] group cursor-pointer"
              >
                {/* Replaced standard img with Next/Image and added hover glow */}
                <div className="relative w-full h-16 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 drop-shadow-[0_0_15px_rgba(0,255,255,0)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
                   <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="w-full h-full object-contain"
                   />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-24 text-center max-w-5xl mx-auto"
        >
          {/* Stat Card 1 */}
          <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-2 hover:border-cyan-400/50 duration-500 group">
            <div className="text-4xl md:text-6xl font-primary font-bold text-white group-hover:text-cyan-400 transition-colors">10+</div>
            <p className="text-xs text-white/50 mt-4 font-mono uppercase tracking-[0.2em]">Projects Delivered</p>
          </div>
          
          {/* Stat Card 2 */}
          <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-2 hover:border-violet-500/50 duration-500 group">
            <div className="text-4xl md:text-6xl font-primary font-bold text-white group-hover:text-violet-400 transition-colors">4+</div>
            <p className="text-xs text-white/50 mt-4 font-mono uppercase tracking-[0.2em]">Years Experience</p>
          </div>
          
          {/* Stat Card 3 */}
          <div className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-2 hover:border-cyan-400/50 duration-500 group">
            <div className="text-4xl md:text-6xl font-primary font-bold text-white group-hover:text-cyan-400 transition-colors">24/7</div>
            <p className="text-xs text-white/50 mt-4 font-mono uppercase tracking-[0.2em]">System Support</p>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}