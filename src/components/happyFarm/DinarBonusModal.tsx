import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, X, Gift, CheckCircle2, Award, Zap } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface DinarBonusModalProps {
  onClose: () => void;
  isArabic: boolean;
}

export const DinarBonusModal: React.FC<DinarBonusModalProps> = ({ onClose, isArabic }) => {
  const { studentProfile, refreshState, triggerCelebration } = useGame();
  const [claimedDaily, setClaimedDaily] = useState(false);
  const [solvedQuiz, setSolvedQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleClaimDailyDinar = () => {
    if (claimedDaily) return;
    studentProfile.dinars = (studentProfile.dinars || 15) + 3;
    soundEngine.playDinar();
    triggerCelebration();
    setClaimedDaily(true);
    refreshState();
  };

  const handleAnswerQuiz = (ans: string) => {
    setSelectedAnswer(ans);
    if (ans === 'chlorophyll') {
      studentProfile.dinars = (studentProfile.dinars || 15) + 5;
      studentProfile.coins += 100;
      soundEngine.playDinar();
      triggerCelebration();
      setSolvedQuiz(true);
      refreshState();
    } else {
      soundEngine.playClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="w-full max-w-md bg-linear-to-b from-[#4A148C] via-[#6A1B9A] to-[#311B92] rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] border-4 border-[#FDD835] overflow-hidden text-white animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#FFB300] to-[#F57F17] px-5 py-3.5 flex items-center justify-between text-amber-950 border-b-2 border-amber-300">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-900 text-white flex items-center justify-center text-xl shadow-xs">
              💰
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight leading-tight">
                {isArabic ? 'خزينة الدنانير المجانية' : 'Bonus Dinars Vault'}
              </h3>
              <p className="text-[11px] font-bold text-amber-900/90">
                {isArabic ? 'اجمع الدنانير لتسريع المحاصيل وشراء نوادر المزرعة' : 'Collect Dinars for instant harvests & rare items'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-black/20 hover:bg-black/40 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {/* Current Dinars Counter */}
          <div className="bg-white/10 rounded-2xl p-3 border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-xs text-purple-200 font-bold">
                  {isArabic ? 'رصيدك الحالي من الدنانير' : 'Your Current Dinars'}
                </p>
                <p className="text-xl font-black text-[#FFE082]">
                  {studentProfile.dinars || 15} {isArabic ? 'دينار' : 'Dinars'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-black bg-[#00E676] text-slate-950 px-2 py-0.5 rounded-full shadow-xs">
              {isArabic ? 'جاهز للاستخدام' : 'Active'}
            </span>
          </div>

          {/* Daily Login Reward Box */}
          <div className="bg-linear-to-r from-amber-500/20 to-purple-500/30 rounded-2xl p-3 border border-amber-300/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FDD835] text-amber-950 flex items-center justify-center text-xl shadow-xs">
                🎁
              </div>
              <div>
                <h4 className="text-xs font-black text-[#FFE082]">
                  {isArabic ? 'هدية الحضور اليومي' : 'Daily Login Gift'}
                </h4>
                <p className="text-[11px] text-purple-200">
                  {isArabic ? '+3 دنانير مجانية لليوم' : '+3 Free Dinars for today'}
                </p>
              </div>
            </div>

            <button
              onClick={handleClaimDailyDinar}
              disabled={claimedDaily}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-transform cursor-pointer shadow-xs ${
                claimedDaily
                  ? 'bg-emerald-600/70 text-white cursor-default'
                  : 'bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 hover:scale-105 active:scale-95'
              }`}
            >
              {claimedDaily ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isArabic ? 'تم الاستلام' : 'Claimed'}
                </span>
              ) : (
                isArabic ? 'استلم الآن 💰' : 'Claim Now'
              )}
            </button>
          </div>

          {/* Educational Quick Challenge for 5 Dinars */}
          <div className="bg-black/30 rounded-2xl p-3.5 border border-purple-300/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#FFE082]">
                <Sparkles className="w-4 h-4 text-[#FDD835]" />
                <span>{isArabic ? 'تحدي المعرفة السريع (+5 دنانير)' : 'Quick Science Riddle (+5 Dinars)'}</span>
              </div>
              <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded-full text-purple-200">
                {isArabic ? 'سؤال تعليمي' : 'Riddle'}
              </span>
            </div>

            <p className="text-xs text-purple-100 font-medium leading-relaxed mb-3">
              {isArabic
                ? 'ما هي المادة الخضراء في أوراق النبات المسؤولة عن امتصاص ضوء الشمس وصنع الغذاء؟'
                : 'What is the green pigment in plant leaves responsible for absorbing sunlight to make food?'}
            </p>

            {solvedQuiz ? (
              <div className="bg-emerald-500/20 border border-emerald-400 rounded-xl p-2.5 text-center flex items-center justify-center gap-2 text-emerald-300 font-black text-xs animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isArabic ? 'إجابة صحيحة! تم إضافة +5 دنانير لحسابك 🌟' : 'Correct! +5 Dinars added to your balance!'}</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'chlorophyll', label: isArabic ? 'الكلوروفيل (Chlorophyll)' : 'Chlorophyll' },
                  { id: 'hemoglobin', label: isArabic ? 'الهيموجلوبين' : 'Hemoglobin' },
                  { id: 'melanin', label: isArabic ? 'الميلانين' : 'Melanin' },
                  { id: 'carotene', label: isArabic ? 'الكاروتين' : 'Carotene' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswerQuiz(opt.id)}
                    className="p-2 rounded-xl text-left bg-purple-900/60 hover:bg-purple-800 border border-purple-400/40 text-xs font-bold transition-all hover:scale-102 cursor-pointer active:scale-98 text-[#FFF9C4]"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-center pt-1">
            <p className="text-[11px] text-purple-300 font-medium">
              {isArabic
                ? '💡 تكسب المزيد من الدنانير بحصولك على الدرجة الكاملة في واجبات المعلم!'
                : '💡 Tip: You also earn Dinars by scoring 100% on teacher missions!'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
