import React, { useState } from 'react';
import { ShieldCheck, Plus, Sparkles, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DietVerifier({ token, userProfile }) {
  const [userMeals, setUserMeals] = useState([
    'Oatmeal with almonds',
    'Grilled chicken salad',
    'Brown rice & scrambled eggs'
  ]);
  const [newMeal, setNewMeal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!newMeal) return;
    setUserMeals((prev) => [...prev, newMeal]);
    setNewMeal('');
  };

  const handleRunOptimizerAndVerify = () => {
    setIsProcessing(true);
    setVerificationResult(null);

    // API Calls sequence:
    // 1. POST /api/v1/diet/balance
    // 2. POST /api/v1/diet/verify
    setTimeout(() => {
      setVerificationResult({
        status: 'Approved',
        role: 'Clinical Nutritionist Agent',
        balancedPlan: [
          { time: '08:30 AM', item: 'Oatmeal with almonds', macroNote: 'High complex carbs for focus' },
          { time: '01:30 PM', item: 'Grilled chicken salad', macroNote: 'Lean protein to prevent crash' },
          { time: '07:30 PM', item: 'Brown rice & scrambled eggs', macroNote: 'Recovery portion aligned with age profile' }
        ],
        verificationDetails: 'Verified against medical baselines. Zero out-of-routine ingredients added.'
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          In-Routine Diet Optimizer
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Strictly balances macro/micro nutrients using existing food items only.
        </p>
      </div>

      {/* Food Log Form */}
      <form onSubmit={handleAddMeal} className="flex gap-2">
        <input
          type="text"
          placeholder="Add routine meal (e.g. Greek yogurt)"
          value={newMeal}
          onChange={(e) => setNewMeal(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Log Meal
        </button>
      </form>

      {/* Routine Meal Chips */}
      <div>
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Current Logged Ingredients / Meals
        </label>
        <div className="flex flex-wrap gap-2">
          {userMeals.map((meal, index) => (
            <span
              key={index}
              className="bg-slate-900 text-indigo-300 border border-slate-700 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              {meal}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleRunOptimizerAndVerify}
        disabled={isProcessing || userMeals.length === 0}
        className="w-full bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-white text-xs font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
        {isProcessing ? 'Auditing & Optimizing Plan...' : 'Optimize & Verify Diet Plan'}
      </button>

      {/* Role-Based AI Verifier Bot Card Output */}
      {verificationResult && (
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{verificationResult.role}</h4>
                <p className="text-[10px] text-emerald-400 font-medium">Status: {verificationResult.status}</p>
              </div>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 px-2 py-0.5 rounded">
              0 Extra Items Added
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-2.5 rounded border border-slate-700/50">
            {verificationResult.verificationDetails}
          </p>

          <div className="space-y-2">
            <h5 className="text-[11px] font-semibold text-slate-400 uppercase">AI Schedule-Aligned Portions</h5>
            {verificationResult.balancedPlan.map((item, idx) => (
              <div key={idx} className="bg-slate-800/40 p-2.5 rounded border border-slate-700/40 text-xs flex justify-between items-center">
                <div>
                  <span className="font-semibold text-slate-200">{item.item}</span>
                  <p className="text-[10px] text-slate-400">{item.macroNote}</p>
                </div>
                <span className="text-[11px] font-mono text-indigo-300">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}