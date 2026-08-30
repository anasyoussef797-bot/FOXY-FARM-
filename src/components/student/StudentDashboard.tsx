import React from 'react';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../assets/characters';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Coins,
  Flame,
  Layers,
  Package,
  Play,
  ShoppingBag,
  Sparkles,
  Sprout,
  Trophy,
  Zap,
  Volume2,
} from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import { useTranslation } from '../../i18n';

interface StudentDashboardProps {
  onNavigate: (view: 'farm' | 'homework' | 'shop' | 'achievements' | 'quests' | 'inventory') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { studentProfile, homeworks, submissions, farmTiles } = useGame();
  const { t, isRTL } = useTranslation();

  const growingCropsCount = farmTiles.filter((t) => !!t.cropId && t.status !== 'ready').length;
  const readyToHarvestCount = farmTiles.filter((t) => !!t.cropId && t.status === 'ready').length;
  const animalsCount = farmTiles.filter((t) => !!t.animalId).length;

  const pendingHomeworks = homeworks.filter(
    (hw) => !submissions.some((s) => s.homeworkId === hw.id && s.studentId === studentProfile.userId)
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 select-none">
      {/* Student Welcome Hero */}
      <div className="bg-linear-to-r from-[#2E7D32] via-[#388E3C] to-[#1B5E20] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border-4 border-[#FDD835]">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-2 text-[#FFEE58]">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{t.learningMissions}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {t.farmName} — {studentProfile.farmName}!
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#F1F8E9] mt-1 leading-relaxed">
            {t.level} {studentProfile.level} • {studentProfile.streakDays} {t.learningStreak}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 pt-2 border-t border-white/20">
            <button
              onClick={() => onNavigate('farm')}
              className="px-5 py-2.5 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black text-xs sm:text-sm rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-2 border border-white"
            >
              <span>🌾 {t.tabFarm}</span>
            </button>
            <button
              onClick={() => onNavigate('homework')}
              className="px-5 py-2.5 bg-black/25 hover:bg-black/40 text-white font-black text-xs sm:text-sm rounded-2xl transition-colors cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <BookOpen className="w-4 h-4 text-[#FFEE58]" />
              <span>{pendingHomeworks.length} {t.tabHomework}</span>
            </button>
          </div>
        </div>

        {/* Character Visual Showcase */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative text-center">
            <img
              src={CHARACTERS.FOXY.image}
              alt="Foxy"
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-[#FDD835] shadow-2xl animate-in zoom-in-50 duration-300"
            />
            <span className="absolute -bottom-2 -right-2 bg-[#FDD835] text-amber-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-white">
              Foxy 🦊
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-3xl border-2 border-[#C5E1A5] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DCEDC8] text-[#2E4018] flex items-center justify-center text-2xl shrink-0 border border-[#C5E1A5]">
            🌾
          </div>
          <div>
            <span className="text-[10px] font-black text-[#558B2F] uppercase tracking-wider block">
              {t.tabFarm}
            </span>
            <p className="text-sm font-black text-[#2E4018]">
              {readyToHarvestCount > 0 ? (
                <span className="text-[#E65100] animate-pulse">{readyToHarvestCount} {t.readyHarvest}!</span>
              ) : (
                `${growingCropsCount} ${t.growing}`
              )}
            </p>
            <span className="text-xs text-[#5D4037] font-semibold">{animalsCount} {t.shopAnimals}</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#C5E1A5] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9C4] text-[#827717] flex items-center justify-center text-2xl shrink-0 border border-[#FFEE58]">
            ⭐
          </div>
          <div>
            <span className="text-[10px] font-black text-[#558B2F] uppercase tracking-wider block">
              XP & {t.level}
            </span>
            <p className="text-sm font-black text-[#2E4018]">
              {t.level} {studentProfile.level} ({studentProfile.xp} XP)
            </p>
            <span className="text-xs text-[#2E7D32] font-semibold">
              {studentProfile.nextLevelXP - studentProfile.xp} XP
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#C5E1A5] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFCCBC]/50 text-[#D84315] flex items-center justify-center text-2xl shrink-0 border border-[#FFAB91]">
            🔥
          </div>
          <div>
            <span className="text-[10px] font-black text-[#558B2F] uppercase tracking-wider block">
              {t.learningStreak}
            </span>
            <p className="text-sm font-black text-[#2E4018]">{studentProfile.streakDays} {t.days}</p>
            <span className="text-xs text-[#E65100] font-semibold">+15% {t.coins} bonus</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#C5E1A5] p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center text-2xl shrink-0 border border-[#C8E6C9]">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black text-[#558B2F] uppercase tracking-wider block">
              {t.tabBadges}
            </span>
            <p className="text-sm font-black text-[#2E4018]">{studentProfile.completedMissionsCount} {t.tabHomework}</p>
            <span className="text-xs text-[#2E7D32] font-semibold">
              {studentProfile.totalHarvestsCount} {t.harvest}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Missions & Characters Meetup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-[#C5E1A5] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-black text-[#2E4018] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2E7D32]" />
                <span>{t.learningMissions}</span>
              </h3>
              <p className="text-xs text-[#5D4037] font-medium">{t.completeQuestsDesc}</p>
            </div>

            <button
              onClick={() => onNavigate('homework')}
              className="text-xs font-black text-[#2E7D32] hover:text-[#1B5E20] cursor-pointer"
            >
              {t.allMissions} ➔
            </button>
          </div>

          <div className="space-y-3">
            {pendingHomeworks.slice(0, 3).map((hw) => {
              const char = CHARACTERS[hw.characterHost] || CHARACTERS.FOXY;
              return (
                <div
                  key={hw.id}
                  className="p-4 bg-[#F1F8E9]/60 hover:bg-[#DCEDC8]/60 rounded-2xl border-2 border-[#C5E1A5] transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={char.image}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-2xl object-cover border border-[#C5E1A5] shadow-2xs"
                    />
                    <div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${char.bgBadge}`}>
                        {hw.subject}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-[#2E4018] mt-1">{hw.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] font-bold text-[#558B2F]">
                        <span>🪙 +{hw.coinsReward} {t.coins}</span>
                        <span>•</span>
                        <span>⚡ +{hw.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('homework')}
                    className="px-4 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer shrink-0"
                  >
                    {t.startMission} ➔
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meet Your Learning Guides */}
        <div className="bg-white rounded-3xl border-2 border-[#C5E1A5] p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-[#2E4018] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FDD835]" />
              <span>{t.companions}</span>
            </h3>
            <p className="text-xs text-[#5D4037] font-medium">
              {t.companionsDesc}
            </p>
          </div>

          <div className="space-y-3">
            {[CHARACTERS.FOXY, CHARACTERS.ADAM, CHARACTERS.TALIA, CHARACTERS.SPARK].map((char) => (
              <div
                key={char.name}
                className="p-3 bg-[#F1F8E9]/60 hover:bg-[#DCEDC8]/60 rounded-2xl border border-[#C5E1A5] flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={char.image}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-xl object-cover border border-[#C5E1A5] shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-black text-[#2E4018]">{char.name}</h4>
                    <p className="text-[11px] text-[#5D4037] font-medium truncate">{char.roleTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => soundEngine.playCharacterVoice(char.id)}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 hover:text-[#2E7D32] border border-[#C5E1A5] cursor-pointer shadow-2xs transition-transform hover:scale-105"
                    title="Play voice"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
