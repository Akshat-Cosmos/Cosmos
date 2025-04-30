// components/BackgroundAudio.tsx
import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.5; // Adjust volume if needed
      const playAudio = () => {
        audio.play().catch((err) => {
          console.warn("Autoplay was prevented:", err);
        });
      };

      // Try to play when user interacts (autoplay restrictions)
      document.addEventListener("click", playAudio, { once: true });

      return () => {
        document.removeEventListener("click", playAudio);
      };
    }
  }, []);

  return <audio ref={audioRef} src="/bgMusic.mp3" autoPlay loop hidden />;
}
