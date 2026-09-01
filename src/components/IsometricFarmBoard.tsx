import React, { useState } from 'react';
import { FarmPlot, CropType, UserStats, Animal, GameTool } from '../types';
import { CROPS_DATA } from '../data/initialData';
import {
  Sparkles,
  Droplets,
  Sprout,
  Lock,
  Plus,
  Minus,
  RotateCcw,
  Maximize2,
  BookOpen,
  ShoppingBag,
  Package,
  Award,
  Sun,
  Flame,
  CheckCircle2,
  Volume2,
  VolumeX,
  Music,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  playHarvestSound,
  playWaterSound,
  playPlantSound,
  playCoinSound,
  playAnimalSound,
  playPopSound,
} from '../utils/audio';

interface IsometricFarmBoardProps {
  plots: FarmPlot[];
  animals: Animal[];
  userStats: UserStats;
  selectedSeed: CropType;
  setSelectedSeed: (seed: CropType) => void;
  activeTool: GameTool;
  setActiveTool: (tool: GameTool) => void;
  onPlant: (plotId: number, crop: CropType) => void;
  onWater: (plotId: number) => void;
  onFertilize: (plotId: number) => void;
  onHarvest: (plotId: number) => void;
  onHarvestAll: () => void;
  onWaterAll: () => void;
  onUnlockPlot: (plotId: number) => void;
  onCollectAnimalProduct: (animalId: string) => void;
  onOpenMissions: () => void;
  onOpenMarket: () => void;
  onOpenStorage: () => void;
  onOpenAchievements: () => void;
  onOpenAIMentor: () => void;
  onOpenCharacters: () => void;
  lang: 'ar' | 'en';
}

export const IsometricFarmBoard: React.FC<IsometricFarmBoardProps> = ({
  plots,
  animals,
  userStats,
  selectedSeed,
  setSelectedSeed,
  activeTool,
  setActiveTool,
  onPlant,
  onWater,
  onFertilize,
  onHarvest,
  onHarvestAll,
  onWaterAll,
  onUnlockPlot,
  onCollectAnimalProduct,
  onOpenMissions,
  onOpenMarket,
  onOpenStorage,
  onOpenAchievements,
  onOpenAIMentor,
  onOpenCharacters,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showSeedPicker, setShowSeedPicker] = useState<boolean>(false);
  const [hoveredPlot, setHoveredPlot] = useState<FarmPlot | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; text: string; x: number; y: number; color: string }>>([]);

  const addFloatingNotification = (text: string, x: number, y: number, color = '#eab308') => {
    const id = Date.now() + Math.random();
    setFloatingTexts((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  const handlePlotClick = (plot: FarmPlot, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (!plot.unlocked) {
      if (userStats.coins >= plot.unlockCost) {
        playCoinSound();
        confetti({ particleCount: 35, spread: 60, origin: { x: x / window.innerWidth, y: y / window.innerHeight } });
        addFloatingNotification(`+1 حوض زراعي جديد! 🌟`, x, y, '#22c55e');
        onUnlockPlot(plot.id);
      } else {
        playPopSound();
        addFloatingNotification(isAr ? `تحتاج إلى ${plot.unlockCost} ذهب 🪙` : `Need ${plot.unlockCost} Coins 🪙`, x, y, '#ef4444');
      }
      return;
    }

    if (plot.isReadyToHarvest) {
      playHarvestSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ['#eab308', '#22c55e', '#f97316'],
      });
      const cropInfo = plot.crop ? CROPS_DATA[plot.crop] : null;
      addFloatingNotification(`+1 ${cropInfo ? (isAr ? cropInfo.nameAr : cropInfo.name) : ''} (${cropInfo?.xpReward || 10} XP) 🌾`, x, y, '#eab308');
      onHarvest(plot.id);
      return;
    }

    if (activeTool === 'water' || (!plot.isWatered && plot.crop)) {
      if (userStats.waterDroplets >= 1) {
        playWaterSound();
        addFloatingNotification(`-1 قطرة ماء 💧`, x, y, '#06b6d4');
        onWater(plot.id);
      } else {
        playPopSound();
        addFloatingNotification(isAr ? `نفد الماء! حل الواجبات للحصول على ماء 💧` : `Out of water! Complete homework for water 💧`, x, y, '#ef4444');
      }
      return;
    }

    if (!plot.crop) {
      const seedCount = userStats.seedsInventory[selectedSeed] || 0;
      if (seedCount > 0) {
        playPlantSound();
        addFloatingNotification(`زرعت ${isAr ? CROPS_DATA[selectedSeed].nameAr : CROPS_DATA[selectedSeed].name} 🌱`, x, y, '#84cc16');
        onPlant(plot.id, selectedSeed);
      } else {
        playPopSound();
        addFloatingNotification(isAr ? `نفدت البذور! اشترِ من المتجر 🛒` : `Out of seeds! Buy at Market 🛒`, x, y, '#f59e0b');
        setShowSeedPicker(true);
      }
      return;
    }

    // Default inspection
    setHoveredPlot(plot);
  };

  const handleAnimalClick = (animal: Animal, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (animal.isProductReady) {
      playAnimalSound();
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ['#38bdf8', '#fbbf24', '#f472b6'],
      });
      addFloatingNotification(`+1 ${isAr ? animal.productNameAr : animal.productName} ${animal.productEmoji}`, x, y, '#38bdf8');
      onCollectAnimalProduct(animal.id);
    } else {
      playPopSound();
      addFloatingNotification(isAr ? `الحيوان يرعى وسينتج قريباً! ⏳` : `Animal is resting & producing! ⏳`, x, y, '#a855f7');
    }
  };

  const readyCropsCount = plots.filter((p) => p.unlocked && p.isReadyToHarvest).length;
  const unwateredCount = plots.filter((p) => p.unlocked && p.crop && !p.isWatered && !p.isReadyToHarvest).length;

  return (
    <div
      id="isometric-farm-viewport"
      className="relative w-full h-[calc(100vh-80px)] min-h-[580px] bg-gradient-to-b from-[#6cb83a] via-[#5aa32c] to-[#437d1e] overflow-hidden select-none flex flex-col justify-between"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Decorative Farm Environment Pattern (Lawn, Trees, Canal) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#4d8b18_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Floating Animated Text Particles */}
      {floatingTexts.map((item) => (
        <div
          key={item.id}
          className="fixed z-50 pointer-events-none font-extrabold text-sm px-3 py-1.5 rounded-xl shadow-lg border animate-floatUp"
          style={{
            left: `${item.x}px`,
            top: `${item.y - 30}px`,
            backgroundColor: '#0f172aee',
            borderColor: item.color,
            color: item.color,
          }}
        >
          {item.text}
        </div>
      ))}

      {/* Top Floating Widgets (Spark Bot & Camera Controls) */}
      <div className="relative z-20 px-4 sm:px-6 pt-3 flex items-start justify-between pointer-events-none">
        {/* Left Side: Floating Spark AI Mascot Widget */}
        <div
          onClick={() => {
            playPopSound();
            onOpenAIMentor();
          }}
          className="pointer-events-auto cursor-pointer group flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-900 border-2 border-amber-400/80 shadow-2xl shadow-amber-500/20 backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 animate-bounce-subtle"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-md">
            <img
              src="/images/character_spark_1787680567230.jpg"
              alt="Spark AI"
              className="w-full h-full object-cover rounded-[10px]"
            />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-amber-300">
                {isAr ? 'مهمة تعليمية جاهزة!' : 'STEM Mission Ready!'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/30 text-purple-200 font-bold border border-purple-400/40">
                AI Tutor ⚡
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors">
              {isAr ? 'افتح مهمة سبارك الآن واربح الدنانير 🎁' : 'Open Spark mission & earn rewards 🎁'}
            </p>
          </div>
        </div>

        {/* Right Side: Camera & Fast Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Quick Harvest All */}
          {readyCropsCount > 0 && (
            <button
              onClick={() => {
                playHarvestSound();
                confetti({ particleCount: 50, spread: 70, origin: { y: 0.2 } });
                onHarvestAll();
              }}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 border-2 border-amber-300 flex items-center gap-1.5 active:scale-95 animate-pulse transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>
                {isAr ? `احصد الكل (${readyCropsCount})` : `Harvest All (${readyCropsCount})`}
              </span>
            </button>
          )}

          {/* Quick Water All */}
          {unwateredCount > 0 && (
            <button
              onClick={() => {
                playWaterSound();
                onWaterAll();
              }}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black text-xs shadow-xl shadow-cyan-500/30 border-2 border-cyan-300 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Droplets className="w-4 h-4 text-cyan-100" />
              <span>
                {isAr ? `اسقِ الكل (${unwateredCount})` : `Water All (${unwateredCount})`}
              </span>
            </button>
          )}

          {/* Zoom Buttons */}
          <div className="bg-slate-900/85 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 flex items-center gap-1 shadow-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.75))}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Isometric Farm Center Playground */}
      <div className="relative flex-1 flex items-center justify-center overflow-auto px-4 py-2">
        <div
          className="relative transition-transform duration-300 ease-out origin-center flex flex-col items-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Top Country Barn & Animals Sanctuary Area */}
          <div className="mb-4 w-full max-w-4xl bg-gradient-to-r from-red-950/90 via-amber-950/80 to-slate-900/90 p-4 rounded-3xl border-2 border-amber-500/50 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-red-700/80 border-2 border-amber-400 flex items-center justify-center text-3xl shadow-lg">
                🏡
              </div>
              <div>
                <h3 className="text-base font-extrabold text-amber-200 flex items-center gap-2">
                  {isAr ? 'حظيرة الحيوانات والإنتاج العضوي' : 'Farm Barn & Animal Sanctuary'}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                    {isAr ? 'إنتاج حي' : 'Live Production'}
                  </span>
                </h3>
                <p className="text-xs text-amber-300/80">
                  {isAr
                    ? 'انقر على الحيوانات لجمع الحليب الطازج والبيض والصوف!'
                    : 'Click happy animals to harvest fresh organic milk, eggs & wool!'}
                </p>
              </div>
            </div>

            {/* Animal Stalls */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {animals.map((animal) => {
                const isReady = animal.isProductReady;
                return (
                  <div
                    key={animal.id}
                    onClick={(e) => handleAnimalClick(animal, e)}
                    className={`relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-1 group active:scale-95 ${
                      isReady
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 animate-pulse'
                        : 'bg-slate-900/70 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {/* Speech Bubble if ready */}
                    {isReady && (
                      <div className="absolute -top-7 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap border border-amber-200 animate-bounce">
                        {isAr ? `جاهز للجمع! ${animal.productEmoji}` : `Ready! ${animal.productEmoji}`}
                      </div>
                    )}

                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      {animal.species === 'Dairy Cow' && '🐄'}
                      {animal.species === 'Baladi Chicken' && '🐔'}
                      {animal.species === 'Nubian Goat' && '🐑'}
                      {animal.species === 'Farm Bunny' && '🐰'}
                    </div>

                    <div className="text-center">
                      <span className="text-[11px] font-bold text-white block">
                        {isAr ? animal.nameAr : animal.name}
                      </span>
                      <span className="text-[9px] text-amber-300/90 font-medium block">
                        {isAr ? animal.productNameAr : animal.productName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Isometric Diamond Grid of Soil Plots */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-3xl bg-[#3f6d1b]/60 border-2 border-[#69a531]/60 shadow-inner backdrop-blur-sm">
            {plots.map((plot) => {
              const crop = plot.crop ? CROPS_DATA[plot.crop] : null;
              const isUnlocked = plot.unlocked;
              const isReady = plot.isReadyToHarvest;
              const isGrowing = isUnlocked && plot.crop && !isReady;
              const isEmpty = isUnlocked && !plot.crop;

              return (
                <div
                  key={plot.id}
                  id={`farm-plot-${plot.id}`}
                  onClick={(e) => handlePlotClick(plot, e)}
                  onMouseEnter={() => setHoveredPlot(plot)}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center p-2 group shadow-xl active:scale-95 ${
                    !isUnlocked
                      ? 'bg-amber-950/70 border-2 border-dashed border-amber-700/80 hover:border-amber-400'
                      : isReady
                      ? 'bg-gradient-to-b from-[#6b421a] to-[#45270e] border-2 border-amber-400 shadow-amber-400/30 ring-2 ring-amber-400/40'
                      : isGrowing
                      ? 'bg-gradient-to-b from-[#573516] to-[#3a200b] border-2 border-emerald-600/70'
                      : 'bg-gradient-to-b from-[#4e2f13] to-[#341d08] border-2 border-[#7c4d21]/80 hover:border-amber-400/70'
                  }`}
                >
                  {/* Furrow soil lines */}
                  <div className="absolute inset-x-2 top-3 h-0.5 bg-black/25 rounded-full" />
                  <div className="absolute inset-x-2 bottom-3 h-0.5 bg-black/25 rounded-full" />

                  {/* Ready to Harvest Golden Floating Tag */}
                  {isReady && crop && (
                    <div className="absolute -top-3 z-30 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white/80 animate-bounce flex items-center gap-1">
                      <span>{isAr ? 'احصد!' : 'Harvest!'}</span>
                      <span>{crop.iconEmoji}</span>
                    </div>
                  )}

                  {/* Locked Expansion Plot Badge */}
                  {!isUnlocked && (
                    <div className="text-center z-10">
                      <Lock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <span className="text-[10px] font-black text-amber-200 block">
                        {isAr ? 'توسعة 🌟' : 'Expand 🌟'}
                      </span>
                      <span className="text-[9px] font-extrabold text-amber-400 block">
                        {plot.unlockCost} 🪙
                      </span>
                    </div>
                  )}

                  {/* Empty Unlocked Soil Ready to Plant */}
                  {isEmpty && (
                    <div className="text-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <Sprout className="w-6 h-6 text-amber-400/70 mx-auto mb-1 group-hover:scale-110 group-hover:text-amber-300 transition-all" />
                      <span className="text-[10px] font-extrabold text-amber-200 block">
                        {isAr ? 'حوض شاغر' : 'Empty Soil'}
                      </span>
                      <span className="text-[9px] text-amber-300/80 block">
                        {isAr ? `ازرع ${CROPS_DATA[selectedSeed].nameAr}` : `Plant ${CROPS_DATA[selectedSeed].name}`}
                      </span>
                    </div>
                  )}

                  {/* Growing Crop Stage */}
                  {isGrowing && crop && (
                    <div className="w-full flex flex-col items-center justify-between h-full py-1">
                      {/* Water Status Indicator */}
                      <div className="flex items-center justify-between w-full px-1">
                        <span
                          className={`p-1 rounded-full text-[9px] font-bold ${
                            plot.isWatered
                              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/50'
                              : 'bg-amber-600/40 text-amber-200 border border-amber-500/60 animate-pulse'
                          }`}
                          title={plot.isWatered ? 'Watered' : 'Needs Water!'}
                        >
                          💧
                        </span>
                        <span className="text-[9px] font-bold text-amber-300 bg-black/40 px-1.5 py-0.2 rounded-full">
                          {Math.round(plot.growthProgress)}%
                        </span>
                      </div>

                      {/* Animated Crop Icon Scale by progress */}
                      <div
                        className="text-2xl sm:text-3xl transition-transform duration-300"
                        style={{
                          transform: `scale(${0.5 + (plot.growthProgress / 100) * 0.6})`,
                        }}
                      >
                        {crop.iconEmoji}
                      </div>

                      {/* Growth Progress Bar */}
                      <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-300"
                          style={{ width: `${plot.growthProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Fully Ripe Crop */}
                  {isReady && crop && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-3xl sm:text-4xl animate-wiggle drop-shadow-md">
                        {crop.iconEmoji}
                      </span>
                      <span className="text-[10px] font-black text-amber-200 mt-1 truncate max-w-[90px]">
                        {isAr ? crop.nameAr : crop.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seed Selection Tray Drawer (Opens when clicking seed pill or when triggered) */}
      {showSeedPicker && (
        <div className="relative z-30 px-4 sm:px-6 mb-2">
          <div className="bg-slate-950/95 border-2 border-amber-500/50 rounded-3xl p-4 shadow-2xl backdrop-blur-md max-w-4xl mx-auto animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                {isAr ? 'اختر البذور لزراعتها في الأحواض الشاغرة:' : 'Select Seeds to Plant in Empty Plots:'}
              </h4>
              <button
                onClick={() => setShowSeedPicker(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-slate-800"
              >
                {isAr ? 'إغلاق ✕' : 'Close ✕'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {(Object.keys(CROPS_DATA) as CropType[]).map((cropKey) => {
                const crop = CROPS_DATA[cropKey];
                const count = userStats.seedsInventory[cropKey] || 0;
                const isSelected = selectedSeed === cropKey;

                return (
                  <button
                    key={cropKey}
                    onClick={() => {
                      playPopSound();
                      setSelectedSeed(cropKey);
                      setShowSeedPicker(false);
                    }}
                    className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{crop.iconEmoji}</span>
                    <span className="text-[11px] font-bold truncate max-w-[80px]">
                      {isAr ? crop.nameAr : crop.name}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1 ${
                        count > 0 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      ×{count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Game Action Bar (Toolbar directly matching 1.png) */}
      <div className="relative z-30 px-3 sm:px-6 pb-3 pt-1">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500/60 rounded-3xl p-2 sm:p-3 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-2">
          {/* Quick Left Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenAchievements}
              className="px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title={isAr ? 'الجوائز والأوسمة' : 'Achievements'}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">{isAr ? 'الجوائز' : 'Awards'}</span>
            </button>

            <button
              onClick={onOpenMissions}
              className="relative px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 border border-purple-400/50 text-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
              title={isAr ? 'الواجبات والمهام التعليمية' : 'Homework Quizzes'}
            >
              <BookOpen className="w-4 h-4 text-purple-300" />
              <span>{isAr ? 'الواجبات' : 'Homework'}</span>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white font-black text-[9px] flex items-center justify-center border border-white">
                1
              </span>
            </button>

            <button
              onClick={onOpenMarket}
              className="px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title={isAr ? 'المتجر والترقيات' : 'Market'}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'المتجر' : 'Market'}</span>
            </button>

            <button
              onClick={onOpenStorage}
              className="px-3 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title={isAr ? 'المخزن والصوامع' : 'Barn Silo'}
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'المخزن' : 'Silo'}</span>
            </button>
          </div>

          {/* Center & Right Game Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Harvest Tool */}
            <button
              onClick={() => {
                playPopSound();
                setActiveTool('harvest');
                if (readyCropsCount > 0) onHarvestAll();
              }}
              className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                activeTool === 'harvest'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 border-2 border-amber-300'
                  : 'bg-slate-900/80 text-amber-300 border border-amber-500/30 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'حصاد 🌾' : 'Harvest 🌾'}</span>
            </button>

            {/* Water Tool */}
            <button
              onClick={() => {
                playPopSound();
                setActiveTool('water');
                if (unwateredCount > 0) onWaterAll();
              }}
              className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                activeTool === 'water'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 border-2 border-cyan-300'
                  : 'bg-slate-900/80 text-cyan-300 border border-cyan-500/30 hover:bg-slate-800'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>{isAr ? 'سقاية 💧' : 'Water 💧'}</span>
            </button>

            {/* Selected Seed Pill (Click to open Seed Picker) */}
            <button
              onClick={() => {
                playPopSound();
                setActiveTool('plant');
                setShowSeedPicker((v) => !v);
              }}
              className="px-3 py-2 rounded-2xl bg-emerald-950/80 border-2 border-emerald-400 text-emerald-200 hover:bg-emerald-900/80 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <span className="text-base">{CROPS_DATA[selectedSeed].iconEmoji}</span>
              <span>
                {isAr ? CROPS_DATA[selectedSeed].nameAr : CROPS_DATA[selectedSeed].name}
              </span>
              <span className="text-[10px] bg-emerald-800 text-emerald-100 px-1.5 py-0.2 rounded-full font-bold">
                {isAr ? 'تغيير ▾' : 'Change ▾'}
              </span>
            </button>

            {/* Plow / Till Tool */}
            <button
              onClick={() => {
                playPopSound();
                setActiveTool('plow');
              }}
              className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                activeTool === 'plow'
                  ? 'bg-amber-600 text-slate-950 shadow-lg border-2 border-amber-300'
                  : 'bg-slate-900/80 text-amber-300 border border-amber-500/30 hover:bg-slate-800'
              }`}
            >
              <span>⛏️</span>
              <span className="hidden sm:inline">{isAr ? 'حراثة' : 'Plow'}</span>
            </button>

            {/* Pointer / Select Tool */}
            <button
              onClick={() => {
                playPopSound();
                setActiveTool('select');
              }}
              className={`px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                activeTool === 'select'
                  ? 'bg-indigo-600 text-white shadow-lg border-2 border-indigo-300'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span>↗️</span>
              <span className="hidden sm:inline">{isAr ? 'تحديد' : 'Select'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
