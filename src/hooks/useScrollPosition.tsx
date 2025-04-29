
import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
      setWindowHeight(window.innerHeight);
      
      // Get accurate document height
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      
      setDocumentHeight(docHeight);
      
      // Calculate normalized scroll percentage (0 to 1)
      if (docHeight > windowHeight) {
        const maxScroll = docHeight - windowHeight;
        const currentScroll = Math.min(scrollPosition, maxScroll);
        setScrollPercentage(currentScroll / maxScroll);
      } else {
        setScrollPercentage(0);
      }
    };
    
    // Set initial values
    updatePosition();
    
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [scrollPosition, windowHeight]);

  return { 
    scrollPosition, 
    windowHeight, 
    documentHeight, 
    scrollPercentage 
  };
}
