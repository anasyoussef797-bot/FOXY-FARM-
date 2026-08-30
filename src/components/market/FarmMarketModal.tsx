import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { Coins, Sparkles, X, ArrowRight, TrendingUp, PackageOpen } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface FarmMarketModalProps {
  onClose: () => void;
}

export const FarmMarketModal: React.FC<FarmMarketModalProps> = ({ onClose }) => {
  const { studentProfile, sellInventoryItem, triggerCelebration } = useGame();
  const { t, isRTL } = useTranslation();

  // Sellable items: produce and animal products
  const sellableItems = studentProfile.inventory.filter(
    (item) => (item.type === 'produce' || item.type === 'animal_product') && item.quantity > 0
  );

  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    sellableItems.length > 0 ? sellableItems[0].id : null
  );
  const [sellQty, setSellQty] = useState<number>(1);

  const activeItem = sellableItems.find((i) => i.id === selectedItemId) || sellableItems[0] || null;

  // Set quantity safely when activeItem changes
  const maxQty = activeItem ? activeItem.quantity : 1;
  const currentSellQty = Math.min(sellQty, maxQty);

  const totalEarnings = activeItem ? activeItem.sellPrice * currentSellQty : 0;
  const totalXPEarnings = activeItem ? currentSellQty * 4 : 0;

  const handleSell = () => {
    if (!activeItem || currentSellQty <= 0) return;
    const success = sellInventoryItem(activeItem.id, currentSellQty);
    if (success) {
      soundEngine.playCoin();
      triggerCelebration();
      setSellQty(1);
    }
  };

  const handleSellAllItem = (itemId: string, qty: number) => {
    const success = sellInventoryItem(itemId, qty);
    if (success) {
      soundEngine.playCoin();
      triggerCelebration();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#FDD835] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#2E7D32] via-[#388E3C] to-[#1B5E20] px-5 py-4 flex items-center justify-between text-white border-b-2 border-[#FDD835]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-[#FDD835] to-[#FFF9C4] text-amber-950 border-2 border-white flex items-center justify-center text-2xl shadow-md">
              💰
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{t.marketTitle}</span>
              </h2>
              <p className="text-xs font-semibold text-[#E8F5E9]">
                {t.marketSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/25 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 font-black text-sm text-[#FFEE58] border border-white/20">
              <Coins className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>{studentProfile.coins.toLocaleString()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-black/20 hover:bg-black/40 text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#F1F8E9]/40 space-y-4">
          {sellableItems.length === 0 ? (
            <div className="py-14 text-center text-[#558B2F]">
              <PackageOpen className="w-16 h-16 mx-auto mb-3 opacity-50 text-[#388E3C]" />
              <h3 className="text-base font-black text-[#2E4018]">{t.noSellableItems}</h3>
              <p className="text-xs font-medium text-[#5D4037] mt-1 max-w-md mx-auto leading-relaxed">
                {t.noSellableItemsDesc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left Column: List of stored harvested crops & goods */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                <div className="text-xs font-black text-[#2E4018] px-1 flex items-center justify-between">
                  <span>{t.sellCropPrompt}</span>
                  <span className="text-[10px] text-[#558B2F]">({sellableItems.length})</span>
                </div>

                {sellableItems.map((item) => {
                  const isSelected = activeItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setSellQty(1);
                      }}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-[#E8F5E9] border-[#2E7D32] shadow-md scale-[1.02]'
                          : 'bg-white border-[#C5E1A5] hover:border-[#81C784] hover:bg-[#F1F8E9]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-[#2E4018] truncate">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] font-bold text-[#689F38]">
                            <span>{t.itemQuantity} <strong className="text-[#2E4018]">{item.quantity}</strong></span>
                            <span>•</span>
                            <span>{item.sellPrice} 🪙 / {t.unitValue}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSellAllItem(item.id, item.quantity);
                          }}
                          title={t.sellAll}
                          className="px-2 py-1 bg-[#DCEDC8] hover:bg-[#C5E1A5] text-[#2E4018] font-black text-[10px] rounded-lg border border-[#A5D6A7] transition-colors cursor-pointer"
                        >
                          {t.sellAll} (+{item.sellPrice * item.quantity}🪙)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Selected Item Sell Transaction Box */}
              {activeItem && (
                <div className="bg-white rounded-3xl border-2 border-[#81C784] p-4 sm:p-5 flex flex-col justify-between shadow-sm space-y-4">
                  <div>
                    {/* Item Spotlight */}
                    <div className="flex items-center gap-3 pb-3 border-b border-[#E0E0E0]">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-[#FFF9C4] to-[#FFE082] border-2 border-[#FDD835] flex items-center justify-center text-3xl shadow-sm">
                        {activeItem.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#2E4018]">{activeItem.name}</h3>
                        <p className="text-xs font-bold text-[#689F38]">
                          {t.owned} {activeItem.quantity} {activeItem.type === 'produce' ? '🌾' : '🥛'}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Picker */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black text-[#2E4018]">
                        <span>{t.sellQuantity}</span>
                        <span className="font-mono text-sm text-[#2E7D32]">{currentSellQty} / {activeItem.quantity}</span>
                      </div>

                      {/* Slider */}
                      <input
                        type="range"
                        min={1}
                        max={activeItem.quantity}
                        value={currentSellQty}
                        onChange={(e) => setSellQty(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-[#DCEDC8] rounded-lg appearance-none cursor-pointer accent-[#2E7D32]"
                      />

                      {/* Quick Qty Buttons */}
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {[1, 5, 10, activeItem.quantity].map((amount, idx) => {
                          if (amount > activeItem.quantity && idx < 3) return null;
                          return (
                            <button
                              key={idx}
                              onClick={() => setSellQty(Math.min(amount, activeItem.quantity))}
                              className={`py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                currentSellQty === amount
                                  ? 'bg-[#2E7D32] text-white shadow-xs'
                                  : 'bg-[#F1F8E9] text-[#2E4018] hover:bg-[#DCEDC8] border border-[#C5E1A5]'
                              }`}
                            >
                              {idx === 3 ? t.sellAll : amount}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Calculated Earnings Box */}
                    <div className="mt-4 p-3 bg-linear-to-r from-[#FFFDE7] to-[#FFF9C4] rounded-2xl border-2 border-[#FFEE58] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#5D4037]">{t.earnCoins}</span>
                        <div className="text-xl font-black text-[#E65100] flex items-center gap-1.5">
                          <span>+{totalEarnings.toLocaleString()}</span>
                          <span className="text-base">🪙</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-[#558B2F]">XP Bonus</span>
                        <div className="text-xs font-black text-[#2E7D32]">+{totalXPEarnings} XP</div>
                      </div>
                    </div>
                  </div>

                  {/* Sell Button */}
                  <button
                    onClick={handleSell}
                    className="w-full py-3 bg-linear-to-r from-[#FDD835] via-[#FFD54F] to-[#FFA000] hover:brightness-105 text-amber-950 font-black text-sm rounded-2xl border-2 border-white shadow-[0_4px_12px_rgba(253,216,53,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.02] active:scale-98"
                  >
                    <Coins className="w-5 h-5 text-amber-900 fill-amber-900" />
                    <span>{t.sellSelected} (+{totalEarnings} 🪙)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
