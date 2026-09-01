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
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound } from '../utils/audio';

interface MarketViewProps {
  upgrades: MarketUpgrade[];
  userStats: UserStats;
  onBuyUpgrade: (upgradeId: string) => void;
  onSellCrop: (cropKey: string, quantity: number) => void;
  onBuySeed: (cropKey: CropType, quantity: number) => void;
  lang: 'ar' | 'en';
  isModal?: boolean;
  onClose?: () => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  upgrades,
  userStats,
  onBuyUpgrade,
  onSellCrop,
  onBuySeed,
  lang,
  isModal = false,
  onClose,
}) => {
  const isAr = lang === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'seeds' | 'upgrades' | 'dinars'>('seeds');

  const handleBuySeed = (cropKey: CropType, cost: number) => {
    if (userStats.coins < cost) {
      playPopSound();
      return;
    }
    playCoinSound();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#22c55e', '#eab308'],
    });
    onBuySeed(cropKey, 1);
  };

  const handleBuyUpgrade = (upgrade: MarketUpgrade) => {
    if (userStats.coins < upgrade.cost || upgrade.level >= upgrade.maxLevel) {
      playPopSound();
      return;
    }
    playCoinSound();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#34d399'],
    });
    onBuyUpgrade(upgrade.id);
  };

  const content = (
    <div id="market-trading-hub" className="space-y-5 text-slate-100" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Market Header */}
      <div className="bg-gradient-to-r from-amber-950/90 via-emerald-950/80 to-slate-900 border-2 border-emerald-500/40 p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              {isAr ? 'بازار المزارع الذكي • Impact Hub Egypt' : 'Smart Farmer Bazaar • Impact Hub Egypt'}
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">
            {isAr ? 'المتجر والتقنيات الزراعية الخضراء' : 'Organic Market & Green Tech'}
          </h2>
          <p className="text-xs text-emerald-200/80 max-w-xl">
            {isAr
              ? 'اشترِ بذور المحاصيل العالية الإنتاج، واستثمر في مضخات الطاقة الشمسية وشبكات الري بالتنقيط الحديثة!'
              : 'Purchase high-yield seeds and invest in eco-friendly solar pumps & precision drip irrigation!'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border-2 border-amber-400/80 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">
                {isAr ? 'رصيد الذهب' : 'Coin Vault'}
              </div>
              <div className="text-sm font-black text-amber-300">{userStats.coins} 🪙</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border-2 border-emerald-400/80 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
            <span className="text-lg">💵</span>
            <div>
              <div className="text-[10px] text-slate-400 font-medium">
                {isAr ? 'الدنانير' : 'Dinars'}
              </div>
              <div className="text-sm font-black text-emerald-300">{userStats.dinars}</div>
            </div>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            playPopSound();
            setActiveSubTab('seeds');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
            activeSubTab === 'seeds'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          {isAr ? 'بذور المحاصيل 🌱' : 'Buy Seeds 🌱'}
        </button>

        <button
          onClick={() => {
            playPopSound();
            setActiveSubTab('upgrades');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all border ${
            activeSubTab === 'upgrades'
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          {isAr ? 'ترقيات المزرعة والطاقة الشمسية ⚡' : 'Farm & Solar Tech ⚡'}
        </button>
      </div>

      {/* Tab 1: Seeds Store */}
      {activeSubTab === 'seeds' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(Object.keys(CROPS_DATA) as CropType[]).map((cropKey) => {
            const crop = CROPS_DATA[cropKey];
            const currentOwned = userStats.seedsInventory[cropKey] || 0;
            const canAfford = userStats.coins >= crop.seedCost;

            return (
              <div
                key={cropKey}
                className="p-4 rounded-3xl bg-slate-900/80 border-2 border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{crop.iconEmoji}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      {isAr ? `لديك: ×${currentOwned}` : `Owned: ×${currentOwned}`}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-sm text-white">{isAr ? crop.nameAr : crop.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{isAr ? crop.factAr : crop.fact}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>{crop.seedCost} 🪙</span>
                  </div>

                  <button
                    onClick={() => handleBuySeed(cropKey, crop.seedCost)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 ${
                      canAfford
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {isAr ? 'شراء +1' : 'Buy 1'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Farm & Solar Upgrades */}
      {activeSubTab === 'upgrades' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upgrades.map((upgrade) => {
            const isMax = upgrade.level >= upgrade.maxLevel;
            const canAfford = userStats.coins >= upgrade.cost && !isMax;

            return (
              <div
                key={upgrade.id}
                className="p-4 rounded-3xl bg-slate-900/80 border-2 border-slate-800 hover:border-amber-500/40 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">
                      {upgrade.icon === 'Droplets' && '💧'}
                      {upgrade.icon === 'Sun' && '☀️'}
                      {upgrade.icon === 'Sparkles' && '✨'}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black border border-amber-500/30">
                      {isAr ? `المستوى ${upgrade.level}/${upgrade.maxLevel}` : `Level ${upgrade.level}/${upgrade.maxLevel}`}
                    </span>
                  </div>

                  <h3 className="font-black text-sm text-white">{isAr ? upgrade.nameAr : upgrade.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{isAr ? upgrade.descriptionAr : upgrade.description}</p>

                  <div className="mt-3 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? upgrade.bonusTextAr : upgrade.bonusText}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-black text-amber-300 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMax ? (isAr ? 'الحد الأقصى' : 'Maxed') : `${upgrade.cost} 🪙`}</span>
                  </div>

                  <button
                    onClick={() => handleBuyUpgrade(upgrade)}
                    disabled={!canAfford}
                    className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all active:scale-95 ${
                      isMax
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700 cursor-default'
                        : canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {isMax ? (isAr ? 'مكتمل ✓' : 'Maxed ✓') : isAr ? 'ترقية الآن ⬆️' : 'Upgrade ⬆️'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
        <div className="bg-slate-950 border-2 border-emerald-500/40 rounded-3xl w-full max-w-4xl p-5 shadow-2xl overflow-y-auto max-h-[90vh]">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
