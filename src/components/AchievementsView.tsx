import React from 'react';
import { Achievement, UserStats } from '../types';
import { Award, CheckCircle2, Lock, Sparkles, Trophy, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playLevelUpSound } from '../utils/audio';

interface AchievementsViewProps {
  achievements: Achievement[];
  userStats: UserStats;
  lang: 'ar' | 'en';
  isModal?: boolean;
  onClose?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  userStats,
  lang,
  isModal = false,
  onClose,
}) => {
  const isAr = lang === 'ar';
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const content = (
    <div id="achievements-view" className="space-y-5 text-slate-100" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/90 via-orange-950/80 to-slate-900 border-2 border-amber-500/40 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              {isAr ? 'لوحة الشرف والإنجازات • Impact Hub Egypt' : 'Honor Board & Achievements • Impact Hub Egypt'}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">
            {isAr ? 'أوسمة وجوائز المزارع الصغير' : 'Young Farmer Badges & Honors'}
          </h2>
          <p className="text-xs text-amber-200/80 max-w-xl">
            {isAr
              ? 'احصد المحاصيل، وأكمل الواجبات، واعتنِ بالحيوانات لفتح أوسمة الشرف وكسب مكافآت الذهب!'
              : 'Harvest crops, complete study quests, and care for animals to unlock prestigious agricultural badges!'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border-2 border-amber-400/80 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">
                {isAr ? 'الأوسمة المكتملة' : 'Unlocked Badges'}
              </div>
              <div className="text-sm font-black text-amber-300">
                {unlockedCount} / {achievements.length}
              </div>
            </div>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = achievement.unlocked || achievement.progress >= achievement.maxProgress;
          const progressPercent = Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100));

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-amber-950/40 border-amber-400/80 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/70 border-slate-800 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {achievement.icon === 'Sprout' && '🌱'}
                    {achievement.icon === 'GraduationCap' && '🎓'}
                    {achievement.icon === 'Heart' && '🐮'}
                    {achievement.icon === 'Zap' && '⚡'}
                    {achievement.icon === 'Trophy' && '🏆'}
                  </span>

                  {isUnlocked ? (
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {isAr ? 'تم الإنجاز ✓' : 'Unlocked ✓'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {isAr ? 'قيد التقدم' : 'In Progress'}
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-white">
                  {isAr ? achievement.titleAr : achievement.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isAr ? achievement.descriptionAr : achievement.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1">
                  <span>{isAr ? 'التقدم:' : 'Progress:'}</span>
                  <span className="text-amber-400 font-extrabold">
                    {achievement.progress} / {achievement.maxProgress} ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
        <div className="bg-slate-950 border-2 border-amber-500/40 rounded-3xl w-full max-w-4xl p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
