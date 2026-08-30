import React, { useState, useEffect } from 'react';
import { FarmTile } from '../../types';
import { CROPS_CONFIG } from '../../data/gameConfigs';
import { Sparkles, Droplets } from 'lucide-react';

interface IsometricCropProps {
  tile: FarmTile;
  isSelected: boolean;
  onClick: (tile: FarmTile, e: React.MouseEvent) => void;
  isArabic?: boolean;
}

export const IsometricCrop: React.FC<IsometricCropProps> = ({
  tile,
  isSelected,
  onClick,
  isArabic = true,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const crop = tile.cropId ? CROPS_CONFIG[tile.cropId] : null;

  useEffect(() => {
    if (!tile.cropId || !tile.plantedAt || tile.status === 'ready') {
      setSecondsRemaining(0);
      setProgressPercent(100);
      return;
    }

    const duration = tile.growthDurationSec || crop?.growthSeconds || 30;

    const updateTimer = () => {
      const elapsed = (Date.now() - (tile.plantedAt || 0)) / 1000;
      const left = Math.max(0, Math.ceil(duration - elapsed));
      const prog = Math.min(100, Math.round((elapsed / duration) * 100));

      setSecondsRemaining(left);
      setProgressPercent(prog);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 500);
    return () => clearInterval(interval);
  }, [tile.cropId, tile.plantedAt, tile.status, tile.growthDurationSec, crop?.growthSeconds]);

  if (!crop) return null;

  const isReady = tile.status === 'ready' || secondsRemaining === 0;
  const isSprout = !isReady && progressPercent < 45;
  const isGrowing = !isReady && progressPercent >= 45;
  const isWatered = tile.status === 'watered' || (tile.wateredAt && tile.status === 'planted');

  return (
    <div
      className="absolute pointer-events-none select-none flex flex-col items-center justify-center transition-all duration-300 z-10"
      style={{
        width: '110px',
        height: '95px',
        top: '-42px',
        left: '0px',
      }}
    >
      {/* Ground Soft Shadow */}
      <div className="absolute bottom-5 w-16 h-6 bg-black/30 rounded-full blur-xs pointer-events-none" />

      {/* ========================================================================= */}
      {/* STAGE 1: TENDER SPROUT (مرحلة الإنبات والشتلات الخضراء في خطوط الحرث) */}
      {/* ========================================================================= */}
      {isSprout && (
        <div className="relative flex flex-col items-center animate-sway">
          {/* Earth soil mounds in furrow */}
          <div className="flex gap-4 items-center -mb-1">
            <div className="w-4 h-2 bg-[#3E2723] rounded-full" />
            <div className="w-5 h-2.5 bg-[#271610] rounded-full" />
            <div className="w-4 h-2 bg-[#3E2723] rounded-full" />
          </div>

          {/* Trio of young green shoots */}
          <div className="flex items-end gap-2 text-2xl drop-shadow-sm">
            <span className="transform -rotate-12 scale-90">🌱</span>
            <span className="transform scale-110 -translate-y-1">🌱</span>
            <span className="transform rotate-12 scale-90">🌱</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: BUSHY VEGETATIVE GROWTH (مرحلة النمو الخضري وتفرع السيقان) */}
      {/* ========================================================================= */}
      {isGrowing && (
        <div className="relative flex flex-col items-center animate-sway">
          {/* Wheat stage 2 */}
          {crop.id === 'wheat' && (
            <div className="flex items-end gap-1 text-3xl drop-shadow-md">
              <span className="transform -rotate-6 text-[#7CB342]">🌿</span>
              <span className="transform scale-125 -translate-y-1 text-[#8BC34A]">🌾</span>
              <span className="transform rotate-6 text-[#7CB342]">🌿</span>
            </div>
          )}

          {/* Carrot stage 2 */}
          {crop.id === 'carrot' && (
            <div className="flex items-end gap-1 text-3xl drop-shadow-md">
              <span className="transform -rotate-12">🌿</span>
              <span className="transform scale-110">🥕</span>
              <span className="transform rotate-12">🌿</span>
            </div>
          )}

          {/* Corn stage 2 */}
          {crop.id === 'corn' && (
            <div className="flex items-end gap-0.5 text-3xl drop-shadow-md">
              <span className="transform -rotate-6">🌿</span>
              <span className="transform scale-125 -translate-y-1">🌽</span>
              <span className="transform rotate-6">🌿</span>
            </div>
          )}

          {/* Tomato stage 2 */}
          {crop.id === 'tomato' && (
            <div className="flex flex-col items-center text-3xl drop-shadow-md">
              <span className="text-xl">🎋</span>
              <span className="transform scale-110 -mt-2">🍅</span>
            </div>
          )}

          {/* Strawberry stage 2 */}
          {crop.id === 'strawberry' && (
            <div className="flex items-center gap-1 text-3xl drop-shadow-md">
              <span>🌸</span>
              <span className="transform scale-110">🍓</span>
              <span>🌸</span>
            </div>
          )}

          {/* Pumpkin / Other stage 2 */}
          {crop.id !== 'wheat' && crop.id !== 'carrot' && crop.id !== 'corn' && crop.id !== 'tomato' && crop.id !== 'strawberry' && (
            <div className="flex items-end gap-1 text-3xl drop-shadow-md">
              <span className="transform -rotate-6">🌿</span>
              <span className="transform scale-125 -translate-y-1">{crop.icon}</span>
              <span className="transform rotate-6">🌿</span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: FULL RIPE 3D HARVEST-READY CROP (مرحلة النضج والحصاد الذهبي) */}
      {/* ========================================================================= */}
      {isReady && (
        <div className="relative flex flex-col items-center animate-harvest-bounce">
          {/* Radiant Golden Harvest Glow */}
          <div className="absolute -inset-3 bg-[#FDD835]/35 rounded-full blur-md animate-pulse pointer-events-none" />

          {/* SPECIFIC 3D CLUSTERS PER CROP TYPE (مطابقة لصور المزرعة السعيدة) */}

          {/* 1. Wheat Field (حقل القمح الذهبي الكثيف) */}
          {crop.id === 'wheat' && (
            <div className="relative flex items-end justify-center -space-x-2">
              <span className="text-4xl transform -rotate-15 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">🌾</span>
              <span className="text-5xl transform scale-110 -translate-y-2 z-10 drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)]">🌾</span>
              <span className="text-4xl transform rotate-15 drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]">🌾</span>
            </div>
          )}

          {/* 2. Carrot Patch (حقل الجزر البرتقالي مع الأوراق الخضراء) */}
          {crop.id === 'carrot' && (
            <div className="relative flex items-end justify-center -space-x-1">
              <span className="text-3xl transform -rotate-12 drop-shadow-md">🥕</span>
              <span className="text-4xl transform scale-115 -translate-y-2 z-10 drop-shadow-lg">🥕</span>
              <span className="text-3xl transform rotate-12 drop-shadow-md">🥕</span>
            </div>
          )}

          {/* 3. Golden Corn Stalks (حقل الذرة الشامخة مع الأكواز) */}
          {crop.id === 'corn' && (
            <div className="relative flex items-end justify-center -space-x-1">
              <span className="text-3xl transform -rotate-6 drop-shadow-md">🌽</span>
              <span className="text-4xl transform scale-120 -translate-y-3 z-10 drop-shadow-lg">🌽</span>
              <span className="text-3xl transform rotate-6 drop-shadow-md">🌽</span>
            </div>
          )}

          {/* 4. Trellised Tomatoes (شجيرات الطماطم الحمراء اليانعة) */}
          {crop.id === 'tomato' && (
            <div className="relative flex items-center justify-center">
              <div className="text-4xl transform scale-115 drop-shadow-lg flex items-center gap-0.5">
                <span>🍅</span>
                <span className="text-2xl -mt-3">🍅</span>
                <span className="text-3xl">🍅</span>
              </div>
            </div>
          )}

          {/* 5. Sweet Strawberries (حوض الفراولة الحمراء الشهية) */}
          {crop.id === 'strawberry' && (
            <div className="relative flex items-center justify-center -space-x-1">
              <span className="text-3xl transform -rotate-12">🍓</span>
              <span className="text-4xl transform scale-120 -translate-y-1 z-10 drop-shadow-lg">🍓</span>
              <span className="text-3xl transform rotate-12">🍓</span>
            </div>
          )}

          {/* 6. Giant Pumpkins (حقل القرع العسلي المضلع) */}
          {crop.id === 'pumpkin' && (
            <div className="relative flex items-center justify-center">
              <span className="text-4xl transform scale-125 drop-shadow-lg">🎃</span>
            </div>
          )}

          {/* 7. Radiant Sunflowers (حقل دوار الشمس المشرق) */}
          {crop.id === 'sunflower' && (
            <div className="relative flex items-end justify-center -space-x-2">
              <span className="text-3xl transform -rotate-12">🌻</span>
              <span className="text-4xl transform scale-120 -translate-y-2 z-10 drop-shadow-lg">🌻</span>
              <span className="text-3xl transform rotate-12">🌻</span>
            </div>
          )}

          {/* 8. Soft Cotton Bolls (حقل القطن الأبيض الزاهي) */}
          {crop.id === 'cotton' && (
            <div className="relative flex items-center justify-center -space-x-1">
              <span className="text-3xl">☁️</span>
              <span className="text-4xl transform scale-115 -translate-y-1 z-10">☁️</span>
              <span className="text-3xl">☁️</span>
            </div>
          )}

          {/* Generic fallback for any other crop */}
          {crop.id !== 'wheat' && crop.id !== 'carrot' && crop.id !== 'corn' && crop.id !== 'tomato' && crop.id !== 'strawberry' && crop.id !== 'pumpkin' && crop.id !== 'sunflower' && crop.id !== 'cotton' && (
            <div className="text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] transform hover:scale-110 transition-transform">
              {crop.icon}
            </div>
          )}

          {/* Floating Harvest Action Badge (زر احصد الفوري مع مؤثر ذهبي) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick(tile, e);
            }}
            className="pointer-events-auto absolute -top-6 bg-linear-to-r from-[#FDD835] via-[#FFF176] to-[#FBC02D] text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-white shadow-[0_3px_10px_rgba(0,0,0,0.4)] flex items-center gap-1 cursor-pointer transform hover:scale-115 active:scale-95 transition-all animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E65100]" />
            <span>{isArabic ? 'احصد! 🌾' : 'Harvest! 🌾'}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIVE TIMER & PROGRESS BAR WHEN GROWING (مؤقت النمو وشريط التقدم الحي) */}
      {/* ========================================================================= */}
      {!isReady && (
        <div className="absolute -top-4 flex flex-col items-center pointer-events-none">
          {/* Time Remaining Pill */}
          <div className="bg-slate-950/85 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.2 rounded-full border border-white/40 shadow-md flex items-center gap-1">
            {isWatered ? (
              <Droplets className="w-2.5 h-2.5 text-[#80DEEA]" />
            ) : (
              <span className="text-amber-300">⏳</span>
            )}
            <span className="text-[#A5D6A7] font-mono">{secondsRemaining}s</span>
          </div>

          {/* Growth Progress Bar */}
          <div className="w-12 h-1.5 bg-black/65 rounded-full overflow-hidden mt-0.5 border border-white/30 p-0.2 shadow-xs">
            <div
              className="h-full bg-linear-to-r from-[#76FF03] via-[#64DD17] to-[#00E676] rounded-full transition-all duration-300 shadow-[0_0_4px_#76FF03]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
