import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../services/soundEngine';
import {
  RotateCcw,
  ShoppingBag,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Sprout,
  X,
  ChevronUp,
} from 'lucide-react';
import { CROPS_CONFIG } from '../../data/gameConfigs';

interface HappyFarmBottomBarProps {
  onOpenShop: () => void;
  onOpenInventory: () => void;
  onOpenHomework: () => void;
  onOpenAchievements: () => void;
  onVisitNeighbor?: (neighbor: any) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  isArabic: boolean;
}

export const HappyFarmBottomBar: React.FC<HappyFarmBottomBarProps> = ({
  onOpenShop,
  onOpenInventory,
  onOpenHomework,
  onOpenAchievements,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  isArabic,
}) => {
  const {
    selectedTool,
    setSelectedTool,
    selectedSeedId,
    setSelectedSeedId,
    studentProfile,
    homeworks,
    submissions,
  } = useGame();

  const [showSeedDrawer, setShowSeedDrawer] = useState(false);

  const availableSeeds = studentProfile.inventory.filter((i) => i.type === 'seed' && i.quantity > 0);
  const activeSeedConfig = selectedSeedId ? CROPS_CONFIG[selectedSeedId] : null;

  // Check pending homework
  const submittedHwIds = new Set(submissions.map((s) => s.homeworkId));
  const pendingCount = homeworks.filter((h) => !submittedHwIds.has(h.id)).length;

  return (
    <div className="w-full max-w-5xl mx-auto z-30 flex flex-col items-center gap-1.5 select-none px-2">
      
      {/* Floating Pop-Up Quick Seed Bag Drawer (يفتح عند الضغط على أداة البذور) */}
      {showSeedDrawer && (
        <div className="w-full max-w-3xl bg-[#3E2723]/95 backdrop-blur-md rounded-2xl border-2 border-[#FFE082] shadow-[0_8px_30px_rgba(0,0,0,0.6)] p-2.5 flex items-center justify-between gap-2 text-white animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-lg">🌱</span>
            <span className="text-xs font-black text-[#FFF9C4]">
              {isArabic ? 'اختر البذور للزراعة:' : 'Select Seed:'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 flex-1">
            {availableSeeds.length === 0 ? (
              <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
                <span>{isArabic ? 'لا توجد بذور في المخزن!' : 'No seeds in storage!'}</span>
                <button
                  onClick={() => {
                    setShowSeedDrawer(false);
                    onOpenShop();
                  }}
                  className="px-2.5 py-1 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'شراء بذور من المتجر' : 'Buy in Shop'}</span>
                </button>
              </div>
            ) : (
              availableSeeds.map((seed) => {
                const isChosen = selectedSeedId === seed.referenceId;
                const cropConf = seed.referenceId ? CROPS_CONFIG[seed.referenceId] : null;
                const seedDisplayName = cropConf ? (isArabic ? cropConf.name : seed.name) : seed.name;

                return (
                  <button
                    key={seed.id}
                    onClick={() => {
                      soundEngine.playPlant();
                      setSelectedSeedId(seed.referenceId);
                      setSelectedTool('plant');
                      setShowSeedDrawer(false);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer shrink-0 ${
                      isChosen
                        ? 'bg-[#76FF03] border-white text-slate-950 font-black shadow-md scale-105 ring-2 ring-[#FDD835]'
                        : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
                    }`}
                  >
                    <span className="text-base">{seed.icon}</span>
                    <span className="text-xs truncate max-w-[90px]">{seedDisplayName}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                        isChosen ? 'bg-[#1B5E20] text-[#76FF03]' : 'bg-[#2E1C14] text-white'
                      }`}
                    >
                      x{seed.quantity}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                setShowSeedDrawer(false);
                onOpenShop();
              }}
              className="px-2.5 py-1.5 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-transform hover:scale-105 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isArabic ? 'المتجر' : 'Shop'}</span>
            </button>

            <button
              onClick={() => setShowSeedDrawer(false)}
              className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sleek, Ultra-Compact Floating Action Toolbar (شريط أدوات سفلي مدمج وأنيق) */}
      <div className="w-full bg-linear-to-b from-[#795548]/95 via-[#5D4037]/95 to-[#3E2723]/95 backdrop-blur-md rounded-2xl border-2 border-[#FFE082] shadow-[0_4px_20px_rgba(0,0,0,0.5)] px-2 py-1.5 flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Group 1: Core Action Farming Tools (أدوات الحقل الأساسية) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          
          {/* 1. Pointer / Select Tool (المؤشر) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTool('select');
            }}
            title={isArabic ? 'المؤشر الذكي' : 'Pointer'}
            className={`h-11 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border ${
              selectedTool === 'select'
                ? 'bg-linear-to-b from-[#FFF176] to-[#FBC02D] border-white text-amber-950 font-black shadow-[0_2px_0_#F57F17] scale-105 ring-1 ring-white'
                : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
            }`}
          >
            <span className="text-lg">↖️</span>
            <span className="text-xs hidden md:inline">{isArabic ? 'تحديد' : 'Select'}</span>
          </button>

          {/* 2. Plow / Hoe (الحراثة) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTool('hoe');
            }}
            title={isArabic ? 'حراثة الأرض' : 'Plow'}
            className={`h-11 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border ${
              selectedTool === 'hoe'
                ? 'bg-linear-to-b from-[#8D6E63] to-[#5D4037] border-white text-white font-black shadow-[0_2px_0_#3E2723] scale-105 ring-1 ring-white'
                : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
            }`}
          >
            <span className="text-lg">⛏️</span>
            <span className="text-xs hidden md:inline">{isArabic ? 'حراثة' : 'Plow'}</span>
          </button>

          {/* 3. Seeds / Plant Drawer Toggle (بذور للزراعة) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setShowSeedDrawer(!showSeedDrawer);
              setSelectedTool('plant');
            }}
            title={isArabic ? 'كيس البذور للزراعة' : 'Plant Seeds'}
            className={`h-11 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border relative ${
              selectedTool === 'plant' || showSeedDrawer
                ? 'bg-linear-to-b from-[#76FF03] to-[#00E676] border-white text-slate-950 font-black shadow-[0_2px_0_#1B5E20] scale-105 ring-1 ring-white'
                : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
            }`}
          >
            <span className="text-lg">{activeSeedConfig ? activeSeedConfig.icon : '🌱'}</span>
            <div className="flex flex-col items-start leading-none">
              <span className="text-xs hidden sm:inline">
                {activeSeedConfig ? (isArabic ? activeSeedConfig.name : activeSeedConfig.name) : (isArabic ? 'بذور' : 'Seeds')}
              </span>
              <span className="text-[9px] opacity-80 hidden md:inline">
                {isArabic ? 'انقر للاختيار' : 'Choose'}
              </span>
            </div>
            <ChevronUp className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* 4. Watering Can (السقاية) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTool('water');
            }}
            title={isArabic ? 'سقاية المزروعات' : 'Watering'}
            className={`h-11 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border ${
              selectedTool === 'water'
                ? 'bg-linear-to-b from-[#29B6F6] to-[#0288D1] border-white text-white font-black shadow-[0_2px_0_#01579B] scale-105 ring-1 ring-white'
                : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
            }`}
          >
            <span className="text-lg">💧</span>
            <span className="text-xs hidden md:inline">{isArabic ? 'سقاية' : 'Water'}</span>
          </button>

          {/* 5. Sickle / Harvest (الحصاد) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setSelectedTool('harvest');
            }}
            title={isArabic ? 'حصاد المحاصيل' : 'Harvest'}
            className={`h-11 px-2.5 sm:px-3.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border ${
              selectedTool === 'harvest'
                ? 'bg-linear-to-b from-[#FF7043] to-[#D84315] border-white text-white font-black shadow-[0_2px_0_#BF360C] scale-105 ring-1 ring-white'
                : 'bg-[#4E342E] hover:bg-[#5D4037] border-amber-300/40 text-[#FFF9C4] font-bold'
            }`}
          >
            <span className="text-lg">🌾</span>
            <span className="text-xs hidden md:inline">{isArabic ? 'حصاد' : 'Harvest'}</span>
          </button>

        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-7 w-[2px] bg-[#FFE082]/30 rounded-full shrink-0" />

        {/* Group 2: Farm Hub Management (المخزن، المتجر، الواجبات، الجوائز) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          
          {/* Barn & Storage (المخزن) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenInventory();
            }}
            title={isArabic ? 'مخزن وحظيرة المزرعة' : 'Barn & Storage'}
            className="h-11 px-2.5 sm:px-3 rounded-xl bg-[#6D4C41] hover:bg-[#5D4037] border border-[#FFE082]/60 text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-lg">🛖</span>
            <span className="text-xs font-bold hidden lg:inline">{isArabic ? 'المخزن' : 'Barn'}</span>
          </button>

          {/* Farm Shop (المتجر) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenShop();
            }}
            title={isArabic ? 'متجر المزرعة' : 'Shop'}
            className="h-11 px-2.5 sm:px-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] border border-[#A5D6A7] text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-lg">🛒</span>
            <span className="text-xs font-black hidden lg:inline">{isArabic ? 'المتجر' : 'Shop'}</span>
          </button>

          {/* Missions & Homework (الواجبات والمهمات التعليمية) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenHomework();
            }}
            title={isArabic ? 'الواجبات والمهمات المدرسية' : 'Missions'}
            className="h-11 px-2.5 sm:px-3 rounded-xl bg-linear-to-r from-[#EF6C00] to-[#E65100] hover:opacity-90 border-2 border-[#FFE082] text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95 relative"
          >
            <span className="text-lg animate-bounce">🎁</span>
            <span className="text-xs font-black hidden sm:inline">{isArabic ? 'الواجبات' : 'Missions'}</span>
            {pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          {/* Achievements (الجوائز والأوسمة) */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenAchievements();
            }}
            title={isArabic ? 'لوحة الأوسمة والإنجازات' : 'Achievements'}
            className="h-11 px-2.5 sm:px-3 rounded-xl bg-[#6A1B9A] hover:bg-[#4A148C] border border-[#CE93D8] text-white flex items-center gap-1.5 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <span className="text-lg">🎖️</span>
            <span className="text-xs font-bold hidden xl:inline">{isArabic ? 'الجوائز' : 'Badges'}</span>
          </button>

        </div>

        {/* Subtle Vertical Divider */}
        <div className="h-7 w-[2px] bg-[#FFE082]/30 rounded-full shrink-0" />

        {/* Group 3: View & Zoom Controls (التحكم بالرؤية) */}
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomIn}
            title={isArabic ? 'تكبير المشهد' : 'Zoom In'}
            className="w-8 h-8 rounded-xl bg-[#3E2723] hover:bg-[#271610] text-[#FFF9C4] border border-amber-300/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-xs"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomOut}
            title={isArabic ? 'تصغير المشهد' : 'Zoom Out'}
            className="w-8 h-8 rounded-xl bg-[#3E2723] hover:bg-[#271610] text-[#FFF9C4] border border-amber-300/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-xs"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onResetZoom}
            title={isArabic ? 'إعادة ضبط المنظور' : 'Reset View'}
            className="w-8 h-8 rounded-xl bg-[#3E2723] hover:bg-[#271610] text-[#FFF9C4] border border-amber-300/40 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
