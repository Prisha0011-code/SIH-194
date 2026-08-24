import React, { useState } from 'react';
import { User, Calendar, CheckCircle } from 'lucide-react';

export default function ProfileSetupPage({ token, onComplete }) {
  const [gender, setGender] = useState('');
  const [ageGroup, setAgeGroup] = useState('');

  const genderOptions = [
    { id: 'Male', label: 'Male' },
    { id: 'Female', label: 'Female' },
    { id: 'Non-binary', label: 'Non-binary' },
    { id: 'Self-describe', label: 'Self-describe' }
  ];

  const ageGroupOptions = [
    { id: '18–24', label: '18 – 24', desc: 'Peak metabolic flexibility & focus endurance' },
    { id: '25–34', label: '25 – 34', desc: 'Balanced workload & steady expenditure' },
    { id: '35–49', label: '35 – 49', desc: 'High executive load & recovery management' },
    { id: '50+', label: '50+', desc: 'Optimized circadian maintenance & stability' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gender || !ageGroup) return;
    // API Call: PATCH /api/v1/users/profile
    onComplete({ gender, ageGroup });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 max-w-3xl mx-auto">
      <div className="w-full bg-slate-800/60 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Set Up Your Profile</h2>
          <p className="text-slate-400 text-sm">
            These parameters enable the AI engine to calculate baseline daily expenditure and focus duration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Gender Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-teal-400 uppercase tracking-wider mb-4">
              <User className="w-4 h-4" /> Gender Profile
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {genderOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setGender(opt.id)}
                  className={`p-4 rounded-xl border text-center transition flex flex-col items-center justify-center gap-2 ${
                    gender === opt.id
                      ? 'bg-teal-500/10 border-teal-400 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                  {gender === opt.id && <CheckCircle className="w-4 h-4 text-teal-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
              <Calendar className="w-4 h-4" /> Age Group
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ageGroupOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setAgeGroup(opt.id)}
                  className={`p-4 rounded-xl border text-left transition flex justify-between items-start ${
                    ageGroup === opt.id
                      ? 'bg-indigo-500/10 border-indigo-400 text-white'
                      : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div>
                    <span className="font-bold text-lg text-slate-100">{opt.label}</span>
                    <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                  </div>
                  {ageGroup === opt.id && <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!gender || !ageGroup}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Setup & Launch Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}