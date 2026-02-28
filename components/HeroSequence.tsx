"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSequence() {
  // Refs for GSAP
  const pinRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Refs for text elements to animate
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    
    const frameCount = 240;
    // Set these to match the exact resolution of your ezgif frames
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) =>
      `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    const frames = { current: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => {
      context.drawImage(images[0], 0, 0);
    };

    // --- SETUP INITIAL STATES ---
    // Hide the text children initially with a futuristic blur and left offset
    if (textContainerRef.current) {
      gsap.set(textContainerRef.current.children, { 
        opacity: 0, 
        x: -40, 
        filter: "blur(10px)" 
      });
    }

    // --- GSAP TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: "+=4000", // Adjust this to make the scroll faster/slower
        scrub: 0.5, // 0.5 gives it a smooth, slightly delayed feeling
        pin: true,
      },
    });

    // 1. Animate the canvas sequence for the full duration
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

    // 2. Fade out the "Scroll" indicator immediately as user starts scrolling
    tl.to(scrollIndicatorRef.current, {
      opacity: 0,
      y: 20,
      duration: 20, // Fades out in the first 20 frames of scroll
      ease: "power2.out",
    }, 0);

    // 3. Futuristic Text Reveal on the Left
    // Assuming the statue moves right around frame 70, we bring the text in here.
    // Adjust the '70' below if your video timing is different.
    tl.to(textContainerRef.current!.children, {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      duration: 50, // How long it takes to animate in
      stagger: 15, // Creates a staggered "booting up" sequence between elements
      ease: "power3.out",
    }, 70); 

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative w-full bg-black">

      {/* PINNED CONTAINER - 100dvh ensures true full height on mobile/desktop */}
      <div ref={pinRef} className="sticky top-24 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        
        {/* BACKGROUND CANVAS */}
        {/* object-cover ensures it fills the screen completely without stretching */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        />

        {/* LEFT-ALIGNED HERO TEXT */}
        {/* We use an absolute container covering the screen to position the text left */}
        <div className="absolute inset-0 z-10 flex items-center px-6 md:px-16 lg:px-24 pointer-events-none">
          <div 
            ref={textContainerRef} 
            className="flex flex-col items-start text-left max-w-2xl pointer-events-auto"
          >
            
            {/* 1. Animated Status Badge */}
            <div className="mb-6 inline-flex items-center gap-3 px-5 py-2 bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-full text-xs text-cyan-400 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00ffff]" />
              Welcome to MearkSoft // System Initialized
            </div>

            {/* 2. Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl leading-[1.1]">
              TRANSFORMING IDEAS <br/> INTO <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">REALITY</span>
            </h1>

            {/* 3. Subheading / Terminal Output */}
            <div className="mb-10 max-w-xl">
              <p className="text-lg text-white/70 font-mono leading-relaxed relative inline-block drop-shadow-md">
                <span className="text-violet-500 mr-2">{'>'}</span>
                Building sleek, scalable web experiences that put users first. Effortless solutions for modern problems.
                <span className="inline-block w-2.5 h-5 bg-cyan-400 ml-2 align-middle animate-pulse" />
              </p>
            </div>

            {/* 4. CTA Buttons */}
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

        {/* BOTTOM SCROLL INDICATOR */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] text-cyan-400/70 font-mono uppercase tracking-[0.3em]">Initialize sequence</span>
          <div className="w-px h-16 bg-white/10 overflow-hidden relative">
            <div className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[scrolldown_2s_ease-in-out_infinite]" />
          </div>
        </div>

      </div>
    </section>
  );
}