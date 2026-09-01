import React from 'react';
import { UserStats } from '../types';
import {
  Sprout,
  BookOpen,
  ShoppingBag,
  Heart,
  Box,
  Award,
  Users,
  Sparkles,
  Droplets,
  Coins,
  Sun,
  Flame,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'farm' | 'missions' | 'animals' | 'market' | '3d-lab' | 'achievements';
  setActiveTab: (tab: 'farm' | 'missions' | 'animals' | 'market' | '3d-lab' | 'achievements') => void;
  userStats: UserStats;
  onOpenAIMentor: () => void;
  onOpenCharacters: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  onOpenAIMentor,
  onOpenCharacters,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      {/* Upper Status & Resources Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('farm')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl">
                🦊
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white font-display">
                  FOXY FARM
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Impact Hub Egypt
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Educational Gamification Platform</p>
            </div>
          </div>
        </div>

        {/* Resources Metrics Bento */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Level / XP */}
          <div className="bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm text-xs">
            <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 font-bold border border-indigo-700 flex items-center justify-center text-[10px]">
              {userStats.level}
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 leading-none">Level</span>
              <span className="font-bold text-white text-[11px]">{userStats.xp} XP</span>
            </div>
          </div>

          {/* Gold Coins */}
          <div className="bg-slate-900/90 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm text-xs text-amber-300">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-[12px]">{userStats.coins}</span>
          </div>

          {/* Water Droplets */}
          <div className="bg-slate-900/90 border border-cyan-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-sm text-xs text-cyan-300">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-[12px]">{userStats.waterDroplets}</span>
          </div>

          {/* Solar Energy */}
          <div className="bg-slate-900/90 border border-amber-400/30 px-3 py-1 rounded-xl hidden sm:flex items-center gap-1.5 shadow-sm text-xs text-amber-300">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-[12px]">{userStats.solarEnergy}</span>
          </div>

          {/* Characters Button */}
          <button
            id="btn-nav-characters"
            onClick={onOpenCharacters}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Character Squad"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Characters</span>
          </button>

          {/* AI Mentor Button */}
          <button
            id="btn-nav-ai-mentor"
            onClick={onOpenAIMentor}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 flex items-center gap-1 sm:gap-2 overflow-x-auto py-1.5">
        {[
          { id: 'farm', label: 'My Farm & Crops', icon: Sprout },
          { id: 'missions', label: 'Homework Missions', icon: BookOpen },
          { id: 'animals', label: 'Animal Sanctuary', icon: Heart },
          { id: 'market', label: 'Organic Market', icon: ShoppingBag },
          { id: '3d-lab', label: '3D Botanical Lab', icon: Box },
          { id: 'achievements', label: 'Eco Impact & Badges', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
