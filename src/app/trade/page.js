'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Cpu, ScanLine, Zap, CheckCircle } from 'lucide-react';
import NexusGrid from '../../components/NexusGrid';

// --- APPLE EFFECT 1: Fade & Float Up on Scroll ---
const RevealOnScroll = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-12 blur-[4px]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function TradePage() {
  return (
    <div className="min-h-screen font-sans bg-[#FFFFFF] text-[#0F172A] selection:bg-[#06B6D4] selection:text-white overflow-x-hidden relative">
      
      {/* --- INLINE CSS FOR APPLE GRADIENT EFFECT --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease-in-out infinite;
          background-size: 200% 200%;
        }
      `}} />

      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <NexusGrid />
      </div>

      <div className="relative z-10">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl saturate-150 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group hover:opacity-80 transition">
              <ArrowLeft size={20} className="text-[#06B6D4] group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-[#0F172A] text-sm md:text-base tracking-tight">Back to OS</span>
            </a>
            <button className="bg-[#0F172A] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold text-xs md:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="px-6 pt-40 pb-20 max-w-5xl mx-auto min-h-[90vh] flex flex-col justify-center">
          
          <RevealOnScroll delay={100}>
            <div className="w-16 h-16 bg-cyan-50 border border-cyan-100 rounded-2xl flex items-center justify-center mb-8 text-[#06B6D4] shadow-sm">
              <Cpu size={32} />
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold text-[#0F172A] tracking-tighter leading-[1.05] mb-6">
              Syndexus <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#06B6D4] to-[#0891B2] animate-gradient-x">
                Trade.
              </span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-16 leading-relaxed font-medium">
              Maximize efficiency with AI. We automate the boring stuff—customs filings, compliance checks, and document digitization.
            </p>
          </RevealOnScroll>

          {/* Feature Grid with Staggered Reveal */}
          <div className="grid md:grid-cols-2 gap-8">
            <RevealOnScroll delay={600}>
              <div className="p-10 rounded-[2.5rem] bg-[#FAFAFA] border border-gray-100 hover:shadow-2xl hover:shadow-cyan-900/5 hover:-translate-y-2 transition-all duration-500 group h-full">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <ScanLine className="text-[#06B6D4] group-hover:scale-110 transition-transform duration-500" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-[#0F172A]">AI Document OCR</h3>
                <p className="text-lg text-gray-500 leading-relaxed mb-6 font-medium">
                  Upload a PDF Invoice or Bill of Lading. Our AI instantly extracts the data, checks for errors, and prepares customs filings.
                </p>
                <div className="flex items-center gap-2 text-[#06B6D4] font-bold text-sm bg-cyan-50 px-4 py-2 rounded-lg w-max">
                  <CheckCircle size={16} /> 99.9% Accuracy
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={800}>
              <div className="p-10 rounded-[2.5rem] bg-[#FAFAFA] border border-gray-100 hover:shadow-2xl hover:shadow-cyan-900/5 hover:-translate-y-2 transition-all duration-500 group h-full">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
                  <Zap className="text-[#06B6D4] group-hover:scale-110 transition-transform duration-500" size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight text-[#0F172A]">Instant HS Classification</h3>
                <p className="text-lg text-gray-500 leading-relaxed mb-6 font-medium">
                  Never guess a tariff code again. Our NLP engine analyzes your product description and assigns the correct HS Code automatically.
                </p>
                <div className="flex items-center gap-2 text-[#06B6D4] font-bold text-sm bg-cyan-50 px-4 py-2 rounded-lg w-max">
                  <CheckCircle size={16} /> Zero Penalties
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </main>
      </div>
    </div>
  );
}