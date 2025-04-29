
import React from 'react';
import { CirclePlay, X } from 'lucide-react';

interface NavButtonProps {
  icon: 'play' | 'close';
  onClick?: () => void;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ 
  icon,
  onClick,
  className = '',
}) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center rounded-full bg-space-dark bg-opacity-60 
                hover:bg-opacity-80 border border-gray-700 w-12 h-12 transition-all duration-300
                hover:scale-110 ${className}`}
      style={{
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    >
      {icon === 'play' && (
        <CirclePlay className="text-space-orange w-6 h-6" />
      )}
      {icon === 'close' && (
        <X className="text-white w-6 h-6" />
      )}
    </button>
  );
};

export default NavButton;
