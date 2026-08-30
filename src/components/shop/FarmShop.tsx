import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import {
  ANIMALS_CONFIG,
  BUILDINGS_CONFIG,
  CROPS_CONFIG,
  DECORATIONS_CONFIG,
} from '../../data/gameConfigs';
import {
  Coins,
  Lock,
  ShoppingBag,
  Sparkles,
  Sprout,
  X,
  Zap,
} from 'lucide-react';

interface FarmShopProps {
  onClose: () => void;
}

export const FarmShop: React.FC<FarmShopProps> = ({ onClose }) => {
  const { studentProfile, buyShopItem } = useGame();
  const { t, isRTL } = useTranslation();
  const [activeTab, setActiveTab] = useState<'seeds' | 'animals' | 'buildings' | 'decor'>('seeds');
  const [seedQuantities, setSeedQuantities] = useState<Record<string, number>>({});

  const crops = Object.values(CROPS_CONFIG);
  const animals = Object.values(ANIMALS_CONFIG);
  const buildings = Object.values(BUILDINGS_CONFIG);
  const decorations = Object.values(DECORATIONS_CONFIG);

  const getSeedQty = (cropId: string) => seedQuantities[cropId] || 1;
  const setSeedQty = (cropId: string, qty: number) => {
    setSeedQuantities((prev) => ({ ...prev, [cropId]: Math.max(1, qty) }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-[#FDD835] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#2E7D32] via-[#388E3C] to-[#1B5E20] px-5 py-4 flex items-center justify-between text-white border-b-2 border-[#FDD835]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-[#FDD835] to-[#FFF9C4] text-amber-950 border-2 border-white flex items-center justify-center text-2xl shadow-md">
              🏪
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{t.shopTitle}</span>
              </h2>
              <p className="text-xs font-semibold text-[#E8F5E9]">
                {t.shopSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/25 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 font-black text-sm text-[#FFEE58] border border-white/20">
              <Coins className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{studentProfile.coins.toLocaleString()} {t.coins}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-black/20 hover:bg-black/40 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 p-3 bg-[#F1F8E9] border-b border-[#C5E1A5] overflow-x-auto">
          {[
            { id: 'seeds', label: `🌱 ${t.shopSeeds}`, count: crops.length },
            { id: 'animals', label: `🐾 ${t.shopAnimals}`, count: animals.length },
            { id: 'buildings', label: `🏛️ ${t.shopBuildings}`, count: buildings.length },
            { id: 'decor', label: `✨ ${t.shopDecorations}`, count: decorations.length },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-sm'
                    : 'bg-white text-[#2E4018] hover:bg-[#DCEDC8] border border-[#C5E1A5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Shop Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 bg-[#F1F8E9]/30">
          {/* Seeds */}
          {activeTab === 'seeds' &&
            crops.map((crop) => {
              const isLocked = studentProfile.level < crop.unlockLevel;
              const qty = getSeedQty(crop.id);
              const totalCost = crop.seedPrice * qty;
              const canAfford = studentProfile.coins >= totalCost;

              return (
                <div
                  key={crop.id}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col justify-between transition-all ${
                    isLocked
                      ? 'border-[#C5E1A5]/60 bg-[#F1F8E9]/60 opacity-80'
                      : 'border-[#C5E1A5] hover:border-[#2E7D32] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-3xl shadow-2xs">
                        {crop.icon}
                      </div>
                      {isLocked ? (
                        <span className="bg-stone-200 text-[#4E342E] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.level} {crop.unlockLevel}
                        </span>
                      ) : (
                        <span className="bg-[#DCEDC8] text-[#2E4018] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#C5E1A5]">
                          +{crop.xpReward} XP
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-[#2E4018]">{crop.name}</h4>
                    <p className="text-xs text-[#4E342E] font-medium mt-0.5 leading-relaxed line-clamp-2">
                      {crop.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-[11px] font-bold text-[#558B2F]">
                      <span>⏱️ {crop.growthSeconds}s</span>
                      <span>•</span>
                      <span>💰 {crop.sellPrice} 🪙</span>
                    </div>

                    {/* Quantity Selector for Seeds */}
                    {!isLocked && (
                      <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-[#F1F8E9]">
                        <span className="text-[10px] font-bold text-[#5D4037] mr-1">{t.buyQuantity}:</span>
                        {[1, 5, 10, 20].map((q) => (
                          <button
                            key={q}
                            onClick={() => setSeedQty(crop.id, q)}
                            className={`px-1.5 py-0.5 rounded-lg text-[10px] font-black cursor-pointer transition-colors ${
                              qty === q
                                ? 'bg-[#2E7D32] text-white shadow-xs'
                                : 'bg-[#E8F5E9] text-[#2E4018] hover:bg-[#C5E1A5]'
                            }`}
                          >
                            {q}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#C5E1A5]/40 flex items-center justify-between">
                    <span className="text-xs font-black text-[#E65100] flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      {totalCost} 🪙
                    </span>

                    <button
                      onClick={() => buyShopItem('seed', crop.id, crop.seedPrice, qty)}
                      disabled={isLocked || !canAfford}
                      className="px-3.5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isLocked ? t.locked : `${t.buySeed} (${qty}x)`}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* Animals */}
          {activeTab === 'animals' &&
            animals.map((anim) => {
              const isLocked = studentProfile.level < anim.unlockLevel;
              const canAfford = studentProfile.coins >= anim.cost;

              return (
                <div
                  key={anim.id}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col justify-between transition-all ${
                    isLocked
                      ? 'border-[#C5E1A5]/60 bg-[#F1F8E9]/60 opacity-80'
                      : 'border-[#C5E1A5] hover:border-[#2E7D32] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-3xl shadow-2xs">
                        {anim.icon}
                      </div>
                      {isLocked ? (
                        <span className="bg-stone-200 text-[#4E342E] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.level} {anim.unlockLevel}
                        </span>
                      ) : (
                        <span className="bg-[#DCEDC8] text-[#2E4018] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#C5E1A5]">
                          +{anim.xpReward} XP
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-[#2E4018]">{anim.name}</h4>
                    <p className="text-xs text-[#4E342E] font-medium mt-0.5 leading-relaxed line-clamp-2">
                      {anim.description}
                    </p>

                    <div className="p-2 bg-[#F1F8E9] border border-[#C5E1A5] rounded-xl mt-2 text-[11px] font-bold text-[#2E4018] flex items-center gap-1.5">
                      <span>{anim.produceItem.icon} {t.shopAnimals}:</span>
                      <span className="font-black text-[#2E7D32]">{anim.produceItem.name}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#C5E1A5]/40 flex items-center justify-between">
                    <span className="text-xs font-black text-[#E65100] flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      {anim.cost} 🪙
                    </span>

                    <button
                      onClick={() => buyShopItem('animal', anim.id, anim.cost)}
                      disabled={isLocked || !canAfford}
                      className="px-3.5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isLocked ? t.locked : t.adoptAnimal}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* Buildings */}
          {activeTab === 'buildings' &&
            buildings.map((b) => {
              const isLocked = studentProfile.level < b.unlockLevel;
              const canAfford = studentProfile.coins >= b.cost;

              return (
                <div
                  key={b.id}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col justify-between transition-all ${
                    isLocked
                      ? 'border-[#C5E1A5]/60 bg-[#F1F8E9]/60 opacity-80'
                      : 'border-[#C5E1A5] hover:border-[#2E7D32] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-3xl shadow-2xs">
                        {b.icon}
                      </div>
                      {isLocked ? (
                        <span className="bg-stone-200 text-[#4E342E] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.level} {b.unlockLevel}
                        </span>
                      ) : (
                        <span className="bg-[#DCEDC8] text-[#2E4018] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#C5E1A5]">
                          ⭐ {t.shopBuildings}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-[#2E4018]">{b.name}</h4>
                    <p className="text-xs text-[#4E342E] font-medium mt-0.5 leading-relaxed line-clamp-2">
                      {b.description}
                    </p>

                    <div className="p-2 bg-[#F1F8E9] border border-[#C5E1A5] rounded-xl mt-2 text-[10px] font-black text-[#2E4018]">
                      ⭐ {b.perk}
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#C5E1A5]/40 flex items-center justify-between">
                    <span className="text-xs font-black text-[#E65100] flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      {b.cost} 🪙
                    </span>

                    <button
                      onClick={() => buyShopItem('building', b.id, b.cost)}
                      disabled={isLocked || !canAfford}
                      className="px-3.5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isLocked ? t.locked : t.constructBuilding}
                    </button>
                  </div>
                </div>
              );
            })}

          {/* Decorations */}
          {activeTab === 'decor' &&
            decorations.map((d) => {
              const isLocked = studentProfile.level < d.unlockLevel;
              const canAfford = studentProfile.coins >= d.cost;

              return (
                <div
                  key={d.id}
                  className={`bg-white rounded-2xl border-2 p-4 flex flex-col justify-between transition-all ${
                    isLocked
                      ? 'border-[#C5E1A5]/60 bg-[#F1F8E9]/60 opacity-80'
                      : 'border-[#C5E1A5] hover:border-[#2E7D32] hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-3xl shadow-2xs">
                        {d.icon}
                      </div>
                      {isLocked ? (
                        <span className="bg-stone-200 text-[#4E342E] text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {t.level} {d.unlockLevel}
                        </span>
                      ) : (
                        <span className="bg-[#DCEDC8] text-[#2E4018] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#C5E1A5]">
                          +{d.charmBonus} ✨
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-[#2E4018]">{d.name}</h4>
                    <p className="text-xs text-[#4E342E] font-medium mt-0.5 leading-relaxed line-clamp-2">
                      {d.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#C5E1A5]/40 flex items-center justify-between">
                    <span className="text-xs font-black text-[#E65100] flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      {d.cost} 🪙
                    </span>

                    <button
                      onClick={() => buyShopItem('decor', d.id, d.cost)}
                      disabled={isLocked || !canAfford}
                      className="px-3.5 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] disabled:opacity-40 text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isLocked ? t.locked : t.placeDecor}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
