/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useState } from "react";
// import Image from "next/image"
import Link from "react-router-dom";
import { Play, MessageCircle, Hexagon, Globe, Layers } from "lucide-react";
import { HexagonStage } from "@/components/video-backgraund/hexagon-stage";
import SideNav from "@/components/SideNav";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transitioningRef = useRef(false);
  const lastScrollTime = useRef(Date.now());

  // Define sections based on screenshots
  const sections = [
    {
      title: "",
      subtitle: "",
      stage: 0,
    },
    {
      title: "Enter the",
      subtitle: "",
      stage: 1,
    },
    {
      title: "Enter the Battle Pass",
      subtitle: "Discover a gamified trading experience like no",
      stage: 2,
    },
    {
      title: "Enter the Battle Pass",
      subtitle:
        "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
      stage: 3,
    },
    {
      title: "Enter the Battle Pass",
      subtitle:
        "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
      stage: 4,
    },
    {
      title: "Enter the Battle Pass",
      subtitle:
        "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
      stage: 5,
    },
    {
      title: "Enter the Battle Pass",
      subtitle:
        "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
      stage: 6,
    },
  ];

  // Handle scroll events to control video speed .. only going forward scrolling

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const now = Date.now();
  //     const timeSinceLastScroll = now - lastScrollTime.current;

  //     // Set scrolling state
  //     setIsScrolling(true);

  //     // Clear any existing timeout
  //     if (scrollTimeout.current) {
  //       clearTimeout(scrollTimeout.current);
  //     }

  //     // Set timeout to detect when scrolling stops
  //     scrollTimeout.current = setTimeout(() => {
  //       setIsScrolling(false);
  //     }, 150);

  //     lastScrollTime.current = now;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (scrollTimeout.current) {
  //       clearTimeout(scrollTimeout.current);
  //     }
  //   };
  // }, []);

  // Scroll event for both forward & backward but its laggy

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;

      if (videoRef.current) {
        // Adjust currentTime based on scroll delta
        videoRef.current.currentTime += deltaY * 0.005; // <-- You can tweak 0.005 for speed
        if (videoRef.current.currentTime < 0) {
          videoRef.current.currentTime = 0;
        }
        if (videoRef.current.currentTime > videoRef.current.duration) {
          videoRef.current.currentTime = videoRef.current.duration;
        }
      }

      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Control video playback rate based on scrolling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = isScrolling ? 0.3 : 1.0;
    }
  }, [isScrolling]);

  // Setup intersection observer for each section with 2-second delay between transitions
  useEffect(() => {
    const observers = sections.map((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            !transitioningRef.current &&
            currentSection !== index
          ) {
            transitioningRef.current = true;

            // Set a 2-second delay before showing the next section
            setTimeout(() => {
              setCurrentSection(index);
              transitioningRef.current = false;
            }, 1000);
          }
        },
        { threshold: 0.5 }
      );

      if (sectionRefs.current[index]) {
        observer.observe(sectionRefs.current[index]!);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections.length, currentSection]);

  return (
    <main className="relative min-h-screen  bg-space-dark stars  w-[100%] transition-all duration-700 overflow-hidden  text-white">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-[100%] object-cover"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/quiznation-cosmostaker.appspot.com/o/7289d785-1ae9-4e47-a0a3-632f2d29fdb7.mp4?alt=media"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Left Side Navigation */}
      {/* <SideNav /> */}

      {/* Header */}
      {/* <header className="fixed top-0 z-20 w-full p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-full bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60">
              PRIVATE SALE{" "}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
                7
              </span>
            </button>
            <button className="flex items-center gap-2 rounded-full bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60">
              LITEPAPER{" "}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs">
                ?
              </span>
            </button>
          </div>
        </div>
      </header> */}

      {/* Hexagon Animation - Fixed in center */}
      <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
        {/* <HexagonStage stage={currentSection} /> */}
      </div>

      {/* Scroll Sections */}
      <div className="relative z-10">
        {sections.map((section, index) => (
          <section
            key={index}
            // @ts-expect-error
            ref={(el) => (sectionRefs.current[index] = el)}
            className="flex min-h-screen items-center justify-center p-6"
            style={{
              height: "100vh",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex items-center justify-center">
                {/* Empty space for hexagon (actual hexagon is fixed positioned) */}
                <div className="h-64 w-64 opacity-0"></div>
              </div>
              <div
                className={`flex flex-col justify-center transition-opacity duration-1000 ${
                  currentSection === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                  {section.title}
                </h1>
                <p className="text-lg text-gray-300 md:text-xl">
                  {section.subtitle}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-24 left-1/2 z-20 -translate-x-1/2 transform">
        <div className="flex flex-col items-center">
          <div className="h-6 w-6 animate-bounce">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */

// import { useEffect, useRef, useState } from "react";
// // import Image from "next/image"
// import Link from "react-router-dom";
// import { Play, MessageCircle, Hexagon, Globe, Layers } from "lucide-react";
// import { HexagonStage } from "@/components/video-backgraund/hexagon-stage";
// import SideNav from "@/components/SideNav";

// export default function Home() {
//   const [currentSection, setCurrentSection] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
//   const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const transitioningRef = useRef(false);
//   const lastScrollTime = useRef(Date.now());

//   // Define sections based on screenshots
//   const sections = [
//     {
//       title: "",
//       subtitle: "",
//       stage: 0,
//     },
//     {
//       title: "Enter the",
//       subtitle: "",
//       stage: 1,
//     },
//     {
//       title: "Enter the Battle Pass",
//       subtitle: "Discover a gamified trading experience like no",
//       stage: 2,
//     },
//     {
//       title: "Enter the Battle Pass",
//       subtitle:
//         "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
//       stage: 3,
//     },
//     {
//       title: "Enter the Battle Pass",
//       subtitle:
//         "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
//       stage: 4,
//     },
//     {
//       title: "Enter the Battle Pass",
//       subtitle:
//         "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
//       stage: 5,
//     },
//     {
//       title: "Enter the Battle Pass",
//       subtitle:
//         "Discover a gamified trading experience like no other NFT marketplace has ever offered.",
//       stage: 6,
//     },
//   ];

//   // Handle scroll events to control video speed and this code works only linear

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     const now = Date.now();
//   //     const timeSinceLastScroll = now - lastScrollTime.current;

//   //     // Set scrolling state
//   //     setIsScrolling(true);

//   //     // Clear any existing timeout
//   //     if (scrollTimeout.current) {
//   //       clearTimeout(scrollTimeout.current);
//   //     }

//   //     // Set timeout to detect when scrolling stops
//   //     scrollTimeout.current = setTimeout(() => {
//   //       setIsScrolling(false);
//   //     }, 150);

//   //     lastScrollTime.current = now;
//   //   };

//   //   window.addEventListener("scroll", handleScroll, { passive: true });

//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //     if (scrollTimeout.current) {
//   //       clearTimeout(scrollTimeout.current);
//   //     }
//   //   };
//   // }, []);

//   // This handle Scroll event is for achieving both Continue & Reverse state but its laggy //

//   // useEffect(() => {
//   //   let lastScrollTop = window.scrollY;

//   //   const handleScroll = () => {
//   //     const now = Date.now();
//   //     const timeSinceLastScroll = now - lastScrollTime.current;

//   //     const currentScrollTop = window.scrollY;
//   //     const scrollDirection = currentScrollTop > lastScrollTop ? "down" : "up";
//   //     lastScrollTop = currentScrollTop;

//   //     setIsScrolling(true);

//   //     if (videoRef.current) {
//   //       if (scrollDirection === "down") {
//   //         videoRef.current.playbackRate = 3; // Play faster when scrolling down
//   //       } else {
//   //         videoRef.current.playbackRate = 0; // Pause real playback
//   //         videoRef.current.currentTime -= 0.3; // Rewind manually a little bit
//   //       }
//   //     }

//   //     if (scrollTimeout.current) {
//   //       clearTimeout(scrollTimeout.current);
//   //     }

//   //     scrollTimeout.current = setTimeout(() => {
//   //       setIsScrolling(false);
//   //       if (videoRef.current) {
//   //         videoRef.current.playbackRate = 0.0; // Slow normal play after scrolling stops
//   //       }
//   //     }, 150);

//   //     lastScrollTime.current = now;
//   //   };

//   //   window.addEventListener("scroll", handleScroll, { passive: true });

//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //     if (scrollTimeout.current) {
//   //       clearTimeout(scrollTimeout.current);
//   //     }
//   //   };
//   // }, []);

//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let rafId: number | null = null;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const delta = currentScrollY - lastScrollY;

//       if (videoRef.current) {
//         // Move video based on scroll direction
//         videoRef.current.currentTime += delta * 0.005; // Fine-tune 0.005 as per speed you like
//         if (videoRef.current.currentTime < 0) {
//           videoRef.current.currentTime = 0;
//         }
//         if (videoRef.current.currentTime > videoRef.current.duration) {
//           videoRef.current.currentTime = videoRef.current.duration;
//         }
//       }

//       lastScrollY = currentScrollY;
//     };

//     const onScroll = () => {
//       if (rafId !== null) {
//         cancelAnimationFrame(rafId);
//       }
//       rafId = requestAnimationFrame(handleScroll);
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (rafId !== null) {
//         cancelAnimationFrame(rafId);
//       }
//     };
//   }, []);

//   // Control video playback rate based on scrolling
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = isScrolling ? 2.5 : 0.5;
//     }
//   }, [isScrolling]);

//   // Setup intersection observer for each section with 2-second delay between transitions
//   useEffect(() => {
//     const observers = sections.map((_, index) => {
//       const observer = new IntersectionObserver(
//         (entries) => {
//           if (
//             entries[0].isIntersecting &&
//             !transitioningRef.current &&
//             currentSection !== index
//           ) {
//             transitioningRef.current = true;

//             // Set a 2-second delay before showing the next section
//             setTimeout(() => {
//               setCurrentSection(index);
//               transitioningRef.current = false;
//             }, 1000);
//           }
//         },
//         { threshold: 0.5 }
//       );

//       if (sectionRefs.current[index]) {
//         observer.observe(sectionRefs.current[index]!);
//       }

//       return observer;
//     });

//     return () => {
//       observers.forEach((observer) => observer.disconnect());
//     };
//   }, [sections.length, currentSection]);

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-black text-white">
//       {/* Background Video */}
//       <div className="fixed inset-0 z-0">
//         <video
//           ref={videoRef}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="h-full w-full object-cover"
//         >
//           <source
//             src="https://firebasestorage.googleapis.com/v0/b/quiznation-cosmostaker.appspot.com/o/7289d785-1ae9-4e47-a0a3-632f2d29fdb7.mp4?alt=media"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Left Side Navigation */}
//       <SideNav />

//       {/* Header */}
//       <header className="fixed top-0 z-20 w-full p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {/* <Link  path className="text-2xl font-bold">
//               <img src="/logo.png" alt="Spaace Logo" width={150} height={40} className="h-10 w-auto" />
//             </Link> */}
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="flex items-center gap-2 rounded-full bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60">
//               PRIVATE SALE{" "}
//               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs">
//                 7
//               </span>
//             </button>
//             <button className="flex items-center gap-2 rounded-full bg-black/40 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/60">
//               LITEPAPER{" "}
//               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs">
//                 ?
//               </span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Deck Counter */}
//       <div className="fixed bottom-12 left-12 z-20">
//         <div className="flex flex-col items-center rounded-lg bg-black/20 p-2 backdrop-blur-md">
//           <div className="text-xs uppercase text-gray-400">DECK</div>
//           <div className="mt-2 flex h-16 w-16 flex-col items-center justify-center">
//             <div className="h-12 w-8 rounded-md bg-yellow-100">
//               <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-yellow-600 bg-gradient-to-b from-yellow-200 to-yellow-100">
//                 <div className="h-4 w-4 rounded-full bg-red-500 text-xs text-white">
//                   +
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-1 text-xs text-gray-400">0/12</div>
//         </div>
//       </div>

//       {/* Sound Toggle */}
//       <div className="fixed bottom-12 right-12 z-20">
//         <div className="flex items-center gap-2">
//           <div className="text-xs uppercase text-gray-400">SOUND OFF</div>
//           <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60">
//             <div className="flex flex-col gap-1 px-1">
//               <div className="h-0.5 w-1 bg-orange-500"></div>
//               <div className="h-0.5 w-2 bg-orange-500"></div>
//               <div className="h-0.5 w-3 bg-orange-500"></div>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="fixed bottom-0 z-20 w-full p-6">
//         <div className="flex items-center justify-between text-xs text-gray-400">
//           <div>All rights reserved. © 2025 Spaace</div>
//         </div>
//       </footer>

//       {/* Hexagon Animation - Fixed in center */}
//       <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
//         <HexagonStage stage={currentSection} />
//       </div>

//       {/* Scroll Sections */}
//       <div className="relative z-10">
//         {sections.map((section, index) => (
//           <section
//             key={index}
//             // @ts-expect-error
//             ref={(el) => (sectionRefs.current[index] = el)}
//             className="flex min-h-screen items-center justify-center p-6"
//             style={{
//               height: "100vh",
//               scrollSnapAlign: "start",
//               scrollSnapStop: "always",
//             }}
//           >
//             <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2">
//               <div className="flex items-center justify-center">
//                 {/* Empty space for hexagon (actual hexagon is fixed positioned) */}
//                 <div className="h-64 w-64 opacity-0"></div>
//               </div>
//               <div
//                 className={`flex flex-col justify-center transition-opacity duration-1000 ${
//                   currentSection === index ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
//                   {section.title}
//                 </h1>
//                 <p className="text-lg text-gray-300 md:text-xl">
//                   {section.subtitle}
//                 </p>
//               </div>
//             </div>
//           </section>
//         ))}
//       </div>

//       {/* Scroll Indicator */}
//       <div className="fixed bottom-24 left-1/2 z-20 -translate-x-1/2 transform">
//         <div className="flex flex-col items-center">
//           <div className="h-6 w-6 animate-bounce">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12 5V19M12 19L5 12M12 19L19 12"
//                 stroke="white"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
