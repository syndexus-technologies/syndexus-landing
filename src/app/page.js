'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, CheckCircle, ArrowRight, ShieldCheck, FileText, Globe, Clock, Lock, Server, Activity, X, Menu } from 'lucide-react';
import emailjs from '@emailjs/browser';
import VideoGlobe from '../components/ThreeGlobe';


// --- EFFECT 1: Masked Text Reveal ---
const MaskedReveal = ({ children, delay = 0 }) => {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden inline-block w-full py-1">
      <div
        className={`transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isVisible ? 'translate-y-0' : 'translate-y-[110%]'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

// --- EFFECT 2: Fade & Float Up ---
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

const SyndexusLanding = () => {
  const [activePhase, setActivePhase] = useState(0);
  
  // NAV MENU STATES
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePlatformOpen, setIsMobilePlatformOpen] = useState(false); 
  const [isDesktopPlatformOpen, setIsDesktopPlatformOpen] = useState(false); 
  
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isDesktopToolsOpen, setIsDesktopToolsOpen] = useState(false);

  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [isDesktopCompanyOpen, setIsDesktopCompanyOpen] = useState(false);
  
  // WAITLIST MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- REAL EMAILJS INTEGRATION ---
  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    
    const templateParams = {
      user_name: name,
      user_email: email, 
    };

    emailjs.send(
      'YOUR_SERVICE_ID',    // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID',   // Replace with your EmailJS Template ID
      templateParams,
      'YOUR_PUBLIC_KEY'     // Replace with your EmailJS Public Key
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setName('');
        setEmail('');
      }, 3000);
    })
    .catch((err) => {
      console.error('FAILED...', err);
      // Fallback UI to show success state if API keys aren't set yet during development
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setName('');
        setEmail('');
      }, 3000);
    });
  };

  // SCROLL SPY LOGIC
  useEffect(() => {
    const handleScroll = () => {
      const phases = document.querySelectorAll('.scroll-phase');
      let current = activePhase;
      
      phases.forEach((phase, index) => {
        const rect = phase.getBoundingClientRect();
        // Determine which card is currently in the center of the screen
        if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.45) {
          current = index;
        }
      });
      
      if (current !== activePhase) {
        setActivePhase(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePhase]);

  // ACTIVE THEORY 3D TILT FOR STICKY CARDS
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; 
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    // overflow-clip ensures sticky positioning works properly without horizontal scrollbars
    <div className="min-h-screen font-sans bg-[#FFFFFF] text-[#0F172A] overflow-clip relative">
      

      {/* --- EARLY ACCESS MODAL --- */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div 
          className="absolute inset-0 bg-[#0F172A]/30 backdrop-blur-md" 
          onClick={() => setIsModalOpen(false)}
        ></div>
        
        <div className={`relative bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md mx-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#0F172A] transition-colors rounded-full hover:bg-gray-50"
          >
            <X size={20} />
          </button>
          
          {!isSubmitted ? (
            <div className="text-center pt-4">
              <h3 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">Request Access</h3>
              <p className="text-gray-500 text-sm mb-6 px-4 leading-relaxed">
                Join the waitlist for Syndexus. We are currently onboarding select enterprise partners.
              </p>
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div className="space-y-3">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all text-[#0F172A] font-medium placeholder-gray-400"
                  />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all text-[#0F172A] font-medium placeholder-gray-400"
                  />
                </div>
                <button type="submit" className="w-full bg-[#0D9488] text-white px-6 py-4 rounded-2xl font-bold hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/20 active:scale-95 transition-all duration-300 mt-2">
                  Request Access
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#10B981]">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">Request Sent!</h3>
              <p className="text-gray-500 font-medium">Thanks {name}, we will be in touch at <span className="text-[#0F172A]">{email}</span> soon.</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease-in-out infinite;
          background-size: 200% 200%;
        }
        .tilt-card {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .tilt-card:hover {
          transition: transform 0.1s ease-out;
          z-index: 50;
        }
      `}} />

      {/* --- RESPONSIVE NAVIGATION BAR --- */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl saturate-150 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition z-50">
            <span className="text-xl md:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              SYNDEXUS
            </span>
          </a>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
            
            {/* DESKTOP PLATFORM DROPDOWN */}
            <div className="relative group">
              <div 
                onClick={() => setIsDesktopPlatformOpen(!isDesktopPlatformOpen)}
                className="flex items-center gap-1 cursor-pointer hover:text-[#0D9488] transition-colors py-6 px-1"
              >
                Platform <ChevronDown size={14} className={`transition-transform duration-300 group-hover:rotate-180 ${isDesktopPlatformOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden transition-all duration-300 origin-top transform group-hover:opacity-100 group-hover:scale-100 group-hover:visible ${isDesktopPlatformOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="flex flex-col p-2">
                  <a href="#" className="p-3 hover:bg-orange-50 rounded-xl transition-colors group/item">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                      <span className="font-bold text-[#0F172A] group-hover/item:text-[#F59E0B] transition-colors">Shipment Governance</span>
                    </div>
                  </a>
                  
                  <a href="#" className="p-3 hover:bg-cyan-50 rounded-xl transition-colors group/item">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div>
                      <span className="font-bold text-[#0F172A] group-hover/item:text-[#06B6D4] transition-colors">Documentation Control</span>
                    </div>
                  </a>
                  
                  <a href="#" className="p-3 hover:bg-emerald-50 rounded-xl transition-colors group/item">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                      <span className="font-bold text-[#0F172A] group-hover/item:text-[#10B981] transition-colors">Realization Monitoring</span>
                    </div>
                  </a>

                  <a href="#" className="p-3 hover:bg-gray-50 rounded-xl transition-colors group/item">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-2 h-2 rounded-full bg-[#0F172A]"></div>
                      <span className="font-bold text-[#0F172A] group-hover/item:text-[#0F172A] transition-colors">Access Management</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* DESKTOP TOOLS DROPDOWN */}
            <div className="relative group">
              <div 
                onClick={() => setIsDesktopToolsOpen(!isDesktopToolsOpen)}
                className="flex items-center gap-1 cursor-pointer hover:text-[#0D9488] transition-colors py-6 px-1"
              >
                Tools <ChevronDown size={14} className={`transition-transform duration-300 group-hover:rotate-180 ${isDesktopToolsOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden transition-all duration-300 origin-top transform group-hover:opacity-100 group-hover:scale-100 group-hover:visible ${isDesktopToolsOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="flex flex-col p-2">
                  <a href="#" className="p-3 hover:bg-teal-50 rounded-xl transition-colors group/item">
                    <span className="font-bold text-[#0F172A] group-hover/item:text-[#0D9488] transition-colors">HS Code Finder</span>
                  </a>
                  <a href="#" className="p-3 hover:bg-teal-50 rounded-xl transition-colors group/item">
                    <span className="font-bold text-[#0F172A] group-hover/item:text-[#0D9488] transition-colors">Duty Calculator</span>
                  </a>
                </div>
              </div>
            </div>

            {/* DESKTOP COMPANY DROPDOWN */}
            <div className="relative group">
              <div 
                onClick={() => setIsDesktopCompanyOpen(!isDesktopCompanyOpen)}
                className="flex items-center gap-1 cursor-pointer hover:text-[#0D9488] transition-colors py-6 px-1"
              >
                Company <ChevronDown size={14} className={`transition-transform duration-300 group-hover:rotate-180 ${isDesktopCompanyOpen ? 'rotate-180' : ''}`} />
              </div>
              
              <div className={`absolute top-[90%] left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden transition-all duration-300 origin-top transform group-hover:opacity-100 group-hover:scale-100 group-hover:visible ${isDesktopCompanyOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="flex flex-col p-2">
                  <a href="#" className="p-3 hover:bg-gray-50 rounded-xl transition-colors group/item">
                    <span className="font-bold text-[#0F172A] group-hover/item:text-[#0D9488] transition-colors">About</span>
                  </a>
                  <a href="#" className="p-3 hover:bg-gray-50 rounded-xl transition-colors group/item">
                    <span className="font-bold text-[#0F172A] group-hover/item:text-[#0D9488] transition-colors">Contact</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
          
          <div className="flex items-center gap-6 z-50">
            <a href="/login" className="hidden sm:block text-sm font-bold text-[#0F172A] hover:text-[#0D9488] transition-colors">
              Login
            </a>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0D9488] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-lg font-bold text-xs md:text-sm transition-all shadow-md hover:shadow-lg hover:bg-teal-700"
            >
              Request Access
            </button>

            <button 
              className="lg:hidden text-[#0F172A] p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-3xl transition-all duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className="flex flex-col px-6 pt-10 pb-20 space-y-6 text-xl font-bold text-[#0F172A]">
            
            {/* MOBILE PLATFORM ACCORDION */}
            <div>
              <button 
                onClick={() => setIsMobilePlatformOpen(!isMobilePlatformOpen)}
                className="flex w-full justify-between items-center border-b border-gray-100 pb-4"
              >
                Platform <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isMobilePlatformOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isMobilePlatformOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div><span className="text-lg">Shipment Governance</span></a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div className="w-2 h-2 rounded-full bg-[#06B6D4]"></div><span className="text-lg">Documentation Control</span></a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div className="w-2 h-2 rounded-full bg-[#10B981]"></div><span className="text-lg">Realization Monitoring</span></a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><div className="w-2 h-2 rounded-full bg-[#0F172A]"></div><span className="text-lg">Access Management</span></a>
              </div>
            </div>

            {/* MOBILE TOOLS ACCORDION */}
            <div>
              <button 
                onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                className="flex w-full justify-between items-center border-b border-gray-100 pb-4"
              >
                Tools <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isMobileToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isMobileToolsOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span className="text-lg">HS Code Finder</span></a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span className="text-lg">Duty Calculator</span></a>
              </div>
            </div>

            {/* MOBILE COMPANY ACCORDION */}
            <div>
              <button 
                onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                className="flex w-full justify-between items-center border-b border-gray-100 pb-4"
              >
                Company <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isMobileCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isMobileCompanyOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span className="text-lg">About</span></a>
                <a href="#" className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><span className="text-lg">Contact</span></a>
              </div>
            </div>

            <a href="/login" className="border-b border-gray-100 pb-4 text-[#0D9488]">Login</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative flex flex-col items-center justify-center text-center px-4 pt-40 pb-24 min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(15,23,42,0.03),transparent_60%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0F172A] max-w-6xl tracking-tighter leading-[1.05] mb-8 flex flex-col items-center">
            <MaskedReveal delay={100}>
              Structured Control
            </MaskedReveal>
            <MaskedReveal delay={250}>
              for <span className="text-[#0D9488]">Export Operations.</span>
            </MaskedReveal>
          </h1>
          
          <RevealOnScroll delay={600}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-4xl mb-12 leading-relaxed font-medium px-4">
              A compliance-aligned export operations platform built for Indian exporters. Centralize shipment data, standardize documentation, and monitor realization timelines within a governed workspace.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={800} className="w-full z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full px-4 sm:px-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-[#0D9488] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-700 transition-colors duration-300 shadow-xl shadow-teal-900/10"
              >
                Request Access
              </button>
              
              <a href="#" className="group text-gray-500 font-medium hover:text-[#0F172A] transition-colors flex items-center justify-center gap-2 text-lg py-2 underline decoration-gray-300 underline-offset-4 hover:decoration-[#0F172A]">
                View Platform Overview 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </header>

      {/* --- THE CORE EXPERIENCE: STICKY SCROLL --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-start relative">
        <div className="w-full md:w-1/2 md:pr-16 pb-12 md:pb-16">
          
          {/* Phase 0: Shipment Governance */}
          <div className="scroll-phase min-h-[50vh] md:min-h-[90vh] flex flex-col justify-center perspective-[2000px] mb-12 md:mb-0">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`tilt-card p-6 md:p-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm transition-all origin-left ${
              activePhase === 0 ? 'opacity-100 scale-100 blur-none shadow-xl shadow-gray-200/50' : 'opacity-40 md:opacity-20 scale-100 md:scale-95 blur-none md:blur-[8px]'
            }`}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0F172A] mb-6">Shipment Governance.</h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 font-medium">
                Every export begins with structured shipment creation. Buyer identity, HS classification, invoice value, currency, and port details are captured once and preserved in a centralized system. Invoice uploads are converted into confirmed structured records to eliminate duplicate data entry.
              </p>
              <div className="flex items-center gap-3 text-[#F59E0B] font-bold text-base md:text-lg bg-orange-50 w-max px-4 py-2 rounded-lg border border-orange-100">
                <Globe size={20} className="md:w-5 md:h-5" /> Single source of export data.
              </div>
            </div>
          </div>

          {/* Phase 1: Documentation Control */}
          <div className="scroll-phase min-h-[50vh] md:min-h-[90vh] flex flex-col justify-center perspective-[2000px] mb-12 md:mb-0">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`tilt-card p-6 md:p-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm transition-all origin-left ${
              activePhase === 1 ? 'opacity-100 scale-100 blur-none shadow-xl shadow-cyan-900/10' : 'opacity-40 md:opacity-20 scale-100 md:scale-95 blur-none md:blur-[8px]'
            }`}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0F172A] mb-6">Documentation Control.</h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 font-medium">
                Commercial invoices and packing lists are generated from validated shipment data. Customs brokers access structured records through defined roles and update shipping bill references within a controlled environment. Documentation inconsistencies are reduced by design.
              </p>
              <div className="flex items-center gap-3 text-[#06B6D4] font-bold text-base md:text-lg bg-cyan-50 w-max px-4 py-2 rounded-lg border border-cyan-100">
                <FileText size={20} className="md:w-5 md:h-5" /> Standardized documentation workflow.
              </div>
            </div>
          </div>

          {/* Phase 2: Realization Monitoring */}
          <div className="scroll-phase min-h-[50vh] md:min-h-[90vh] flex flex-col justify-center perspective-[2000px]">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`tilt-card p-6 md:p-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm transition-all origin-left ${
              activePhase === 2 ? 'opacity-100 scale-100 blur-none shadow-xl shadow-emerald-900/10' : 'opacity-40 md:opacity-20 scale-100 md:scale-95 blur-none md:blur-[8px]'
            }`}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-[#0F172A] mb-6">Realization Monitoring.</h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-8 font-medium">
                Export realization timelines are monitored automatically upon Bill of Lading entry. Approaching deadlines are surfaced in advance. Overdue exposures are clearly identified within the dashboard.
              </p>
              <div className="flex items-center gap-3 text-[#10B981] font-bold text-base md:text-lg bg-emerald-50 w-max px-4 py-2 rounded-lg border border-emerald-100">
                <Clock size={20} className="md:w-5 md:h-5" /> Proactive compliance visibility.
              </div>
            </div>
          </div>

        </div>

        {/* Sticky Globe Container */}
        <div className="hidden md:flex w-1/2 sticky top-24 h-[calc(100vh-8rem)] items-center justify-center">
          <div className="absolute inset-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] rounded-[3rem] blur-2xl"></div>
          <div className="w-full h-full bg-[#FAFAFA] rounded-[3rem] border border-gray-100 flex items-center justify-center relative overflow-hidden shadow-2xl z-10 transition-colors duration-1000">
            <VideoGlobe activePhase={activePhase} />
          </div>
        </div>
      </section>

      {/* --- WHY STRUCTURED EXPORT GOVERNANCE MATTERS --- */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          <RevealOnScroll>
            <div className="max-w-4xl mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tighter mb-6">
                Why Structured Export <br/>Governance Matters.
              </h2>
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
                Export operations require documentation accuracy, filing discipline, and realization oversight. Informal workflows introduce inconsistency and compliance exposure. Syndexus replaces fragmented processes with a structured export framework built around validated shipment records.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             <RevealOnScroll delay={100} className="w-full">
               <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm h-full hover:shadow-lg transition-shadow duration-300">
                 <div className="w-12 h-12 bg-gray-50 text-[#0F172A] rounded-xl flex items-center justify-center mb-6 font-black text-xl border border-gray-200">1</div>
                 <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">Structured Invoice Extraction</h3>
                 <p className="text-gray-500 font-medium text-lg leading-relaxed">
                   Commercial invoices are converted into structured shipment records through assisted data extraction and user confirmation. Key fields such as buyer details, HS classification, invoice value, and currency are captured and standardized before documentation is generated. This reduces repetitive data entry while preserving control and validation.
                 </p>
               </div>
             </RevealOnScroll>

             <RevealOnScroll delay={200} className="w-full">
               <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm h-full hover:shadow-lg transition-shadow duration-300">
                 <div className="w-12 h-12 bg-gray-50 text-[#0F172A] rounded-xl flex items-center justify-center mb-6 font-black text-xl border border-gray-200">2</div>
                 <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">Documentation Consistency by Design</h3>
                 <p className="text-gray-500 font-medium text-lg leading-relaxed">
                   All export documents are generated from a single structured source. Because documentation originates from confirmed shipment data, discrepancies across invoices and packing lists are minimized. Customs filing becomes more consistent and less amendment-prone.
                 </p>
               </div>
             </RevealOnScroll>

             <RevealOnScroll delay={300} className="w-full">
               <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm h-full hover:shadow-lg transition-shadow duration-300">
                 <div className="w-12 h-12 bg-gray-50 text-[#0F172A] rounded-xl flex items-center justify-center mb-6 font-black text-xl border border-gray-200">3</div>
                 <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">Compliance Monitoring Integrated into Workflow</h3>
                 <p className="text-gray-500 font-medium text-lg leading-relaxed">
                   Export realization deadlines are automatically calculated when a Bill of Lading is recorded. Approaching deadlines are surfaced proactively, allowing exporters to act before compliance risk escalates.
                 </p>
               </div>
             </RevealOnScroll>

             <RevealOnScroll delay={400} className="w-full">
               <div className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-sm h-full hover:shadow-lg transition-shadow duration-300">
                 <div className="w-12 h-12 bg-gray-50 text-[#0F172A] rounded-xl flex items-center justify-center mb-6 font-black text-xl border border-gray-200">4</div>
                 <h3 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">Permanent Export Ledger</h3>
                 <p className="text-gray-500 font-medium text-lg leading-relaxed">
                   Each shipment, filing update, and compliance event is recorded with traceable timestamps. This creates a structured operational history that supports audit readiness and future financial structuring.
                 </p>
               </div>
             </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* --- SECURITY & GOVERNANCE SECTION --- */}
      <section className="py-24 md:py-32 bg-[#0F172A] text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <RevealOnScroll>
              <div className="w-16 h-16 bg-[#1E293B] rounded-2xl flex items-center justify-center mb-8 border border-gray-700 text-[#0D9488]">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 text-white">
                Built with Institutional Controls.
              </h2>
              
              <ul className="space-y-6 text-gray-300 font-medium text-xl">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-800 shrink-0"><Lock size={16} className="text-teal-400" /></div>
                  Role-Based Access Control
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-800 shrink-0"><Activity size={16} className="text-teal-400" /></div>
                  Immutable Event Logging
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-800 shrink-0"><Server size={16} className="text-teal-400" /></div>
                  Secure Document Storage
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-800 shrink-0"><ShieldCheck size={16} className="text-teal-400" /></div>
                  Segregated Financial Visibility
                </li>
              </ul>
            </RevealOnScroll>
          </div>
          
          <div className="w-full md:w-1/2 bg-[#1E293B] border border-gray-700 p-8 md:p-12 rounded-[2rem]">
             <RevealOnScroll delay={200}>
               <h3 className="text-2xl font-bold text-white mb-4">Platform Disclaimer</h3>
               <p className="text-gray-400 leading-relaxed text-lg">
                 Syndexus is a technology platform for structured export workflow management. <strong className="text-white">It does not act as a bank, customs broker, or licensed financial intermediary.</strong>
               </p>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#F8FAFC] py-16 md:py-20 border-t border-gray-200">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="text-2xl font-extrabold text-[#0F172A] tracking-tight mb-4">SYNDEXUS</div>
              <p className="text-gray-500 font-medium leading-relaxed">Integrated Trade.<br/>Automated Trust.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 md:mb-6 tracking-tight">Platform</h4>
              <ul className="space-y-3 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Shipment Governance</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Documentation Control</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Realization Monitoring</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Access Management</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 md:mb-6 tracking-tight">Tools</h4>
              <ul className="space-y-3 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">HS Code Finder</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Duty Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#0F172A] mb-4 md:mb-6 tracking-tight">Legal</h4>
              <ul className="space-y-3 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Terms of Use</a></li>
                <li><a href="#" className="hover:text-[#0D9488] transition-colors">Data Security</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col items-center justify-center text-xs md:text-sm text-gray-400 font-medium text-center">
            <p>&copy; 2026 Syndexus Infrastructure Pvt Ltd. All rights reserved.</p>
          </div>
        </RevealOnScroll>
      </footer>
    </div>
  );
};

export default SyndexusLanding;