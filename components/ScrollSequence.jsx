// "use client"; // This is required for Next.js since we are using window/document and hooks

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register ScrollTrigger outside the component to avoid registering multiple times
// gsap.registerPlugin(ScrollTrigger);

// export default function ScrollSequence() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
    
//     // Set to your total number of frames
//     const frameCount = 240; 

//     // Set canvas dimensions to match your original video/image resolution
//     canvas.width = 1920;
//     canvas.height = 1080;

//     // VERY IMPORTANT: Adjust this path and padding to match your exact file names in the public folder!
//     // If your files are public/sequence/frame_0001.jpg, padStart is 4.
//     // If they are public/sequence/frame_001.jpg, padStart is 3.
//     const currentFrame = (index) =>
//       `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

//     const images = [];
//     const frames = { current: 0 };

//     // 1. Preload the images into the array
//     for (let i = 0; i < frameCount; i++) {
//       const img = new Image();
//       img.src = currentFrame(i);
//       images.push(img);
//     }

//     // 2. Draw the first frame as soon as it loads so the canvas isn't blank
//     images[0].onload = () => {
//       context.drawImage(images[0], 0, 0);
//     };

//     // 3. Set up the GSAP ScrollTrigger animation
//     const tl = gsap.to(frames, {
//       current: frameCount - 1,
//       snap: "current", // Snaps to whole numbers (you can't draw frame 1.5)
//       ease: "none",
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top top",
//         end: "+=4000", // The scroll distance. Increase this number to make the animation slower/longer
//         scrub: 0.5, // Adds a slight delay to the scroll catching up, making it smoother
//         pin: true, // Pins the container in place while scrolling through the sequence
//       },
//       onUpdate: () => {
//         // Clear previous frame and draw the new one
//         if (images[frames.current]) {
//           context.clearRect(0, 0, canvas.width, canvas.height);
//           context.drawImage(images[frames.current], 0, 0);
//         }
//       },
//     });

//     // 4. Cleanup function
//     // This is crucial in React to prevent memory leaks and overlapping animations if you leave the page
//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     /* The container needs height so we have room to scroll */
//     <div ref={containerRef} className="relative w-full bg-black">
//       {/* The sticky wrapper keeps the canvas centered in the viewport */}
//       <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
//         <canvas
//           ref={canvasRef}
//           className="max-w-[100vw] max-h-[100vh] object-contain"
//         />
//       </div>
//     </div>
//   );
// }