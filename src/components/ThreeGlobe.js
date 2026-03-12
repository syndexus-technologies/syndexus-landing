'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

// Reusable Globe Instance to allow smooth crossfading between themes
const GlobeInstance = ({ color, markers, isActive }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 4.7; // Start facing India/Middle East
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000, 
      height: 1000,
      phi: 0,
      theta: 0.2, // Slight downward tilt for a better 3D perspective
      dark: 0, // 0 = Light Mode
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 2.5, 
      baseColor: [0.95, 0.96, 0.98], // Light grey/white sphere
      markerColor: color, // Dynamic color passed from parent
      glowColor: [0.9, 0.9, 0.9], // Soft outer glow
      opacity: 0.9,
      markers: markers,
      onRender: (state) => {
        // This makes the globe continuously spin
        state.phi = phi;
        phi += 0.003; 
      },
    });

    return () => {
      globe.destroy();
    };
  }, [color, markers]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ width: '100%', height: '100%', aspectRatio: 1 }}
    />
  );
};

const VideoGlobe = ({ activePhase = 0 }) => {
  // PHASE 0: Logistics (Amber Orange) - India connected to the world
  const logisticsMarkers = [
    { location: [20.5937, 78.9629], size: 0.12 }, // India (Hub)
    { location: [37.7595, -122.4367], size: 0.05 }, // San Francisco
    { location: [40.7128, -74.0060], size: 0.05 }, // New York
    { location: [51.9225, 4.4791], size: 0.06 }, // Port of Rotterdam
    { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
  ];

  // PHASE 1: Trade & Customs (Electric Teal) - Scanning specific compliance hubs
  const tradeMarkers = [
    { location: [35.6895, 139.6917], size: 0.08 }, // Tokyo
    { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
    { location: [51.5074, -0.1278], size: 0.06 }, // London
    { location: [22.3193, 114.1694], size: 0.07 }, // Hong Kong
  ];

  // PHASE 2: Payments (Emerald Green) - Global Mesh Network
  const payMarkers = [
    { location: [40.7128, -74.0060], size: 0.06 }, // NY
    { location: [51.5074, -0.1278], size: 0.06 }, // London
    { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [19.0760, 72.8777], size: 0.06 }, // Mumbai
    { location: [48.8566, 2.3522], size: 0.06 }, // Paris
  ];

  return (
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
      {/* 1. Logistics Globe (Orange) */}
      <GlobeInstance 
        color={[0.96, 0.62, 0.04]} // #F59E0B (Amber Orange)
        markers={logisticsMarkers}
        isActive={activePhase === 0}
      />
      {/* 2. Trade Globe (Teal) */}
      <GlobeInstance 
        color={[0.02, 0.71, 0.83]} // #06B6D4 (Electric Teal)
        markers={tradeMarkers}
        isActive={activePhase === 1}
      />
      {/* 3. Pay Globe (Green) */}
      <GlobeInstance 
        color={[0.06, 0.72, 0.50]} // #10B981 (Emerald Green)
        markers={payMarkers}
        isActive={activePhase === 2}
      />
    </div>
  );
};

export default VideoGlobe;