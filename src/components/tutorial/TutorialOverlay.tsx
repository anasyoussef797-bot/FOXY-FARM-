import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../assets/characters';
import { ArrowRight, Check, Sparkles, X } from 'lucide-react';

export const TutorialOverlay: React.FC = () => {
  const { isTutorialOpen, completeTutorial } = useGame();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isTutorialOpen) return null;

  const steps = [
    {
      character: CHARACTERS.FOXY,
      title: 'Welcome to Foxy Farm!',
      tagline: 'Impact Hub Egypt Educational Universe',
      message:
        'Welcome to your very own personal virtual farm! Here, learning and farming grow hand in hand. Every homework mission you complete earns coins, XP, and rare unlocks for your land!',
      actionLabel: 'Meet Adam & Learn Farming ➔',
    },
    {
      character: CHARACTERS.ADAM,
      title: 'How to Grow Crops',
      tagline: 'Math, Science & Farm Cultivation',
      message:
        'To plant crops, select fertile soil, choose your seeds from the bottom seed bag, and sprinkle fresh water. Crops grow in real-time — harvest them for coins and experience points!',
      actionLabel: 'Meet Talia & Learn Homework ➔',
    },
    {
      character: CHARACTERS.TALIA,
      title: 'Educational Missions & Rewards',
      tagline: 'Languages, Stories & Nature Quests',
      message:
        'Your teachers will assign exciting learning missions in Math, English, Science, Arabic, and Egyptian History. Complete missions to earn large Coin rewards and unlock new animals!',
      actionLabel: 'Meet Spark & Robot Upgrades ➔',
    },
    {
      character: CHARACTERS.SPARK,
      title: 'Smart Tech & Learning Streaks',
      tagline: 'Mission AI & Automation',
      message:
        'Maintain daily learning streaks for rare multipliers! Adopt cows and hens, construct greenhouses, and expand your land. Spark is ready to assist your journey!',
      actionLabel: 'Start My Farm Adventure! 🚀',
    },
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTutorial();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2E4018]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#AFB42B] relative animate-in zoom-in-95 duration-200">
        {/* Step Indicator Dots */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentStep ? 'w-7 bg-[#558B2F]' : 'w-2 bg-[#DCEDC8]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={completeTutorial}
            className="text-xs font-black text-[#827717] hover:text-[#558B2F] transition-colors cursor-pointer"
          >
            Skip Intro
          </button>
        </div>

        {/* Character Portrait */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <img
              src={step.character.image}
              alt={step.character.name}
              referrerPolicy="no-referrer"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-[#8BC34A] shadow-xl mx-auto"
            />
            <span className="absolute -bottom-2 -right-2 text-2xl">✨</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#2E4018] mt-3">
            {step.title}
          </h3>
          <p className="text-xs font-black text-[#558B2F] uppercase tracking-wide">
            {step.character.name} • {step.tagline}
          </p>
        </div>

        {/* Dialogue Body */}
        <div className="bg-[#F1F8E9] border-2 border-[#AFB42B]/30 rounded-2xl p-4 mb-6 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#4E342E] leading-relaxed">
            "{step.message}"
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-sm sm:text-base rounded-2xl shadow-[0_4px_0_#2E4018] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{step.actionLabel}</span>
          {currentStep === steps.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
