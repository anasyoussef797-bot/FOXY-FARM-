import React from 'react';
import { UserStats } from '../types';
import { CROPS_DATA } from '../data/initialData';
import { Package, X, Coins, TrendingUp, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCoinSound, playPopSound } from '../utils/audio';

interface StorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onSellItem: (itemName: string, count: number, pricePerUnit: number) => void;
  onSellAll: () => void;
  lang: 'ar' | 'en';
}

export const StorageModal: React.FC<StorageModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onSellItem,
  onSellAll,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  // Calculate prices
  const getItemInfo = (name: string) => {
    // Check crops
    for (const key of Object.keys(CROPS_DATA)) {
      const crop = CROPS_DATA[key as keyof typeof CROPS_DATA];
      if (crop.name === name || crop.nameAr === name || crop.id === name) {
        return {
          displayName: isAr ? crop.nameAr : crop.name,
          emoji: crop.iconEmoji,
          sellPrice: crop.sellPrice,
          category: isAr ? 'محصول طازج' : 'Fresh Crop',
        };
      }
    }
    // Animal items
    if (name.includes('Milk') || name.includes('حليب')) {
      return { displayName: isAr ? 'حليب عضوي طازج' : 'Fresh Organic Milk', emoji: '🥛', sellPrice: 45, category: isAr ? 'منتج حيواني' : 'Animal Product' };
    }
    if (name.includes('Egg') || name.includes('بيض')) {
      return { displayName: isAr ? 'بيض بلدي طازج' : 'Golden Baladi Egg', emoji: '🥚', sellPrice: 35, category: isAr ? 'منتج حيواني' : 'Animal Product' };
    }
    if (name.includes('Wool') || name.includes('صوف')) {
      return { displayName: isAr ? 'صوف دافئ ونقي' : 'Warm Soft Wool', emoji: '🍀', sellPrice: 60, category: isAr ? 'منتج حيواني' : 'Animal Product' };
    }
    if (name.includes('Fertilizer') || name.includes('سماد')) {
      return { displayName: isAr ? 'سماد عضوي مغذي' : 'Organic Fertilizer', emoji: '✨', sellPrice: 25, category: isAr ? 'مغذي تربة' : 'Soil Nutrient' };
    }
    return { displayName: name, emoji: '📦', sellPrice: 20, category: isAr ? 'عنصر' : 'Item' };
  };

  const inventoryEntries = Object.entries(userStats.harvestInventory).filter(([, count]) => count > 0);
  const totalItems = inventoryEntries.reduce((acc, [, count]) => acc + count, 0);
  const totalValue = inventoryEntries.reduce((acc, [name, count]) => {
    const info = getItemInfo(name);
    return acc + info.sellPrice * count;
  }, 0);

  const handleSell = (name: string, count: number, price: number) => {
    playCoinSound();
    onSellItem(name, count, price);
  };

  const handleSellAllWithConfetti = () => {
    if (totalItems === 0) return;
    playCoinSound();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#eab308', '#f59e0b', '#10b981'],
    });
    onSellAll();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[85vh]"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-amber-700/30 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl shadow-inner">
              🗄️
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-amber-200 flex items-center gap-2">
                {isAr ? 'المخزن والصوامع' : 'Barn Silo & Storage'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 font-bold border border-amber-400/40">
                  {totalItems} {isAr ? 'عنصر' : 'Items'}
                </span>
              </h2>
              <p className="text-xs text-amber-300/80 font-medium">
                {isAr
                  ? 'قم بإدارة وبيع المحاصيل والمنتجات الحيوانية لكسب الذهب والدنانير!'
                  : 'Manage and sell your harvested crops and animal products for coins!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Bar */}
        <div className="px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              {isAr ? 'إجمالي سعة التخزين:' : 'Total Silo Capacity:'}{' '}
              <strong className="text-white">{totalItems} / 250</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span>{isAr ? 'القيمة الكلية:' : 'Total Value:'}</span>
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{totalValue}</span>
            </div>

            {totalItems > 0 && (
              <button
                onClick={handleSellAllWithConfetti}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{isAr ? 'بيع الكل دفعة واحدة' : 'Sell All for Coins'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {inventoryEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🌾</div>
              <h4 className="text-base font-bold text-slate-300">
                {isAr ? 'المخزن فارغ حالياً!' : 'Your Barn Silo is Empty!'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                {isAr
                  ? 'قم بحصاد المحاصيل من الحقول أو جمع الحليب والبيض من حيوانات الحظيرة لملء المخزن.'
                  : 'Harvest crops from your plots or collect fresh milk & eggs from farm animals to stock up.'}
              </p>
            </div>
          ) : (
            inventoryEntries.map(([name, count]) => {
              const info = getItemInfo(name);
              const singlePrice = info.sellPrice;
              const stackPrice = singlePrice * count;

              return (
                <div
                  key={name}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-sm">
                      {info.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{info.displayName}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium border border-slate-700">
                          {info.category}
                        </span>
                        <span>
                          {isAr ? 'السعر للوحدة:' : 'Price each:'}{' '}
                          <strong className="text-amber-300">{singlePrice} 🪙</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300">
                        {isAr ? 'الكمية:' : 'Qty:'} <span className="text-emerald-400 font-extrabold text-sm">×{count}</span>
                      </div>
                      <div className="text-[11px] text-amber-400 font-semibold flex items-center justify-end gap-1">
                        <Coins className="w-3 h-3" />
                        <span>+{stackPrice}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSell(name, 1, singlePrice)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 transition-colors"
                        title={isAr ? 'بيع وحدة واحدة' : 'Sell 1'}
                      >
                        {isAr ? 'بيع 1' : 'Sell 1'}
                      </button>
                      <button
                        onClick={() => handleSell(name, count, singlePrice)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold shadow-sm active:scale-95 transition-all"
                        title={isAr ? 'بيع كل الكمية' : 'Sell Stack'}
                      >
                        {isAr ? 'بيع الكل' : 'Sell All'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>
              {isAr
                ? 'نصيحة: ترقية الصومعة في المتجر تزيد من سعة التخزين وأرباح المبيعات!'
                : 'Tip: Upgrading Silo in Market increases storage capacity & sales value!'}
            </span>
          </div>
          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
