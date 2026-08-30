import React from 'react';
import { useGame } from '../../context/GameContext';
import { CheckCircle, Coins, Flame, Sparkles, X, Zap } from 'lucide-react';

interface DailyQuestsModalProps {
  onClose: () => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({ onClose }) => {
  const { dailyQuests, claimDailyQuest, studentProfile } = useGame();

  const completedCount = dailyQuests.filter((q) => q.completed).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-[#AFB42B] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] px-6 py-4 flex items-center justify-between text-white border-b-2 border-[#AFB42B]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Daily Farm & Learning Tasks</h2>
              <p className="text-xs font-semibold text-[#F1F8E9]">
                Resets every day! Complete all 5 tasks for bonus streak points.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-black/20 hover:bg-black/30 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Learning Streak Banner */}
        <div className="p-4 bg-[#F1F8E9] border-b-2 border-[#AFB42B]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#FF7043] fill-[#FF7043] animate-bounce" />
            <div>
              <p className="text-xs font-black text-[#2E4018] uppercase tracking-wide">
                {studentProfile.streakDays}-Day Learning Streak!
              </p>
              <p className="text-[11px] text-[#827717] font-medium">
                Log in daily and clear missions to keep your streak burning!
              </p>
            </div>
          </div>

          <span className="text-xs font-black bg-[#DCEDC8] text-[#2E4018] border border-[#AFB42B]/40 px-3 py-1 rounded-xl">
            {completedCount} / {dailyQuests.length} Done
          </span>
        </div>

        {/* Quests List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-[#F1F8E9]/30">
          {dailyQuests.map((quest) => {
            const canClaim = quest.completed && !quest.claimed;
            const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                  quest.claimed
                    ? 'bg-[#F1F8E9]/60 border-[#AFB42B]/20 opacity-80'
                    : quest.completed
                    ? 'bg-[#DCEDC8]/80 border-[#8BC34A] shadow-xs'
                    : 'bg-white border-[#AFB42B]/30'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                    {quest.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-[#2E4018] truncate">
                        {quest.title}
                      </h4>
                      <span className="text-[11px] font-black text-[#827717] shrink-0">
                        {quest.progress} / {quest.target}
                      </span>
                    </div>
                    <p className="text-xs text-[#4E342E] font-medium truncate">
                      {quest.description}
                    </p>

                    {/* Mini Progress */}
                    <div className="w-full h-2 bg-[#DCEDC8] rounded-full overflow-hidden mt-1.5 border border-[#AFB42B]/20">
                      <div
                        className="h-full bg-linear-to-r from-[#8BC34A] to-[#558B2F] transition-all rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Reward & Claim */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-black text-[#827717] block">
                      +{quest.rewardCoins} 🪙
                    </span>
                    <span className="text-[10px] font-black text-[#558B2F] block">
                      +{quest.rewardXP} XP
                    </span>
                  </div>

                  {canClaim ? (
                    <button
                      onClick={() => claimDailyQuest(quest.id)}
                      className="px-4 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#2E4018] transition-transform hover:scale-105 active:translate-y-0.5 active:shadow-none animate-pulse cursor-pointer"
                    >
                      Claim!
                    </button>
                  ) : quest.claimed ? (
                    <span className="text-[#558B2F] font-black text-xs flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Claimed
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#827717]/60">In Progress</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
