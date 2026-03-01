'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Ajay Jachak',
    role: 'Co-Founder & Senior Developer',
    bio: 'Crafting the visual language of the future through glassmorphism and motion.',
    image: '/team/ajaybg.jpg',
    
  },
  {
    name: 'Aman Kumar',
    role: 'Co-Founder & Operations Lead',
    bio: 'Building the backbone of digital experiences with cutting-edge tech.',
    image: '/team/amankumar.jpg',
    
  },
  {
    name: 'Pushkar Pushp',
    role: 'Senior Developer & Unreal Developer',
    bio: 'Pushing the boundaries of interactive design with Unreal Engine and immersive tech.',
    image: '/team/pushkar.jfif',
    
  },
]

export function Team() {
  return (
    <section id="team"   className="relative py-20 md:py-40 bg-black overflow-hidden z-10" >
      {/* Background Decorative Grid */}
   {/* BACKGROUND TEXTURE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20  pointer-events-none"
        style={{ backgroundImage: "url('/bg2.jfif')" }} 
      />
      
      {/* GRADIENT MASK */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black" />

     

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-24 text-center">
          <p className="text-cyan-400 text-[10px] font-mono mb-4 uppercase tracking-[0.5em]">
            {'// Personnel Manifest'}
          </p>
          <h2 className="text-5xl md:text-7xl font-primary font-bold text-white mb-6">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">TEAM</span>
          </h2>
          <div className="w-12 h-[1px] bg-cyan-400/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular Image Container */}
              <div className="relative mb-8">
                {/* Rotating Outer Ring */}
                <div className="absolute -inset-4 border border-dashed border-cyan-400/20 rounded-full animate-[spin_20s_linear_infinite] group-hover:border-cyan-400/50 transition-colors" />
                
                <div className="relative w-50 h-50 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 grayscale group-hover:grayscale-0 group-hover:border-cyan-400 transition-all duration-500 shadow-2xl">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay with Links */}
                  {/* <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <div className="flex gap-4">
                        <a href={member.links.github} className="text-white hover:text-cyan-400 transition-colors"><Github size={20} /></a>
                        <a href={member.links.linkedin} className="text-white hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
                        <a href={member.links.twitter} className="text-white hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-primary font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-[0.3em]">
                  {member.role}
                </p>
                <p className="text-sm text-white/50 font-mono leading-relaxed max-w-[250px] mx-auto">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}