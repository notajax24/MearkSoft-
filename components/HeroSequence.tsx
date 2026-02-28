"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  // --- NEW LOADING STATES ---
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    
    const frameCount = 240;
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) =>
      `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const frames = { current: 0 };
    let loadedCount = 0;

    // --- PRELOADING LOGIC ---
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      
      img.onload = () => {
        loadedCount++;
        // Calculate percentage for the loading screen
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadingProgress(progress);

        // If it's the very first frame, draw it immediately so the canvas isn't empty
        if (i === 0) {
          context.drawImage(img, 0, 0);
        }

        // Once ALL frames are loaded, remove the loading screen and initialize GSAP
        if (loadedCount === frameCount) {
          setIsReady(true);
          initGSAP(); 
        }
      };
      images.push(img);
    }

    // --- GSAP LOGIC (Wrapped in a function so it waits for images) ---
    const initGSAP = () => {
      if (textContainerRef.current) {
        gsap.set(textContainerRef.current.children, { 
          opacity: 0, x: -40, filter: "blur(10px)" 
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 0.5,
          pin: true,
        },
      });

      tl.to(frames, {
        current: frameCount - 1,
        snap: "current",
        duration: frameCount,
        ease: "none",
        onUpdate: () => {
          if (images[frames.current] && canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[frames.current], 0, 0);
          }
        },
      }, 0);

      tl.to(scrollIndicatorRef.current, {
        opacity: 0, y: 20, duration: 20, ease: "power2.out",
      }, 0);

      tl.to(textContainerRef.current!.children, {
        opacity: 1, x: 0, filter: "blur(0px)", duration: 50, stagger: 15, ease: "power3.out",
      }, 70); 
    };

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full bg-black">
      
      {/* --- FUTURISTIC PRELOADER --- */}
      <AnimatePresence>
        {!isReady && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          >
            <div className="w-64 flex flex-col items-center gap-4">
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                Initializing Protocols
              </span>
              {/* Progress Bar Container */}
              <div className="w-full h-1 bg-white/10 overflow-hidden relative rounded-full">
                {/* Progress Bar Fill */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_15px_#00ffff]"
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>
              <span className="text-white/50 font-mono text-xs">
                [{loadingProgress}%] Assets Loaded
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Your standard pinned Hero container below */}
      <div ref={pinRef} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover md:object-contain z-0 opacity-80"
        />

        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-16 lg:px-24 pointer-events-none">
          <div ref={textContainerRef} className="flex flex-col items-start text-left max-w-2xl pointer-events-auto">
            <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00ffff]" />
              Welcome to MearkSoft // System Initialized
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-[1.1]">
              TRANSFORMING IDEAS <br/> INTO <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">REALITY</span>
            </h1>
            <div className="mb-10 max-w-xl">
              <p className="text-lg text-white/70 font-mono leading-relaxed relative inline-block drop-shadow-md">
                <span className="text-violet-500 mr-2">{'>'}</span>
                Building sleek, scalable web experiences that put users first. Effortless solutions for modern problems.
                <span className="inline-block w-2.5 h-5 bg-cyan-400 ml-2 align-middle animate-pulse" />
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-3 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/50 text-cyan-50 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 uppercase tracking-wider text-sm font-bold">
                Get Started
              </button>
              <button className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-lg hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 uppercase tracking-wider text-sm font-bold">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[10px] text-cyan-400/70 font-mono uppercase tracking-[0.3em]">Initialize sequence</span>
          <div className="w-px h-16 bg-white/10 overflow-hidden relative">
            <div className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[scrolldown_2s_ease-in-out_infinite]" />
          </div>
        </div>

      </div>
    </section>
  );
}