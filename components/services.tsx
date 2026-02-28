'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const services = [
  {
    icon: '⚡',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions built on AWS, Azure, and Google Cloud with enterprise-grade security.',
  },
  {
    icon: '🔐',
    title: 'Cybersecurity',
    description: 'Zero-trust architecture and advanced threat detection to protect your critical assets.',
  },
  {
    icon: '🤖',
    title: 'AI & Machine Learning',
    description: 'Custom AI solutions for predictive analytics, automation, and intelligent decision-making.',
  },
  {
    icon: '📊',
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with real-time analytics platforms.',
  },
  {
    icon: '🔧',
    title: 'DevOps & Automation',
    description: 'CI/CD pipelines, infrastructure as code, and automated deployment strategies.',
  },
  {
    icon: '🌐',
    title: 'Enterprise Solutions',
    description: 'Custom enterprise applications designed for mission-critical operations.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-background">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-glow/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-magenta-pulse/10 rounded-full filter blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2">{'// services'}</p>
          <h2 className="heading-lg text-violet-glow">Our Services</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to your unique business needs
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 border border-cyan-neon/20 rounded bg-card/50 hover:bg-card hover:border-cyan-neon/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-cyan-neon mb-3">{service.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
