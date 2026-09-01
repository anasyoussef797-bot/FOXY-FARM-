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
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MissionsViewProps {
  missions: HomeworkMission[];
  userStats: UserStats;
  onCompleteMission: (missionId: string) => void;
  onOpenAIMentor: (topic?: string) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  missions,
  userStats,
  onCompleteMission,
  onOpenAIMentor,
}) => {
  const [selectedMission, setSelectedMission] = useState<HomeworkMission | null>(missions[0] || null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [activeSubject, setActiveSubject] = useState<string>('all');

  const filteredMissions = activeSubject === 'all'
    ? missions
    : missions.filter((m) => m.subject.includes(activeSubject));

  const handleSelectMission = (mission: HomeworkMission) => {
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
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'],
      });
      onCompleteMission(selectedMission.id);
    }
  };

  return (
    <div id="missions-learning-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-900/60 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              Impact Hub Egypt • Student Curriculum
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {userStats.studyStreakDays} Day Streak!
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Homework & Science Quests</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Solve STEM and Nile environmental questions to earn high-yield seeds, solar water droplets, and farm XP.
          </p>
        </div>

        <button
          id="btn-ask-ai-tutor-banner"
          onClick={() => onOpenAIMentor(selectedMission?.subject || 'STEM and Agriculture')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Ask AI Farm Tutor
        </button>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'Science', 'Math', 'Environmental', 'Solar', 'English'].map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubject(sub)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeSubject === sub
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
            }`}
          >
            {sub === 'all' ? 'All Subjects' : sub}
          </button>
        ))}
      </div>

      {/* Dual Column: Mission List + Active Mission Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Missions List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredMissions.map((mission) => {
            const isSelected = selectedMission?.id === mission.id;
            return (
              <div
                key={mission.id}
                id={`mission-card-${mission.id}`}
                onClick={() => handleSelectMission(mission)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/80 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/60">
                      {mission.subject}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{mission.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {mission.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {mission.isCompleted ? (
                      <span className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : (
                      <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-600'}`} />
                    )}
                  </div>
                </div>

                {/* Reward Preview */}
                <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-amber-300 font-semibold">
                    <Coins className="w-3 h-3 text-amber-400" />
                    +{mission.rewardCoins}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    +{mission.rewardWater}
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    +{mission.rewardSeeds.count} {CROPS_DATA[mission.rewardSeeds.crop].iconEmoji}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Mission Interactive Quiz Card */}
        {selectedMission ? (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/80">
                    {selectedMission.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{selectedMission.grade}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">{selectedMission.title}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedMission.description}</p>
              </div>

              {selectedMission.isCompleted && (
                <div className="bg-emerald-950/90 text-emerald-300 border border-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Completed
                </div>
              )}
            </div>

            {/* Question Box */}
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 sm:p-5 rounded-xl space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Problem Statement
              </span>
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {selectedMission.question}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              <span className="text-xs font-semibold text-slate-400">Select Your Answer:</span>
              {selectedMission.options.map((option, idx) => {
                const isSelected = selectedAnswerIndex === idx;
                const isCorrect = idx === selectedMission.correctIndex;
                const isWrongSelected = isSelected && !isCorrect;

                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500';
                  } else if (isWrongSelected) {
                    btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-600 border-indigo-400 text-white font-semibold';
                }

                return (
                  <button
                    key={idx}
                    id={`mission-option-${selectedMission.id}-${idx}`}
                    onClick={() => handleAnswerSubmit(idx)}
                    disabled={showExplanation || selectedMission.isCompleted}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {showExplanation && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint & AI Mentor Helper */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                id="btn-toggle-hint"
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>

              <button
                id="btn-ask-tutor-specific"
                onClick={() => onOpenAIMentor(`${selectedMission.subject}: ${selectedMission.question}`)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Explain with Foxy AI Tutor
              </button>
            </div>

            {showHint && (
              <div className="bg-amber-950/40 border border-amber-800/60 p-3.5 rounded-xl text-xs text-amber-200">
                💡 <strong>Hint:</strong> {selectedMission.hint}
              </div>
            )}

            {/* Post-Answer Explanation Box */}
            {showExplanation && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  selectedAnswerIndex === selectedMission.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {selectedAnswerIndex === selectedMission.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Brilliant Work! Mission Solved!
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-rose-400" />
                      Not quite, let us review the science:
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{selectedMission.explanation}</p>
                {selectedAnswerIndex === selectedMission.correctIndex && (
                  <div className="pt-2 font-bold text-amber-300">
                    🎁 Reward Earned: +{selectedMission.rewardCoins} Coins, +{selectedMission.rewardWater} Water Droplets, +{selectedMission.rewardSeeds.count} {CROPS_DATA[selectedMission.rewardSeeds.crop].name} Seeds!
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center text-slate-400">
            Select a homework quest to begin problem solving.
          </div>
        )}
      </div>
    </div>
  );
};
