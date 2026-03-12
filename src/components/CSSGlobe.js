'use client';

import React from 'react';

const CssGlobe = () => {
  return (
    <div className="relative flex justify-center items-center w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
      
      {/* 1. The Globe Sphere */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-syndexus-navy border border-gray-800 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)]">
        
        {/* 2. The Map Animation Layer 
            We use a background image and animate the position-x to simulate rotation.
        */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='dots' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%2314b8a6' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='2000' height='1000' fill='url(%23dots)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 100px', // Creates the "grid" effect
            animation: 'spinGlobe 20s linear infinite',
          }}
        ></div>

        {/* 3. The "Atmosphere" Overlay (Inner Shadow for 3D effect) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_20px_0_50px_rgba(0,0,0,0.9),inset_-20px_0_50px_rgba(0,0,0,0.9)] pointer-events-none"></div>
        
        {/* 4. Scanning Radar Line (The "Logistics Control Tower" look) */}
        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-syndexus-teal to-transparent top-1/2 -translate-y-1/2 opacity-50 shadow-[0_0_10px_#14b8a6]"></div>
        <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-syndexus-teal to-transparent left-1/2 -translate-x-1/2 opacity-30"></div>

        {/* 5. Highlight Markers (London & Mumbai) */}
        {/* London */}
        <div className="absolute top-[28%] left-[48%] w-3 h-3 bg-syndexus-teal rounded-full animate-ping"></div>
        <div className="absolute top-[28%] left-[48%] w-3 h-3 bg-syndexus-teal rounded-full border-2 border-white"></div>
        
        {/* Mumbai (Offset by animation timing ideally, but fixed here for visual) */}
        <div className="absolute top-[45%] left-[65%] w-3 h-3 bg-syndexus-orange rounded-full animate-ping delay-700"></div>
        <div className="absolute top-[45%] left-[65%] w-3 h-3 bg-syndexus-orange rounded-full border-2 border-white"></div>

      </div>

      {/* Global CSS for the rotation animation */}
      <style jsx>{`
        @keyframes spinGlobe {
          from { background-position: 0 0; }
          to { background-position: -400px 0; } /* Moves the background pattern */
        }
      `}</style>
    </div>
  );
};

export default CssGlobe;