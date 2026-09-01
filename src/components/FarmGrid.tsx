import React, { useState } from 'react';
import { FarmPlot, CropType, UserStats } from '../types';
import { CROPS_DATA } from '../data/initialData';
import { Droplets, Sparkles, Sprout, Lock, PlusCircle, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FarmGridProps {
  plots: FarmPlot[];
  userStats: UserStats;
  onPlant: (plotId: number, crop: CropType) => void;
  onWater: (plotId: number) => void;
  onFertilize: (plotId: number) => void;
  onHarvest: (plotId: number) => void;
  onUnlockPlot: (plotId: number) => void;
}

export const FarmGrid: React.FC<FarmGridProps> = ({
  plots,
  userStats,
  onPlant,
  onWater,
  onFertilize,
  onHarvest,
  onUnlockPlot,
}) => {
  const [selectedSeed, setSelectedSeed] = useState<CropType>('carrot');
  const [activeTab, setActiveTab] = useState<'plots' | 'seeds'>('plots');

  const handleHarvestWithConfetti = (plotId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22c55e', '#f97316', '#eab308', '#38bdf8'],
    });
    onHarvest(plotId);
  };

  return (
    <div id="farm-management-hub" className="space-y-6">
      {/* Seed Selection Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              Seed Nursery & Field Inventory
            </h3>
            <p className="text-xs text-slate-400">
              Select a seed to plant into unlocked soil plots. Complete homework missions to win rare seeds!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 font-medium">
              Selected Seed:{' '}
              <strong className="text-amber-400">
                {CROPS_DATA[selectedSeed].name}
              </strong>
            </span>
          </div>
        </div>

        {/* Seeds Horizontal Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {(Object.keys(CROPS_DATA) as CropType[]).map((cropKey) => {
            const crop = CROPS_DATA[cropKey];
            const isSelected = selectedSeed === cropKey;
            const seedCount = userStats.seedsInventory[cropKey] || 0;

            return (
              <button
                key={cropKey}
                id={`seed-select-${cropKey}`}
                onClick={() => setSelectedSeed(cropKey)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400/80 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-400/30'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{crop.iconEmoji}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      seedCount > 0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-slate-900 text-slate-500 border border-slate-700'
                    }`}
                  >
                    ×{seedCount}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold text-white truncate">{crop.name}</div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {crop.growthTimeSeconds}s • +{crop.xpReward} XP
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plots.map((plot) => {
          const cropDef = plot.crop ? CROPS_DATA[plot.crop] : null;

          if (!plot.unlocked) {
            return (
              <div
                key={plot.id}
                id={`plot-locked-${plot.id}`}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 border-dashed"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800/90 text-slate-400 flex items-center justify-center border border-slate-700">
                  <Lock className="w-5 h-5 text-amber-500/80" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Plot #{plot.id} (Locked)</h4>
                  <p className="text-xs text-slate-400 mt-1">Expand fertile farmland</p>
                </div>
                <button
                  id={`btn-unlock-plot-${plot.id}`}
                  onClick={() => onUnlockPlot(plot.id)}
                  disabled={userStats.coins < plot.unlockCost}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    userStats.coins >= plot.unlockCost
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  Unlock for {plot.unlockCost} 🪙
                </button>
              </div>
            );
          }

          return (
            <div
              key={plot.id}
              id={`plot-card-${plot.id}`}
              className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all relative overflow-hidden ${
                plot.isReadyToHarvest
                  ? 'bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-amber-500/60 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/40'
                  : plot.crop
                  ? 'bg-slate-900/90 border-slate-700/80 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40'
              }`}
            >
              {/* Plot Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Soil Plot #{plot.id}
                </span>
                {plot.crop && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      plot.isReadyToHarvest
                        ? 'bg-amber-500 text-slate-950 animate-pulse'
                        : plot.isWatered
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {plot.isReadyToHarvest
                      ? 'Ready!'
                      : plot.isWatered
                      ? 'Hydrated'
                      : 'Dry'}
                  </span>
                )}
              </div>

              {/* Crop Visualization / Plot Center */}
              <div className="my-4 flex flex-col items-center justify-center min-h-[90px] text-center">
                {cropDef ? (
                  <>
                    <div
                      className={`text-4xl transition-transform duration-300 ${
                        plot.isReadyToHarvest ? 'scale-125 animate-bounce' : 'scale-100'
                      }`}
                    >
                      {cropDef.iconEmoji}
                    </div>
                    <div className="text-sm font-bold text-white mt-2">{cropDef.name}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {cropDef.fact}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <span className="text-3xl opacity-40">🌱</span>
                    <span className="text-xs font-medium mt-1">Empty Fertile Soil</span>
                  </div>
                )}
              </div>

              {/* Progress Bar (if growing) */}
              {plot.crop && (
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Growth Progress</span>
                    <span className="font-bold text-white">
                      {Math.round(plot.growthProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        plot.isReadyToHarvest
                          ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${plot.growthProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                {!plot.crop ? (
                  <button
                    id={`btn-plant-plot-${plot.id}`}
                    onClick={() => onPlant(plot.id, selectedSeed)}
                    disabled={(userStats.seedsInventory[selectedSeed] || 0) <= 0}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      (userStats.seedsInventory[selectedSeed] || 0) > 0
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    Plant {CROPS_DATA[selectedSeed].name}
                  </button>
                ) : plot.isReadyToHarvest ? (
                  <button
                    id={`btn-harvest-plot-${plot.id}`}
                    onClick={(e) => handleHarvestWithConfetti(plot.id, e)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/30 transition-all active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Harvest (+{cropDef?.xpReward} XP)
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <button
                      id={`btn-water-plot-${plot.id}`}
                      onClick={() => onWater(plot.id)}
                      disabled={plot.isWatered || userStats.waterDroplets < 1}
                      className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                        plot.isWatered
                          ? 'bg-slate-800 text-slate-500 cursor-default'
                          : userStats.waterDroplets >= 1
                          ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Droplets className="w-3 h-3" />
                      {plot.isWatered ? 'Hydrated' : 'Water (1💧)'}
                    </button>

                    <button
                      id={`btn-fertilize-plot-${plot.id}`}
                      onClick={() => onFertilize(plot.id)}
                      disabled={plot.isFertilized || userStats.organicFertilizer < 1}
                      className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                        plot.isFertilized
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : userStats.organicFertilizer >= 1
                          ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {plot.isFertilized ? 'Boosted' : 'Boost (1✨)'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
