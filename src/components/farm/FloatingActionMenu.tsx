import React, { useState } from 'react';
import { FarmTile, InventoryItem } from '../../types';
import { CROPS_CONFIG, ANIMALS_CONFIG, BUILDINGS_CONFIG } from '../../data/gameConfigs';
import { useTranslation } from '../../i18n';
import {
  Droplets,
  Lock,
  Sparkles,
  Sprout,
  X,
  Zap,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Shovel,
} from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface FloatingActionMenuProps {
  tile: FarmTile;
  screenPos: { x: number; y: number };
  inventory: InventoryItem[];
  selectedSeedId: string | null;
  onPlant: (tileId: string, cropId: string) => void;
  onWater: (tileId: string) => void;
  onHarvest: (tileId: string) => void;
  onFeedAnimal: (tileId: string) => void;
  onPlow: (tileId: string) => void;
  onUnlockLand: (tileId: string) => void;
  onSelectSeed: (seedId: string) => void;
  onOpenShop: () => void;
  onClose: () => void;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({
  tile,
  screenPos,
  inventory,
  selectedSeedId,
  onPlant,
  onWater,
  onHarvest,
  onFeedAnimal,
  onPlow,
  onUnlockLand,
  onSelectSeed,
  onOpenShop,
  onClose,
}) => {
  const { t, isRTL, language } = useTranslation();
  const isArabic = language === 'ar';
  const [showSeedPicker, setShowSeedPicker] = useState<boolean>(false);

  const crop = tile.cropId ? CROPS_CONFIG[tile.cropId] : null;
  const animal = tile.animalId ? ANIMALS_CONFIG[tile.animalId] : null;
  const building = tile.buildingId ? BUILDINGS_CONFIG[tile.buildingId] : null;

  // Filter owned seeds in inventory
  const ownedSeeds = inventory.filter((i) => i.type === 'seed' && i.quantity > 0);

  const isSoil = tile.type === 'soil';
  const isLocked = !!tile.isLocked;
  const isPlanted = tile.status === 'planted';
  const isWatered = tile.status === 'watered' || (tile.wateredAt && tile.status === 'planted');
  const isReady = tile.status === 'ready';
  const isEmptySoil = isSoil && tile.status === 'empty';
  const isGrass = tile.type === 'grass' && !isLocked && !animal && !building;

  // Best active seed to plant
  const activeSeed = selectedSeedId
    ? ownedSeeds.find((s) => s.referenceId === selectedSeedId) || ownedSeeds[0]
    : ownedSeeds[0];

  return (
    <div
      className="absolute z-50 transition-all duration-200 select-none"
      style={{
        left: `${screenPos.x}px`,
        top: `${screenPos.y - 125}px`,
        transform: 'translateX(-50%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Container Card with Warm Farm Wood & Gold Border */}
      <div className="bg-linear-to-b from-[#2E7D32]/95 via-[#1B5E20]/95 to-[#0A3311]/95 backdrop-blur-md text-white border-2 border-[#FDD835] rounded-3xl p-3 shadow-[0_12px_36px_rgba(0,0,0,0.55)] min-w-[240px] max-w-[300px] flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between border-b border-white/20 pb-1.5 px-1">
          <div className="flex items-center gap-1.5 font-black text-xs text-[#FFF9C4]">
            {isLocked && <span>🌲 {isArabic ? 'أرض جديدة للتوسعة' : 'New Land Plot'}</span>}
            {isEmptySoil && <span>🌱 {isArabic ? 'أرض محروثة جاهزة' : 'Tilled Plot Ready'}</span>}
            {isPlanted && <span>🌿 {crop?.name || (isArabic ? 'محصول ينمو' : 'Growing')}</span>}
            {isReady && <span>🌾 {isArabic ? 'محصول ناضج للحصاد!' : 'Ready to Harvest!'}</span>}
            {animal && <span>{animal.icon} {animal.name}</span>}
            {building && <span>{building.icon} {building.name}</span>}
            {isGrass && <span>🌿 {isArabic ? 'أرض عشبية خضراء' : 'Grass Meadow'}</span>}
          </div>

          <button
            onClick={onClose}
            className="w-5 h-5 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1. LOCKED WILDERNESS PLOT */}
        {isLocked && (
          <div className="w-full flex flex-col items-center gap-2 py-1 text-center">
            <div className="text-[11px] text-[#E8F5E9] font-bold">
              {isArabic
                ? 'توسيع المزرعة متاح الآن! انقر لتنظيف هذه الأرض وزراعتها فوراً!'
                : 'Free land expansion! Click to expand and cultivate this land!'}
            </div>
            <button
              onClick={() => {
                onUnlockLand(tile.id);
                onClose();
              }}
              className="w-full py-2 bg-linear-to-r from-[#76FF03] via-[#64DD17] to-[#00E676] hover:brightness-110 text-slate-950 font-black text-xs rounded-xl border border-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-950 stroke-[3]" />
              <span>{isArabic ? 'توسيع وفتح الأرض الآن ✨' : 'Expand Land Plot ✨'}</span>
            </button>
          </div>
        )}

        {/* 2. GRASS PLOT (CAN BE PLOWED INTO FERTILE SOIL) */}
        {isGrass && (
          <div className="w-full flex flex-col items-center gap-2 py-1">
            <div className="text-[11px] text-[#E8F5E9] font-bold text-center">
              {isArabic
                ? 'احرث هذه الأرض العشبية وحولها لتربة مضلعة صالحة للزراعة!'
                : 'Plow this grass meadow into fertile tilled soil!'}
            </div>
            <button
              onClick={() => {
                soundEngine.playPlant();
                onPlow(tile.id);
                onClose();
              }}
              className="w-full py-2 bg-linear-to-r from-[#8D6E63] via-[#A1887F] to-[#5D4037] hover:brightness-110 text-white font-black text-xs rounded-xl border-2 border-[#FFE082] shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span>⛏️</span>
              <span>{isArabic ? 'حراثة التربة (2 ⚡)' : 'Plow Soil (2 ⚡)'}</span>
            </button>
          </div>
        )}

        {/* 3. EMPTY TILLED SOIL (DIRECT 1-CLICK PLANT OR SEED PICKER) */}
        {isEmptySoil && !showSeedPicker && (
          <div className="w-full flex flex-col gap-2">
            {/* Quick 1-Click Plant Active Seed */}
            {activeSeed ? (
              <button
                onClick={() => {
                  soundEngine.playPlant();
                  onPlant(tile.id, activeSeed.referenceId);
                  onClose();
                }}
                className="w-full py-2.5 bg-linear-to-r from-[#76FF03] via-[#64DD17] to-[#00E676] hover:brightness-110 text-slate-950 font-black text-xs rounded-xl border-2 border-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-lg">{activeSeed.icon}</span>
                <span>
                  {isArabic ? `ازرع ${activeSeed.name} (باقي ${activeSeed.quantity})` : `Plant ${activeSeed.name} (${activeSeed.quantity} left)`}
                </span>
              </button>
            ) : (
              <div className="bg-black/30 p-2 rounded-xl text-center">
                <p className="text-xs text-amber-200 font-bold mb-1.5">
                  {isArabic ? 'لا توجد بذور في المخزن!' : 'No seeds available!'}
                </p>
                <button
                  onClick={() => {
                    onOpenShop();
                    onClose();
                  }}
                  className="w-full py-1.5 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-105"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'شراء بذور من المتجر' : 'Buy Seeds from Shop'}</span>
                </button>
              </div>
            )}

            {/* Choose Different Seed Button */}
            {ownedSeeds.length > 1 && (
              <button
                onClick={() => setShowSeedPicker(true)}
                className="w-full py-1.5 bg-[#3E2723] hover:bg-[#4E342E] text-[#FFF9C4] font-black text-xs rounded-xl border border-amber-300/40 flex items-center justify-center gap-1 cursor-pointer transition-transform hover:scale-103"
              >
                <span>🌾</span>
                <span>{isArabic ? 'اختر بذرة أخرى...' : 'Choose different seed...'}</span>
              </button>
            )}

            {/* Water Can */}
            {!isWatered && (
              <button
                onClick={() => {
                  soundEngine.playWater();
                  onWater(tile.id);
                  onClose();
                }}
                className="w-full py-1.5 bg-linear-to-r from-[#29B6F6] to-[#0288D1] hover:brightness-110 text-white font-black text-xs rounded-xl border border-white shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-103 active:scale-95"
              >
                <Droplets className="w-3.5 h-3.5 text-white" />
                <span>{isArabic ? 'سقاية التربة بالماء 💧' : 'Water Plot 💧'}</span>
              </button>
            )}
          </div>
        )}

        {/* 4. SEED PICKER GRID (WHEN USER CLICKS "اختر بذرة أخرى") */}
        {isEmptySoil && showSeedPicker && (
          <div className="w-full flex flex-col gap-2">
            <div className="text-[11px] font-black text-[#FFF9C4] flex items-center justify-between">
              <span>{isArabic ? 'اختر البذرة للزراعة:' : 'Select Seed:'}</span>
              <button
                onClick={() => setShowSeedPicker(false)}
                className="text-[10px] text-amber-300 hover:underline cursor-pointer"
              >
                {isArabic ? 'رجوع' : 'Back'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1">
              {ownedSeeds.map((seed) => (
                <button
                  key={seed.id}
                  onClick={() => {
                    soundEngine.playPlant();
                    onSelectSeed(seed.referenceId);
                    onPlant(tile.id, seed.referenceId);
                    onClose();
                  }}
                  className="bg-[#3E2723] hover:bg-[#4E342E] border-2 border-amber-300/60 hover:border-[#76FF03] rounded-xl p-1.5 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="text-xl">{seed.icon}</span>
                  <span className="text-[10px] font-black text-[#FFF9C4] truncate max-w-[65px]">
                    {seed.name}
                  </span>
                  <span className="text-[9px] font-bold bg-[#1B5E20] text-[#76FF03] px-1 rounded-full">
                    x{seed.quantity}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onOpenShop();
                onClose();
              }}
              className="w-full py-1 bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 font-black text-[10px] rounded-lg flex items-center justify-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>{isArabic ? 'متجر البذور' : 'Seed Shop'}</span>
            </button>
          </div>
        )}

        {/* 5. PLANTED GROWING CROP */}
        {isPlanted && crop && (
          <div className="w-full flex flex-col items-center gap-2 py-1">
            <div className="text-center">
              <span className="text-2xl">{crop.icon}</span>
              <p className="text-xs font-black text-[#FFF9C4] mt-0.5">{crop.name}</p>
              <p className="text-[10px] text-[#A5D6A7]">
                {isArabic ? `وقت النمو الكلي: ${crop.growthSeconds} ثانية` : `Growth Time: ${crop.growthSeconds}s`}
              </p>
            </div>

            {/* Water action if dry */}
            {!isWatered && (
              <button
                onClick={() => {
                  soundEngine.playWater();
                  onWater(tile.id);
                  onClose();
                }}
                className="w-full py-2 bg-linear-to-r from-[#29B6F6] via-[#03A9F4] to-[#0288D1] hover:brightness-110 text-white font-black text-xs rounded-xl border border-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <Droplets className="w-4 h-4 text-white" />
                <span>{isArabic ? 'سقي المحصول الآن 💧' : 'Water Crop Now 💧'}</span>
              </button>
            )}

            {isWatered && (
              <div className="w-full py-1 bg-cyan-900/60 border border-cyan-400/40 rounded-xl text-center text-[10px] text-cyan-200 font-bold flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-300" />
                <span>{isArabic ? 'التربة مروية بالماء ✨' : 'Crop is watered ✨'}</span>
              </div>
            )}
          </div>
        )}

        {/* 6. RIPE READY TO HARVEST */}
        {isReady && crop && (
          <div className="w-full flex flex-col items-center gap-2 py-1">
            <div className="text-center">
              <span className="text-3xl animate-bounce">{crop.icon}</span>
              <p className="text-xs font-black text-[#FFE082] mt-0.5">
                {isArabic ? `${crop.name} ناضج وجاهز!` : `${crop.name} Ready!`}
              </p>
              <p className="text-[10px] text-amber-200">
                +{Math.round(crop.sellPrice * 0.4)} 🪙 | +{crop.xpReward} XP
              </p>
            </div>

            <button
              onClick={() => {
                soundEngine.playHarvest();
                onHarvest(tile.id);
                onClose();
              }}
              className="w-full py-2.5 bg-linear-to-r from-[#FDD835] via-[#FFF176] to-[#FBC02D] hover:brightness-110 text-amber-950 font-black text-xs rounded-xl border-2 border-white shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95 animate-bounce"
            >
              <Sparkles className="w-4 h-4 text-[#E65100]" />
              <span>{isArabic ? 'حصاد المحصول الآن 🌾' : 'Harvest Crop Now 🌾'}</span>
            </button>
          </div>
        )}

        {/* 7. ANIMAL TILE */}
        {animal && (
          <div className="w-full flex flex-col items-center gap-2 py-1 text-center">
            <div className="text-3xl">{animal.icon}</div>
            <p className="text-xs font-black text-[#FFE082]">{animal.name}</p>
            <p className="text-[10px] text-[#C8E6C9]">
              {isArabic ? `ينتج: ${animal.produceItem.name}` : `Produces: ${animal.produceItem.name}`}
            </p>
            <button
              onClick={() => {
                soundEngine.playFeed();
                onFeedAnimal(tile.id);
                onClose();
              }}
              className="w-full py-2 bg-linear-to-r from-[#76FF03] to-[#00E676] hover:brightness-110 text-slate-950 font-black text-xs rounded-xl border border-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <span>🥕</span>
              <span>{isArabic ? `إطعام ورعاية (${animal.feedEnergyCost} ⚡)` : `Feed Animal (${animal.feedEnergyCost} ⚡)`}</span>
            </button>
          </div>
        )}

        {/* 8. BUILDING TILE */}
        {building && (
          <div className="w-full flex flex-col items-center gap-1.5 py-1 text-center">
            <div className="text-3xl">{building.icon}</div>
            <p className="text-xs font-black text-[#FFE082]">{building.name}</p>
            <p className="text-[10px] text-[#C8E6C9]">{building.description}</p>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="w-full py-1.5 bg-[#5D4037] hover:bg-[#6D4C41] text-[#FFE082] font-black text-xs rounded-xl border border-amber-300/40 cursor-pointer"
            >
              {isArabic ? 'إغلاق' : 'Close'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
