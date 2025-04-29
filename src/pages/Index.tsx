import React, { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion"; // ✅ Added
import SpaceLogo from "../components/SpaceLogo";
import VideoPortal from "../components/VideoPortal";
import SideNav from "../components/SideNav";
import Home from "./back";

const Index = () => {
  const { scrollPercentage } = useScrollPosition();
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [footerOpacity, setFooterOpacity] = useState(0);
  const [logoScale, setLogoScale] = useState(1);
  const [showHome, setShowHome] = useState(false);

  const spaceBgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const homeTranslateY = useTransform(
    scrollYProgress,
    [0.35, 0.6],
    ["100%", "0%"]
  );

  const spaceTranslateY = useTransform(
    scrollYProgress,
    [0.35, 0.6],
    ["0%", `-100%`] // Prevents going out of view by adjusting dynamically
  );
  // . here teh page stopping in mid when scrolling
  // useEffect(() => {
  //   // Header fades out as we scroll
  //   // setHeaderOpacity(Math.max(0, 1 - scrollPercentage * 2));

  //   // Footer fades in as we approach the end
  //   setFooterOpacity(Math.min(1, Math.max(0, (scrollPercentage - 0.7) * 3)));

  //   // Logo scales smoothly with scroll
  //   const baseScale = 1;
  //   const maxScale = 8;
  //   const scrollScale = Math.min(maxScale, baseScale + scrollPercentage * 4);
  //   setLogoScale(scrollScale);

  //   // Transform the background
  //   if (spaceBgRef.current) {
  //     const scale = 1 + scrollPercentage * 0.5;
  //     const opacity = Math.max(0.2, 1 - scrollPercentage);
  //     spaceBgRef.current.style.transform = `scale(${scale})`;
  //     spaceBgRef.current.style.opacity = opacity.toString();
  //   }

  //   // Show Home on full scroll
  //   if (scrollPercentage === 1 && !showHome) {
  //     setShowHome(true);
  //   }
  // }, [scrollPercentage, showHome]);

  const fastSpaceScroll = Math.min(scrollPercentage * 4, 1);

  useEffect(() => {
    // Your Space page animations (first 50% of scroll)
    const spaceScrollPercentage = Math.min(scrollPercentage * 4, 1);

    setFooterOpacity(
      Math.min(1, Math.max(0, (spaceScrollPercentage - 0.7) * 3))
    );

    const baseScale = 1;
    const maxScale = 6;
    const scrollScale = Math.min(
      maxScale,
      baseScale + spaceScrollPercentage * 4
    );
    setLogoScale(scrollScale);

    if (spaceBgRef.current) {
      const scale = 1 + spaceScrollPercentage * 1;
      const opacity = Math.max(0.2, 1 - spaceScrollPercentage);
      spaceBgRef.current.style.transform = `scale(${scale})`;
      spaceBgRef.current.style.opacity = opacity.toString();
    }

    // Home appears after 35% scroll
    if (scrollPercentage >= 0.35) {
      if (!showHome) setShowHome(true);
    } else {
      if (showHome) setShowHome(false);
    }
  }, [scrollPercentage, showHome]);

  // new workin useEffect .. I have updated it so it can perform reverse operation as well but its conflicting with the scroll of Home page //

  // useEffect(() => {
  //   setHeaderOpacity(Math.max(0, 1 - scrollPercentage * 2));
  //   setFooterOpacity(Math.min(1, Math.max(0, (scrollPercentage - 0.7) * 3)));

  //   const baseScale = 1;
  //   const maxScale = 8;
  //   const scrollScale = Math.min(maxScale, baseScale + scrollPercentage * 4);
  //   setLogoScale(scrollScale);

  //   if (spaceBgRef.current) {
  //     const scale = 1 + scrollPercentage * 0.5;
  //     const opacity = Math.max(0.2, 1 - scrollPercentage);
  //     spaceBgRef.current.style.transform = `scale(${scale})`;
  //     spaceBgRef.current.style.opacity = opacity.toString();
  //   }

  //   if (scrollPercentage >= 0.99) {
  //     if (!showHome) setShowHome(true);
  //   } else {
  //     if (showHome) setShowHome(false);
  //   }
  // }, [scrollPercentage, showHome]);

  // console.log("scrollPercentage>>>", scrollPercentage);

  return (
    <div
      className={`relative w-full overflow-x-hidden bg-space-dark stars transition-all duration-700 ${"min-h-[2500vh]"}`}
    >
      {/* Fixed Navigation */}
      <SideNav />

      {/* Meteors */}
      <div className="meteor animate-meteor-1 top-20 right-10"></div>
      <div className="meteor animate-meteor-2 top-40 right-[40%]"></div>
      <div className="meteor animate-meteor-3 top-60 right-[60%]"></div>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[100000] transition-opacity duration-500 flex justify-between items-center px-6 py-4"
        style={{ opacity: headerOpacity }}
      >
        <SpaceLogo size="sm" />

        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-full bg-black bg-opacity-60 border border-gray-800 text-white flex items-center gap-2">
            PRIVATE SALE
            <span className="bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              2
            </span>
          </button>

          <button className="px-5 py-2 rounded-full bg-black bg-opacity-60 border border-gray-800 text-white flex items-center gap-2">
            LITEPAPER
            <span className="bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              4
            </span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        <motion.div
          className="  z-[50] fixed inset-0"
          style={{ y: spaceTranslateY }}
        >
          {/* SPACE Logo Section */}
          <section className="fixed inset-0 z-10 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="relative" ref={spaceBgRef}>
                <SpaceLogo
                  size="xl"
                  className="z-20 transition-all duration-700 ease-out"
                  scale={logoScale}
                />
              </div>
              <h2 className="text-center text-xl md:text-2xl text-white mt-8 max-w-3xl opacity-70">
                The Most Rewarding Marketplace with 100% Revenue Sharing
              </h2>
            </div>
          </section>

          {/* Video Portal */}
          <section className="fixed inset-0 z-10 flex justify-center items-center pointer-events-none">
            <VideoPortal
              scrollPercentage={fastSpaceScroll}
              videoUrl="https://player.vimeo.com/video/942017973"
            />
          </section>
        </motion.div>
      </AnimatePresence>

      {/* Empty Scrolling Space */}
      <section className="h-[10vh]"></section>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 transition-opacity duration-500 z-[10000]"
        style={{ opacity: footerOpacity }}
      >
        <div className="text-sm text-space-gray">
          All rights reserved. © 2025 Spaace
        </div>

        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-space-gray hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-space-gray hover:text-white transition-colors"
          >
            Terms of Use
          </a>
          <a
            href="#"
            className="text-sm text-space-gray hover:text-white transition-colors"
          >
            Legal Notice
          </a>
          <a
            href="mailto:hello@spaace.io"
            className="text-sm text-space-gray hover:text-white transition-colors"
          >
            hello@spaace.io
          </a>
        </div>

        {/* Sound Control */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-space-gray">SOUND OFF</span>
          <div className="w-12 h-12 rounded-full bg-space-dark flex items-center justify-center border border-gray-700">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="9" width="4" height="6" fill="#FF5E17" />
              <rect x="9" y="6" width="4" height="12" fill="#FF5E17" />
              <rect x="16" y="3" width="4" height="18" fill="#FF5E17" />
            </svg>
          </div>
        </div>
      </footer>

      {/* Deck Card */}
      <div className="fixed bottom-12 left-12 z-[1000]">
        <div className="flex flex-col items-center rounded-lg bg-black/20 p-2 backdrop-blur-md">
          <div className="text-xs uppercase text-gray-400">DECK</div>
          <div className="mt-2 flex h-16 w-16 flex-col items-center justify-center">
            <div className="h-12 w-8 rounded-md bg-yellow-100">
              <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-yellow-600 bg-gradient-to-b from-yellow-200 to-yellow-100">
                <div className="h-4 w-4 rounded-full bg-red-500 text-xs text-white">
                  +
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-400">0/12</div>
        </div>
      </div>

      {/* Home Slide In Animation */}
      {/* </motion.div> */}

      <AnimatePresence>
        {showHome && (
          // <motion.div
          //   className="fixed inset-0 z-50 bg-black bg-opacity-90"
          //   initial={{ y: "100%" }}
          //   animate={{ y: "0%" }}
          //   exit={{ y: "10%" }}
          //   transition={{ duration: 2.8, ease: "easeInOut" }}
          // >
          //   <Home />
          // </motion.div>

          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 min-h-[100vh]"
            style={{ y: homeTranslateY }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
