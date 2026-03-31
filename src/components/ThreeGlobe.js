'use client';
import  { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

// --- MASTER CLOCK ---
const GLOBE_START_TIME = Date.now();

// --- STATIC REFERENCES ---
const COLOR_ORANGE = [0.96, 0.62, 0.04];
const COLOR_TEAL = [0.02, 0.71, 0.83];
const COLOR_GREEN = [0.06, 0.72, 0.50];

// PHASE 0: Logistics (Amber Orange) 
const logisticsMarkers = [
  { location: [20.5937, 78.9629], size: 0.12 }, 
  { location: [37.7595, -122.4367], size: 0.05 }, 
  { location: [40.7128, -74.0060], size: 0.06 }, 
  { location: [51.9225, 4.4791], size: 0.07 }, 
  { location: [25.2048, 55.2708], size: 0.06 }, 
  { location: [1.3521, 103.8198], size: 0.07 }, 
  { location: [31.2222, 121.4581], size: 0.08 }, 
  { location: [-33.8688, 151.2093], size: 0.05 }, 
  { location: [-23.5505, -46.6333], size: 0.05 }, 
  { location: [34.0522, -118.2437], size: 0.06 }, 
  { location: [53.5511, 9.9937], size: 0.05 }, 
  { location: [-33.9249, 18.4241], size: 0.04 }, 
  { location: [22.3193, 114.1694], size: 0.07 }, 
  { location: [14.5995, 120.9842], size: 0.04 }, 
  { location: [35.6895, 139.6917], size: 0.06 }, 
];

// PHASE 1: Trade & Customs (Electric Teal)
const tradeMarkers = [
  { location: [35.6895, 139.6917], size: 0.08 }, 
  { location: [1.3521, 103.8198], size: 0.08 }, 
  { location: [51.5074, -0.1278], size: 0.07 }, 
  { location: [22.3193, 114.1694], size: 0.08 }, 
  { location: [40.7128, -74.0060], size: 0.06 }, 
  { location: [48.8566, 2.3522], size: 0.05 }, 
  { location: [52.5200, 13.4050], size: 0.06 }, 
  { location: [37.5665, 126.9780], size: 0.07 }, 
  { location: [19.0760, 72.8777], size: 0.09 }, 
  { location: [25.2048, 55.2708], size: 0.06 }, 
  { location: [41.9028, 12.4964], size: 0.04 }, 
  { location: [39.9042, 116.4074], size: 0.06 }, 
  { location: [-34.6037, -58.3816], size: 0.04 }, 
  { location: [43.6532, -79.3832], size: 0.05 }, 
  { location: [1.290270, 103.851959], size: 0.05 }, 
];

// PHASE 2: Payments (Emerald Green)
const payMarkers = [
  { location: [40.7128, -74.0060], size: 0.09 }, 
  { location: [51.5074, -0.1278], size: 0.09 }, 
  { location: [1.3521, 103.8198], size: 0.08 }, 
  { location: [-33.8688, 151.2093], size: 0.06 }, 
  { location: [19.0760, 72.8777], size: 0.08 }, 
  { location: [48.8566, 2.3522], size: 0.07 }, 
  { location: [35.6895, 139.6917], size: 0.08 }, 
  { location: [22.3193, 114.1694], size: 0.08 }, 
  { location: [47.3769, 8.5417], size: 0.07 }, 
  { location: [50.1109, 8.6821], size: 0.07 }, 
  { location: [41.8781, -87.6298], size: 0.06 }, 
  { location: [37.7749, -122.4194], size: 0.06 }, 
  { location: [25.2048, 55.2708], size: 0.07 }, 
  { location: [-23.5505, -46.6333], size: 0.05 }, 
  { location: [-26.2041, 28.0473], size: 0.05 }, 
  { location: [1.3, 103.8], size: 0.04 }, 
];

// Reusable Globe Instance 
const GlobeInstance = ({ color, markers, isActive }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000, 
      height: 1000,
      phi: 0,
      theta: 0.2, 
      dark: 0, 
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 2.5, 
      baseColor: [0.95, 0.96, 0.98], 
      markerColor: color, 
      glowColor: [0.9, 0.9, 0.9], 
      opacity: 0.9,
      markers: markers,
      onRender: (state) => {
        // Syncs the rotation perfectly across all active instances
        const elapsed = Date.now() - GLOBE_START_TIME;
        state.phi = 4.7 + (elapsed * 0.0002); 
      },
    });

    return () => {
      globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <--- THE FIX: Empty array ensures it only renders strictly once!

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out ${
        isActive ? 'opacity-100 z-10 delay-0' : 'opacity-0 z-0 delay-500'
      }`}
      style={{ width: '100%', height: '100%', aspectRatio: 1 }}
    />
  );
};

const VideoGlobe = ({ activePhase = 0 }) => {
  return (
    <div className="relative w-full max-w-[900px] lg:max-w-[1000px] aspect-square flex items-center justify-center">
      {/* 1. Logistics Globe (Orange) */}
      <GlobeInstance 
        color={COLOR_ORANGE} 
        markers={logisticsMarkers}
        isActive={activePhase === 0}
      />
      {/* 2. Trade Globe (Teal) */}
      <GlobeInstance 
        color={COLOR_TEAL} 
        markers={tradeMarkers}
        isActive={activePhase === 1}
      />
      {/* 3. Pay Globe (Green) */}
      <GlobeInstance 
        color={COLOR_GREEN} 
        markers={payMarkers}
        isActive={activePhase === 2}
      />
    </div>
  );
};

export default VideoGlobe;