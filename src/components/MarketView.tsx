import React, { useState } from 'react';
import { MarketUpgrade, UserStats, CropType } from '../types';
import { CROPS_DATA } from '../data/initialData';
import {
  ShoppingBag,
  Coins,
  ArrowUpCircle,
  Zap,
  Droplets,
  Sparkles,
  Warehouse,
  Sun,
  Sprout,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarketViewProps {
  upgrades: MarketUpgrade[];
  userStats: UserStats;
  onBuyUpgrade: (upgradeId: string) => void;
  onSellCrop: (cropKey: string, quantity: number) => void;
  onBuySeed: (cropKey: CropType, quantity: number) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  upgrades,
  userStats,
  onBuyUpgrade,
  onSellCrop,
  onBuySeed,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sell' | 'seeds' | 'upgrades'>('sell');

  const handleSellAll = (cropKey: string, quantity: number) => {
    if (quantity <= 0) return;
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#eab308', '#22c55e', '#3b82f6'],
    });
    onSellCrop(cropKey, quantity);
  };

  return (
    <div id="market-trading-hub" className="space-y-6">
      {/* Market Header */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-900/60 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Impact Hub Farmer’s Bazaar
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1.5">Organic Market & Green Tech</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Trade your fresh organic harvests for gold coins and invest in eco-friendly agricultural technology.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/40 p-4 rounded-xl flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
            🪙
          </div>
          <div>
            <div className="text-xs text-slate-400">Student Farm Vault</div>
            <div className="text-lg font-extrabold text-amber-400">{userStats.coins} Coins</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          id="tab-market-sell"
          onClick={() => setActiveSubTab('sell')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeSubTab === 'sell'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Sell Harvest Produce
        </button>
        <button
          id="tab-market-seeds"
          onClick={() => setActiveSubTab('seeds')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeSubTab === 'seeds'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Buy Seeds
        </button>
        <button
          id="tab-market-upgrades"
          onClick={() => setActiveSubTab('upgrades')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeSubTab === 'upgrades'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Green Tech & Solar Upgrades
        </button>
      </div>

      {/* View 1: Sell Harvest Produce */}
      {activeSubTab === 'sell' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(CROPS_DATA) as CropType[]).map((cropKey) => {
            const crop = CROPS_DATA[cropKey];
            const inStock = userStats.harvestInventory[cropKey] || 0;
            const totalValue = inStock * crop.sellPrice;

            return (
              <div
                key={cropKey}
                id={`sell-item-${cropKey}`}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
                      {crop.iconEmoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{crop.name}</h3>
                      <p className="text-xs text-amber-400 font-semibold">{crop.sellPrice} 🪙 per unit</p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      inStock > 0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {inStock} in Silo
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-400">
                    Est. Value: <strong className="text-white">{totalValue} 🪙</strong>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      id={`btn-sell-one-${cropKey}`}
                      onClick={() => handleSellAll(cropKey, 1)}
                      disabled={inStock < 1}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 transition-colors"
                    >
                      Sell 1
                    </button>
                    <button
                      id={`btn-sell-all-${cropKey}`}
                      onClick={() => handleSellAll(cropKey, inStock)}
                      disabled={inStock < 1}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20 transition-all active:scale-95"
                    >
                      Sell All
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 2: Buy Seeds */}
      {activeSubTab === 'seeds' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(CROPS_DATA) as CropType[]).map((cropKey) => {
            const crop = CROPS_DATA[cropKey];
            const currentOwned = userStats.seedsInventory[cropKey] || 0;

            return (
              <div
                key={cropKey}
                id={`buy-seed-${cropKey}`}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
                      {crop.iconEmoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{crop.name} Seed</h3>
                      <p className="text-xs text-amber-400 font-semibold">{crop.seedCost} 🪙 per seed</p>
                    </div>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    Owned: {currentOwned}
                  </span>
                </div>

                <p className="text-xs text-slate-400 my-3 line-clamp-2">
                  {crop.fact}
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400">
                    Growth: <strong className="text-emerald-400">{crop.growthTimeSeconds}s</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      id={`btn-buy-seed-1-${cropKey}`}
                      onClick={() => onBuySeed(cropKey, 1)}
                      disabled={userStats.coins < crop.seedCost}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Buy 1
                    </button>
                    <button
                      id={`btn-buy-seed-5-${cropKey}`}
                      onClick={() => onBuySeed(cropKey, 5)}
                      disabled={userStats.coins < crop.seedCost * 5}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
                    >
                      Buy 5 ({crop.seedCost * 5} 🪙)
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View 3: Green Tech & Solar Upgrades */}
      {activeSubTab === 'upgrades' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upgrades.map((upgrade) => {
            const isMaxed = upgrade.level >= upgrade.maxLevel;
            const canAfford = userStats.coins >= upgrade.cost;

            return (
              <div
                key={upgrade.id}
                id={`upgrade-card-${upgrade.id}`}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
                        {upgrade.category === 'Irrigation' ? (
                          <Droplets className="w-6 h-6 text-cyan-400" />
                        ) : upgrade.category === 'Green Tech' ? (
                          <Sun className="w-6 h-6 text-amber-400" />
                        ) : upgrade.category === 'Soil Science' ? (
                          <Sparkles className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Warehouse className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                          {upgrade.category}
                        </span>
                        <h3 className="text-base font-bold text-white">{upgrade.name}</h3>
                      </div>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      Tier {upgrade.level}/{upgrade.maxLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 my-3 leading-relaxed">
                    {upgrade.description}
                  </p>

                  <div className="bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    {upgrade.bonusText}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Upgrade Cost: <strong className="text-amber-400 font-bold">{upgrade.cost} 🪙</strong>
                  </span>

                  <button
                    id={`btn-upgrade-${upgrade.id}`}
                    onClick={() => onBuyUpgrade(upgrade.id)}
                    disabled={isMaxed || !canAfford}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                      isMaxed
                        ? 'bg-slate-800 text-slate-500 cursor-default'
                        : canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <ArrowUpCircle className="w-4 h-4" />
                    {isMaxed ? 'Max Level Reached' : `Install Upgrade (${upgrade.cost} 🪙)`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
