import React, { useState, useEffect } from 'react';
import { FarmTile } from '../../types';
import { ANIMALS_CONFIG } from '../../data/gameConfigs';
import { Sparkles, Heart } from 'lucide-react';

interface IsometricAnimalProps {
  tile: FarmTile;
  isSelected?: boolean;
  onClick: (tile: FarmTile, e: React.MouseEvent) => void;
  isArabic?: boolean;
}

export const IsometricAnimal: React.FC<IsometricAnimalProps> = ({
  tile,
  isSelected,
  onClick,
  isArabic = true,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const animal = tile.animalId ? ANIMALS_CONFIG[tile.animalId] : null;

  useEffect(() => {
    if (!tile.animalId || !tile.animalFedAt || !animal) {
      setSecondsRemaining(0);
      return;
    }

    const duration = animal.produceDurationSec || 60;
    const calculateAnimal = () => {
      const elapsed = (Date.now() - (tile.animalFedAt || 0)) / 1000;
      const left = Math.max(0, Math.ceil(duration - elapsed));
      setSecondsRemaining(left);
    };

    calculateAnimal();
    const interval = setInterval(calculateAnimal, 1000);
    return () => clearInterval(interval);
  }, [tile.animalId, tile.animalFedAt, animal]);

  if (!animal) return null;

  const isProduceReady = secondsRemaining === 0;

  return (
    <div
      className={`absolute select-none pointer-events-none flex flex-col items-center justify-center transition-all duration-300 z-20 ${
        isSelected ? 'scale-110 filter drop-shadow-[0_0_16px_#FFD54F]' : ''
      }`}
      style={{
        width: '124px',
        height: '110px',
        top: '-56px',
        left: '-7px',
      }}
    >
      {/* 3D Realistic Ground Ambient Occlusion & Cast Shadow */}
      <div className="absolute bottom-3 w-22 h-8 bg-black/35 rounded-[100%] blur-[2px] pointer-events-none transform rotate-[-4deg]" />

      {/* ========================================================================= */}
      {/* 1. SCULPTED 3D ISOMETRIC HOLSTEIN DAIRY COW (البقرة الهولندية المجسمة 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'cow' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 140 120"
            className="w-28 h-24 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="cowBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#D6D6D6" />
              </linearGradient>
              <linearGradient id="cowSpotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A2A" />
                <stop offset="100%" stopColor="#121212" />
              </linearGradient>
              <linearGradient id="cowMuzzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFB6C1" />
                <stop offset="100%" stopColor="#F48FB1" />
              </linearGradient>
              <linearGradient id="woodTrough" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8D6E63" />
                <stop offset="100%" stopColor="#4E342E" />
              </linearGradient>
              <linearGradient id="metalCan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#CFD8DC" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#90A4AE" />
              </linearGradient>
            </defs>

            {/* Back Fence Post & Rail (Wooden Pen Structure) */}
            <rect x="18" y="42" width="6" height="34" rx="2" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
            <rect x="108" y="38" width="6" height="38" rx="2" fill="#5D4037" stroke="#3E2723" strokeWidth="1" />
            <polygon points="18,50 114,46 114,53 18,57" fill="#795548" stroke="#3E2723" strokeWidth="0.8" />
            <polygon points="18,64 114,60 114,67 18,71" fill="#6D4C41" stroke="#3E2723" strokeWidth="0.8" />

            {/* Back Legs */}
            <rect x="42" y="74" width="7" height="22" rx="3" fill="#B0BEC5" stroke="#37474F" strokeWidth="0.8" />
            <rect x="42" y="93" width="7" height="4" rx="1" fill="#263238" />
            <rect x="80" y="72" width="7" height="24" rx="3" fill="#B0BEC5" stroke="#37474F" strokeWidth="0.8" />
            <rect x="80" y="93" width="7" height="4" rx="1" fill="#263238" />

            {/* Cow Body (3D Torso) */}
            <ellipse cx="64" cy="65" rx="28" ry="19" fill="url(#cowBodyGrad)" stroke="#455A64" strokeWidth="1.5" />

            {/* 3D Black Hide Spots on Torso */}
            <path d="M50,52 Q58,48 64,54 Q60,65 52,64 Q46,60 50,52 Z" fill="url(#cowSpotGrad)" />
            <path d="M72,56 Q82,52 86,60 Q84,72 75,70 Q70,64 72,56 Z" fill="url(#cowSpotGrad)" />
            <path d="M58,70 Q64,68 67,74 Q62,80 56,76 Z" fill="url(#cowSpotGrad)" />

            {/* Front Legs with 3D Hooves */}
            <rect x="52" y="78" width="8" height="23" rx="3" fill="#ECEFF1" stroke="#455A64" strokeWidth="1" />
            <rect x="52" y="98" width="8" height="4" rx="1" fill="#1A1A1A" />
            <rect x="70" y="77" width="8" height="24" rx="3" fill="#ECEFF1" stroke="#455A64" strokeWidth="1" />
            <rect x="70" y="98" width="8" height="4" rx="1" fill="#1A1A1A" />

            {/* Cow Tail with animated tuft */}
            <path d="M36,60 Q30,68 32,80" stroke="#78909C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="32" cy="82" rx="3" ry="5" fill="#1A1A1A" />

            {/* Cow Head (3D Volumetric Isometric Head) */}
            <g transform="translate(82, 38)">
              {/* Ears */}
              <ellipse cx="-4" cy="5" rx="6" ry="3" transform="rotate(-30)" fill="#ECEFF1" stroke="#455A64" strokeWidth="0.8" />
              <ellipse cx="-4" cy="5" rx="3.5" ry="1.5" transform="rotate(-30)" fill="#F48FB1" />
              <ellipse cx="22" cy="3" rx="6" ry="3" transform="rotate(25)" fill="#ECEFF1" stroke="#455A64" strokeWidth="0.8" />
              <ellipse cx="22" cy="3" rx="3.5" ry="1.5" transform="rotate(25)" fill="#F48FB1" />

              {/* Curved Ivory Horns */}
              <path d="M0,2 Q-4,-7 2,-10 Q3,-3 6,0" fill="#FFF9C4" stroke="#F57F17" strokeWidth="0.8" />
              <path d="M16,-1 Q20,-10 14,-11 Q14,-4 11,1" fill="#FFF9C4" stroke="#F57F17" strokeWidth="0.8" />

              {/* Head Base */}
              <polygon points="2,2 16,0 20,18 0,18" fill="url(#cowBodyGrad)" stroke="#455A64" strokeWidth="1.2" />
              {/* Head Patch */}
              <path d="M10,0 Q16,2 18,10 Q14,14 10,8 Z" fill="url(#cowSpotGrad)" />

              {/* Big Cute Expressive Eyes */}
              <ellipse cx="4" cy="9" rx="2.5" ry="3" fill="#1A1A1A" />
              <circle cx="5" cy="8" r="0.8" fill="#FFFFFF" />
              <ellipse cx="14" cy="8" rx="2.5" ry="3" fill="#1A1A1A" />
              <circle cx="15" cy="7" r="0.8" fill="#FFFFFF" />

              {/* Pink Muzzle with Nostrils */}
              <ellipse cx="9" cy="20" rx="9" ry="6" fill="url(#cowMuzzleGrad)" stroke="#E91E63" strokeWidth="0.8" />
              <ellipse cx="6" cy="20" rx="1.5" ry="2" fill="#880E4F" />
              <ellipse cx="12" cy="20" rx="1.5" ry="2" fill="#880E4F" />

              {/* Brass Bell around neck */}
              <path d="M2,22 Q9,25 16,22" stroke="#FF8F00" strokeWidth="2" fill="none" />
              <polygon points="7,25 11,25 12,30 6,30" fill="#FFD54F" stroke="#FF6F00" strokeWidth="0.6" />
              <circle cx="9" cy="31" r="1.5" fill="#E65100" />
            </g>

            {/* Wooden Feeding Manger filled with Golden Hay (Left) */}
            <polygon points="10,82 32,76 34,92 12,98" fill="url(#woodTrough)" stroke="#3E2723" strokeWidth="1" />
            <polygon points="10,82 32,76 34,79 12,85" fill="#A1887F" />
            <path d="M11,81 Q16,74 20,80 Q24,73 30,78 Q22,85 11,81" fill="#FDD835" stroke="#F57F17" strokeWidth="0.6" />

            {/* Stainless Steel Milk Canister (Right) */}
            <g transform="translate(104, 76)">
              <rect x="0" y="4" width="14" height="22" rx="3" fill="url(#metalCan)" stroke="#546E7A" strokeWidth="1" />
              <ellipse cx="7" cy="4" rx="6" ry="2.5" fill="#ECEFF1" stroke="#546E7A" strokeWidth="0.8" />
              <rect x="3" y="1" width="8" height="4" rx="1" fill="#78909C" stroke="#37474F" strokeWidth="0.6" />
              <path d="M1,7 Q7,10 13,7" stroke="#78909C" strokeWidth="1" fill="none" />
              <path d="M1,18 Q7,21 13,18" stroke="#78909C" strokeWidth="1" fill="none" />
              {isProduceReady && (
                <circle cx="7" cy="3" r="3.5" fill="#FFFFFF" className="animate-pulse" />
              )}
            </g>
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SCULPTED 3D ISOMETRIC CLUCKING HEN (الدجاجة البياضة وقن البيض 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'chicken' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 130 115"
            className="w-26 h-23 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="henBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFF8E1" />
                <stop offset="100%" stopColor="#FFE082" />
              </linearGradient>
              <linearGradient id="strawNestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#FFCA28" />
                <stop offset="100%" stopColor="#C79100" />
              </linearGradient>
              <linearGradient id="goldenEggGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="50%" stopColor="#FFE082" />
                <stop offset="100%" stopColor="#FFB300" />
              </linearGradient>
            </defs>

            {/* Straw Nest Basket Base */}
            <ellipse cx="65" cy="85" rx="34" ry="16" fill="url(#strawNestGrad)" stroke="#8D6E63" strokeWidth="1.5" />
            <ellipse cx="65" cy="81" rx="30" ry="12" fill="#5D4037" />

            {/* Golden 3D Eggs sitting nestled in Straw */}
            <ellipse cx="46" cy="80" rx="6" ry="8" transform="rotate(-20 46 80)" fill="url(#goldenEggGrad)" stroke="#B78103" strokeWidth="0.8" />
            <circle cx="45" cy="77" r="1.5" fill="#FFFFFF" />
            <ellipse cx="84" cy="81" rx="6" ry="8" transform="rotate(25 84 81)" fill="url(#goldenEggGrad)" stroke="#B78103" strokeWidth="0.8" />
            <circle cx="83" cy="78" r="1.5" fill="#FFFFFF" />

            {/* Clucking Hen Body */}
            <ellipse cx="65" cy="58" rx="22" ry="18" fill="url(#henBodyGrad)" stroke="#D7CCC8" strokeWidth="1.2" />

            {/* Wing Feathers */}
            <path d="M52,52 Q66,48 74,58 Q66,70 54,66 Q48,60 52,52 Z" fill="#FFE082" stroke="#FFB300" strokeWidth="1" />

            {/* Tail Plumes */}
            <path d="M44,54 Q32,46 36,36 Q42,42 46,48 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="1" />
            <path d="M42,57 Q28,52 34,44 Q40,48 44,52 Z" fill="#FFA726" stroke="#E65100" strokeWidth="1" />

            {/* Hen Head & Neck */}
            <path d="M74,52 Q82,42 84,30 Q88,38 82,56 Z" fill="url(#henBodyGrad)" />
            <circle cx="84" cy="30" r="10" fill="url(#henBodyGrad)" stroke="#D7CCC8" strokeWidth="1" />

            {/* Vivid Crimson Red Crest / Comb */}
            <path d="M78,22 Q80,14 84,18 Q88,12 92,19 Q95,15 96,24 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="1" />

            {/* Eye */}
            <circle cx="88" cy="28" r="2.2" fill="#1A1A1A" />
            <circle cx="89" cy="27" r="0.7" fill="#FFFFFF" />

            {/* Golden Orange Beak */}
            <polygon points="92,28 102,32 92,36" fill="#FF9800" stroke="#E65100" strokeWidth="0.8" />

            {/* Red Wattle under Beak */}
            <ellipse cx="91" cy="38" rx="3" ry="5" fill="#E53935" stroke="#B71C1C" strokeWidth="0.6" />

            {/* Golden Straw Spikes on Rim */}
            <path d="M35,80 L30,74 M42,88 L38,94 M92,86 L98,90 M96,78 L103,72" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SCULPTED 3D ISOMETRIC MERINO SHEEP (الخروف الصوفي المجسم 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'sheep' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 130 115"
            className="w-26 h-23 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="woolPuffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#E0E0E0" />
              </linearGradient>
              <linearGradient id="sheepFace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5D4037" />
                <stop offset="100%" stopColor="#3E2723" />
              </linearGradient>
            </defs>

            {/* Dark Legs */}
            <rect x="46" y="74" width="6" height="18" rx="2" fill="#3E2723" />
            <rect x="56" y="76" width="6" height="18" rx="2" fill="#2D1B16" />
            <rect x="76" y="74" width="6" height="18" rx="2" fill="#3E2723" />
            <rect x="86" y="76" width="6" height="18" rx="2" fill="#2D1B16" />

            {/* Volumetric Puffy 3D Wool Cloud Torso */}
            <g fill="url(#woolPuffGrad)" stroke="#BDBDBD" strokeWidth="1.2">
              <circle cx="48" cy="56" r="14" />
              <circle cx="62" cy="46" r="15" />
              <circle cx="78" cy="48" r="14" />
              <circle cx="88" cy="60" r="13" />
              <circle cx="78" cy="68" r="14" />
              <circle cx="60" cy="70" r="15" />
              <circle cx="46" cy="68" r="13" />
              <circle cx="64" cy="58" r="16" />
            </g>

            {/* Sheep Face (Dark Mocha with cute features) */}
            <g transform="translate(82, 42)">
              {/* Ears */}
              <ellipse cx="-2" cy="8" rx="6" ry="3" transform="rotate(-35)" fill="#4E342E" stroke="#3E2723" strokeWidth="0.8" />
              <ellipse cx="18" cy="8" rx="6" ry="3" transform="rotate(35)" fill="#4E342E" stroke="#3E2723" strokeWidth="0.8" />

              {/* Wool Headcap */}
              <circle cx="8" cy="2" r="8" fill="url(#woolPuffGrad)" stroke="#BDBDBD" strokeWidth="1" />
              <circle cx="14" cy="4" r="6" fill="url(#woolPuffGrad)" stroke="#BDBDBD" strokeWidth="1" />

              {/* Head Profile */}
              <ellipse cx="8" cy="12" rx="9" ry="11" fill="url(#sheepFace)" stroke="#271610" strokeWidth="1" />

              {/* Eyes */}
              <ellipse cx="4" cy="9" rx="1.8" ry="2.2" fill="#FFF9C4" />
              <circle cx="4" cy="9" r="1" fill="#000000" />
              <ellipse cx="12" cy="9" rx="1.8" ry="2.2" fill="#FFF9C4" />
              <circle cx="12" cy="9" r="1" fill="#000000" />

              {/* Snout */}
              <path d="M6,17 Q8,19 10,17" stroke="#FFAB91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Woven Wool Basket with Yarn Spool */}
            <g transform="translate(18, 72)">
              <ellipse cx="12" cy="14" rx="10" ry="6" fill="#8D6E63" stroke="#4E342E" strokeWidth="1" />
              <circle cx="10" cy="8" r="6" fill="#42A5F5" stroke="#1E88E5" strokeWidth="0.8" />
              <circle cx="15" cy="10" r="5" fill="#AB47BC" stroke="#8E24AA" strokeWidth="0.8" />
            </g>
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SCULPTED 3D ISOMETRIC ARABIAN HORSE (الحصان الأصيل المجسم 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'horse' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 140 125"
            className="w-28 h-25 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="horseCoat" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A1887F" />
                <stop offset="50%" stopColor="#6D4C41" />
                <stop offset="100%" stopColor="#4E342E" />
              </linearGradient>
              <linearGradient id="horseMane" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2E1C14" />
                <stop offset="100%" stopColor="#150B07" />
              </linearGradient>
            </defs>

            {/* Back Legs */}
            <path d="M42,66 L38,92 L44,92 L48,70 Z" fill="#4E342E" />
            <rect x="38" y="92" width="6" height="3" rx="1" fill="#212121" />
            <path d="M78,66 L74,92 L80,92 L84,70 Z" fill="#4E342E" />
            <rect x="74" y="92" width="6" height="3" rx="1" fill="#212121" />

            {/* Muscular 3D Torso */}
            <ellipse cx="62" cy="62" rx="26" ry="17" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="1.2" />

            {/* Front Legs */}
            <path d="M52,68 L50,96 L57,96 L60,72 Z" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="0.8" />
            <rect x="50" y="96" width="7" height="3.5" rx="1" fill="#212121" />
            <path d="M70,68 L68,96 L75,96 L78,72 Z" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="0.8" />
            <rect x="68" y="96" width="7" height="3.5" rx="1" fill="#212121" />

            {/* Flowing Tail */}
            <path d="M36,54 Q24,62 26,86 Q30,76 38,62 Z" fill="url(#horseMane)" stroke="#000000" strokeWidth="0.8" />

            {/* Muscular Arching Neck */}
            <path d="M76,60 Q86,46 90,26 L98,28 Q94,56 82,68 Z" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="1" />

            {/* Flowing Mane */}
            <path d="M82,24 Q78,34 76,46 Q74,56 70,62 L74,62 Q80,50 84,36 Z" fill="url(#horseMane)" />

            {/* Refined Arabian Head */}
            <g transform="translate(90, 18)">
              {/* Ears */}
              <polygon points="2,4 4,-4 8,3" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="0.8" />
              <polygon points="6,3 10,-3 12,4" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="0.8" />

              {/* Head Profile */}
              <polygon points="0,6 10,2 18,16 6,18" fill="url(#horseCoat)" stroke="#3E2723" strokeWidth="1" />
              {/* White Blaze Mark */}
              <polygon points="6,4 9,4 8,11 6,11" fill="#FFFFFF" />

              {/* Eye with gentle lash */}
              <circle cx="5" cy="8" r="2" fill="#1A1A1A" />
              <circle cx="6" cy="7.5" r="0.7" fill="#FFFFFF" />

              {/* Muzzle with Snorting Nostril */}
              <ellipse cx="18" cy="17" rx="4" ry="3.5" fill="#3E2723" />
              <circle cx="19" cy="17" r="1.2" fill="#1A1A1A" />

              {/* Leather Halter & Gold Ring */}
              <line x1="2" y1="6" x2="16" y2="15" stroke="#D84315" strokeWidth="1.2" />
              <circle cx="16" cy="15" r="1.8" fill="#FFD54F" stroke="#FF8F00" strokeWidth="0.6" />
            </g>

            {/* Carrot Trough (Right) */}
            <g transform="translate(108, 76)">
              <rect x="0" y="4" width="16" height="14" rx="2" fill="#8D6E63" stroke="#4E342E" strokeWidth="1" />
              <polygon points="2,4 8,-4 11,2" fill="#FF6D00" />
              <polygon points="6,3 12,-3 14,3" fill="#FF6D00" />
              <path d="M8,-4 L6,-8 M12,-3 L14,-7" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SCULPTED 3D ISOMETRIC RIVER DUCK & POND (البطة وبحيرة الماء 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'duck' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 130 115"
            className="w-26 h-23 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="pondWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4DD0E1" />
                <stop offset="50%" stopColor="#00BCD4" />
                <stop offset="100%" stopColor="#00838F" />
              </linearGradient>
              <linearGradient id="duckHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00897B" />
                <stop offset="100%" stopColor="#004D40" />
              </linearGradient>
            </defs>

            {/* 3D Glossy Isometric Water Pond */}
            <ellipse cx="65" cy="80" rx="38" ry="18" fill="url(#pondWaterGrad)" stroke="#006064" strokeWidth="1.5" />
            {/* Water Ripple Ring */}
            <ellipse cx="65" cy="80" rx="28" ry="12" fill="none" stroke="#E0F7FA" strokeWidth="1" strokeDasharray="6 3" className="animate-pulse" />

            {/* Lily Pad with Lotus Blossom */}
            <ellipse cx="40" cy="82" rx="8" ry="4" fill="#43A047" stroke="#2E7D32" strokeWidth="0.8" />
            <circle cx="42" cy="80" r="2.5" fill="#F48FB1" />

            {/* Duck Body floating in water */}
            <ellipse cx="66" cy="66" rx="20" ry="14" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="1" />
            {/* Wing Feather Accents */}
            <path d="M54,62 Q64,58 72,66 Q64,74 56,70 Z" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="0.8" />
            {/* Tail Up-flick */}
            <polygon points="46,64 38,58 48,68" fill="#ECEFF1" />

            {/* Duck Head (Mallard emerald gloss) */}
            <circle cx="80" cy="48" r="9" fill="url(#duckHeadGrad)" stroke="#004D40" strokeWidth="1" />
            {/* White Collar Ring */}
            <rect x="74" y="55" width="12" height="2.5" rx="1" fill="#FFFFFF" />

            {/* Eye */}
            <circle cx="83" cy="46" r="1.8" fill="#1A1A1A" />
            <circle cx="84" cy="45.5" r="0.6" fill="#FFFFFF" />

            {/* Bright Orange Bill */}
            <polygon points="88,48 100,50 88,54" fill="#FF9800" stroke="#E65100" strokeWidth="0.8" />
          </svg>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SCULPTED 3D ISOMETRIC FLUFFY BUNNY (الأرنب الأبيض المجسم 3D) */}
      {/* ========================================================================= */}
      {tile.animalId === 'rabbit' && (
        <div
          onClick={(e) => onClick(tile, e)}
          className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            viewBox="0 0 120 110"
            className="w-24 h-22 overflow-visible drop-shadow-md animate-sway"
            style={{ transformOrigin: 'bottom center' }}
          >
            <defs>
              <linearGradient id="bunnyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#ECEFF1" />
              </linearGradient>
            </defs>

            {/* Bunny Fluffy Body */}
            <ellipse cx="58" cy="68" rx="20" ry="16" fill="url(#bunnyGrad)" stroke="#CFD8DC" strokeWidth="1" />
            {/* Puffy Tail */}
            <circle cx="36" cy="66" r="6" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
            {/* Paws */}
            <ellipse cx="64" cy="82" rx="7" ry="4" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
            <ellipse cx="48" cy="80" rx="6" ry="4" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />

            {/* Head */}
            <circle cx="74" cy="52" r="12" fill="url(#bunnyGrad)" stroke="#CFD8DC" strokeWidth="1" />

            {/* Long Tall Ears with Pink Inset */}
            <g transform="translate(68, 24)">
              <ellipse cx="2" cy="12" rx="4" ry="14" transform="rotate(-15)" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
              <ellipse cx="2" cy="12" rx="2" ry="10" transform="rotate(-15)" fill="#F48FB1" />
              <ellipse cx="12" cy="12" rx="4" ry="14" transform="rotate(15)" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="0.8" />
              <ellipse cx="12" cy="12" rx="2" ry="10" transform="rotate(15)" fill="#F48FB1" />
            </g>

            {/* Ruby Eyes */}
            <circle cx="78" cy="50" r="2.2" fill="#E91E63" />
            <circle cx="79" cy="49" r="0.7" fill="#FFFFFF" />

            {/* Pink Nose & Whiskers */}
            <polygon points="84,54 87,54 85.5,56" fill="#F06292" />
            <line x1="86" y1="55" x2="96" y2="53" stroke="#B0BEC5" strokeWidth="0.8" />
            <line x1="86" y1="56" x2="95" y2="58" stroke="#B0BEC5" strokeWidth="0.8" />

            {/* Lucky Four-Leaf Clover in grass */}
            <g transform="translate(86, 70)">
              <circle cx="4" cy="4" r="3" fill="#66BB6A" />
              <circle cx="8" cy="4" r="3" fill="#66BB6A" />
              <circle cx="4" cy="8" r="3" fill="#66BB6A" />
              <circle cx="8" cy="8" r="3" fill="#66BB6A" />
            </g>
          </svg>
        </div>
      )}

      {/* Fallback for any other custom animal */}
      {tile.animalId !== 'cow' &&
        tile.animalId !== 'chicken' &&
        tile.animalId !== 'sheep' &&
        tile.animalId !== 'horse' &&
        tile.animalId !== 'duck' &&
        tile.animalId !== 'rabbit' && (
          <div
            onClick={(e) => onClick(tile, e)}
            className="relative flex flex-col items-center animate-sway pointer-events-auto cursor-pointer"
          >
            <div className="text-4xl drop-shadow-md transform hover:scale-110 transition-transform">
              {animal.icon}
            </div>
          </div>
        )}

      {/* Feeding Heart Bubble (when recently fed and actively producing) */}
      {!isProduceReady && (
        <div className="absolute -top-2 right-2 w-6 h-6 bg-linear-to-tr from-pink-600 to-rose-400 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-bounce pointer-events-none">
          <Heart className="w-3.5 h-3.5 text-white fill-white" />
        </div>
      )}

      {/* Produce Ready Floating Action Badge (e.g. 🥛 Milk, 🥚 Golden Egg, 🧶 Wool) */}
      {isProduceReady && (
        <button
          onClick={(e) => onClick(tile, e)}
          className="absolute -top-6 bg-linear-to-r from-[#FFD600] via-[#FFF59D] to-[#FBC02D] text-amber-950 font-black text-[11px] px-3 py-1 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center gap-1.5 animate-bounce ring-2 ring-amber-400/50 pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <span className="text-sm">{animal.produceItem.icon}</span>
          <span>{isArabic ? 'جاهز للجمع!' : 'Ready!'}</span>
          <Sparkles className="w-3 h-3 text-amber-950 animate-spin" />
        </button>
      )}

      {/* Countdown Timer when producing */}
      {!isProduceReady && (
        <div className="absolute -bottom-1 bg-slate-950/85 backdrop-blur-xs text-white text-[9px] font-black px-2.5 py-0.5 rounded-full border border-white/30 shadow-md flex items-center gap-1 pointer-events-none">
          <span className="text-amber-300">⏳</span>
          <span>{secondsRemaining}s</span>
        </div>
      )}
    </div>
  );
};
