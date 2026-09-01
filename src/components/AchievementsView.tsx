import React from 'react';
import { Achievement, UserStats } from '../types';
import { Award, CheckCircle2, Trophy, Zap, Droplets, Heart, Sprout, Flame, Globe } from 'lucide-react';

interface AchievementsViewProps {
  achievements: Achievement[];
  userStats: UserStats;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  userStats,
}) => {
  const completedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div id="achievements-impact-hub" className="space-y-6">
      {/* Top Eco-Impact Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/60 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Impact Hub Egypt • Student Sustainability Score
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1.5">Ecological Impact & Achievements</h2>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-xl">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div className="text-xs">
              <span className="text-slate-400">Badges Unlocked: </span>
              <strong className="text-amber-400 font-bold">{completedCount}/{achievements.length}</strong>
            </div>
          </div>
        </div>

        {/* Real-time Eco Stats Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-900/80 border border-cyan-800/50 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Droplets className="w-4 h-4" />
              Nile Water Saved
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              {userStats.completedMissionsCount * 45 + userStats.harvestedCropsCount * 12} L
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Via smart drip precision</p>
          </div>

          <div className="bg-slate-900/80 border border-amber-800/50 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <Zap className="w-4 h-4" />
              Clean Solar Energy
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              {userStats.solarEnergy + userStats.completedMissionsCount * 15} kWh
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Zero carbon farming</p>
          </div>

          <div className="bg-slate-900/80 border border-emerald-800/50 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Sprout className="w-4 h-4" />
              Organic Produce
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              {userStats.harvestedCropsCount} Crops
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Pesticide-free food</p>
          </div>

          <div className="bg-slate-900/80 border border-rose-800/50 p-3.5 rounded-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              Study Streak
            </div>
            <div className="text-xl font-extrabold text-white mt-1">
              {userStats.studyStreakDays} Days
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Continuous learning</p>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          return (
            <div
              key={ach.id}
              id={`achievement-card-${ach.id}`}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-slate-900/90 border-amber-500/60 shadow-xl shadow-amber-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
                      ach.unlocked
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    {ach.category === 'farming' ? '🌾' : ach.category === 'learning' ? '🎓' : ach.category === 'animals' ? '🐾' : '⚡'}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${ach.unlocked ? 'text-white' : 'text-slate-300'}`}>
                      {ach.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {ach.category}
                    </span>
                  </div>
                </div>

                {ach.unlocked && (
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 my-3 leading-relaxed">
                {ach.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-white">
                    {Math.min(ach.progress, ach.maxProgress)} / {ach.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      ach.unlocked ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{
                      width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
