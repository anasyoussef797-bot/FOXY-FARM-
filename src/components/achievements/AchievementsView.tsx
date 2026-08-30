import React from 'react';
import { useGame } from '../../context/GameContext';
import { Award, CheckCircle, Coins, Lock, Sparkles, Trophy, X, Zap } from 'lucide-react';

interface AchievementsViewProps {
  onClose?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onClose }) => {
  const { achievements, claimAchievement, studentProfile } = useGame();

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between gap-4 border-2 border-[#AFB42B]/40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-2 text-[#FFEE58]">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>Learning & Farming Honors</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Foxy Farm Achievements</h1>
          <p className="text-xs sm:text-sm font-semibold text-[#F1F8E9] mt-1">
            Complete milestones in farming, mathematics, reading, and streaks to earn rare badges and coin bonuses!
          </p>

          <div className="flex items-center gap-3 mt-4 text-xs font-black">
            <span className="bg-white/20 px-3 py-1 rounded-xl">
              {unlockedCount} / {achievements.length} Badges Unlocked
            </span>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer self-start"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {achievements.map((ach) => {
          const isClaimable = ach.unlocked && !ach.unlockedAt;
          const isClaimed = ach.unlocked && !!ach.unlockedAt;
          const percent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          const getTierBadge = () => {
            if (ach.tier === 'Diamond') return 'bg-[#DCEDC8] text-[#2E4018] border-[#8BC34A]';
            if (ach.tier === 'Gold') return 'bg-[#FFF9C4] text-[#827717] border-[#FFEE58]';
            if (ach.tier === 'Silver') return 'bg-[#F1F8E9] text-[#2E4018] border-[#AFB42B]/40';
            return 'bg-[#DCEDC8] text-[#2E4018] border-[#C5E1A5]';
          };

          return (
            <div
              key={ach.id}
              className={`bg-white rounded-3xl border-2 p-5 flex flex-col justify-between shadow-xs transition-all ${
                ach.unlocked
                  ? 'border-[#AFB42B] bg-[#F1F8E9]/40'
                  : 'border-[#AFB42B]/30 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border shadow-xs ${
                        ach.unlocked
                          ? 'bg-[#FFF9C4] border-[#FFEE58]'
                          : 'bg-[#F1F8E9] border-[#AFB42B]/30 grayscale opacity-70'
                      }`}
                    >
                      {ach.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${getTierBadge()}`}>
                          {ach.tier} Tier
                        </span>
                        <span className="text-[10px] font-black text-[#827717] capitalize">
                          {ach.category}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-[#2E4018] mt-1">
                        {ach.title}
                      </h3>
                    </div>
                  </div>

                  {isClaimed && (
                    <span className="bg-[#DCEDC8] text-[#2E4018] border border-[#8BC34A] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#558B2F]" />
                      Claimed
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-[#4E342E] leading-relaxed">
                  {ach.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-black text-[#827717] mb-1">
                    <span>Progress:</span>
                    <span>
                      {ach.progress} / {ach.maxProgress} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#DCEDC8] rounded-full overflow-hidden border border-[#AFB42B]/20">
                    <div
                      className="h-full bg-linear-to-r from-[#8BC34A] to-[#558B2F] transition-all duration-500 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Rewards & Actions */}
              <div className="pt-3 mt-4 border-t border-[#AFB42B]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#827717] flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    +{ach.rewardCoins}
                  </span>
                  <span className="text-xs font-black text-[#558B2F] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#558B2F] fill-[#8BC34A]" />
                    +{ach.rewardXP} XP
                  </span>
                </div>

                {isClaimable ? (
                  <button
                    onClick={() => claimAchievement(ach.id)}
                    className="px-4 py-1.5 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] active:translate-y-0.5 active:shadow-none animate-pulse cursor-pointer"
                  >
                    Claim Reward! 🎁
                  </button>
                ) : !ach.unlocked ? (
                  <span className="text-xs font-bold text-[#827717]/60 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> In Progress
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
