
import React from 'react';

interface SpaceLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
  highlightColor?: string;
  className?: string;
  scale?: number;
}

const SpaceLogo: React.FC<SpaceLogoProps> = ({ 
  size = 'md', 
  textColor = 'text-white',
  highlightColor = 'text-space-orange',
  className = '',
  scale = 1
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: `text-7xl md:text-9xl`
  };
  
  return (
    <div 
      className={`font-bold tracking-tighter ${sizeClasses[size]} ${className} flex items-center transition-all duration-700 ease-out`}
      style={{ 
        transform: `scale(${scale})`,
        transition: 'transform 0.5s ease-out'
      }}
    >
      <span className={`${textColor} transition-all duration-700`}>s</span>
      <span className={`${textColor} transition-all duration-700`}>p</span>
      <span className={`${highlightColor} px-0.5 transition-all duration-700`} id="space-letter-a">a</span>
      <span className={`${textColor} transition-all duration-700`}>c</span>
      <span className={`${textColor} transition-all duration-700`}>e</span>
    </div>
  );
};

export default SpaceLogo;
