import React, { useState, useEffect, useRef } from "react";
import NavButton from "./NavButton";

interface VideoPortalProps {
  scrollPercentage: number;
  videoUrl: string;
}

const VideoPortal: React.FC<VideoPortalProps> = ({
  scrollPercentage,
  videoUrl,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Calculate size and shape based on scroll percentage
  const calculateTransformation = () => {
    // Starting from 0% to 20% scroll, stay at minimum size
    if (scrollPercentage < 0.2) {
      return {
        width: "10px",
        height: "10px",
        borderRadius: "100%",
        opacity: 0,
        transform: "translate(-50%, calc(-50% - 30px))",
      };
    }
    // From 20% to 50% scroll, grow the circle
    else if (scrollPercentage < 0.5) {
      const growthFactor = (scrollPercentage - 0.2) / 0.3;
      const size = 10 + growthFactor * 390;
      return {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "100%",
        opacity: growthFactor,
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 94, 23, 0.1)",
      };
    }
    // From 50% to 70%, transform from circle to rounded rectangle
    else if (scrollPercentage < 0.7) {
      const transformFactor = (scrollPercentage - 0.5) / 0.2;
      const width = 400 + transformFactor * 400;
      const height = 400 + transformFactor * 50;
      const borderRadius = 200 - transformFactor * 160;
      return {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        opacity: 1,
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
      };
    }
    // After 70% scroll, final form
    else {
      const finalTransformFactor = (scrollPercentage - 0.7) / 0.3;
      const width = 720 + finalTransformFactor * 200;
      const height = 380 + finalTransformFactor * 150;
      const borderRadius = 40 - finalTransformFactor * 20;
      return {
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        opacity: 1,
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
      };
    }
  };

  const transformation = calculateTransformation();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    if (iframeRef.current) {
      const iframe = iframeRef.current;

      if (!isFullscreen) {
        // When entering fullscreen, play the video and hide controls
        iframe.src = `${videoUrl}?autoplay=1&controls=0`;
      } else {
        // When exiting fullscreen, reset video with controls disabled
        iframe.src = `${videoUrl}?controls=0`;
      }
    }
  };

  // Handle escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  return (
    <div
      ref={videoContainerRef}
      className={`video-container ${isFullscreen ? "fullscreen" : ""}`}
      style={{
        position: "fixed",
        top: isFullscreen ? "0" : "50%",
        left: isFullscreen ? "0" : "50%",
        transform: isFullscreen ? "none" : transformation.transform,
        width: isFullscreen ? "100vw" : transformation.width,
        height: isFullscreen ? "100vh" : transformation.height,
        borderRadius: isFullscreen ? "0" : transformation.borderRadius,
        opacity: isFullscreen ? 1 : transformation.opacity,
        overflow: "hidden",
        transition: "all 0.5s ease-out",
        border: isFullscreen ? "none" : "4px solid rgba(255,94,23,0.8)",
        zIndex: isFullscreen ? 50 : 10,
        backgroundColor: transformation.backgroundColor,
      }}
    >
      <iframe
        ref={iframeRef}
        src={`${videoUrl}?controls=0`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Space Promotional Video"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          transform: "translate(-50%, -50%)",
          border: "none",
          zIndex: 5,
        }}
      />

      {/* Play button - only visible when not fullscreen and scrolled to final position */}
      {!isFullscreen && scrollPercentage >= 0.95 && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer z-10"
          onClick={toggleFullscreen}
        >
          <NavButton icon="play" className="transform scale-150" />
        </div>
      )}

      {/* Close button - only visible in fullscreen mode */}
      {isFullscreen && (
        <div className="absolute top-4 right-4 z-20">
          <NavButton icon="close" onClick={toggleFullscreen} />
        </div>
      )}
    </div>
  );
};

export default VideoPortal;
