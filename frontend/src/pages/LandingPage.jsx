import React, { useState } from 'react';
import { ShieldCheck, Calendar, Utensils, ArrowRight } from 'lucide-react';

export default function LandingPage({ onAuthenticate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API Call: POST /api/v1/auth/signup or /login
    onAuthenticate('mock-jwt-token-xyz123');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-4 py-8">
      {/* Header / Logo */}
      <header className="flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
          Integrated DayBlend
        </h1>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-teal-400 hover:underline font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </header>

      {/* Hero Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center my-12">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            AI-Driven Schedule Optimization & Context-Aware Diet Balancing
          </h2>
          <p className="text-slate-400 text-lg">
            Harmonize your productivity and wellness. DayBlend reschedules delayed tasks in real-time and balances your diet using strictly what is already in your routine.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-200">Dynamic Task Resampler</h4>
                <p className="text-sm text-slate-400">Edits automatically shift remaining day blocks without dropping priorities.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Utensils className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-200">In-Routine Diet Balancer</h4>
                <p className="text-sm text-slate-400">Optimizes daily nutrition without adding external grocery items.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-200">Role-Based Nutrition Verifier</h4>
                <p className="text-sm text-slate-400">Specialized AI agent audits every meal plan against clinical safety baselines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Card */}
        <div className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Get started with integrated day management in seconds.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/10"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6 text-center">
            <span className="bg-slate-800 px-3 text-xs text-slate-500 uppercase tracking-widest relative z-10">Or connect with</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700"></div></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-slate-900 hover:bg-slate-700/50 border border-slate-700 rounded-lg py-2 text-sm font-medium transition text-slate-300">
              Google OAuth
            </button>
            <button className="bg-slate-900 hover:bg-slate-700/50 border border-slate-700 rounded-lg py-2 text-sm font-medium transition text-slate-300">
              Apple ID
            </button>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-800">
        © 2026 Integrated DayBlend. All rights reserved.
      </footer>
    </div>
  );
}