'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-cyan-neon/20">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-cyan-neon mb-4">NeuralForge</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Next-generation IT solutions for the modern enterprise.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-glow mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">AI & ML</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">DevOps</a></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-glow mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-violet-glow mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-neon transition-colors">Discord</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-neon/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>{'© '}{currentYear}{' NeuralForge. All rights reserved.'}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-neon transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-neon transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-neon transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
