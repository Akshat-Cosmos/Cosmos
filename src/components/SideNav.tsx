
import React from 'react';
import NavButton from './NavButton';

const SideNav: React.FC = () => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[10000]">
      <div className="flex flex-col items-center justify-center gap-4 py-6 px-2 
                     bg-gray-900 bg-opacity-20 backdrop-blur-sm rounded-full">
        <NavButton icon="play" />
        
        <div className="h-12 w-12 flex items-center justify-center rounded-full 
                       bg-space-dark bg-opacity-60 hover:bg-opacity-80 border border-gray-700
                       transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 9C18.6569 9 20 7.65685 20 6C20 4.34315 18.6569 3 17 3C15.3431 3 14 4.34315 14 6C14 7.65685 15.3431 9 17 9Z" stroke="white" strokeWidth="2" />
            <path d="M7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21Z" stroke="white" strokeWidth="2" />
            <path d="M14 6H10.5C9.11929 6 8 7.11929 8 8.5V15" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="h-12 w-12 flex items-center justify-center rounded-full 
                       bg-space-dark bg-opacity-60 hover:bg-opacity-80 border border-gray-700
                       transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 15L8 11L12 15L20 7" stroke="white" strokeWidth="2" />
            <path d="M15 7H20V12" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="h-12 w-12 flex items-center justify-center rounded-full 
                       bg-space-dark bg-opacity-60 hover:bg-opacity-80 border border-gray-700
                       transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
            <path d="M12 8V16" stroke="white" strokeWidth="2" />
            <path d="M16 12H8" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="h-12 w-12 flex items-center justify-center rounded-full 
                       bg-space-dark bg-opacity-60 hover:bg-opacity-80 border border-gray-700
                       transition-all duration-300 hover:scale-110">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="7" width="16" height="10" rx="2" stroke="white" strokeWidth="2" />
            <path d="M12 7V4" stroke="white" strokeWidth="2" />
            <path d="M8 4H16" stroke="white" strokeWidth="2" />
            <path d="M9 11.5L11 13.5L15 9.5" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
