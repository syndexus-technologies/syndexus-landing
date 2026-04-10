'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate an API authentication call
    setTimeout(() => {
      setIsLoading(false);
      // Route the user to the dashboard upon successful "login"
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex font-sans bg-[#FFFFFF] text-[#0F172A]">
      
      {/* --- LEFT PANEL: BRANDING (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative flex-col justify-between p-12 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.4),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.4),transparent_50%)]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1E293B 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }}></div>
        
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold mb-12">
            <ArrowLeft size={16} /> Back to Website
          </a>
          
          {/* --- DESKTOP LOGO ADDED HERE --- */}
          <div className="flex items-center gap-3 mb-4">
            {/* Make sure your logo is inside the /public folder and update the src path below */}
            <Image 
              src="/logo.png" 
              alt="Syndexus Logo" 
              width={40} 
              height={40} 
              className="object-contain"
            />
            <div className="text-3xl font-extrabold text-white tracking-tight">SYNDEXUS</div>
          </div>
          
          <div className="w-12 h-1 bg-[#0D9488] mb-8"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="w-12 h-12 bg-[#1E293B] rounded-xl flex items-center justify-center mb-6 border border-gray-700 text-[#0D9488]">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
            The Trust OS for Global Trade.
          </h2>
          <p className="text-lg text-gray-400 font-medium leading-relaxed mb-8">
            Access your structured export ledger, manage compliance timelines, and coordinate with your customs broker in one secure environment.
          </p>
          
          <div className="flex items-center gap-3 text-sm font-bold text-[#0D9488]">
            <span>System Status: Fully Operational</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0D9488]"></span>
            </span>
          </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: LOGIN FORM --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50">
        <div className="max-w-md w-full">
          
          {/* Mobile Back Button */}
          <a href="/" className="lg:hidden inline-flex items-center gap-2 text-[#334155] hover:text-[#0F172A] transition-colors text-sm font-bold mb-8">
            <ArrowLeft size={16} /> Back to Website
          </a>

          {/* --- MOBILE LOGO ADDED HERE --- */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            {/* Make sure your logo is inside the /public folder and update the src path below */}
            <Image 
              src="/logo.jpeg" 
              alt="Syndexus Logo" 
              width={36} 
              height={36} 
              className="object-contain"
            />
            <span className="text-2xl font-extrabold text-[#0F172A] tracking-tight">SYNDEXUS</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">Welcome Back</h1>
            <p className="text-[#334155] font-medium">Enter your credentials to access your workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-[#334155] mb-2">Corporate Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition-all placeholder-gray-400 shadow-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[#334155]">Password</label>
                <a href="#" className="text-xs font-bold text-[#0D9488] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488] focus:ring-2 focus:ring-[#0D9488]/10 transition-all placeholder-gray-400 shadow-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-[#0D9488] text-white py-3.5 rounded-lg font-bold text-sm hover:bg-[#0F172A] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Workspace <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-10 text-center lg:text-left text-sm text-gray-500 font-medium">
            Don't have an account? <button className="font-bold text-[#0F172A] hover:text-[#0D9488] transition-colors">Request Access</button>
          </div>

        </div>
      </div>
    </div>
  );
}