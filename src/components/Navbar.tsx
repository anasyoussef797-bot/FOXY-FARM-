import React, { useState } from 'react';
import { UserStats } from '../types';
import {
  Volume2,
  VolumeX,
  Music,
  Bell,
  Sparkles,
  Coins,
  Droplets,
  Sun,
  Globe,
  Users,
  Box,
  Sprout,
  BookOpen,
  ShoppingBag,
  Award,
  Package,
} from 'lucide-react';
import {
  getSoundEnabled,
  setSoundEnabled,
  getMusicEnabled,
  setMusicEnabled,
  playPopSound,
  playCoinSound,
} from '../utils/audio';

interface NavbarProps {
  userStats: UserStats;
  onUpdateStats: (updater: (prev: UserStats) => UserStats) => void;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  onOpenCharacters: () => void;
  onOpenAIMentor: () => void;
  onOpenMissions: () => void;
  onOpenMarket: () => void;
  onOpenStorage: () => void;
  onOpenAchievements: () => void;
  viewMode: 'farm' | '3d-lab';
  setViewMode: (mode: 'farm' | '3d-lab') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userStats,
  onUpdateStats,
  lang,
  setLang,
  onOpenCharacters,
  onOpenAIMentor,
  onOpenMissions,
  onOpenMarket,
  onOpenStorage,
  onOpenAchievements,
  viewMode,
  setViewMode,
}) => {
  const isAr = lang === 'ar';
  const [soundOn, setSoundOn] = useState<boolean>(getSoundEnabled());
  const [musicOn, setMusicOn] = useState<boolean>(getMusicEnabled());
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileEdit, setShowProfileEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(userStats.playerName);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playPopSound();
  };

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    setMusicEnabled(next);
    if (next) playPopSound();
  };

  const toggleLanguage = () => {
    playPopSound();
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleClaimDailyBonus = () => {
    playCoinSound();
    onUpdateStats((prev) => ({
      ...prev,
      dinars: prev.dinars + 5,
      coins: prev.coins + 25,
      waterDroplets: prev.waterDroplets + 10,
    }));
    setShowNotifications(false);
  };

  // Level progress percentage
  const currentLevelXp = userStats.xp % 100;

  return (
    <header
      className="sticky top-0 z-40 bg-gradient-to-r from-[#173010] via-[#10240b] to-[#173010] border-b-2 border-amber-500/50 shadow-xl select-none"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left Section: Avatar, Name, Sound, Language */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Player Profile Badge */}
          <div
            onClick={() => {
              playPopSound();
              setShowProfileEdit(true);
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 cursor-pointer transition-all shadow-inner group"
            title={isAr ? 'تعديل الملف الشخصي' : 'Edit Profile'}
          >
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-lg font-bold shadow-sm group-hover:scale-105 transition-transform">
              {userStats.avatar || '👦'}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-amber-200 leading-tight">
                {userStats.playerName || (isAr ? 'يوسف' : 'Youssef')}
              </span>
              <span className="text-[10px] font-semibold text-emerald-400">
                {isAr ? 'المستوى' : 'Level'} {userStats.level}
              </span>
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                playPopSound();
                setShowNotifications((v) => !v);
              }}
              className="p-2 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-amber-300 transition-colors relative"
              title={isAr ? 'الإشعارات والمكافآت' : 'Notifications & Rewards'}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-black text-[9px] flex items-center justify-center border border-white">
                2
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute top-11 right-0 z-50 w-72 bg-slate-950 border-2 border-amber-500/50 rounded-2xl p-3 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-amber-300">
                    {isAr ? 'الإشعارات والمكافآت اليومية' : 'Daily Rewards & Alerts'}
                  </h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-[10px] text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200">
                    <p className="font-bold">
                      {isAr ? '🎁 مكافأة الدخول اليومي جاهزة!' : '🎁 Daily login gift is ready!'}
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {isAr ? '+5 دنانير، +25 ذهب، +10 ماء' : '+5 Dinars, +25 Coins, +10 Water'}
                    </p>
                    <button
                      onClick={handleClaimDailyBonus}
                      className="mt-2 w-full py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all"
                    >
                      {isAr ? 'استلام الهدية الآن' : 'Claim Reward Now'}
                    </button>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                    <p className="font-bold text-white">
                      {isAr ? '⚡ واجب سبارك العلمي الجديد' : '⚡ New Spark Science Mission'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isAr ? 'سؤال جديد في البناء الضوئي بانتظارك!' : 'New photosynthesis quiz waiting!'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sound & Music Controls */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-2xl border transition-colors ${
              soundOn
                ? 'bg-slate-900/80 text-emerald-400 border-slate-700 hover:bg-slate-800'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
            title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleMusic}
            className={`p-2 rounded-2xl border transition-colors ${
              musicOn
                ? 'bg-slate-900/80 text-purple-400 border-slate-700 hover:bg-slate-800'
                : 'bg-slate-950 text-slate-500 border-slate-800'
            }`}
            title={musicOn ? 'Mute Music' : 'Enable Music'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Language Switcher Badge (AR EG / EN) */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{isAr ? 'AR 🇪🇬' : 'EN 🇬🇧'}</span>
          </button>
        </div>

        {/* Right Section: Currency, Level Progress & Edu Foxy Badge */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Green Cash / Dinars (الدنانير) */}
          <div
            onClick={() => {
              playPopSound();
              onOpenMarket();
            }}
            className="px-3 py-1 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/80 border-2 border-emerald-400/80 flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95 transition-all text-xs"
            title={isAr ? 'الدنانير الخضراء (انقر لفتح المتجر)' : 'Green Dinars (Click for Market)'}
          >
            <span className="text-base">💵</span>
            <span className="font-black text-emerald-300">{userStats.dinars}</span>
            <span className="font-bold text-emerald-400/90">
              {isAr ? 'الدنانير +' : 'Dinars +'}
            </span>
          </div>

          {/* Gold Coins (الذهب) */}
          <div
            onClick={() => {
              playPopSound();
              onOpenStorage();
            }}
            className="px-3 py-1 rounded-2xl bg-amber-950/80 hover:bg-amber-900/80 border-2 border-amber-400/80 flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 transition-all text-xs text-amber-300"
            title={isAr ? 'الذهب (انقر لفتح المخزن)' : 'Coins (Click for Silo)'}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-black text-amber-200">{userStats.coins}</span>
            <span className="font-bold text-amber-400/90">{isAr ? 'الذهب' : 'Gold'}</span>
          </div>

          {/* Level Progress Bar with Star */}
          <div className="px-3 py-1 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center gap-2 shadow-sm text-xs">
            <span className="text-amber-400 text-sm">🌟</span>
            <div className="flex flex-col min-w-[70px]">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-300">
                <span>{currentLevelXp}%</span>
                <span>
                  {isAr ? 'المستوى' : 'Lvl'} {userStats.level}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700 mt-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-green-300"
                  style={{ width: `${currentLevelXp}%` }}
                />
              </div>
            </div>
          </div>

          {/* Edu Foxy Mascot Badge (Opens Character Squad) */}
          <div
            onClick={() => {
              playPopSound();
              onOpenCharacters();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs cursor-pointer shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            title={isAr ? 'فريق الشخصيات الزراعية' : 'Foxy Character Squad'}
          >
            <span className="text-base">🦊</span>
            <span className="hidden sm:inline">
              {isAr ? 'Edu فوكسي' : 'Edu Foxy'}
            </span>
          </div>

          {/* 3D Botanical Lab Toggle */}
          <button
            onClick={() => {
              playPopSound();
              setViewMode(viewMode === 'farm' ? '3d-lab' : 'farm');
            }}
            className={`px-3 py-1 rounded-2xl border text-xs font-black flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
              viewMode === '3d-lab'
                ? 'bg-purple-500 text-slate-950 border-purple-300'
                : 'bg-slate-900/80 text-purple-300 border-purple-500/40 hover:bg-slate-800'
            }`}
            title="3D Botanical Model Lab"
          >
            <Box className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {viewMode === '3d-lab' ? (isAr ? 'المزرعة' : 'Farm View') : (isAr ? 'معمل 3D' : '3D Lab')}
            </span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showProfileEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-5 w-full max-w-sm text-slate-100 shadow-2xl">
            <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
              <span>👦</span>
              {isAr ? 'تعديل الملف الشخصي' : 'Edit Player Profile'}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">
                  {isAr ? 'اسم المزارع الصغير:' : 'Young Farmer Name:'}
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  {isAr ? 'اختر الأفاتار:' : 'Choose Avatar:'}
                </label>
                <div className="flex items-center gap-2">
                  {['👦', '👧', '🧑‍🌾', '🦊', '⚡', '🌟'].map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() =>
                        onUpdateStats((prev) => ({ ...prev, avatar }))
                      }
                      className={`text-2xl p-2 rounded-xl border transition-all ${
                        userStats.avatar === avatar
                          ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400/50 scale-110'
                          : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    playPopSound();
                    if (newName.trim()) {
                      onUpdateStats((prev) => ({ ...prev, playerName: newName.trim() }));
                    }
                    setShowProfileEdit(false);
                  }}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black"
                >
                  {isAr ? 'حفظ التغييرات' : 'Save Profile'}
                </button>
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
