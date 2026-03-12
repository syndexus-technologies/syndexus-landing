'use client';

import React, { useEffect } from 'react';
import { User, Mail, Shield, Clock, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NexusGrid from '../../components/NexusGrid';
import ThemeToggle from '../../components/ThemeToggle';
import { useRouter } from 'next/navigation'; // For redirection

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Protect the route: If no user, redirect to home
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null; // Prevent flashing content before redirect

  return (
    <div className="min-h-screen font-sans transition-colors duration-300
      bg-gray-50 text-slate-900 selection:bg-syndexus-teal selection:text-white
      dark:bg-syndexus-navy dark:text-white dark:selection:text-syndexus-navy
      overflow-x-hidden relative">
      
      <NexusGrid />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <ArrowLeft size={20} className="text-syndexus-teal" />
            <span className="font-bold">Back to Home</span>
          </a>
          <ThemeToggle />
        </nav>

        <main className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
          
          {/* Profile Header Card */}
          <div className="bg-white/60 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Avatar Circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-syndexus-teal to-blue-500 p-[3px] shadow-lg shadow-teal-500/20">
              <div className="w-full h-full rounded-full bg-white dark:bg-[#0b1120] flex items-center justify-center">
                <User size={64} className="text-gray-400 dark:text-gray-600" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-syndexus-teal/10 text-syndexus-teal text-xs font-bold uppercase tracking-wider mb-2">
                Early Access Member
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                {user.name || "Syndexus User"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 dark:text-gray-400 mb-6">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition">
                  <Settings size={18} />
                  Edit Profile
                </button>
                <button 
                  onClick={() => { logout(); router.push('/'); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Account Status */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold">Account Status</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="font-medium">Free Tier</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-500">Verification</span>
                  <span className="text-green-500 font-bold text-sm">Verified</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="font-medium">Jan 2026</span>
                </div>
              </div>
            </div>

            {/* Recent Activity (Mock Data) */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold">Recent Activity</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-syndexus-teal shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Logged in successfully</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-2 h-2 mt-2 rounded-full bg-syndexus-orange shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium">Joined Waitlist</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}