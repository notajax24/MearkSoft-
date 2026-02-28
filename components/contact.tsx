'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

export function Contact() {
  const sectionRef = useRef(null)

  // Setup Scroll Parallax for the background orb
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Orb moves up slightly as user scrolls down
  const orbY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1])

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
    // Added overflow-hidden to contain the background layers
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 z-10 overflow-hidden">
      
      {/* BACKGROUND IMAGE LAYER */}
      {/* I've used bg2.jfif here as the dark, dramatic center looks great behind a form, but you can swap it */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-screen"
        style={{ backgroundImage: "url('/bg2.jfif')" }} 
      />
      
      {/* GRADIENT OVERLAYS */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      <div className="absolute inset-0 z-0 bg-black/60" />

      {/* PARALLAX GLOWING ORB */}
      <motion.div 
        style={{ y: orbY, opacity: orbOpacity }}
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-magenta-500/20 rounded-full filter blur-[120px] pointer-events-none z-0" 
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Scroll-triggered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-neon text-sm font-mono mb-2 uppercase tracking-widest">
            {'// get in touch'}
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-white mb-4 drop-shadow-lg">
            LET'S BUILD <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">TOGETHER</span>
          </h2>
          <p className="mt-4 text-white/70 font-mono text-sm max-w-2xl mx-auto drop-shadow-md">
            Ready to transform your business? Contact us to discuss your project and infrastructure needs.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Glassmorphic Form Container */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 md:p-10 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Success message */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 border border-cyan-400/50 bg-cyan-400/10 text-cyan-400 rounded-lg text-center font-mono text-sm backdrop-blur-md"
              >
                {'✓ Message initialized and sent successfully. We\'ll be in touch.'}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                  {'> Name'}
                </label>
                {/* Upgraded Inputs: Glassy look with strong focus states */}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-white/30"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                  {'> Email'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-white/30"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                {'> Company (Optional)'}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-white/30"
                placeholder="Your organization"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
                {'> Message'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-5 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-white/30 resize-none"
                placeholder="Define your project parameters..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 mt-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 text-cyan-50 font-bold rounded-lg hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {isSubmitting ? 'Transmitting...' : 'Initialize Contact'}
            </motion.button>

            <p className="text-xs text-white/40 text-center font-mono mt-4">
              {'// Secure transmission channel. ETA for response: < 24 hrs'}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}