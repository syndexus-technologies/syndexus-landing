'use client';

import React, { useRef, useEffect } from 'react';
// REMOVED: import { useTheme } from 'next-themes'; <--- This line caused the error

const NexusGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    // --- Configuration ---
    const gridSize = 40; // Size of the grid cells
    const travelers = [];
    
    // Resize Handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // --- The "Cargo" Class ---
    class Traveler {
      constructor() {
        this.reset();
      }

      reset() {
        // Start at a random grid intersection
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        
        // Pick a random direction (Up, Down, Left, Right)
        const dirs = [
          { x: 1, y: 0 }, { x: -1, y: 0 }, 
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ];
        this.dir = dirs[Math.floor(Math.random() * dirs.length)];
        
        this.life = 100 + Math.random() * 100; // How long it survives
        this.speed = 2; // Movement speed
        this.color = Math.random() > 0.5 ? '#14b8a6' : '#f97316'; // Teal or Orange
        this.history = []; // Trail effect
      }

      update() {
        this.life--;
        
        // Move
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;

        // Randomly turn 90 degrees occasionally
        if (this.x % gridSize === 0 && this.y % gridSize === 0 && Math.random() < 0.2) {
            if (this.dir.x !== 0) {
                this.dir = Math.random() > 0.5 ? {x: 0, y: 1} : {x: 0, y: -1};
            } else {
                this.dir = Math.random() > 0.5 ? {x: 1, y: 0} : {x: -1, y: 0};
            }
        }

        // Store history for the "Trail" effect
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 20) this.history.shift();

        // Respawn if dead or off-screen
        if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        // Draw the glowing head
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw the trail (Trade Route)
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (this.history.length > 0) {
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for (let i = 1; i < this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
        }
        ctx.stroke();
      }
    }

    // Initialize Travelers (The "Cargo")
    const travelerCount = 30; // Number of active trade routes
    for (let i = 0; i < travelerCount; i++) {
      travelers.push(new Traveler());
    }

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw the Static Grid (Subtle "Map" Background)
      ctx.fillStyle = 'rgba(100, 116, 139, 0.1)'; // Very faint slate color
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
        }
      }

      // 2. Update and Draw Travelers
      travelers.forEach(t => {
        t.update();
        t.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-80"
    />
  );
};

export default NexusGrid;