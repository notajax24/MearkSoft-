"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const rightContentRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    
    // We only want the last 100 frames (frames 51 to 150)
    const frameCount = 70;
    const frameOffset = 50; 
    
    // High-res internal dimensions (Native 16:9 ratio)
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) =>
      `/sequence2/ezgif-frame-${(index + 1 + frameOffset).toString().padStart(3, "0")}.png`;

    const images: HTMLImageElement[] = [];
    const frames = { current: 0 };

    // --- MOBILE FIX: OPTIMIZED CANVAS RENDER ---
    // By removing the JS cropping math, we let Tailwind's 'object-cover' 
    // handle the responsiveness. This is 10x smoother on mobile CPUs.
    const renderCanvas = (img: HTMLImageElement) => {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => {
      renderCanvas(images[0]);
      setIsLoaded(true); 
    };

    // --- GSAP SCROLL TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: "+=2500", 
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // 1. Image Sequence Animation
    tl.to(frames, {
      current: frameCount - 1,
      snap: "current",
      duration: frameCount,
      ease: "none",
      onUpdate: () => {
        const img = images[frames.current];
        if (img && img.complete) {
          renderCanvas(img);
        }
      },
    }, 0);

    // 2. Hide Scroll Indicator early
    tl.to(scrollIndicatorRef.current, { opacity: 0, y: 20, duration: 10 }, 0);

    // 3. THE EXIT ANIMATION
    const exitStart = 40;

    tl.to(badgeRef.current, {
        opacity: 0,
        y: -50,
        filter: "blur(15px)",
        duration: 15
    }, exitStart);

    tl.to(leftContentRef.current, {
      x: "-120vw", 
      opacity: 0,
      filter: "blur(20px)",
      skewX: -15, 
      duration: 35,
      ease: "power2.in"
    }, exitStart);

    tl.to(rightContentRef.current, {
      x: "120vw", 
      opacity: 0,
      filter: "blur(20px)",
      skewX: 15,
      duration: 35,
      ease: "power2.in"
    }, exitStart + 2);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full bg-black">
      <div ref={pinRef} className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* MOBILE FIX: Added 'object-center' to ensure the statue stays in the middle on phones */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-90"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl pointer-events-none">
           
            <img className="w-50 bg-cover p-0" src="./mearksoftnameonly.png" alt="" />
            
          
          <motion.div
            ref={badgeRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            className="mb-6 md:mb-10 inline-flex items-center gap-3 px-4 md:px-6 py-2 bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-full text-[8px] md:text-[10px] text-cyan-400 font-mono uppercase tracking-[0.4em] shadow-[0_0_15px_rgba(6,182,212,0.1)]"
          >
            
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            MearkSoft // System Initialized
          </motion.div>

          <div className="flex flex-col items-center pointer-events-auto w-full">
            <div className="overflow-visible w-full">
                <motion.div 
                    ref={leftContentRef}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                >
                    <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[9.5rem] font-primary font-bold text-white leading-[0.9] tracking-tighter drop-shadow-lg">
                        TRANSFORMING
                    </h1>
                </motion.div>

                <motion.div 
                    ref={rightContentRef}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, delay: 0.7, ease: "circOut" }}
                    className="flex flex-col items-center w-full"
                >
                    <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[9.5rem] font-primary font-bold mb-6 md:mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-cyan-500/50 leading-[0.9] drop-shadow-lg">
                        THE FUTURE
                    </h1>
                    
                    <p className="max-w-[90%] md:max-w-2xl mx-auto text-white/50 font-mono text-[10px] md:text-sm lg:text-lg mb-8 md:mb-14 tracking-[0.2em] md:tracking-widest uppercase text-balance">
                        <span className="text-cyan-400">_</span>Sleek architecture for modern digital problems
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center w-full max-w-xs sm:max-w-none mx-auto">
                        <button className="group relative w-full sm:w-auto px-8 md:px-14 py-4 md:py-5 bg-cyan-500/5 backdrop-blur-md border border-cyan-400/30 text-cyan-400 rounded-sm overflow-hidden transition-all hover:bg-cyan-500/20 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                            <span className="relative z-10">[ Initialize ]</span>
                            <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                        <button className="w-full sm:w-auto px-8 md:px-14 py-4 md:py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white/70 rounded-sm hover:bg-white/10 transition-all font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                            Learn_More
                        </button>
                    </div>
                </motion.div>
            </div>
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="hidden md:flex absolute bottom-12 flex-col items-center gap-5 opacity-0 animate-fade-in">
          <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-500/50 to-transparent relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 animate-scroll-line" />
          </div>
          <span className="text-[9px] text-cyan-400/40 font-mono uppercase tracking-[0.6em] rotate-90 origin-left translate-x-1">Scroll</span>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1s forwards 1.5s; }
        @keyframes scroll-line { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .animate-scroll-line { animation: scroll-line 2.5s cubic-bezier(0.76, 0, 0.24, 1) infinite; }
      `}</style>
    </section>
  );
}