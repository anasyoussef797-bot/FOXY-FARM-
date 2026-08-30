import React from 'react';
import { BUILDINGS_CONFIG } from '../../data/gameConfigs';

interface IsometricBuildingProps {
  buildingId: string;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  isArabic?: boolean;
}

export const IsometricBuilding: React.FC<IsometricBuildingProps> = ({
  buildingId,
  isSelected,
  onClick,
  isArabic = true,
}) => {
  const building = BUILDINGS_CONFIG[buildingId];
  if (!building) return null;

  return (
    <div
      onClick={onClick}
      className={`absolute select-none pointer-events-none flex flex-col items-center justify-center transition-transform duration-200 z-20 ${
        isSelected ? 'scale-105 filter drop-shadow-[0_0_15px_#FDD835]' : ''
      }`}
      style={{
        width: '130px',
        height: '120px',
        top: '-75px',
        left: '-10px',
      }}
    >
      {/* Building Ground Shadow */}
      <div className="absolute bottom-2 w-28 h-12 bg-black/40 rounded-full blur-xs pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. COZY FARMHOUSE (بيت المزرعة الخشبي الريفي الأنيق مع مدخنة وأزهار) */}
      {/* ========================================================================= */}
      {buildingId === 'farmhouse' && (
        <div className="relative w-30 h-30 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Animated Chimney Smoke Puffs */}
          <div className="absolute -top-3 right-7 flex flex-col items-center pointer-events-none">
            <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-smoke" style={{ animationDelay: '0s' }} />
            <div className="w-3.5 h-3.5 bg-white/60 rounded-full animate-smoke" style={{ animationDelay: '0.8s' }} />
            <div className="w-4 h-4 bg-white/40 rounded-full animate-smoke" style={{ animationDelay: '1.6s' }} />
          </div>

          {/* Chimney Pipe */}
          <div className="absolute top-4 right-8 w-4 h-8 bg-linear-to-b from-[#8D6E63] to-[#5D4037] border-2 border-[#3E2723] rounded-t-sm shadow-xs" />

          {/* Farmhouse Main Roof (Red Gable Roof with Overhang) */}
          <div className="relative w-26 h-16 bg-linear-to-b from-[#E53935] via-[#C62828] to-[#B71C1C] rounded-t-3xl border-2 border-[#8B0000] shadow-md flex items-center justify-center overflow-hidden">
            {/* Shingle Tiles Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_8px)]" />
            {/* Attic Circular Window */}
            <div className="w-6 h-6 bg-[#FFE082] rounded-full border-2 border-white shadow-inner flex items-center justify-center">
              <div className="w-full h-0.5 bg-[#8D6E63]" />
              <div className="h-full w-0.5 bg-[#8D6E63] absolute" />
            </div>
          </div>

          {/* Farmhouse Lower Story & Porch */}
          <div className="relative w-24 h-13 bg-linear-to-b from-[#FFF8E1] to-[#FFE082] border-2 border-[#8D6E63] rounded-b-lg shadow-inner flex items-center justify-around px-2 -mt-1">
            {/* Left Warm Glowing Window */}
            <div className="w-4.5 h-6 bg-[#FFE57F] border-2 border-[#5D4037] rounded-t-md shadow-inner flex items-center justify-center">
              <div className="w-2.5 h-3 bg-[#FFD54F]" />
            </div>

            {/* Wooden Front Door with Flower Wreath */}
            <div className="w-6 h-9 bg-linear-to-b from-[#795548] to-[#4E342E] rounded-t-md border-2 border-[#3E2723] flex flex-col items-center justify-between py-1 shadow-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E91E63] border border-white" />
              <div className="w-1.5 h-1.5 bg-[#FFD54F] rounded-full self-end mr-0.5 shadow-xs" />
            </div>

            {/* Right Warm Glowing Window */}
            <div className="w-4.5 h-6 bg-[#FFE57F] border-2 border-[#5D4037] rounded-t-md shadow-inner flex items-center justify-center">
              <div className="w-2.5 h-3 bg-[#FFD54F]" />
            </div>
          </div>

          {/* Flower Planters at Porch Base */}
          <div className="absolute bottom-0 w-26 flex justify-between px-1">
            <span className="text-xs -mb-1">🌸</span>
            <span className="text-xs -mb-1">🌼</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. RED OAK GRAND BARN (حظيرة الحيوانات والمواشي الكبرى ذات السقف المزدوج) */}
      {/* ========================================================================= */}
      {buildingId === 'barn' && (
        <div className="relative w-30 h-30 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Rooster Weather Vane */}
          <div className="absolute top-0 text-base animate-sway">🐓</div>

          {/* High Gambrel Red Barn Roof */}
          <div className="relative w-26 h-17 bg-linear-to-b from-[#D32F2F] via-[#C62828] to-[#8E0000] rounded-t-3xl border-2 border-[#4A0000] shadow-md flex flex-col items-center justify-center overflow-hidden">
            {/* Open Hayloft with Golden Straw bale */}
            <div className="w-8 h-7 bg-[#3E2723] border-2 border-white rounded-t-lg flex items-end justify-center overflow-visible shadow-inner">
              <span className="text-sm -mb-1">🌾</span>
            </div>
          </div>

          {/* Lower Barn Walls with Iconic White Cross Braces */}
          <div className="relative w-24 h-13 bg-[#B71C1C] border-2 border-[#4E342E] rounded-b-md shadow-inner flex items-center justify-center -mt-1">
            {/* Sliding Double Barn Doors */}
            <div className="w-14 h-10 bg-[#8E0000] border-2 border-white rounded-t-sm flex items-center justify-center gap-1">
              <div className="text-white font-black text-xs">✕</div>
              <div className="w-0.5 h-full bg-white/60" />
              <div className="text-white font-black text-xs">✕</div>
            </div>
          </div>

          {/* Farm props: Pitchfork and milk can beside barn */}
          <div className="absolute bottom-0 -right-2 text-xs">🥛</div>
          <div className="absolute bottom-0 -left-2 text-xs">🧹</div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. 3D BREEZY WINDMILL (طاحونة الهواء الكلاسيكية مع أجنحة دوارة وأكياس دقيق) */}
      {/* ========================================================================= */}
      {buildingId === 'windmill' && (
        <div className="relative w-30 h-32 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* 4 Rotating Windmill Sails/Blades (مطابقة للصورة 1 بالمزرعة السعيدة) */}
          <div className="absolute top-1 w-20 h-20 flex items-center justify-center animate-spin-windmill z-10">
            {/* Horizontal Blade Pair */}
            <div className="absolute w-20 h-3.5 bg-linear-to-r from-[#D32F2F] via-[#FFF9C4] to-[#D32F2F] rounded-full border-2 border-white shadow-md flex justify-between items-center px-1">
              <div className="w-2 h-2 bg-[#8D6E63] rounded-sm" />
              <div className="w-2 h-2 bg-[#8D6E63] rounded-sm" />
            </div>
            {/* Vertical Blade Pair */}
            <div className="absolute w-3.5 h-20 bg-linear-to-b from-[#D32F2F] via-[#FFF9C4] to-[#D32F2F] rounded-full border-2 border-white shadow-md flex flex-col justify-between items-center py-1">
              <div className="w-2 h-2 bg-[#8D6E63] rounded-sm" />
              <div className="w-2 h-2 bg-[#8D6E63] rounded-sm" />
            </div>
            {/* Center Rotating Golden Gear Pin */}
            <div className="w-5 h-5 bg-linear-to-tr from-[#FF8F00] to-[#FFF176] rounded-full border-2 border-white z-20 shadow-md flex items-center justify-center text-[8px]">
              ⚙️
            </div>
          </div>

          {/* Conical Roof Cap */}
          <div className="w-10 h-7 bg-linear-to-b from-[#5D4037] to-[#3E2723] rounded-t-full border-2 border-[#1B0000] -mb-1" />

          {/* Windmill Tapered Tower Body */}
          <div className="relative w-18 h-18 bg-linear-to-b from-[#FFF8E1] via-[#FFE082] to-[#D7CCC8] border-2 border-[#8D6E63] rounded-b-md shadow-inner flex flex-col items-center justify-between py-1">
            {/* Small Tower Window */}
            <div className="w-3.5 h-4 bg-[#5D4037] border border-white rounded-t-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FFF9C4]" />
            </div>
            {/* Mill Arch Door */}
            <div className="w-5 h-7 bg-[#4E342E] rounded-t-md border border-[#3E2723] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#FDD835] rounded-full self-end mr-0.5 mb-1" />
            </div>
          </div>

          {/* Sacks of freshly ground wheat flour at base */}
          <div className="absolute bottom-0 -right-2 flex items-center gap-0.5">
            <span className="text-xs">🌾</span>
            <span className="text-xs -ml-1">🥡</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. GRAIN SILO TOWER (صومعة الحبوب الدائرية المعدنية ذات القبة) */}
      {/* ========================================================================= */}
      {buildingId === 'silo' && (
        <div className="relative w-28 h-32 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Dome Metal Cap */}
          <div className="w-14 h-8 bg-linear-to-b from-[#CFD8DC] via-[#90A4AE] to-[#607D8B] rounded-t-full border-2 border-[#455A64] shadow-md flex items-center justify-center">
            <div className="w-2 h-2 bg-[#FDD835] rounded-full border border-white" />
          </div>

          {/* Silo Ribbed Galvanized Cylinder */}
          <div className="relative w-14 h-20 bg-linear-to-r from-[#B0BEC5] via-[#ECEFF1] to-[#78909C] border-2 border-[#546E7A] rounded-b-lg shadow-inner flex items-center justify-between px-1">
            {/* Side Ladder */}
            <div className="h-full w-2 flex flex-col justify-around border-l-2 border-r-2 border-[#37474F]">
              <div className="w-full h-0.5 bg-[#37474F]" />
              <div className="w-full h-0.5 bg-[#37474F]" />
              <div className="w-full h-0.5 bg-[#37474F]" />
              <div className="w-full h-0.5 bg-[#37474F]" />
              <div className="w-full h-0.5 bg-[#37474F]" />
            </div>

            {/* Grain Level Indicator Gauge */}
            <div className="h-14 w-2.5 bg-black/40 rounded-full border border-white/40 flex flex-col justify-end p-0.5">
              <div className="w-full h-3/4 bg-[#FDD835] rounded-full shadow-[0_0_4px_#FDD835]" />
            </div>
          </div>

          {/* Grain Spout at bottom */}
          <div className="w-4 h-3 bg-[#455A64] rounded-b-sm border border-black -mt-0.5" />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SCIENCE GREENHOUSE (البيت الزجاجي المقبب للزراعة الذكية) */}
      {/* ========================================================================= */}
      {buildingId === 'greenhouse' && (
        <div className="relative w-30 h-28 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Glass Geodesic Arched Roof */}
          <div className="relative w-26 h-16 bg-linear-to-b from-[#E0F7FA]/75 via-[#80DEEA]/60 to-[#26C6DA]/50 backdrop-blur-xs rounded-t-3xl border-2 border-[#0097A7] shadow-lg flex items-center justify-around px-2 overflow-hidden">
            {/* Interior Tropical Flora visible through translucent glass */}
            <span className="text-xl -mb-2">🌴</span>
            <span className="text-xl -mb-2">🌺</span>
            <span className="text-xl -mb-2">🌿</span>

            {/* Glass Pane Grid Framework */}
            <div className="absolute inset-0 border-r-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-1/2 w-full h-0.5 bg-white/60 pointer-events-none" />
          </div>

          {/* Lower Brick Framework Base */}
          <div className="relative w-24 h-8 bg-linear-to-b from-[#8D6E63] to-[#5D4037] border-2 border-[#3E2723] rounded-b-md shadow-inner flex items-center justify-center">
            {/* Glass Entrance Door */}
            <div className="w-6 h-6 bg-[#E0F7FA]/80 border border-white rounded-t-sm flex items-center justify-center">
              <span className="text-xs">🌱</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. DAIRY & CHEESE MACHINE (ماكينة الألبان وتصنيع الجبن الريفي) */}
      {/* ========================================================================= */}
      {buildingId === 'dairy_processor' && (
        <div className="relative w-28 h-28 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Processing Funnel / Tank */}
          <div className="relative w-20 h-16 bg-linear-to-b from-[#ECEFF1] via-[#CFD8DC] to-[#90A4AE] border-2 border-[#546E7A] rounded-2xl shadow-md flex flex-col items-center justify-between p-1">
            {/* Churning Lever */}
            <div className="absolute -top-3 right-3 text-sm animate-bounce">🕹️</div>
            {/* Milk Level Gauge */}
            <div className="w-12 h-4 bg-[#E1F5FE] border border-[#0288D1] rounded-full flex items-center justify-center text-[9px] font-black text-[#01579B]">
              🥛 100%
            </div>
            {/* Outflow Spout */}
            <div className="w-full flex justify-between px-1 text-xs">
              <span>🧈</span>
              <span>🧀</span>
            </div>
          </div>

          {/* Base Stand with Golden Cheese Wheels */}
          <div className="w-22 h-6 bg-[#5D4037] border-2 border-[#3E2723] rounded-b-md flex items-center justify-around px-1">
            <span className="text-sm">🧀</span>
            <span className="text-sm">🧀</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. HONEY BEEHIVES (خلايا ومناحل النحل الخشبية) */}
      {/* ========================================================================= */}
      {buildingId === 'beehives' && (
        <div className="relative w-28 h-28 flex flex-col items-center justify-end pointer-events-auto cursor-pointer hover:scale-[1.03] transition-transform">
          {/* Flying Honeybees */}
          <div className="absolute top-0 flex gap-4 animate-float text-sm">
            <span>🐝</span>
            <span>🐝</span>
          </div>

          {/* Wooden Stacked Hive Boxes */}
          <div className="w-16 h-5 bg-linear-to-r from-[#FFE082] via-[#FFD54F] to-[#FFB300] border-2 border-[#8D6E63] rounded-t-md shadow-xs flex items-center justify-center">
            <div className="w-8 h-1 bg-[#3E2723] rounded-full" />
          </div>
          <div className="w-16 h-5 bg-linear-to-r from-[#FFE082] via-[#FFD54F] to-[#FFB300] border-2 border-[#8D6E63] shadow-xs flex items-center justify-center -mt-0.5">
            <div className="w-8 h-1 bg-[#3E2723] rounded-full" />
          </div>
          <div className="w-16 h-5 bg-linear-to-r from-[#FFE082] via-[#FFD54F] to-[#FFB300] border-2 border-[#8D6E63] rounded-b-md shadow-xs flex items-center justify-center -mt-0.5">
            <div className="w-8 h-1 bg-[#3E2723] rounded-full" />
          </div>

          {/* Honey Jar at base */}
          <div className="absolute bottom-0 -right-1 text-base">🍯</div>
        </div>
      )}

      {/* Generic fallback for any other building */}
      {buildingId !== 'farmhouse' && buildingId !== 'barn' && buildingId !== 'windmill' && buildingId !== 'silo' && buildingId !== 'greenhouse' && buildingId !== 'dairy_processor' && buildingId !== 'beehives' && (
        <div className="relative flex flex-col items-center pointer-events-auto cursor-pointer">
          <div className="text-5xl drop-shadow-xl transform hover:scale-110 transition-transform">
            {building.icon}
          </div>
          <span className="text-[10px] font-black bg-[#1B5E20] text-white px-2 py-0.5 rounded-full border border-[#FDD835] shadow-xs mt-1">
            {building.name}
          </span>
        </div>
      )}
    </div>
  );
};
