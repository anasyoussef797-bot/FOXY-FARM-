import React from 'react';
import { FarmTile } from '../../types';
import { Sparkles } from 'lucide-react';

interface IsometricTileProps {
  tile: FarmTile;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (tile: FarmTile, e: React.MouseEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const IsometricTile: React.FC<IsometricTileProps> = ({
  tile,
  isSelected,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isSoil = tile.type === 'soil';
  const isWater = tile.type === 'water';
  const isPath = tile.type === 'path';
  const isLocked = !!tile.isLocked;
  const isWatered = tile.status === 'watered' || (tile.wateredAt && tile.status === 'planted');

  return (
    <div
      className="absolute cursor-pointer transition-transform duration-100 select-none group"
      style={{
        width: '110px',
        height: '70px',
        clipPath: 'polygon(50% 0%, 100% 39.3%, 100% 55%, 50% 94.3%, 0% 55%, 0% 39.3%)',
        pointerEvents: 'auto',
      }}
      onClick={(e) => onClick(tile, e)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg
        viewBox="0 0 110 70"
        className="w-full h-full overflow-visible drop-shadow-[0_4px_8px_rgba(0,0,0,0.22)]"
      >
        <defs>
          {/* Grass Gradients */}
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9CCC65" />
            <stop offset="35%" stopColor="#8BC34A" />
            <stop offset="75%" stopColor="#7CB342" />
            <stop offset="100%" stopColor="#689F38" />
          </linearGradient>
          <linearGradient id="grassSideL" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#558B2F" />
            <stop offset="100%" stopColor="#2E5618" />
          </linearGradient>
          <linearGradient id="grassSideR" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#689F38" />
            <stop offset="100%" stopColor="#33691E" />
          </linearGradient>

          {/* 3D Polygonal Furrowed Soil Gradients (الأرض المحروثة المضلعة) */}
          <linearGradient id="soilDryTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="30%" stopColor="#795548" />
            <stop offset="70%" stopColor="#6D4C41" />
            <stop offset="100%" stopColor="#4E342E" />
          </linearGradient>

          <linearGradient id="soilWetTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5D4037" />
            <stop offset="30%" stopColor="#4E342E" />
            <stop offset="70%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#271610" />
          </linearGradient>

          <linearGradient id="furrowRidgeLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A1887F" />
            <stop offset="100%" stopColor="#6D4C41" />
          </linearGradient>

          <linearGradient id="furrowTrenchShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1B0000" />
          </linearGradient>

          <linearGradient id="soilSideL" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4E342E" />
            <stop offset="60%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1B0000" />
          </linearGradient>

          <linearGradient id="soilSideR" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D4037" />
            <stop offset="60%" stopColor="#4E342E" />
            <stop offset="100%" stopColor="#271610" />
          </linearGradient>

          {/* Path Gradients */}
          <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFEBE9" />
            <stop offset="50%" stopColor="#D7CCC8" />
            <stop offset="100%" stopColor="#BCAAA4" />
          </linearGradient>

          {/* Water Gradients */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#80DEEA" />
            <stop offset="40%" stopColor="#26C6DA" />
            <stop offset="100%" stopColor="#0097A7" />
          </linearGradient>

          {/* Locked Wilderness Gradient */}
          <linearGradient id="lockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#558B2F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2E5618" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* 3D Isometric Base Thickness (Left & Right Slab Walls) */}
        {!isLocked && (
          <>
            {/* Left Side Thickness Slab */}
            <polygon
              points="0,27.5 55,55 55,66 0,38.5"
              fill={isSoil ? 'url(#soilSideL)' : isPath ? '#8D6E63' : 'url(#grassSideL)'}
            />
            {/* Right Side Thickness Slab */}
            <polygon
              points="55,55 110,27.5 110,38.5 55,66"
              fill={isSoil ? 'url(#soilSideR)' : isPath ? '#A1887F' : 'url(#grassSideR)'}
            />
            {/* Soil Strata Layering line */}
            {isSoil && (
              <polyline
                points="0,32 55,60 110,32"
                fill="none"
                stroke="#271610"
                strokeWidth="1.2"
                opacity="0.6"
              />
            )}
          </>
        )}

        {/* Isometric Diamond Top Surface */}
        <polygon
          points="55,0 110,27.5 55,55 0,27.5"
          fill={
            isLocked
              ? 'url(#lockedGrad)'
              : isSoil
              ? isWatered
                ? 'url(#soilWetTop)'
                : 'url(#soilDryTop)'
              : isWater
              ? 'url(#waterGrad)'
              : isPath
              ? 'url(#pathGrad)'
              : 'url(#grassGrad)'
          }
          className="transition-colors duration-150"
        />

        {/* Rich 3D Polygonal Tilled Soil Ridges (خطوط الحرث المضلعة البارزة والمحفورة) */}
        {isSoil && !isLocked && (
          <g>
            {/* Outer Wooden / Stone plot border frame */}
            <polygon
              points="55,1.5 107,27.5 55,53.5 3,27.5"
              fill="none"
              stroke={isWatered ? '#271610' : '#4E342E'}
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Furrow Trench 1 (Top-Left to Bottom-Right) */}
            <path
              d="M20,17.5 L55,35 L90,17.5"
              fill="none"
              stroke="url(#furrowTrenchShadow)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M20,16.5 L55,34 L90,16.5"
              fill="none"
              stroke="url(#furrowRidgeLight)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={isWatered ? '0.4' : '0.8'}
            />

            {/* Furrow Trench 2 (Middle) */}
            <path
              d="M14,27.5 L55,48 L96,27.5"
              fill="none"
              stroke="url(#furrowTrenchShadow)"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
            <path
              d="M14,26.5 L55,47 L96,26.5"
              fill="none"
              stroke="url(#furrowRidgeLight)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={isWatered ? '0.4' : '0.8'}
            />

            {/* Furrow Trench 3 (Upper) */}
            <path
              d="M32,10 L55,21.5 L78,10"
              fill="none"
              stroke="url(#furrowTrenchShadow)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M32,9 L55,20.5 L78,9"
              fill="none"
              stroke="url(#furrowRidgeLight)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={isWatered ? '0.4' : '0.8'}
            />

            {/* Polygonal Soil Clods / Earth mounds */}
            <ellipse cx="40" cy="22" rx="2.5" ry="1.2" fill="#3E2723" />
            <ellipse cx="70" cy="22" rx="2" ry="1" fill="#3E2723" />
            <ellipse cx="55" cy="30" rx="3" ry="1.5" fill="#271610" />
            <ellipse cx="30" cy="32" rx="2" ry="1" fill="#3E2723" />
            <ellipse cx="80" cy="32" rx="2.2" ry="1" fill="#3E2723" />

            {/* Water Moisture Sheen & Dewdrops when Watered */}
            {isWatered && (
              <g>
                {/* Water sheen reflection highlights */}
                <ellipse cx="55" cy="38" rx="8" ry="2" fill="#80DEEA" opacity="0.45" />
                <ellipse cx="38" cy="26" rx="5" ry="1.5" fill="#B2EBF2" opacity="0.4" />
                <ellipse cx="72" cy="26" rx="5" ry="1.5" fill="#B2EBF2" opacity="0.4" />
                {/* Tiny Water Droplets */}
                <circle cx="50" cy="37" r="1" fill="#E0F7FA" />
                <circle cx="60" cy="36" r="1.2" fill="#E0F7FA" />
                <circle cx="35" cy="25" r="0.8" fill="#E0F7FA" />
                <circle cx="75" cy="25" r="0.9" fill="#E0F7FA" />
              </g>
            )}

            {/* Corner Wooden Border Pegs */}
            <polygon points="55,0 57,2 53,2" fill="#4E342E" />
            <polygon points="110,27.5 108,29 108,26" fill="#3E2723" />
            <polygon points="0,27.5 2,29 2,26" fill="#3E2723" />
            <polygon points="55,55 57,53 53,53" fill="#271610" />
          </g>
        )}

        {/* Grass Tuft details on Grass Tiles */}
        {!isSoil && !isWater && !isPath && !isLocked && (
          <g opacity="0.75">
            {/* Little clover & grass tufts */}
            <path d="M42,22 L45,18 L48,22" stroke="#558B2F" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M68,32 L71,28 L74,32" stroke="#558B2F" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="58" cy="18" r="1.2" fill="#DCEDC8" opacity="0.8" />
            <circle cx="34" cy="34" r="1" fill="#DCEDC8" opacity="0.8" />
          </g>
        )}

        {/* Water ripples on Water Tiles */}
        {isWater && (
          <g opacity="0.7">
            <path d="M35,25 Q55,30 75,25" stroke="#E0F7FA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M45,35 Q55,38 65,35" stroke="#E0F7FA" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="55" cy="20" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}

        {/* Stone pavers on Path Tiles */}
        {isPath && (
          <g opacity="0.85">
            <polygon points="45,18 60,18 65,26 50,26" fill="#BCAAA4" stroke="#8D6E63" strokeWidth="1" />
            <polygon points="25,28 40,28 45,36 30,36" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="1" />
            <polygon points="65,28 80,28 85,36 70,36" fill="#BCAAA4" stroke="#8D6E63" strokeWidth="1" />
          </g>
        )}

        {/* Locked Wilderness Plot (Trees, Wild Rocks, Lock Badge) */}
        {isLocked && (
          <g>
            {/* Wild trees & boulders */}
            <g transform="translate(42, 6)">
              {/* Little wild pine tree */}
              <polygon points="12,0 3,18 21,18" fill="#1B5E20" />
              <polygon points="12,-4 5,10 19,10" fill="#2E7D32" />
              <rect x="10.5" y="18" width="3" height="5" fill="#4E342E" />
            </g>
            <g transform="translate(18, 18)">
              {/* Wilderness rock */}
              <polygon points="8,4 16,0 20,8 12,12 4,8" fill="#78909C" stroke="#455A64" strokeWidth="1" />
            </g>
            <g transform="translate(70, 20)">
              {/* Little bush */}
              <circle cx="6" cy="6" r="6" fill="#33691E" />
              <circle cx="12" cy="8" r="5" fill="#2E7D32" />
            </g>
          </g>
        )}

        {/* Selection & Hover Glowing Outlines */}
        {(isSelected || isHovered) && (
          <polygon
            points="55,0 110,27.5 55,55 0,27.5"
            fill={isSelected ? 'rgba(253, 216, 53, 0.35)' : 'rgba(255, 255, 255, 0.22)'}
            stroke={isSelected ? '#FDD835' : '#FFFFFF'}
            strokeWidth={isSelected ? '3' : '2'}
            className="transition-all duration-100 filter drop-shadow-[0_0_8px_#FDD835]"
          />
        )}
      </svg>

      {/* Floating Expansion Indicator Badge on Locked Land */}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-2 pointer-events-none">
          <div className="w-7 h-7 rounded-full bg-emerald-800/90 border-2 border-[#FFE082] flex items-center justify-center text-white shadow-lg animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-[#FDD835]" />
          </div>
          <span className="text-[9px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full mt-1 border border-white shadow-xs">
            توسعة ✨
          </span>
        </div>
      )}
    </div>
  );
};
