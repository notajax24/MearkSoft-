'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import portfolioData from '@/lib/portfolio.json'
import Image from 'next/image'
import { useState } from 'react'

export function Portfolio() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
    // Replaced solid bg with overflow-hidden to contain the background image
    <section id="portfolio" ref={ref} className="relative py-20 md:py-32 z-10 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('/neonbg.jfif')" }} // Change to your preferred bg image
      />
      
      {/* GRADIENT OVERLAYS FOR BLENDING */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      <div className="absolute inset-0 z-0 bg-black/50" />

      {/* Replaced the static neon blur with a subtle animated one for extra depth */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full filter blur-[100px] pointer-events-none z-0" 
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2 uppercase tracking-widest">
            {'// featured projects'}
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-white mb-4 drop-shadow-lg">
            OUR <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">PORTFOLIO</span>
          </h2>
          <p className="mt-4 text-white/70 font-mono text-sm max-w-2xl mx-auto drop-shadow-md">
            Showcase of successful projects and digital transformations we've delivered for our clients.
          </p>
        </motion.div>

        {/* Portfolio grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioData?.projects?.map?.((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              // Upgraded to glassmorphism styling
              className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-cyan-neon/50 transition-all duration-500 bg-black/40 backdrop-blur-xl cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,255,255,0.15)]"
            >
              {/* Glass top highlight reflection */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

              {/* Image container */}
              <div className="relative h-56 overflow-hidden bg-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                {/* Gradient overlay on image to make the transition to text smoother */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.technologies?.map?.((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-full font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-neon transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="text-xs text-violet-400 font-mono mb-2">
                  {'> Client: '}<span className="text-white">{project.client}</span>
                </div>

                {/* Hover reveal button */}
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={hoveredId === project.id ? { opacity: 1, height: 'auto', marginTop: 16 } : { opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 text-cyan-50 font-bold rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 text-sm tracking-wide uppercase"
                  >
                    View Project <span className="ml-2">→</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}