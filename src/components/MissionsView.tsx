import React, { useState } from 'react';
import { HomeworkMission, UserStats } from '../types';
import { CROPS_DATA } from '../data/initialData';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Award,
  ChevronRight,
  Flame,
  Lightbulb,
  Droplets,
  Coins,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playLevelUpSound, playPopSound, playCoinSound } from '../utils/audio';

interface MissionsViewProps {
  missions: HomeworkMission[];
  userStats: UserStats;
  onCompleteMission: (missionId: string) => void;
  onOpenAIMentor: (topic?: string) => void;
  lang: 'ar' | 'en';
  onClose?: () => void;
  isModal?: boolean;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  missions,
  userStats,
  onCompleteMission,
  onOpenAIMentor,
  lang,
  onClose,
  isModal = false,
}) => {
  const isAr = lang === 'ar';
  const [selectedMission, setSelectedMission] = useState<HomeworkMission | null>(missions[0] || null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [activeSubject, setActiveSubject] = useState<string>('all');

  const filteredMissions = activeSubject === 'all'
    ? missions
    : missions.filter((m) => m.subject.toLowerCase().includes(activeSubject.toLowerCase()));

  const handleSelectMission = (mission: HomeworkMission) => {
    playPopSound();
    setSelectedMission(mission);
    setSelectedAnswerIndex(null);
    setShowExplanation(false);
    setShowHint(false);
  };

  const handleAnswerSubmit = (index: number) => {
    if (!selectedMission || selectedMission.isCompleted) return;
    setSelectedAnswerIndex(index);
    setShowExplanation(true);

    if (index === selectedMission.correctIndex) {
      playLevelUpSound();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'],
      });
      onCompleteMission(selectedMission.id);
    } else {
      playPopSound();
    }
  };

  const content = (
    <div
      id="missions-learning-view"
      className="space-y-5 text-slate-100"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 border-2 border-purple-500/40 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {isAr ? 'منهاج سبارك التعليمي • Impact Hub Egypt' : 'Spark STEM Curriculum • Impact Hub Egypt'}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {isAr ? `${userStats.studyStreakDays} أيام متتالية!` : `${userStats.studyStreakDays} Day Streak!`}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {isAr ? 'واجبات ومهمات العلوم الزراعية' : 'Homework & Science Quests'}
          </h2>
          <p className="text-xs text-purple-200/80 max-w-xl">
            {isAr
              ? 'أجب عن أسئلة العلوم، والري الذكي، وبيولوجيا النيل لكسب الدنانير، والبذور النادرة، وقطرات الماء للمزرعة!'
              : 'Solve STEM and Nile environmental questions to earn Dinars, high-yield seeds, solar water droplets, and XP!'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => onOpenAIMentor(selectedMission?.subject || 'STEM and Agriculture')}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'اسأل المساعد الذكي سبارك' : 'Ask AI Tutor'}</span>
          </button>
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

      {/* Main Grid: Mission List & Quiz Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Mission Cards (4 cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredMissions.map((mission) => {
            const isSelected = selectedMission?.id === mission.id;
            const rewardCrop = CROPS_DATA[mission.rewardSeeds.crop];

            return (
              <div
                key={mission.id}
                onClick={() => handleSelectMission(mission)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-purple-950/80 border-purple-400 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                        {mission.grade}
                      </span>
                      {mission.isCompleted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {isAr ? 'مكتمل' : 'Completed'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-white">
                      {isAr ? mission.titleAr : mission.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {isAr ? mission.descriptionAr : mission.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 mt-1 transition-transform ${
                      isSelected ? 'text-purple-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>

                {/* Reward Preview */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-3 text-[11px]">
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Coins className="w-3 h-3" />+{mission.rewardCoins} 🪙
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    💵 +{mission.rewardDinars || 5} {isAr ? 'دنانير' : 'Dinars'}
                  </span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Droplets className="w-3 h-3" />+{mission.rewardWater} 💧
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Quiz Workspace (7 cols) */}
        <div className="lg:col-span-7">
          {selectedMission ? (
            <div className="bg-slate-900/90 border-2 border-purple-500/30 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-purple-300">
                  {isAr ? 'سؤال تفاعلي:' : 'Interactive STEM Question:'}
                </span>
                <button
                  onClick={() => {
                    playPopSound();
                    setShowHint(!showHint);
                  }}
                  className="text-xs text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{isAr ? (showHint ? 'إخفاء التلميح' : 'تلميح سبارك 💡') : (showHint ? 'Hide Hint' : 'Hint 💡')}</span>
                </button>
              </div>

              {/* Hint Box */}
              {showHint && (
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center gap-2 animate-fadeIn">
                  <Lightbulb className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{isAr ? selectedMission.hintAr : selectedMission.hint}</span>
                </div>
              )}

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
                {isAr ? selectedMission.questionAr : selectedMission.question}
              </h3>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 pt-1">
                {(isAr ? selectedMission.optionsAr : selectedMission.options).map((option, idx) => {
                  const isAnswered = selectedAnswerIndex !== null;
                  const isCorrect = idx === selectedMission.correctIndex;
                  const isUserChoice = selectedAnswerIndex === idx;

                  let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-purple-400/60 text-slate-200';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/40 shadow-lg';
                    } else if (isUserChoice) {
                      btnStyle = 'bg-red-950/80 border-red-400 text-red-200';
                    } else {
                      btnStyle = 'bg-slate-950/50 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered && selectedMission.isCompleted}
                      onClick={() => handleAnswerSubmit(idx)}
                      className={`w-full p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-right flex items-center justify-between transition-all active:scale-[0.99] ${btnStyle}`}
                      dir={isAr ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-extrabold text-xs flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation && (
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed animate-fadeIn ${
                    selectedAnswerIndex === selectedMission.correctIndex
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="font-black text-sm mb-1 flex items-center gap-1.5">
                    {selectedAnswerIndex === selectedMission.correctIndex ? (
                      <>
                        <span>🎉 {isAr ? 'إجابة صحيحة وممتازة!' : 'Correct Answer!'}</span>
                      </>
                    ) : (
                      <>
                        <span>💡 {isAr ? 'حاول مجدداً أو استعن بالشرح التالي:' : 'Explanation:'}</span>
                      </>
                    )}
                  </div>
                  <p>{isAr ? selectedMission.explanationAr : selectedMission.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-xs">
              {isAr ? 'اختر واجباً من القائمة لعرض السؤال والجوائز.' : 'Select a mission from the list to start.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
        <div className="bg-slate-950 border-2 border-purple-500/40 rounded-3xl w-full max-w-4xl p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
