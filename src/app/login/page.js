'use client';

import React, { useState } from 'react';
import { Lock, ArrowLeft, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Security State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  // INSTITUTIONAL ERROR COPY
  const ERR_INCORRECT = "The credentials entered do not match our records.";
  const ERR_LOCKED = "Your account has been temporarily restricted due to multiple unsuccessful attempts.";
  const MSG_RESET_SUCCESS = "A secure reset link has been sent to your registered email.";

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Block login if account is locked (3+ failed attempts)
    if (isLocked || failedAttempts >= 3) {
      setErrorMessage(ERR_LOCKED);
      setShowRecaptcha(true);
      return;
    }

    setIsLoading(true);

    // Simulate network request & backend validation
    setTimeout(() => {
      setIsLoading(false);

      // MOCK BACKEND LOGIC: Replace with actual JWT authentication & bcrypt validation
      if (email === 'demo@syndexus.com' && password === 'admin123') {
        // SUCCESS: 
        // FUTURE BACKEND INTEGRATION:
        // 1. Generate & store JWT in HTTP-only cookie
        // 2. Log audit event: { event: "login_success", user: email, timestamp: Date.now() }
        // 3. Check Org-based tenant isolation & Multi-role routing
        window.location.href = '/dashboard'; // Redirect to mock dashboard
      } else {
        // FAILURE:
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        
        // Log audit event: { event: "login_failed", user: email, timestamp: Date.now() }
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setErrorMessage(ERR_LOCKED);
          setShowRecaptcha(true);
        } else {
          setErrorMessage(ERR_INCORRECT);
        }
      }
    }, 1000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email) {
      setErrorMessage("Please enter your email address to receive a reset link.");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(MSG_RESET_SUCCESS);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#0D9488] selection:text-white">
      
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-[#0F172A] transition-colors font-medium text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">SYNDEXUS</h1>
          <p className="text-gray-500 font-medium">Secure Access to Export Workspace</p>
        </div>

        {/* Global Error/Success Messages */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800 leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <CheckCircle className="text-[#10B981] w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-emerald-800 leading-relaxed">{successMessage}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[#0F172A] mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLocked || isLoading}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all text-[#0F172A] font-medium placeholder-gray-400 disabled:opacity-50"
              placeholder="name@organization.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0F172A] mb-2" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked || isLoading}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 transition-all text-[#0F172A] font-medium placeholder-gray-400 disabled:opacity-50"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLocked}
                className="w-4 h-4 rounded border-gray-300 text-[#0D9488] focus:ring-[#0D9488] disabled:opacity-50 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-600">Remember this device</span>
            </label>
            
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-bold text-[#0D9488] hover:text-teal-700 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* MOCK reCAPTCHA BOX (Appears only after 3 failed attempts) */}
          {showRecaptcha && (
            <div className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-between mt-4 opacity-50 cursor-not-allowed">
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white"></div>
                 <span className="text-sm font-medium text-gray-600">I'm not a robot</span>
               </div>
               <RefreshCcw size={20} className="text-gray-400" />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLocked || isLoading}
            className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#0D9488] hover:shadow-lg hover:shadow-teal-900/20 active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 mt-4 disabled:opacity-50 disabled:hover:bg-[#0F172A] disabled:hover:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Lock size={16} className="opacity-80" /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-100 pt-8">
          <p className="text-sm text-gray-500 font-medium">Need access?</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-2 text-[15px] font-bold text-[#0F172A] hover:text-[#0D9488] transition-colors"
          >
            Request Organizational Account
          </button>
        </div>

      </div>

      {/* Security Footnote */}
      <div className="mt-10 text-center">
        <p className="text-xs text-gray-400 font-medium max-w-sm leading-relaxed">
          Protected by AES-256 encryption. <br/>Session automatically expires after 30 minutes of inactivity.
        </p>
      </div>

    </div>
  );
}