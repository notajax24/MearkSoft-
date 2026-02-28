'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-gradient-to-t from-card/30 to-background">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta-pulse/10 rounded-full filter blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2">{'// get in touch'}</p>
          <h2 className="heading-lg text-cyan-neon">Let's Build Together</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Ready to transform your business? Contact us to discuss your project.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 border border-cyan-neon/20 rounded bg-card/50 backdrop-blur"
          >
            {/* Success message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 border border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon rounded text-center"
              >
                {'✓ Message sent successfully! We\'ll be in touch soon.'}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-mono text-cyan-neon mb-2">
                {'> Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background border border-cyan-neon/30 text-foreground rounded focus:border-cyan-neon focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyan-neon mb-2">
                {'> Email'}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-background border border-cyan-neon/30 text-foreground rounded focus:border-cyan-neon focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyan-neon mb-2">
                {'> Company'}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-cyan-neon/30 text-foreground rounded focus:border-cyan-neon focus:outline-none transition-colors"
                placeholder="Your company"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-cyan-neon mb-2">
                {'> Message'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 bg-background border border-cyan-neon/30 text-foreground rounded focus:border-cyan-neon focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-cyan-neon text-background font-bold rounded hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

            <p className="text-xs text-foreground/50 text-center font-mono">
              {'// We\'ll respond within 24 hours'}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
