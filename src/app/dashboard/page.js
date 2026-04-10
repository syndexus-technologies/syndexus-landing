'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Bell, User, Plus, Upload, CheckCircle, FileText, ChevronDown, X, LogOut } from 'lucide-react';
import Image from "next/image";

export default function SyndexusDashboard() {
  const router = useRouter();

  // --- STATE ---
  const [role, setRole] = useState('Exporter');
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);
  const [ocrStep, setOcrStep] = useState(1); // 1: Upload, 2: Confirm Data
  const [isProcessing, setIsProcessing] = useState(false);

  // --- MOCK DATA ---
  const [shipments, setShipments] = useState([
    { id: 'SHP-10042', buyer: 'EuroTrade Logistics', country: 'Germany', value: '$120,000', status: 'Documents Ready', blUploaded: 'No', deadline: '2026-12-15' },
    { id: 'SHP-10041', buyer: 'Global Tech SG', country: 'Singapore', value: '$45,000', status: 'BL Uploaded', blUploaded: 'Yes', deadline: '2026-11-20' },
    { id: 'SHP-10040', buyer: 'Dubai Hub Imports', country: 'UAE', value: '$85,000', status: 'Created', blUploaded: 'No', deadline: 'Pending BL' },
    { id: 'SHP-10039', buyer: 'US Retailers Inc', country: 'USA', value: '$210,000', status: 'Completed', blUploaded: 'Yes', deadline: '2026-08-10' },
  ]);

  const [ocrData, setOcrData] = useState({
    invoiceNumber: 'INV-2026-089',
    date: '2026-03-15',
    buyer: 'Acme Corp UK',
    value: '55000',
    currency: 'USD',
    hsCode: '8517.62',
    product: 'Networking Equipment'
  });

  // --- HANDLERS ---
  const handleUploadInvoice = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate OCR Extraction delay
    setTimeout(() => {
      setIsProcessing(false);
      setOcrStep(2); // Move to confirm step
    }, 1500);
  };

  const handleConfirmShipment = () => {
    const newShipment = {
      id: `SHP-${Math.floor(10000 + Math.random() * 90000)}`,
      buyer: ocrData.buyer,
      country: 'United Kingdom', // Defaulted for mock
      value: `$${parseInt(ocrData.value).toLocaleString()}`,
      status: 'Created',
      blUploaded: 'No',
      deadline: 'Pending BL'
    };
    setShipments([newShipment, ...shipments]);
    setIsNewShipmentModalOpen(false);
    setOcrStep(1);
  };

  // --- UI HELPERS ---
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
      case 'BL Uploaded':
        return <span className="px-2.5 py-1 bg-[#ECFDF5] text-[#10B981] font-bold text-xs rounded">✓ {status}</span>;
      case 'Documents Ready':
      case 'Shipping Bill Filed':
        return <span className="px-2.5 py-1 bg-[#E0F2FE] text-[#06B6D4] font-bold text-xs rounded">{status}</span>;
      case 'Created':
        return <span className="px-2.5 py-1 bg-[#FEF3C7] text-[#F59E0B] font-bold text-xs rounded">{status}</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-600 font-bold text-xs rounded">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans flex overflow-hidden">
      
      {/* --- NEW SHIPMENT MODAL (OCR WORKFLOW) --- */}
      {isNewShipmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm p-4">
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">New Shipment</h2>
                <p className="text-sm text-[#334155] mt-1">
                  {ocrStep === 1 ? 'Step 1: Upload Commercial Invoice' : 'Step 2: Confirm Extracted Data'}
                </p>
              </div>
              <button onClick={() => {setIsNewShipmentModalOpen(false); setOcrStep(1);}} className="text-gray-400 hover:text-[#0F172A] transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {ocrStep === 1 ? (
                <form onSubmit={handleUploadInvoice} className="flex flex-col items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-lg bg-gray-50 py-16 px-4 hover:border-[#0D9488] transition-colors cursor-pointer group relative">
                  <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" />
                  <FileText size={40} className="text-gray-300 group-hover:text-[#0D9488] mb-4 transition-colors" />
                  <p className="text-sm font-bold text-[#0F172A] mb-1">Click to upload Commercial Invoice (PDF)</p>
                  <p className="text-xs text-[#334155]">Syndexus OCR will automatically extract shipment details.</p>
                  
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-lg">
                      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0D9488] rounded-full animate-spin mb-3"></div>
                      <p className="text-sm font-bold text-[#0D9488]">Extracting Data...</p>
                    </div>
                  )}
                  
                  {/* Invisible submit triggered by input via standard form practices, mocked here with a manual button for demo */}
                  <div className="mt-6 z-10">
                    <button type="submit" className="bg-[#0F172A] text-white px-6 py-2 rounded font-bold text-sm hover:bg-gray-800 transition-colors">
                      Process Document
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-[#ECFDF5] border border-[#10B981]/20 p-3 rounded-lg flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#10B981]" />
                    <p className="text-sm font-bold text-[#10B981]">Data extracted successfully. Please verify.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">Invoice Number</label>
                      <input type="text" value={ocrData.invoiceNumber} onChange={e => setOcrData({...ocrData, invoiceNumber: e.target.value})} className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">Date</label>
                      <input type="date" value={ocrData.date} onChange={e => setOcrData({...ocrData, date: e.target.value})} className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">Buyer</label>
                      <input type="text" value={ocrData.buyer} onChange={e => setOcrData({...ocrData, buyer: e.target.value})} className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">Value</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-[#E5E7EB] bg-gray-50 text-gray-500 text-sm font-bold">{ocrData.currency}</span>
                        <input type="number" value={ocrData.value} onChange={e => setOcrData({...ocrData, value: e.target.value})} className="w-full border border-[#E5E7EB] rounded-r px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">HS Code</label>
                      <input type="text" value={ocrData.hsCode} onChange={e => setOcrData({...ocrData, hsCode: e.target.value})} className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-[#334155] mb-1 uppercase tracking-wide">Product Description</label>
                      <input type="text" value={ocrData.product} onChange={e => setOcrData({...ocrData, product: e.target.value})} className="w-full border border-[#E5E7EB] rounded px-3 py-2 text-sm font-medium text-[#0F172A] outline-none focus:border-[#0D9488]" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                    <button onClick={() => setOcrStep(1)} className="px-4 py-2 text-sm font-bold text-[#334155] hover:text-[#0F172A]">Back</button>
                    <button onClick={handleConfirmShipment} className="bg-[#0D9488] text-white px-6 py-2 rounded font-bold text-sm hover:bg-[#0F172A] transition-colors">Confirm & Create Shipment</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- SIDEBAR (240px Fixed, No Icons) --- */}
      <aside className="w-[240px] border-r border-[#E5E7EB] bg-[#FFFFFF] shrink-0 hidden md:flex flex-col z-20">
        <div className="h-[72px] flex items-center px-6 border-b border-[#E5E7EB] shrink-0 gap-3">
          {/* DESKTOP SIDEBAR LOGO */}
          <Image 
            src="/logo.jpeg" 
            alt="Syndexus Logo" 
            width={28} 
            height={28} 
            className="object-contain"
          />
          <span className="text-xl font-extrabold text-[#0F172A] tracking-tight">SYNDEXUS</span>
        </div>
        
        <div className="flex-1 py-6 flex flex-col gap-1">
          {/* Active Item styling: Light grey bg, Teal indicator border */}
          <a href="#" className="px-6 py-3 bg-gray-50 border-l-4 border-[#0D9488] text-[#0F172A] font-bold text-sm">
            Dashboard
          </a>
          <a href="#" className="px-6 py-3 border-l-4 border-transparent text-[#334155] hover:text-[#0F172A] hover:bg-gray-50 font-medium text-sm transition-colors">
            Shipments
          </a>
          <a href="#" className="px-6 py-3 border-l-4 border-transparent text-[#334155] hover:text-[#0F172A] hover:bg-gray-50 font-medium text-sm transition-colors">
            Documents
          </a>
          <a href="#" className="px-6 py-3 border-l-4 border-transparent text-[#334155] hover:text-[#0F172A] hover:bg-gray-50 font-medium text-sm transition-colors">
            Compliance
          </a>
          <a href="#" className="px-6 py-3 border-l-4 border-transparent text-[#334155] hover:text-[#0F172A] hover:bg-gray-50 font-medium text-sm transition-colors">
            Users
          </a>
          <a href="#" className="px-6 py-3 border-l-4 border-transparent text-[#334155] hover:text-[#0F172A] hover:bg-gray-50 font-medium text-sm transition-colors">
            Settings
          </a>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/30">
        
        {/* --- TOP BAR (72px) --- */}
        <header className="h-[72px] border-b border-[#E5E7EB] bg-[#FFFFFF] px-6 md:px-8 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* MOBILE TOP BAR LOGO (Hidden on Desktop) */}
            <div className="md:hidden flex items-center">
              <Image 
                src="/logo.png" 
                alt="Syndexus Logo" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <h1 className="text-lg font-bold text-[#0F172A]">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Role Switcher */}
            <div className="hidden lg:flex items-center gap-2 border border-[#E5E7EB] rounded px-3 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="text-xs text-[#334155]">
                <span className="font-bold text-[#0F172A]">ABC Exports Pvt Ltd</span> • Role: {role}
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <div className="w-px h-6 bg-[#E5E7EB] hidden md:block"></div>

            <button className="text-[#334155] hover:text-[#0F172A] relative hidden sm:block">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FEE2E2] border-2 border-white rounded-full"></span>
            </button>
            <button className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-xs">
              JD
            </button>
            
            {/* Logout Button */}
            <button onClick={() => router.push('/login')} 
            className="flex items-center gap-2 text-sm font-bold text-[#334155] hover:text-[#EF4444] transition-colors ml-1 md:ml-2 border-l border-[#E5E7EB] pl-4 md:pl-6">
              <LogOut size={18} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* --- SCROLLABLE DASHBOARD CONTENT --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-1">Overview</h2>
                <p className="text-sm text-[#334155]">Track your ongoing shipments and compliance deadlines.</p>
              </div>
              <button 
                onClick={() => setIsNewShipmentModalOpen(true)}
                className="bg-[#0D9488] text-white px-5 py-2.5 rounded font-bold text-sm hover:bg-[#0F172A] transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
              >
                <Plus size={16} /> New Shipment
              </button>
            </div>

            {/* --- KPI CARDS (4 Cards) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-bold text-[#334155] mb-2">Active Shipments</p>
                <h3 className="text-3xl font-extrabold text-[#0F172A]">12</h3>
                <p className="text-xs text-[#06B6D4] font-bold mt-2">Currently ongoing</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]"></div>
                <p className="text-sm font-bold text-[#334155] mb-2">Pending Documents</p>
                <h3 className="text-3xl font-extrabold text-[#0F172A]">3</h3>
                <p className="text-xs text-[#F59E0B] font-bold mt-2">Missing Invoice/BL</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#FEF3C7]"></div>
                <p className="text-sm font-bold text-[#334155] mb-2">Upcoming Deadlines</p>
                <h3 className="text-3xl font-extrabold text-[#0F172A]">5</h3>
                <p className="text-xs text-[#334155] font-bold mt-2">&lt; 30 days remaining</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#FEE2E2] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#EF4444]"></div>
                <p className="text-sm font-bold text-[#334155] mb-2">Overdue</p>
                <h3 className="text-3xl font-extrabold text-[#EF4444]">1</h3>
                <p className="text-xs text-[#EF4444] font-bold mt-2">Deadline passed</p>
              </div>
            </div>

            {/* --- SHIPMENT TABLE (7 Columns) --- */}
            <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#E5E7EB] flex justify-between items-center">
                <h3 className="font-bold text-[#0F172A]">Recent Shipments</h3>
                <button className="text-sm font-bold text-[#0D9488] hover:underline">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                    <tr>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Shipment ID</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Buyer</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Country</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Value</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Status</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">BL Uploaded</th>
                      <th className="px-5 py-3 text-xs font-bold text-[#334155] uppercase tracking-wider">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">{shipment.id}</td>
                        <td className="px-5 py-4 text-sm text-[#334155] font-medium">{shipment.buyer}</td>
                        <td className="px-5 py-4 text-sm text-[#334155]">{shipment.country}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#0F172A]">{shipment.value}</td>
                        <td className="px-5 py-4">{getStatusBadge(shipment.status)}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#334155]">{shipment.blUploaded}</td>
                        <td className="px-5 py-4 text-sm text-[#334155]">{shipment.deadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- ALERTS & ACTIVITY LOG --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Compliance Alerts */}
              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg shadow-sm p-5">
                <h3 className="font-bold text-[#0F172A] mb-4">Compliance Alerts</h3>
                <div className="space-y-3">
                  <div className="bg-[#FEE2E2] border border-[#EF4444]/20 p-3 rounded flex flex-col gap-1">
                    <p className="text-sm font-bold text-[#EF4444]">Overdue Shipment: SHP-99201</p>
                    <p className="text-xs text-[#EF4444]/80">Export realization deadline passed on March 1, 2026. Action required immediately.</p>
                  </div>
                  <div className="bg-[#FEF3C7] border border-[#F59E0B]/20 p-3 rounded flex flex-col gap-1">
                    <p className="text-sm font-bold text-[#F59E0B]">Deadline Approaching: SHP-10022</p>
                    <p className="text-xs text-[#F59E0B]/80">Realization deadline in 14 days. Ensure buyer payment is processed.</p>
                  </div>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg shadow-sm p-5">
                <h3 className="font-bold text-[#0F172A] mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">BL Uploaded for SHP-10041</p>
                      <p className="text-xs text-[#334155] mt-0.5">Bill of Lading confirmed. Compliance deadline set.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Today, 10:45 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#06B6D4] mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">Invoice Uploaded for SHP-10042</p>
                      <p className="text-xs text-[#334155] mt-0.5">Commercial Invoice processed via OCR.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Yesterday, 3:20 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">Shipment Created: SHP-10042</p>
                      <p className="text-xs text-[#334155] mt-0.5">New shipment record initialized.</p>
                      <p className="text-[10px] text-gray-400 mt-1">Yesterday, 3:15 PM</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}