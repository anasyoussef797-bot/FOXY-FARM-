import React, { useState } from 'react';
import {
  Bell,
  Check,
  ChevronDown,
  Coins,
  Globe,
  HelpCircle,
  Music,
  Plus,
  Sparkles,
  User as UserIcon,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useTranslation, Language } from '../../i18n';
import { CHARACTERS } from '../../assets/characters';
import { getLevelFromXP } from '../../data/gameConfigs';

interface HappyFarmHUDProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenDinarBonus: () => void;
  onOpenCharacterStudio?: () => void;
  isArabic?: boolean;
  onToggleLanguage?: () => void;
}

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'ar', name: 'العربية', flag: '🇪🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export const HappyFarmHUD: React.FC<HappyFarmHUDProps> = ({
  currentTab,
  onTabChange,
  onOpenDinarBonus,
}) => {
  const {
    currentUser,
    allUsers,
    studentProfile,
    switchUser,
    isMuted,
    isBgmActive,
    toggleMute,
    toggleBGM,
    notifications,
    markNotificationRead,
    openTutorial,
  } = useGame();

  const { t, language, setLanguage, isRTL } = useTranslation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const { level, progressPercent } = getLevelFromXP(
    currentUser.role === 'STUDENT' ? studentProfile.xp : 1200
  );

  const unreadCount = notifications.filter((n) => !n.read).length;
  const dinarsCount = studentProfile.dinars ?? 15;

  return (
    <header className="sticky top-0 z-40 bg-linear-to-b from-[#2E7D32] via-[#388E3C] to-[#1B5E20] border-b-4 border-[#FDD835] shadow-[0_4px_15px_rgba(0,0,0,0.35)] select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        
        {/* Left Stats Section */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          
          {/* Farm Name Banner / Logo */}
          <button
            onClick={() => onTabChange(currentUser.role === 'STUDENT' ? 'farm' : 'teacher')}
            className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#795548] border-2 border-[#FFE082] rounded-2xl px-2.5 py-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF7043] border-2 border-[#FFF9C4] flex items-center justify-center text-xl shadow-xs">
              🦊
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="font-black text-xs sm:text-sm tracking-wide text-[#FFF9C4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {t.farmName}
                </span>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-[#FDD835] text-[#3E2723] border border-white">
                  Edu
                </span>
              </div>
              <p className="text-[9px] font-bold text-[#FFE082] tracking-wider truncate max-w-[110px]">
                {currentUser.role === 'STUDENT'
                  ? `${studentProfile.name.split(' ')[0]}`
                  : 'Teacher'}
              </p>
            </div>
          </button>

          {/* Level Star & XP Bar */}
          {currentUser.role === 'STUDENT' && (
            <div className="flex items-center gap-1.5 bg-[#1B5E20]/90 border-2 border-[#81C784] rounded-2xl px-2.5 py-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
              <div className="relative flex items-center justify-center w-8 h-8 drop-shadow-md">
                <div className="text-2xl animate-spin-slow">⭐</div>
                <span className="absolute font-black text-[11px] text-amber-950 top-1.5">
                  {level < 10 ? `0${level}` : level}
                </span>
              </div>

              <div className="w-20 sm:w-28">
                <div className="flex justify-between text-[10px] font-black text-[#E8F5E9] leading-tight drop-shadow-xs">
                  <span>{t.level} {level}</span>
                  <span className="text-[#FFEE58]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0A3311] rounded-full overflow-hidden mt-0.5 border border-[#81C784]/60 p-0.5">
                  <div
                    className="h-full bg-linear-to-r from-[#76FF03] via-[#64DD17] to-[#00E676] rounded-full transition-all duration-500 shadow-[0_0_6px_#76FF03]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Gold Coins Container */}
          {currentUser.role === 'STUDENT' && (
            <div className="flex items-center gap-1.5 bg-linear-to-b from-[#2E7D32] to-[#1B5E20] border-2 border-[#FDD835] rounded-full px-2.5 py-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_2px_4px_rgba(0,0,0,0.4)]">
              <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#FF8F00] via-[#FFD54F] to-[#FFF9C4] border border-[#FFE082] flex items-center justify-center text-xs shadow-xs">
                🪙
              </div>
              <span className="font-black text-white text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {studentProfile.coins.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-[#FFF59D] hidden sm:inline">
                {t.coins}
              </span>
            </div>
          )}

          {/* Dinars Container */}
          {currentUser.role === 'STUDENT' && (
            <div className="flex items-center gap-1 bg-linear-to-b from-[#6A1B9A] to-[#4A148C] border-2 border-[#E1BEE7] rounded-full pl-2 pr-1 py-0.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.4)]">
              <div className="w-5 h-5 rounded-full bg-[#FFD600] border border-white flex items-center justify-center text-xs shadow-xs">
                💰
              </div>
              <span className="font-black text-[#FFF9C4] text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {dinarsCount}
              </span>
              <span className="text-[10px] font-bold text-[#E1BEE7] hidden md:inline ml-0.5">
                {t.dinars}
              </span>
              <button
                onClick={onOpenDinarBonus}
                title={t.freeDinars}
                className="w-5 h-5 rounded-full bg-[#00E676] hover:bg-[#00C853] text-black font-black text-xs flex items-center justify-center shadow-xs ml-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
              </button>
            </div>
          )}
        </div>

        {/* Right Tools & Menus Section */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Multi-Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifMenu(false);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#8D6E63] hover:bg-[#795548] text-[#FFF9C4] font-black text-xs border border-[#FFE082] shadow-xs cursor-pointer transition-transform hover:scale-105"
            >
              <Globe className="w-3.5 h-3.5 text-[#FFE082]" />
              <span>{LANGUAGES.find((l) => l.code === language)?.flag || '🌐'}</span>
              <span className="text-[11px] uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-[#FFE082]" />
            </button>

            {showLangMenu && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-36 bg-white rounded-2xl shadow-xl border-2 border-[#8D6E63] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150`}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      language === lang.code
                        ? 'bg-[#DCEDC8] text-[#2E7D32]'
                        : 'text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-[#2E7D32]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound & Music Controls */}
          <div className="flex items-center bg-[#1B5E20] rounded-xl p-0.5 border border-[#81C784] shadow-xs">
            <button
              onClick={toggleBGM}
              title={isBgmActive ? t.stopMusic : t.playMusic}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBgmActive
                  ? 'text-amber-950 bg-[#FDD835] shadow-xs animate-pulse'
                  : 'text-[#C8E6C9] hover:text-white'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>
            <button
              onClick={toggleMute}
              title={isMuted ? t.unmute : t.mute}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isMuted ? 'text-red-300' : 'text-[#C8E6C9] hover:text-white'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Tutorial / Help Guide */}
          <button
            onClick={openTutorial}
            title={t.farmGuide}
            className="p-1.5 rounded-xl bg-[#8D6E63] hover:bg-[#795548] text-[#FFF9C4] border border-[#FFE082] shadow-xs cursor-pointer transition-transform hover:scale-105"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowLangMenu(false);
                setShowUserMenu(false);
              }}
              className="p-1.5 rounded-xl bg-[#8D6E63] hover:bg-[#795548] text-[#FFF9C4] border border-[#FFE082] shadow-xs relative cursor-pointer transition-transform hover:scale-105"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF1744] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce border border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-4 border-[#8D6E63] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800`}>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200">
                  <div className="flex items-center gap-1.5 font-black text-[#2E7D32] text-sm">
                    <Sparkles className="w-4 h-4 text-[#FF7043]" />
                    <span>{t.notifications}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-900">
                    {notifications.length} {t.notifications}
                  </span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((notif) => {
                    const charInfo = notif.character ? CHARACTERS[notif.character] : null;
                    return (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.actionType === 'open_homework') onTabChange('homework');
                          if (notif.actionType === 'open_farm') onTabChange('farm');
                          setShowNotifMenu(false);
                        }}
                        className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                          notif.read
                            ? 'bg-amber-50/60 border-amber-200 text-slate-700'
                            : 'bg-[#DCEDC8] border-[#81C784] text-[#1B5E20] font-bold shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {charInfo ? (
                            <img
                              src={charInfo.image}
                              alt={charInfo.name}
                              referrerPolicy="no-referrer"
                              className="w-9 h-9 rounded-xl object-cover border border-[#81C784] shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-[#FF7043]/20 text-[#D84315] flex items-center justify-center shrink-0 text-lg">
                              🦊
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-xs font-black text-[#1B5E20] truncate">
                                {notif.title}
                              </h4>
                              <span className="text-[10px] text-amber-800 shrink-0">
                                {notif.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 font-medium mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowLangMenu(false);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#8D6E63] hover:bg-[#795548] border-2 border-[#FFE082] text-white cursor-pointer shadow-xs transition-transform hover:scale-105"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-xl object-cover border border-white"
              />
              <span className="text-xs font-black hidden sm:inline text-[#FFF9C4] px-1 truncate max-w-[80px]">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#FFE082]" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-64 bg-white rounded-3xl shadow-2xl border-4 border-[#8D6E63] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800`}>
                <div className="text-xs font-black text-[#2E7D32] border-b border-amber-200 pb-2 mb-2">
                  {t.switchProfile}
                </div>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {allUsers.map((u) => {
                    const isSelected = u.id === currentUser.id;
                    return (
                      <div
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowUserMenu(false);
                        }}
                        className={`flex items-center justify-between p-2 rounded-2xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#DCEDC8] border border-[#81C784]'
                            : 'hover:bg-amber-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-xl object-cover border border-[#81C784]"
                          />
                          <div>
                            <p className="text-xs font-black text-slate-800">{u.name}</p>
                            <span className="text-[10px] font-bold text-amber-900 bg-[#FFF9C4] px-1.5 py-0.2 rounded-md border border-[#FDD835]">
                              {u.role === 'TEACHER' ? t.teacher : t.student}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#2E7D32]" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
