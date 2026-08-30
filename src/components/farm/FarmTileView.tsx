import React, { useState, useEffect } from 'react';
import { FarmTile } from '../../types';
import { ANIMALS_CONFIG, BUILDINGS_CONFIG, CROPS_CONFIG, DECORATIONS_CONFIG } from '../../data/gameConfigs';
import { Lock, Sparkles, Droplets } from 'lucide-react';

interface FarmTileViewProps {
  tile: FarmTile;
  isSelected: boolean;
  activeTool: string;
  onClick: (tile: FarmTile) => void;
  isArabic?: boolean;
}

export const FarmTileView: React.FC<FarmTileViewProps> = ({
  tile,
  isSelected,
  activeTool,
  onClick,
  isArabic = true,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [animalFedSecondsRemaining, setAnimalFedSecondsRemaining] = useState<number>(0);

  const crop = tile.cropId ? CROPS_CONFIG[tile.cropId] : null;
  const building = tile.buildingId ? BUILDINGS_CONFIG[tile.buildingId] : null;
  const animal = tile.animalId ? ANIMALS_CONFIG[tile.animalId] : null;
  const decor = tile.decorationId ? DECORATIONS_CONFIG[tile.decorationId] : null;

  // Live timer for crop countdown
  useEffect(() => {
    if (!tile.cropId || !tile.plantedAt || tile.status === 'ready') {
      setSecondsRemaining(0);
      return;
    }

    const duration = tile.growthDurationSec || crop?.growthSeconds || 30;
    const calculateTime = () => {
      const elapsed = (Date.now() - (tile.plantedAt || 0)) / 1000;
      const left = Math.max(0, Math.ceil(duration - elapsed));
      setSecondsRemaining(left);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [tile.cropId, tile.plantedAt, tile.status, tile.growthDurationSec, crop?.growthSeconds]);

  // Live timer for animal produce
  useEffect(() => {
    if (!tile.animalId || !tile.animalFedAt || !animal) {
      setAnimalFedSecondsRemaining(0);
      return;
    }

    const duration = animal.produceDurationSec || 60;
    const calculateAnimal = () => {
      const elapsed = (Date.now() - (tile.animalFedAt || 0)) / 1000;
      const left = Math.max(0, Math.ceil(duration - elapsed));
      setAnimalFedSecondsRemaining(left);
    };

    calculateAnimal();
    const interval = setInterval(calculateAnimal, 1000);
    return () => clearInterval(interval);
  }, [tile.animalId, tile.animalFedAt, animal]);

  const isReadyToHarvest = tile.status === 'ready' && !!tile.cropId;
  const isAnimalReady = !!tile.animalId && animalFedSecondsRemaining === 0;

  // Happy Farm tile background styling
  const getTileBgStyle = () => {
    if (tile.isLocked) {
      return 'bg-[#BCAAA4]/90 border-2 border-dashed border-[#8D6E63] opacity-75 shadow-xs';
    }
    if (tile.type === 'soil') {
      if (tile.status === 'watered' || tile.wateredAt) {
        return 'bg-linear-to-b from-[#3E2723] to-[#271610] border-b-4 border-[#1A0E0A] shadow-[inset_0_3px_6px_rgba(0,0,0,0.6)] ring-2 ring-[#00E5FF]';
      }
      return 'bg-linear-to-b from-[#6D4C41] to-[#4E342E] border-b-4 border-[#3E2723] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]';
    }
    if (tile.type === 'path') {
      return 'bg-linear-to-b from-[#D7CCC8] to-[#A1887F] border-b-4 border-[#6D4C41] shadow-xs';
    }
    // Grass meadow
    return 'bg-linear-to-b from-[#8BC34A] to-[#689F38] hover:from-[#9CCC65] hover:to-[#7CB342] border-b-4 border-[#437222] shadow-xs';
  };

  return (
    <button
      id={tile.id}
      onClick={() => onClick(tile)}
      className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl transition-all duration-150 flex flex-col items-center justify-center p-1 cursor-pointer select-none group focus:outline-hidden active:translate-y-0.5 ${getTileBgStyle()} ${
        isSelected
          ? 'ring-4 ring-[#FFD600] scale-105 z-20 shadow-[0_0_15px_#FFD600]'
          : 'hover:scale-[1.03] hover:z-10'
      }`}
    >
      {/* Locked Tile State */}
      {tile.isLocked ? (
        <div className="flex flex-col items-center text-center p-1">
          <div className="w-7 h-7 rounded-xl bg-[#4E342E] text-[#FFF9C4] flex items-center justify-center mb-1 shadow-sm border border-amber-300">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-black text-[#3E2723] tracking-tight">
            {isArabic ? `مستوى ${tile.unlockLevel || 5}` : `Lvl ${tile.unlockLevel || 5}`}
          </span>
          <span className="text-[9px] font-black text-amber-950 bg-[#FFEE58] px-1.5 py-0.2 rounded-full mt-0.5 border border-[#FDD835]">
            🪙 {tile.unlockCostCoins || 150}
          </span>
        </div>
      ) : (
        <>
          {/* Building */}
          {building && (
            <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-50 duration-300">
              <span className="text-3xl sm:text-4xl md:text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                {building.icon}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black text-amber-950 bg-[#FFF9C4] px-2 py-0.5 rounded-md mt-1 shadow-xs border border-amber-300 truncate max-w-[90%]">
                {building.name}
              </span>
            </div>
          )}

          {/* Decoration */}
          {decor && !building && (
            <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-50 duration-300">
              <span className="text-2xl sm:text-3xl md:text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                {decor.icon}
              </span>
              <span className="text-[8px] sm:text-[9px] font-black text-amber-950 bg-[#FFF9C4] px-1.5 rounded-md mt-0.5 border border-amber-300 truncate max-w-[90%]">
                {decor.name}
              </span>
            </div>
          )}

          {/* Animal */}
          {animal && !building && !decor && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative">
                <span className="text-3xl sm:text-4xl md:text-5xl filter drop-shadow-sm animate-bounce duration-1000 inline-block">
                  {animal.icon}
                </span>
                {isAnimalReady ? (
                  <span className="absolute -top-2 -right-2 bg-linear-to-r from-[#FFEB3B] to-[#FDD835] text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full border-2 border-white shadow-md flex items-center gap-0.5 animate-pulse">
                    {animal.produceItem.icon} {isArabic ? 'جاهز!' : 'Ready!'}
                  </span>
                ) : (
                  <span className="absolute -top-1 -right-1 bg-white/95 text-amber-950 font-black text-[9px] px-1.5 rounded-full border border-amber-300 shadow-xs">
                    {animalFedSecondsRemaining}s
                  </span>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-white bg-[#3E2723]/80 px-1.5 py-0.2 rounded-md mt-0.5 shadow-xs">
                {animal.name}
              </span>
            </div>
          )}

          {/* Growing Crop */}
          {crop && !building && !decor && !animal && (
            <div className="flex flex-col items-center justify-center text-center w-full h-full">
              {isReadyToHarvest ? (
                <div className="flex flex-col items-center animate-bounce">
                  <span className="text-3xl sm:text-4xl md:text-5xl filter drop-shadow-md">
                    {crop.icon}
                  </span>
                  <span className="text-[10px] font-black text-amber-950 bg-linear-to-r from-[#FFEE58] via-[#FFD600] to-[#FFAB00] px-2.5 py-0.5 rounded-full shadow-[0_2px_8px_rgba(255,214,0,0.6)] mt-1 border-2 border-white flex items-center gap-1 animate-pulse uppercase">
                    <Sparkles className="w-3 h-3 text-[#D84315]" />
                    {isArabic ? 'احصد! 🌾' : 'HARVEST!'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl filter drop-shadow-xs transition-transform group-hover:scale-110">
                    {secondsRemaining > (crop.growthSeconds * 0.6)
                      ? crop.stages.sprout
                      : crop.stages.growing}
                  </span>
                  <div className="flex items-center gap-1 mt-1 bg-[#1B5E20]/90 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full shadow-xs border border-[#81C784]">
                    {tile.status === 'watered' || tile.wateredAt ? (
                      <Droplets className="w-2.5 h-2.5 text-cyan-300" />
                    ) : null}
                    <span>{secondsRemaining}s</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty Soil Tile */}
          {tile.type === 'soil' && !tile.cropId && !building && !decor && !animal && (
            <div className="flex flex-col items-center justify-center text-[#FFE082]">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase opacity-90 drop-shadow-xs">
                {tile.status === 'watered' ? '💧 رطبة' : '🌱 تربة'}
              </span>
              <span className="text-[9px] text-[#FFF9C4] font-bold">
                {isArabic ? 'ازرع بذورك' : 'Plant Seed'}
              </span>
            </div>
          )}

          {/* Empty Grass Tile */}
          {tile.type === 'grass' && !building && !decor && !animal && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
              <span className="text-[9px] font-black text-amber-950 bg-[#FFF9C4] px-2 py-0.5 rounded-md shadow-xs border border-amber-300">
                {activeTool === 'hoe' ? (isArabic ? '⛏️ احرث' : '⛏️ Plow') : (isArabic ? '🌾 مرج' : '🌾 Meadow')}
              </span>
            </div>
          )}
        </>
      )}
    </button>
  );
};
