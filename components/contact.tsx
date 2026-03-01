'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export function Contact() {
  const sectionRef = useRef(null)

  // Scroll Parallax for the background decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const orbY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    
    try {
      // Data insertion into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            company: formData.company, 
            message: formData.message 
          },
        ])

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)

    } catch (err) {
      console.error('Supabase Error:', err)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-40 z-10 overflow-hidden bg-black">
      
      {/* BACKGROUND TEXTURE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 grayscale pointer-events-none"
        style={{ backgroundImage: "url('/bg2.jfif')" }} 
      />
      
      {/* GRADIENT MASK */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* PARALLAX DECORATIVE ORB */}
      <motion.div 
        style={{ y: orbY, opacity: orbOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none z-0" 
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-cyan-400 text-[10px] font-mono mb-4 uppercase tracking-[0.5em]">
            {'// Initializing Communication'}
          </p>
          <h2 className="text-5xl md:text-7xl font-primary font-bold text-white mb-6">
            LET&apos;S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">CONNECT</span>
          </h2>
          <div className="w-16 h-[1px] bg-cyan-400/50 mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-8 p-8 md:p-12 border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-3xl shadow-2xl"
          >
            {/* Success/Error Feedback */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-4 border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 rounded font-mono text-xs text-center"
                >
                  {'[ SUCCESS ]: DATA TRANSMITTED TO SECURE STORAGE.'}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="p-4 border border-red-500/30 bg-red-500/5 text-red-500 rounded font-mono text-xs text-center"
                >
                  {'[ ERROR ]: TRANSMISSION INTERRUPTED. CHECK CONNECTION.'}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-all font-mono placeholder:text-white/10"
                  placeholder="AJAY JACHAK"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-all font-mono placeholder:text-white/10"
                  placeholder="USER@MEARKSOFT.COM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Company / Organization</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-all font-mono placeholder:text-white/10"
                placeholder="OPTIONAL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Project Parameters</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white focus:border-cyan-400 focus:outline-none transition-all font-mono placeholder:text-white/10 resize-none"
                placeholder="DESCRIBE YOUR VISION..."
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-xs hover:bg-cyan-400 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Transmitting...' : 'Send Message'}
              </button>
            </div>

            <p className="text-[9px] text-white/20 text-center font-mono">
              BY SENDING, YOU AGREE TO OUR ENCRYPTED DATA HANDLING PROTOCOLS.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}