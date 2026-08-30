import React from 'react';
import {
  Sprout,
  BookOpen,
  ShoppingBag,
  Package,
  Trophy,
  CalendarCheck,
  GraduationCap,
  Store,
  Coins,
} from 'lucide-react';
import { useTranslation } from '../../i18n';
import { useGame } from '../../context/GameContext';

interface GameToolbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenShop: () => void;
  onOpenInventory: () => void;
  onOpenMarket: () => void;
  onOpenQuests: () => void;
  isTeacher?: boolean;
  pendingHomeworkCount?: number;
}

export const GameToolbar: React.FC<GameToolbarProps> = ({
  currentTab,
  onTabChange,
  onOpenShop,
  onOpenInventory,
  onOpenMarket,
  onOpenQuests,
  isTeacher = false,
  pendingHomeworkCount = 0,
}) => {
  const { t } = useTranslation();

  return (
    <nav
      aria-label="Farm Game Navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[#1B5E20]/95 backdrop-blur-md border-2 border-[#FDD835] rounded-3xl px-2 sm:px-4 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] flex items-center gap-1.5 sm:gap-2.5 max-w-[95vw] select-none"
    >
      {/* 1. FARM */}
      <button
        id="btn-nav-farm"
        onClick={() => onTabChange('farm')}
        className={`flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl transition-all cursor-pointer ${
          currentTab === 'farm'
            ? 'bg-[#FDD835] text-amber-950 shadow-md scale-105 font-black'
            : 'text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold'
        }`}
      >
        <Sprout className={`w-5 h-5 ${currentTab === 'farm' ? 'text-amber-950' : 'text-[#A5D6A7]'}`} />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabFarm}
        </span>
      </button>

      {/* 2. HOMEWORK / MISSIONS with pending badge */}
      <button
        id="btn-nav-homework"
        onClick={() => onTabChange('homework')}
        className={`relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl transition-all cursor-pointer ${
          currentTab === 'homework'
            ? 'bg-[#FDD835] text-amber-950 shadow-md scale-105 font-black'
            : 'text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold'
        }`}
      >
        <BookOpen className={`w-5 h-5 ${currentTab === 'homework' ? 'text-amber-950' : 'text-[#81D4FA]'}`} />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabHomework}
        </span>

        {pendingHomeworkCount > 0 && (
          <span className="absolute -top-1.5 -right-1 w-4 h-4 bg-[#FF1744] text-white font-black text-[9px] rounded-full border border-white flex items-center justify-center shadow-xs animate-bounce">
            {pendingHomeworkCount}
          </span>
        )}
      </button>

      {/* 3. SHOP */}
      <button
        id="btn-nav-shop"
        onClick={onOpenShop}
        className="flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        <ShoppingBag className="w-5 h-5 text-[#FFE082]" />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabShop}
        </span>
      </button>

      {/* 4. MARKET / SELL PRODUCE */}
      <button
        id="btn-nav-market"
        onClick={onOpenMarket}
        className="flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        <Store className="w-5 h-5 text-[#81C784]" />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.marketTitle}
        </span>
      </button>

      {/* 5. INVENTORY / BARN */}
      <button
        id="btn-nav-inventory"
        onClick={onOpenInventory}
        className="flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        <Package className="w-5 h-5 text-[#FFCC80]" />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabInventory}
        </span>
      </button>

      {/* 6. ACHIEVEMENTS / BADGES */}
      <button
        id="btn-nav-achievements"
        onClick={() => onTabChange('achievements')}
        className={`flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl transition-all cursor-pointer ${
          currentTab === 'achievements'
            ? 'bg-[#FDD835] text-amber-950 shadow-md scale-105 font-black'
            : 'text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold'
        }`}
      >
        <Trophy className={`w-5 h-5 ${currentTab === 'achievements' ? 'text-amber-950' : 'text-[#FFF59D]'}`} />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabBadges}
        </span>
      </button>

      {/* 7. DAILY QUESTS */}
      <button
        id="btn-nav-quests"
        onClick={onOpenQuests}
        className="hidden sm:flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold transition-all cursor-pointer active:scale-95"
      >
        <CalendarCheck className="w-5 h-5 text-[#FFAB91]" />
        <span className="text-[10px] mt-0.5 whitespace-nowrap">
          {t.tabQuests}
        </span>
      </button>

      {/* 8. STUDENT HUB / DASHBOARD */}
      {!isTeacher && (
        <button
          id="btn-nav-dashboard"
          onClick={() => onTabChange('dashboard')}
          className={`hidden md:flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl transition-all cursor-pointer ${
            currentTab === 'dashboard'
              ? 'bg-[#FDD835] text-amber-950 shadow-md scale-105 font-black'
              : 'text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold'
          }`}
        >
          <GraduationCap className={`w-5 h-5 ${currentTab === 'dashboard' ? 'text-amber-950' : 'text-[#CE93D8]'}`} />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {t.tabDashboard}
          </span>
        </button>
      )}

      {/* 9. TEACHER HUB */}
      {isTeacher && (
        <button
          id="btn-nav-teacher"
          onClick={() => onTabChange('teacher')}
          className={`flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 rounded-2xl transition-all cursor-pointer ${
            currentTab === 'teacher'
              ? 'bg-[#FDD835] text-amber-950 shadow-md scale-105 font-black'
              : 'text-[#E8F5E9] hover:bg-white/15 hover:text-white font-bold'
          }`}
        >
          <GraduationCap className={`w-5 h-5 ${currentTab === 'teacher' ? 'text-amber-950' : 'text-[#80DEEA]'}`} />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {t.teacher}
          </span>
        </button>
      )}
    </nav>
  );
};
