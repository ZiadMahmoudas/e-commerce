// src/pages/VendorDashboard.jsx
import React, { useState } from 'react';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('Alerts'); // للتبويبات اللي تحت يمين

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-lg gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            Welcome back! <span className="animate-[wiggle_1s_ease-in-out_infinite]">👋</span>
          </h2>
          <p className="text-white/90 text-[0.9rem]">Here's what's happening with your repricing today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white text-[#8b5cf6] px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Run Repricing
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-white/20 flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Pause All
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-white/20 flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-white/20 flex items-center gap-2 transition-colors">
            Last 30 days
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
      </div>

      {/* Row 1: 4 Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#8b5cf6]"></div>
          <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center mb-4">
            <span className="font-bold">$</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$0.00</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-[0.8rem] font-medium">Total Revenue</p>
        </div>

        {/* Gross Profit */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981]"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 text-[#10b981] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-[#10b981] text-xs font-bold bg-[#10b981]/10 px-2 py-1 rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              0% ROI
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$0.00</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-[0.8rem] font-medium">Gross Profit</p>
        </div>

        {/* Net Margin */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#06b6d4]"></div>
          <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">0%</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-[0.8rem] font-medium flex justify-between items-center">
            Net Margin <span className="text-gray-400 dark:text-[#8b94a7]/60 text-[10px]">Target: &gt; 15%</span>
          </p>
        </div>

        {/* Buy Box Win Rate */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]"></div>
          <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 text-[#f59e0b] flex items-center justify-center mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">0%</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-[0.8rem] font-medium">Buy Box Win Rate</p>
        </div>

      </div>

      {/* Row 2: 3 Narrow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1e2136] flex items-center justify-center text-indigo-500 dark:text-[#8b85ff]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-baseline mb-0.5">
               <p className="text-gray-500 dark:text-[#8b94a7] text-[0.75rem] font-medium">Sales Velocity</p>
               <span className="text-gray-400 dark:text-[#8b94a7]/60 text-[10px]">0 units (30d)</span>
            </div>
            <p className="text-gray-900 dark:text-white text-xl font-bold">0/day</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-[#f97316]/10 flex items-center justify-center text-orange-500">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          </div>
          <div className="flex-1">
             <div className="flex justify-between items-baseline mb-0.5">
               <p className="text-gray-500 dark:text-[#8b94a7] text-[0.75rem] font-medium">Active Listings</p>
               <span className="text-gray-400 dark:text-[#8b94a7]/60 text-[10px]">0 total</span>
            </div>
            <p className="text-gray-900 dark:text-white text-xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1e2136] flex items-center justify-center text-gray-500 dark:text-[#8b94a7]">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </div>
          <div className="flex-1">
             <div className="flex justify-between items-baseline mb-0.5">
               <p className="text-gray-500 dark:text-[#8b94a7] text-[0.75rem] font-medium">Price Changes</p>
               <span className="text-gray-400 dark:text-[#8b94a7]/60 text-[10px]">Today's updates</span>
            </div>
            <p className="text-gray-900 dark:text-white text-xl font-bold">0</p>
          </div>
        </div>

      </div>

      {/* Row 3: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Repricing Activity (Takes 2 columns) */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 lg:col-span-2 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Repricing Activity</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-xs mb-4">Price changes over time</p>
          
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-[#8b94a7]">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            <p className="font-medium text-sm text-gray-700 dark:text-gray-300">No activity data available.</p>
            <p className="text-xs mt-1">Connect a marketplace or wait for synchronization.</p>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Competitor Analysis</h3>
          <p className="text-gray-500 dark:text-[#8b94a7] text-xs mb-4">Who holds the Buy Box?</p>
          
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-[#8b94a7]">
            <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
            <p className="text-sm">No competition data</p>
          </div>
        </div>

      </div>

      {/* Row 4: Lists & Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Movers */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 shadow-sm min-h-[350px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Top Movers</h3>
            <button className="border border-indigo-500 text-indigo-500 px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              All Listings
            </button>
          </div>
          <div className="grid grid-cols-3 text-[10px] font-bold text-gray-400 dark:text-[#8b94a7] tracking-wider mb-3">
            <span>PRODUCT</span>
            <span className="text-center">PRICE</span>
            <span className="text-right">CHANGE</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-[#8b94a7] text-sm">
            Dashboard.Charts.NoPriceChanges
          </div>
        </div>

        {/* Strategy Performance */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 shadow-sm min-h-[350px] flex flex-col">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">Strategy Performance</h3>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-[#8b94a7] tracking-wider mb-3">
            <span>STRATEGY</span>
            <span>REVENUE</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-[#8b94a7] text-sm">
            Dashboard.Charts.NoStrategyData
          </div>
        </div>

        {/* Tabs Panel (Alerts, Log, Rivals) */}
        <div className="bg-white dark:bg-[#141728] border border-gray-200 dark:border-[#2a2e45] rounded-xl p-6 shadow-sm min-h-[350px] flex flex-col">
          <div className="flex bg-gray-50 dark:bg-[#1e2136] rounded-lg p-1 mb-4">
            {['Alerts', 'Log', 'Rivals'].map(tab => (
               <button 
                 key={tab} 
                 onClick={() => setActiveTab(tab)}
                 className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5
                   ${activeTab === tab ? 'bg-white dark:bg-[#2a2e45] text-indigo-600 dark:text-[#8b85ff] shadow-sm' : 'text-gray-500 dark:text-[#8b94a7] hover:text-gray-900 dark:hover:text-white'}
                 `}
               >
                 {tab === 'Alerts' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
                 {tab === 'Log' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                 {tab === 'Rivals' && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                 {tab}
               </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-[#8b94a7] mb-4">0 items need attention</p>
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-[#8b94a7] text-sm">
            All clear! No alerts at this time.
          </div>
        </div>

      </div>

    </div>
  )
}