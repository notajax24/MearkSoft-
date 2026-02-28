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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-card/30">
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-neon/10 rounded-full filter blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2">{'// featured projects'}</p>
          <h2 className="heading-lg text-cyan-neon">Portfolio</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Showcase of successful projects and transformations we've delivered
          </p>
        </motion.div>

        {/* Portfolio grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded border border-cyan-neon/20 hover:border-cyan-neon/50 transition-all duration-300 bg-card/50 cursor-pointer"
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-glow/20 to-magenta-pulse/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-cyan-neon/10 border border-cyan-neon/30 text-cyan-neon rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-cyan-neon mb-2">{project.title}</h3>
                <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{project.description}</p>

                <div className="text-sm text-violet-glow font-mono mb-4">
                  {'> Client: '}<span className="text-magenta-pulse">{project.client}</span>
                </div>

                {/* Hover reveal */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={hoveredId === project.id ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-cyan-neon text-background font-bold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-sm"
                  >
                    View Project →
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
