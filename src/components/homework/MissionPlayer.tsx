import React, { useState } from 'react';
import { Homework, Question } from '../../types';
import { CHARACTERS } from '../../assets/characters';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { getLocalizedHomework } from '../../services/homeworkLocalization';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Coins,
  Sparkles,
  Volume2,
  Zap,
} from 'lucide-react';

interface MissionPlayerProps {
  homework: Homework;
  onClose: () => void;
}

export const MissionPlayer: React.FC<MissionPlayerProps> = ({
  homework: rawHomework,
  onClose,
}) => {
  const { submitHomeworkMission, triggerCelebration } = useGame();
  const { language, isRTL } = useTranslation();
  const isAr = language === 'ar';

  const homework = getLocalizedHomework(rawHomework, language);
  const character = CHARACTERS[homework.characterHost] || CHARACTERS.FOXY;
  const charName = isAr ? character.nameAr : character.name;
  const charRole = isAr ? character.roleTitleAr : character.roleTitle;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [selectedMatchingPair, setSelectedMatchingPair] = useState<{ left?: string; right?: string }>({});
  const [matchedPairs, setMatchedPairs] = useState<{ [left: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [mathInputValue, setMathInputValue] = useState('');

  const currentQ: Question = homework.questions[currentIndex];
  const maxPossibleScore = homework.questions.reduce((sum, q) => sum + q.points, 0);

  // Audio Speech Synthesis helper
  const handleReadAloud = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const handleMatchLeft = (left: string) => {
    if (isAnswerChecked) return;
    setSelectedMatchingPair((prev) => ({ ...prev, left }));
    if (selectedMatchingPair.right) {
      const newMatches = { ...matchedPairs, [left]: selectedMatchingPair.right };
      setMatchedPairs(newMatches);
      setSelectedMatchingPair({});
      setAnswers((prev) => ({ ...prev, [currentQ.id]: newMatches }));
    }
  };

  const handleMatchRight = (right: string) => {
    if (isAnswerChecked) return;
    setSelectedMatchingPair((prev) => ({ ...prev, right }));
    if (selectedMatchingPair.left) {
      const newMatches = { ...matchedPairs, [selectedMatchingPair.left]: right };
      setMatchedPairs(newMatches);
      setSelectedMatchingPair({});
      setAnswers((prev) => ({ ...prev, [currentQ.id]: newMatches }));
    }
  };

  const checkCurrentAnswer = () => {
    setIsAnswerChecked(true);
    const ans = answers[currentQ.id];

    let isCorrect = false;
    if (currentQ.type === 'multiple_choice' || currentQ.type === 'true_false' || currentQ.type === 'fill_blank') {
      isCorrect = String(ans).trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
    } else if (currentQ.type === 'math_input') {
      isCorrect = String(mathInputValue).trim() === String(currentQ.correctAnswer).trim();
      setAnswers((prev) => ({ ...prev, [currentQ.id]: mathInputValue }));
    } else if (currentQ.type === 'matching') {
      isCorrect = Object.keys(matchedPairs).length >= (currentQ.pairs?.length || 0);
    }

    if (isCorrect) {
      setTotalScore((prev) => prev + currentQ.points);
    }
  };

  const handleNext = () => {
    if (currentIndex < homework.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerChecked(false);
      setSelectedMatchingPair({});
      setMatchedPairs({});
      setMathInputValue('');
    } else {
      // Mission Complete!
      const finalScore = totalScore;
      submitHomeworkMission(homework.id, answers, finalScore, maxPossibleScore);
      setIsCompleted(true);
      triggerCelebration();
    }
  };

  // Progress percentage
  const progressPercent = Math.round(((currentIndex + 1) / homework.questions.length) * 100);

  if (isCompleted) {
    const isPerfect = totalScore >= maxPossibleScore;
    return (
      <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#AFB42B] text-center animate-in zoom-in-95 duration-200">
          <div className="relative inline-block mb-3">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#8BC34A] shadow-lg mx-auto"
            />
            <span className="absolute -bottom-2 -right-2 text-3xl">🎉</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#2E4018] tracking-tight">
            {isPerfect
              ? isAr
                ? 'أداء أسطوري! تم إتقان المهمة بنجاح!'
                : 'Mission Mastered!'
              : isAr
              ? 'أحسنت! اكتملت المهمة التعليمية بنجاح!'
              : 'Great Mission Completed!'}
          </h2>
          <p className="text-sm font-semibold text-[#4E342E] mt-1 max-w-md mx-auto">
            {charName}: "
            {isAr
              ? `عمل رائع في ${homework.title}! مهاراتك وإجاباتك تطور مزرعتنا وتزيد من ازدهارها!`
              : `Splendid effort on ${homework.title}! Your learning directly powers up your farm!`}
            "
          </p>

          {/* Reward Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
            <div className="bg-[#FFF9C4] border border-[#FFEE58] rounded-2xl p-3 flex flex-col items-center">
              <Coins className="w-6 h-6 text-amber-500 fill-amber-400 mb-1" />
              <span className="text-lg font-black text-[#827717]">+{homework.coinsReward}</span>
              <span className="text-[11px] font-bold text-[#827717]">
                {isAr ? 'كوينز مكتسبة' : 'Coins Earned'}
              </span>
            </div>

            <div className="bg-[#DCEDC8] border border-[#C5E1A5] rounded-2xl p-3 flex flex-col items-center">
              <Zap className="w-6 h-6 text-[#558B2F] fill-[#8BC34A] mb-1" />
              <span className="text-lg font-black text-[#2E4018]">+{homework.xpReward}</span>
              <span className="text-[11px] font-bold text-[#558B2F]">
                {isAr ? 'نقاط خبرة XP' : 'XP Earned'}
              </span>
            </div>

            <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-2xl p-3 flex flex-col items-center col-span-2 sm:col-span-1">
              <Award className="w-6 h-6 text-[#2E7D32] fill-[#81C784] mb-1" />
              <span className="text-lg font-black text-[#1B5E20]">
                {totalScore}/{maxPossibleScore}
              </span>
              <span className="text-[11px] font-bold text-[#2E7D32]">
                {isAr ? 'النتيجة النهائية' : 'Final Score'}
              </span>
            </div>
          </div>

          {/* Bonus Item Unlocked */}
          {homework.bonusItemReward && (
            <div className="bg-linear-to-r from-[#F1F8E9] to-[#DCEDC8] border border-[#AFB42B]/40 rounded-2xl p-3 mb-6 flex items-center justify-center gap-3">
              <span className="text-3xl">{homework.bonusItemReward.icon}</span>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-xs font-black uppercase text-[#558B2F]">
                  {isAr ? 'تم فتح مكافأة مميزة!' : 'Bonus Item Unlocked!'}
                </p>
                <p className="text-xs font-bold text-[#2E4018]">
                  {isAr
                    ? `تمت إضافة ${homework.bonusItemReward.count}x ${homework.bonusItemReward.name} إلى حقيبتك!`
                    : `${homework.bonusItemReward.count}x ${homework.bonusItemReward.name} added to your Inventory!`}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-base rounded-2xl shadow-[0_4px_0_#2E4018] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            {isAr ? 'العودة إلى مزرعة فوكسي 🌾' : 'Return to Foxy Farm'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#AFB42B] overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="bg-linear-to-r from-[#558B2F] via-[#689F38] to-[#7CB342] px-4 sm:px-6 py-3 flex items-center justify-between text-white border-b-2 border-[#AFB42B]/40">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-black/20 hover:bg-black/30 transition-colors cursor-pointer text-white"
            >
              {isRTL ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            </button>
            <div>
              <span className="text-[10px] font-black tracking-wider uppercase bg-white/20 text-[#FFEE58] px-2 py-0.5 rounded-full">
                {isAr ? `مهمة ${homework.subject}` : `${homework.subject} Mission`}
              </span>
              <h3 className="text-sm sm:text-base font-black truncate max-w-[260px] sm:max-w-md">
                {homework.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-white/20 px-2.5 py-1 rounded-xl">
              {isAr
                ? `السؤال ${currentIndex + 1} من ${homework.questions.length}`
                : `Question ${currentIndex + 1}/${homework.questions.length}`}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#DCEDC8]">
          <div
            className="h-full bg-linear-to-r from-[#8BC34A] to-[#558B2F] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Character Guide Bubble & Question Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-[#F1F8E9]/30">
          {/* Character Guide Row */}
          <div className="flex items-start gap-3 bg-[#F1F8E9] border-2 border-[#AFB42B]/30 rounded-2xl p-3 sm:p-4 shadow-2xs">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-[#AFB42B] shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2E4018] uppercase tracking-wide">
                  {charName} ({charRole})
                </span>
                <button
                  onClick={() => handleReadAloud(`${currentQ.prompt}`)}
                  title={isAr ? 'قراءة السؤال صوتياً' : 'Read question aloud'}
                  className="p-1 rounded-lg text-[#558B2F] hover:bg-[#DCEDC8] transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-semibold text-[#4E342E] mt-0.5 leading-relaxed">
                "{homework.missionPrompt}"
              </p>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="bg-white border-2 border-[#AFB42B]/30 rounded-2xl p-4 shadow-2xs">
            <h4 className="text-base sm:text-lg font-black text-[#2E4018] leading-snug">
              {currentQ.prompt}
            </h4>
            {currentQ.instruction && (
              <p className="text-xs font-semibold text-[#827717] mt-1">{currentQ.instruction}</p>
            )}
          </div>

          {/* Interactive Question Types */}

          {/* 1. Multiple Choice */}
          {currentQ.type === 'multiple_choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt;
                let btnStyle = 'bg-white hover:bg-[#F1F8E9] border-[#AFB42B]/30 text-[#2E4018]';

                if (isSelected) {
                  btnStyle = 'bg-[#AFB42B] border-[#827717] text-white font-black shadow-md';
                }

                if (isAnswerChecked) {
                  if (opt === currentQ.correctAnswer) {
                    btnStyle = 'bg-[#558B2F] border-[#33691E] text-white font-black shadow-md';
                  } else if (isSelected && opt !== currentQ.correctAnswer) {
                    btnStyle = 'bg-[#FF7043] border-[#D84315] text-white font-black opacity-85';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer active:translate-y-0.5 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-xl bg-black/10 flex items-center justify-center text-xs font-black">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isAnswerChecked && opt === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. True / False */}
          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-3">
              {(currentQ.options || (isAr ? ['صحيح (True)', 'خطأ (False)'] : ['True', 'False'])).map((val) => {
                const isSelected = answers[currentQ.id] === val;
                let btnStyle = 'bg-white hover:bg-[#F1F8E9] border-[#AFB42B]/30 text-[#2E4018]';

                if (isSelected) {
                  btnStyle = 'bg-[#AFB42B] border-[#827717] text-white font-black shadow-md';
                }

                if (isAnswerChecked) {
                  if (val === currentQ.correctAnswer) {
                    btnStyle = 'bg-[#558B2F] border-[#33691E] text-white font-black';
                  } else if (isSelected && val !== currentQ.correctAnswer) {
                    btnStyle = 'bg-[#FF7043] border-[#D84315] text-white font-black';
                  }
                }

                const isAffirmative = val.includes('True') || val.includes('صحيح');

                return (
                  <button
                    key={val}
                    onClick={() => handleSelectOption(val)}
                    className={`p-4 rounded-2xl border-2 text-center font-black text-base transition-all cursor-pointer active:translate-y-0.5 ${btnStyle}`}
                  >
                    {isAffirmative
                      ? isAr
                        ? '👍 صحيح (True)'
                        : '👍 TRUE'
                      : isAr
                      ? '👎 خطأ (False)'
                      : '👎 FALSE'}
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. Fill in the Blank */}
          {currentQ.type === 'fill_blank' && (
            <div className="space-y-3">
              <div className="p-4 bg-white border-2 border-[#AFB42B]/30 rounded-2xl text-base font-semibold text-[#2E4018]">
                {currentQ.blankParts?.map((part, idx) => (
                  <span key={idx}>
                    {part.isBlank ? (
                      <span className="inline-block px-3 py-1 mx-1 bg-[#F1F8E9] border-2 border-dashed border-[#AFB42B] rounded-xl font-black text-[#558B2F]">
                        {answers[currentQ.id] || '______'}
                      </span>
                    ) : (
                      part.text
                    )}
                  </span>
                ))}
              </div>

              {currentQ.options && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-black text-[#827717] uppercase tracking-wide w-full">
                    {isAr ? 'اختر الكلمة المفقودة الصحيحة:' : 'Choose the missing word:'}
                  </span>
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt)}
                      className={`px-4 py-2 rounded-xl border-2 font-black text-sm transition-all cursor-pointer active:translate-y-0.5 ${
                        answers[currentQ.id] === opt
                          ? 'bg-[#558B2F] text-white border-[#33691E] shadow-sm'
                          : 'bg-white hover:bg-[#F1F8E9] text-[#2E4018] border-[#AFB42B]/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Math Input */}
          {currentQ.type === 'math_input' && (
            <div className="space-y-3">
              {currentQ.mathExpr && (
                <div className="p-4 bg-[#F1F8E9] border-2 border-[#AFB42B]/40 rounded-2xl text-center text-2xl font-black text-[#2E4018]">
                  {currentQ.mathExpr}
                </div>
              )}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={mathInputValue}
                  onChange={(e) => setMathInputValue(e.target.value)}
                  disabled={isAnswerChecked}
                  placeholder={isAr ? 'أدخل الإجابة الصحيحة...' : 'Enter answer number...'}
                  className="flex-1 px-4 py-3 bg-white border-2 border-[#AFB42B]/40 focus:border-[#558B2F] rounded-2xl text-lg font-black text-[#2E4018] outline-hidden"
                />
              </div>
            </div>
          )}

          {/* 5. Matching Pairs */}
          {currentQ.type === 'matching' && currentQ.pairs && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Left Column */}
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#827717] uppercase">
                    {isAr ? 'العنصر' : 'Item'}
                  </p>
                  {currentQ.pairs.map((pair, idx) => {
                    const isMatched = !!matchedPairs[pair.left];
                    const isSelected = selectedMatchingPair.left === pair.left;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleMatchLeft(pair.left)}
                        className={`w-full p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                          isMatched
                            ? 'bg-[#DCEDC8] border-[#8BC34A] text-[#2E4018] font-black'
                            : isSelected
                            ? 'bg-[#AFB42B] border-[#827717] text-white font-black'
                            : 'bg-white border-[#AFB42B]/30 hover:bg-[#F1F8E9] text-[#2E4018]'
                        }`}
                      >
                        {pair.left} {isMatched ? `➔ ${matchedPairs[pair.left]}` : ''}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  <p className="text-xs font-black text-[#827717] uppercase">
                    {isAr ? 'المطابقة الصحيحة' : 'Match'}
                  </p>
                  {currentQ.pairs.map((pair, idx) => {
                    const isSelected = selectedMatchingPair.right === pair.right;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleMatchRight(pair.right)}
                        className={`w-full p-2.5 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#558B2F] border-[#33691E] text-white font-black'
                            : 'bg-white border-[#AFB42B]/30 hover:bg-[#F1F8E9] text-[#2E4018]'
                        }`}
                      >
                        {pair.right}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Answer Checked Feedback Box */}
          {isAnswerChecked && (
            <div className="bg-[#FFF9C4] border-2 border-[#FFEE58] rounded-2xl p-3.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-black text-sm text-[#827717]">
                <Sparkles className="w-4 h-4 text-[#AFB42B]" />
                <span>{isAr ? 'التوضيح والفائدة التعليمية' : 'Explanation & Learning Insight'}</span>
              </div>
              <p className="text-xs font-bold text-[#4E342E] mt-1 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t-2 border-[#AFB42B]/30 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#827717]">
              {isAr ? 'المكافأة:' : 'Reward:'}
            </span>
            <span className="text-xs font-black text-[#827717] bg-[#FFF9C4] px-2 py-0.5 rounded-full border border-[#FFEE58]">
              🪙 +{homework.coinsReward}
            </span>
            <span className="text-xs font-black text-[#2E4018] bg-[#DCEDC8] px-2 py-0.5 rounded-full border border-[#C5E1A5]">
              ⚡ +{homework.xpReward} XP
            </span>
          </div>

          {!isAnswerChecked ? (
            <button
              onClick={checkCurrentAnswer}
              disabled={
                currentQ.type === 'math_input'
                  ? !mathInputValue
                  : currentQ.type === 'matching'
                  ? Object.keys(matchedPairs).length === 0
                  : !answers[currentQ.id]
              }
              className="px-6 py-2.5 bg-[#AFB42B] hover:bg-[#827717] disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-[0_3px_0_#827717] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              {isAr ? 'تحقق من الإجابة' : 'Check Answer'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-sm rounded-xl shadow-[0_3px_0_#2E4018] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>
                {currentIndex === homework.questions.length - 1
                  ? isAr
                    ? 'إنهاء المهمة بنجاح 🏆'
                    : 'Finish Mission 🏆'
                  : isAr
                  ? 'السؤال التالي'
                  : 'Next Question'}
              </span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

