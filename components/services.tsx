'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { LayoutTemplate, MonitorSmartphone, Code2, Server, Palette, Cpu } from 'lucide-react'

// Updated services array based on your new offerings
const services = [
  {
    icon: <LayoutTemplate size={32} strokeWidth={1.5} />,
    title: 'Portfolio Architecture',
    description: 'Immersive, high-performance digital portfolios designed to showcase your work and elevate your personal brand.',
  },
  {
    icon: <MonitorSmartphone size={32} strokeWidth={1.5} />,
    title: 'UI/UX & Web Design',
    description: 'Next-generation user interfaces featuring modern, glassmorphic, and highly engaging visual aesthetics.',
  },
  {
    icon: <Code2 size={32} strokeWidth={1.5} />,
    title: 'Full-Stack Development',
    description: 'Robust, scalable web applications and custom software engineered with cutting-edge modern frameworks.',
  },
  {
    icon: <Server size={32} strokeWidth={1.5} />,
    title: 'Cloud Hosting',
    description: 'Secure, high-availability server deployment, domain management, and continuous scaling solutions.',
  },
  {
    icon: <Palette size={32} strokeWidth={1.5} />,
    title: 'Graphic & Brand Design',
    description: 'Striking visual identities, logo creation, social media assets, and comprehensive branding packages.',
  },
  {
    icon: <Cpu size={32} strokeWidth={1.5} />,
    title: 'IT Consulting & Solutions',
    description: 'End-to-end technical support, system architecture setups, and custom IT operations for your business.',
  },
]

export function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    // Added overflow-hidden so the background doesn't bleed out
    <section id="services" ref={ref} className="relative py-20 md:py-32 z-10 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/neonbg.jfif')" }}
      />
      
      {/* GRADIENT OVERLAYS FOR BLENDING & READABILITY */}
      {/* Top and bottom black fade so it merges smoothly with surrounding sections */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      {/* Overall slight dark tint to ensure the white text remains highly readable */}
      <div className="absolute inset-0 z-0 bg-black/30" />

      {/* Content wrapper with relative positioning to sit above the background */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2 uppercase tracking-widest">
            {'// Active Capabilities'}
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-white mb-4">
            CORE <span className="text-cyan-neon">PROTOCOLS</span>
          </h2>
          <p className="mt-4 text-white/70 font-mono text-sm max-w-2xl mx-auto drop-shadow-md">
            Comprehensive digital solutions tailored to accelerate your brand's growth and technological infrastructure.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              // Added a slightly stronger glass backdrop to contrast nicely with the neon background
              className="glass-card-interactive bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Glass top highlight reflection */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
              
              {/* Icon Container */}
              <div className="text-cyan-neon mb-6 p-4 bg-black/40 border border-cyan-400/20 inline-flex rounded-xl group-hover:bg-cyan-neon group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_#00ffff80]">
                {service.icon}
              </div>
              
              {/* Text Content */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-primary tracking-wide group-hover:text-cyan-neon transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm font-mono text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>

              {/* Decorative accent line that animates on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-neon transition-all duration-500 group-hover:w-full opacity-50" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}