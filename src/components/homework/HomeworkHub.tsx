import React, { useState } from 'react';
import { Homework } from '../../types';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { CHARACTERS } from '../../assets/characters';
import { MissionPlayer } from './MissionPlayer';
import {
  getLocalizedHomework,
  SUBJECT_TRANSLATIONS,
  DIFFICULTY_TRANSLATIONS,
  isTeacherEnglishHomework,
} from '../../services/homeworkLocalization';
import {
  Calendar,
  CheckCircle,
  Clock,
  Coins,
  Play,
  Sparkles,
  Zap,
} from 'lucide-react';

export const HomeworkHub: React.FC = () => {
  const { homeworks, submissions, currentUser, studentProfile } = useGame();
  const { language, isRTL } = useTranslation();
  const isAr = language === 'ar';
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [activePlayingHomework, setActivePlayingHomework] = useState<Homework | null>(null);

  const rawSubjects = ['all', 'Mathematics', 'English', 'Science', 'General Knowledge'];

  const filteredHomeworks = homeworks.filter((hw) => {
    if (selectedSubject === 'all') return true;
    return hw.subject === selectedSubject;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-[#AFB42B]/40">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-2 text-[#FFEE58]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFEE58]" />
            <span>{isAr ? 'مهام وألغاز إمباكت هب التعليمية' : 'Impact Hub Educational Quests'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            {isAr ? 'مهام الواجبات المدرسية التفاعلية' : 'Homework Learning Missions'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#F1F8E9] mt-1 leading-relaxed">
            {isAr
              ? 'كل مهمة تعليمية مكتملة تمنحك كوينز وخبرة XP وبذوراً نادرة لتطوير مزرعتك السعيدة! تعلّم مع فوكسي، آدم، تاليا، وسبارك.'
              : 'Every completed mission directly awards Coins, XP, and rare seeds to grow your dream farm! Learn with Foxy, Adam, Talia, and Spark.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 pt-2 border-t border-white/20 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1 rounded-xl flex items-center gap-1.5 font-black">
              🏆 {studentProfile.completedMissionsCount}{' '}
              {isAr ? 'مهام مكتملة بنجاح' : 'Missions Completed'}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-xl flex items-center gap-1.5 font-black">
              🔥 {studentProfile.streakDays}{' '}
              {isAr ? 'أيام متتالية من التعلم النشط' : '-Day Learning Streak Active'}
            </span>
          </div>
        </div>

        {/* Character watermark illustration */}
        <div className={`hidden md:flex items-center gap-2 absolute ${isRTL ? 'left-6' : 'right-6'} -bottom-4 opacity-90`}>
          <img
            src={CHARACTERS.FOXY.image}
            alt="Foxy"
            referrerPolicy="no-referrer"
            className="w-28 h-28 rounded-full object-cover border-4 border-white/60 shadow-xl"
          />
          <img
            src={CHARACTERS.SPARK.image}
            alt="Spark"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full object-cover border-4 border-white/60 shadow-xl"
          />
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rawSubjects.map((sub) => {
          const isSelected = selectedSubject === sub;
          const label = SUBJECT_TRANSLATIONS[sub]?.[language] || sub;
          return (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap active:translate-y-0.5 ${
                isSelected
                  ? 'bg-[#558B2F] text-white shadow-[0_2px_0_#2E4018]'
                  : 'bg-white hover:bg-[#F1F8E9] text-[#2E4018] border border-[#AFB42B]/30'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredHomeworks.map((rawHw) => {
          const hw = getLocalizedHomework(rawHw, language);
          const isTeacherEnglish = isTeacherEnglishHomework(rawHw);
          const char = CHARACTERS[hw.characterHost] || CHARACTERS.FOXY;
          const charName = isAr ? char.nameAr : char.name;
          const sub = submissions.find(
            (s) => s.homeworkId === hw.id && s.studentId === currentUser.id
          );
          const isDone = !!sub;

          const diffText = DIFFICULTY_TRANSLATIONS[rawHw.difficulty]?.[language] || rawHw.difficulty;

          return (
            <div
              key={hw.id}
              className={`bg-white rounded-3xl border-2 transition-all p-5 flex flex-col justify-between shadow-xs hover:shadow-lg ${
                isDone ? 'border-[#7CB342]/60 bg-[#F1F8E9]/60' : 'border-[#AFB42B]/30 hover:border-[#558B2F]'
              }`}
            >
              <div>
                {/* Header with Host Character & Subject */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={char.image}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-[#AFB42B]/40 shadow-xs"
                    />
                    <div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${char.bgBadge}`}>
                        {hw.subject} • {charName}
                      </span>
                      <p className="text-xs text-[#827717] font-semibold mt-0.5">
                        {isAr ? `إعداد المعلم: ${hw.teacherName}` : `By ${hw.teacherName}`}
                        {isTeacherEnglish && (
                          <span className="ml-1 text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.2 rounded font-bold">
                            EN
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  {isDone ? (
                    <span className="bg-[#DCEDC8] text-[#2E4018] border border-[#AFB42B]/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#558B2F]" />
                      {sub.status === 'graded' || sub.status === 'approved'
                        ? isAr
                          ? `النتيجة ${sub.percentage}% ⭐`
                          : `Score ${sub.percentage}% ⭐`
                        : isAr
                        ? 'تم التسليم'
                        : 'Submitted'}
                    </span>
                  ) : (
                    <span className="bg-[#FFF9C4] text-[#827717] border border-[#FFEE58] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#AFB42B]" />
                      {diffText}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-black text-[#2E4018] leading-snug">
                  {hw.title}
                </h3>
                <p className="text-xs text-[#4E342E] font-medium mt-1 leading-relaxed line-clamp-2">
                  {hw.description}
                </p>

                {/* Rewards Breakdown */}
                <div className="flex flex-wrap items-center gap-2 my-3 p-2.5 bg-[#F1F8E9] rounded-2xl border border-[#AFB42B]/20">
                  <span className="text-xs font-black text-[#827717] flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    +{hw.coinsReward} {isAr ? 'كوينز' : 'Coins'}
                  </span>
                  <span className="text-xs font-black text-[#558B2F] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#7CB342] fill-[#8BC34A]" />
                    +{hw.xpReward} {isAr ? 'خبرة XP' : 'XP'}
                  </span>
                  {hw.bonusItemReward && (
                    <span className="text-xs font-black text-[#2E4018] flex items-center gap-1">
                      <span>{hw.bonusItemReward.icon}</span>
                      <span>{hw.bonusItemReward.name}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#AFB42B]/20 flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-[#827717] flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {isAr ? `تاريخ التسليم: ${hw.dueDate}` : `Due: ${hw.dueDate}`}
                </span>

                <button
                  onClick={() => setActivePlayingHomework(hw)}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-105 active:translate-y-0.5 cursor-pointer ${
                    isDone
                      ? 'bg-[#DCEDC8] hover:bg-[#C5E1A5] text-[#2E4018]'
                      : 'bg-[#558B2F] hover:bg-[#33691E] text-white shadow-[0_3px_0_#2E4018]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {isDone
                      ? isAr
                        ? 'إعادة التحدي 🔄'
                        : 'Replay Mission'
                      : isAr
                      ? 'ابدأ المهمة 🚀'
                      : 'Start Mission'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Mission Player Modal */}
      {activePlayingHomework && (
        <MissionPlayer
          homework={activePlayingHomework}
          onClose={() => setActivePlayingHomework(null)}
        />
      )}
    </div>
  );
};

