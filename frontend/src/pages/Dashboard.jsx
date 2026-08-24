import React, { useState } from 'react';
import TaskTracker from '../components/TaskTracker';
import DietVerifier from '../components/DietVerifier';
import { User, Activity } from 'lucide-react';

export default function DashboardPage({ token, userProfile }) {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-800/80 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
            Integrated DayBlend
          </h1>
          <span className="bg-slate-700 text-xs text-slate-300 px-2.5 py-1 rounded-full font-mono">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <User className="w-3.5 h-3.5 text-teal-400" />
            <span>Profile: <strong className="text-slate-200">{userProfile.gender || 'Male'}</strong> ({userProfile.ageGroup || '25–34'})</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Activity className="w-3.5 h-3.5" />
            <span>AI Engine Active</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        {/* Left Column: Task & Routine Management (7 Cols) */}
        <section className="lg:col-span-7 space-y-6">
          <TaskTracker token={token} userProfile={userProfile} />
        </section>

        {/* Right Column: In-Routine Diet Optimizer & Verifier (5 Cols) */}
        <section className="lg:col-span-5 space-y-6">
          <DietVerifier token={token} userProfile={userProfile} />
        </section>
      </main>
    </div>
  );
}