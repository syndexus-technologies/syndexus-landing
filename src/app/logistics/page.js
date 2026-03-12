'use client';

import React from 'react';
import { ArrowLeft, Anchor, Map, Navigation, BarChart3 } from 'lucide-react';
import NexusGrid from '../../components/NexusGrid';
import ThemeToggle from '../../components/ThemeToggle';

export default function LogisticsPage() {
  return (
    <div className="min-h-screen font-sans transition-colors duration-300
      bg-gray-50 text-slate-900 selection:bg-syndexus-orange selection:text-white
      dark:bg-syndexus-navy dark:text-white dark:selection:text-syndexus-orange
      overflow-x-hidden relative">
      
      <NexusGrid />

      <div className="relative z-10">
        <nav className="flex justify-between items-center px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft size={20} className="text-syndexus-orange" />
            <span className="font-bold">Back to Home</span>
          </a>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="bg-syndexus-orange text-white dark:text-syndexus-navy px-5 py-2 rounded-md font-bold text-sm">
              Get Started
            </button>
          </div>
        </nav>

        <main className="px-4 md:px-8 py-12 max-w-5xl mx-auto">
          <div className="w-16 h-16 bg-syndexus-orange/10 rounded-2xl flex items-center justify-center mb-6 text-syndexus-orange">
            <Anchor size={32} />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Syndexus <span className="text-syndexus-orange">Logistics</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
            Eliminate the "Visibility Gap." A unified Control Tower for real-time cargo tracking, predictive ETAs, and actionable supply chain intelligence.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
              <Map className="text-syndexus-orange mb-4" size={28} />
              <h3 className="text-2xl font-bold mb-3">Real-Time Tracking</h3>
              <p className="text-slate-600 dark:text-gray-400">
                Track containers across 98% of the world's shipping lines. See the exact GPS location of your cargo on a unified map.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 backdrop-blur-sm">
              <BarChart3 className="text-syndexus-orange mb-4" size={28} />
              <h3 className="text-2xl font-bold mb-3">Predictive ETAs</h3>
              <p className="text-slate-600 dark:text-gray-400">
                Know when your shipment will arrive before it leaves port. Our ML models predict delays based on weather, port congestion, and route data.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}