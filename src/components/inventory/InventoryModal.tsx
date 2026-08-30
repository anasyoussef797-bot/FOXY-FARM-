import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { CROPS_CONFIG } from '../../data/gameConfigs';
import { Coins, Package, Sparkles, X, Sprout } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface InventoryModalProps {
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const { studentProfile, sellInventoryItem, setSelectedSeedId, setIsMarketOpen } = useGame();
  const { t, language, isRTL } = useTranslation();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredItems = studentProfile.inventory.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const totalItemCount = studentProfile.inventory.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlantSeed = (referenceId?: string) => {
    if (referenceId) {
      setSelectedSeedId(referenceId);
      soundEngine.playClick();
      onClose();
    }
  };

  const handleOpenMarket = () => {
    onClose();
    setIsMarketOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E20]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-[#FDD835] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#2E7D32] via-[#388E3C] to-[#1B5E20] px-5 py-4 flex items-center justify-between text-white border-b-2 border-[#FDD835]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-[#FDD835] to-[#FFF9C4] text-amber-950 border-2 border-white flex items-center justify-center text-2xl shadow-md">
              📦
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{t.inventoryTitle}</span>
              </h2>
              <p className="text-xs font-semibold text-[#E8F5E9]">
                {totalItemCount} {t.inventorySubtitle}
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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-3 bg-[#F1F8E9] border-b border-[#C5E1A5] overflow-x-auto">
          {[
            { id: 'all', label: t.invAll },
            { id: 'seed', label: `🌱 ${t.invSeeds}` },
            { id: 'produce', label: `🌾 ${t.invProduce}` },
            { id: 'animal_product', label: `🥛 ${t.invGoods}` },
          ].map((tab) => {
            const isSelected = filterType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-white text-[#2E4018] hover:bg-[#DCEDC8] border border-[#C5E1A5]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 bg-[#F1F8E9]/30">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-[#558B2F]">
              <Package className="w-12 h-12 mx-auto mb-2 opacity-50 text-[#2E7D32]" />
              <p className="text-sm font-black text-[#2E4018]">{t.noItemsInStorage}</p>
              <p className="text-xs font-medium text-[#5D4037] mt-1">
                {t.harvestToFill}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const canSell = item.type === 'produce' || item.type === 'animal_product';
              const isSeed = item.type === 'seed';
              const isAr = language === 'ar';

              const cropConf = item.referenceId ? CROPS_CONFIG[item.referenceId] : null;
              let displayName = item.name;
              if (cropConf) {
                if (isSeed) {
                  displayName = isAr ? `بذور ${cropConf.name}` : `${cropConf.name} Seeds`;
                } else if (item.type === 'produce') {
                  displayName = isAr ? `${cropConf.name} محصود` : `Harvested ${cropConf.name}`;
                }
              } else if (item.referenceId === 'milk') {
                displayName = isAr ? 'حليب طازج' : 'Organic Milk';
              } else if (item.referenceId === 'egg') {
                displayName = isAr ? 'بيض ذهبي' : 'Golden Eggs';
              } else if (item.referenceId === 'wool') {
                displayName = isAr ? 'صوف ناعم' : 'Merino Wool';
              }

              return (
                <div
                  key={item.id}
                  className="bg-white hover:bg-[#F1F8E9]/80 rounded-2xl border-2 border-[#C5E1A5] p-3.5 flex items-center justify-between gap-3 shadow-2xs transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#FFF9C4] border border-[#FFEE58] flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-[#2E4018] truncate">{displayName}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-black text-[#2E4018] bg-[#DCEDC8] px-2 py-0.5 rounded-md border border-[#C5E1A5]">
                          {t.itemQuantity} {item.quantity}
                        </span>
                        <span className="text-[11px] font-bold text-[#689F38]">
                          {item.sellPrice} 🪙
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Action Button */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSeed && (
                      <button
                        onClick={() => handlePlantSeed(item.referenceId)}
                        className="px-3 py-1.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl shadow-[0_2px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer flex items-center gap-1"
                      >
                        <Sprout className="w-3.5 h-3.5" />
                        <span>{t.plant}</span>
                      </button>
                    )}

                    {canSell && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => sellInventoryItem(item.id, 1)}
                          className="px-2.5 py-1.5 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black text-[11px] rounded-xl shadow-[0_2px_0_#F57F17] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer"
                        >
                          {t.sell1} (+{item.sellPrice})
                        </button>
                        {item.quantity > 1 && (
                          <button
                            onClick={() => sellInventoryItem(item.id, item.quantity)}
                            className="px-2 py-1.5 bg-[#DCEDC8] hover:bg-[#C5E1A5] text-[#2E4018] font-black text-[10px] rounded-xl transition-colors cursor-pointer border border-[#A5D6A7]"
                          >
                            {t.sellAll}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
