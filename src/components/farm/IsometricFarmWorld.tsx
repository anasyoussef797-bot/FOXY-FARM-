import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FarmTile, InventoryItem } from '../../types';
import { IsometricTile } from './IsometricTile';
import { IsometricCrop } from './IsometricCrop';
import { IsometricBuilding } from './IsometricBuilding';
import { IsometricAnimal } from './IsometricAnimal';
import { IsometricCharacter, CharacterType } from './IsometricCharacter';
import { FloatingActionMenu } from './FloatingActionMenu';
import { FloatingRewardParticles, RewardParticle } from './FloatingRewardParticles';
import { ZoomIn, ZoomOut, Compass, Sparkles, Zap, Sprout } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../assets/characters';

interface IsometricFarmWorldProps {
  tiles: FarmTile[];
  inventory: InventoryItem[];
  selectedSeedId: string | null;
  onTileClick: (tile: FarmTile) => void;
  onPlant: (tileId: string, cropId: string) => void;
  onWater: (tileId: string) => void;
  onHarvest: (tileId: string) => void;
  onFeedAnimal: (tileId: string) => void;
  onPlow: (tileId: string) => void;
  onUnlockLand: (tileId: string) => void;
  onSelectSeed: (seedId: string) => void;
  onOpenShop: () => void;
  onOpenHomework: () => void;
  onOpenTeacher: () => void;
  hasPendingHomework?: boolean;
  isArabic?: boolean;
}

export const IsometricFarmWorld: React.FC<IsometricFarmWorldProps> = ({
  tiles,
  inventory,
  selectedSeedId,
  onTileClick,
  onPlant,
  onWater,
  onHarvest,
  onFeedAnimal,
  onPlow,
  onUnlockLand,
  onSelectSeed,
  onOpenShop,
  onOpenHomework,
  onOpenTeacher,
  hasPendingHomework = false,
  isArabic = true,
}) => {
  const { triggerDialog } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  // Camera Pan & Zoom State
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Selected & Hovered Tile State
  const [selectedTile, setSelectedTile] = useState<FarmTile | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);
  const [menuScreenPos, setMenuScreenPos] = useState<{ x: number; y: number } | null>(null);

  // Floating Reward Particles
  const [particles, setParticles] = useState<RewardParticle[]>([]);

  // Spawn a floating particle reward
  const spawnReward = useCallback((screenX: number, screenY: number, text: string, subText?: string, icon?: string) => {
    const id = `part_${Date.now()}_${Math.random()}`;
    setParticles((prev) => [...prev, { id, x: screenX, y: screenY, text, subText, icon }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1600);
  }, []);

  // Isometric Constants
  const tileWidth = 110;
  const tileHeight = 55;

  // Center coordinate offset for 8x8 or 10x10 world
  const worldCenterX = 450;
  const worldCenterY = 120;

  // Iso coordinate conversion
  const getScreenCoords = (x: number, y: number) => {
    const screenX = worldCenterX + (x - y) * (tileWidth / 2);
    const screenY = worldCenterY + (x + y) * (tileHeight / 2);
    return { x: screenX, y: screenY };
  };

  // Mouse Drag handlers for camera panning
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left mouse button when not clicking a button
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Tile Selection & Menu Positioning
  const handleTileSelect = (tile: FarmTile, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();

    // If land tile is locked, expand it immediately with joy and rewards!
    if (tile.isLocked) {
      onUnlockLand(tile.id);
      const { x, y } = getScreenCoords(tile.x, tile.y);
      spawnReward(x + 55, y, isArabic ? 'توسيع المزرعة! 🎉' : 'Land Expanded! 🎉', '+30 XP', '✨');
      return;
    }

    setSelectedTile(tile);

    // Calculate tile coordinate on screen for menu placement
    const { x, y } = getScreenCoords(tile.x, tile.y);
    setMenuScreenPos({ x: x + 55, y: y + 27.5 });

    // Trigger instant harvest if ready
    if (tile.status === 'ready' && tile.cropId) {
      onHarvest(tile.id);
      spawnReward(x + 55, y, '+25 🪙', '+12 XP', '🌾');
    } else {
      onTileClick(tile);
    }
  };

  // Background Click (clears selection and closes menu)
  const handleBackgroundClick = () => {
    setSelectedTile(null);
    setMenuScreenPos(null);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.65, prev - 0.1));
  const handleResetCamera = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Character Click Handlers
  const handleCharacterClick = (character: CharacterType) => {
    soundEngine.playClick();
    soundEngine.playCharacterVoice(character);
    const charProfile = CHARACTERS[character];

    if (character === 'SPARK') {
      if (hasPendingHomework) {
        triggerDialog(
          'SPARK',
          isArabic
            ? 'تنبيه! استلمت مهمة دراسية جديدة من معلمك! أجب على الأسئلة لكسب الذهب ونقاط الخبرة!'
            : 'Alert! New educational mission received from your teacher! Solve questions to earn gold & XP!',
          isArabic ? 'سبارك: مهمة دراسية جاهزة!' : 'Spark: Homework Mission Ready!',
          isArabic ? 'فتح الواجب الآن 📚' : 'Open Homework 📚',
          onOpenHomework
        );
      } else {
        triggerDialog(
          'SPARK',
          isArabic ? charProfile.dialogues.greeting.ar : charProfile.dialogues.greeting.en,
          isArabic ? 'سبارك: الأنظمة تعمل بكفاءة' : 'Spark: All Systems Nominal',
          isArabic ? 'مركز الواجبات' : 'Homework Hub',
          onOpenHomework
        );
      }
    } else if (character === 'FOXY') {
      triggerDialog(
        'FOXY',
        isArabic ? charProfile.dialogues.greeting.ar : charProfile.dialogues.greeting.en,
        isArabic ? 'فوكسي: مرحباً بك في المزرعة!' : 'Foxy: Welcome to the Farm!',
        isArabic ? 'زيارة متجر البذور 🌱' : 'Visit Seed Shop 🌱',
        onOpenShop
      );
    } else if (character === 'ADAM') {
      triggerDialog(
        'ADAM',
        isArabic ? charProfile.dialogues.greeting.ar : charProfile.dialogues.greeting.en,
        isArabic ? 'آدم: بطل الاستكشاف والرياضيات' : 'Adam: Math & Science Companion',
        isArabic ? 'عرض مسائل الرياضيات 🔍' : 'View Math Puzzles 🔍',
        onOpenHomework
      );
    } else if (character === 'TALIA') {
      triggerDialog(
        'TALIA',
        isArabic ? charProfile.dialogues.greeting.ar : charProfile.dialogues.greeting.en,
        isArabic ? 'تاليا: عالمة النبات واللغات' : 'Talia: Botany & Language Companion',
        isArabic ? 'شراء بذور الزهور 🌸' : 'Shop Flower Seeds 🌸',
        onOpenShop
      );
    }
  };

  // Sort tiles by depth (Z-Index calculation: (x + y) * 100)
  const sortedTiles = [...tiles].sort((a, b) => a.x + a.y - (b.x + b.y));

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackgroundClick}
      className="relative w-full h-[calc(100vh-125px)] min-h-[500px] overflow-hidden bg-linear-to-b from-[#A5D6A7] via-[#81C784] to-[#689F38] cursor-grab active:cursor-grabbing select-none"
    >
      {/* Dynamic Environmental Layer: Drifting Cloud Shadows & Sunbeams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Cloud Shadow 1 */}
        <div className="absolute -top-20 w-96 h-48 bg-black/10 rounded-full blur-3xl animate-cloud-drift-1" />
        {/* Soft Cloud Shadow 2 */}
        <div className="absolute top-1/2 w-[500px] h-64 bg-black/10 rounded-full blur-3xl animate-cloud-drift-2" />
        
        {/* Natural Floating Butterflies */}
        <div className="absolute top-1/4 left-1/5 text-xl animate-float-slow opacity-80 pointer-events-none">
          🦋
        </div>
        <div className="absolute top-2/3 right-1/4 text-lg animate-float opacity-75 pointer-events-none">
          🐝
        </div>
      </div>

      {/* Main Isometric Game Stage (Scaled and Panned) */}
      <div
        className="absolute transition-transform duration-75 origin-center will-change-transform"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: '1000px',
          height: '750px',
          left: 'calc(50% - 500px)',
          top: 'calc(50% - 375px)',
        }}
      >
        {/* Isometric Terrain & Object Depth Sorted Layers */}
        {sortedTiles.map((tile) => {
          const { x: screenX, y: screenY } = getScreenCoords(tile.x, tile.y);
          const zIndexBase = (tile.x + tile.y) * 10;
          const isSelected = selectedTile?.id === tile.id;
          const isHovered = hoveredTileId === tile.id;

          return (
            <React.Fragment key={tile.id}>
              {/* 1. Base Terrain Isometric Slab */}
              <div
                style={{
                  position: 'absolute',
                  left: `${screenX}px`,
                  top: `${screenY}px`,
                  zIndex: zIndexBase,
                }}
              >
                <IsometricTile
                  tile={tile}
                  isSelected={isSelected}
                  isHovered={isHovered}
                  onClick={handleTileSelect}
                  onMouseEnter={() => setHoveredTileId(tile.id)}
                  onMouseLeave={() => setHoveredTileId(null)}
                />
              </div>

              {/* 2. Crop Layer (if tile has planted crop) */}
              {tile.cropId && tile.type === 'soil' && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${screenX}px`,
                    top: `${screenY}px`,
                    zIndex: zIndexBase + 2,
                    pointerEvents: 'none',
                  }}
                >
                  <IsometricCrop
                    tile={tile}
                    isSelected={isSelected}
                    onClick={handleTileSelect}
                    isArabic={isArabic}
                  />
                </div>
              )}

              {/* 3. Living Animal Layer (if tile has animal) */}
              {tile.animalId && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${screenX}px`,
                    top: `${screenY}px`,
                    zIndex: zIndexBase + 3,
                    pointerEvents: 'none',
                  }}
                >
                  <IsometricAnimal
                    tile={tile}
                    isSelected={isSelected}
                    onClick={handleTileSelect}
                    isArabic={isArabic}
                  />
                </div>
              )}

              {/* 4. Isometric Building Layer (Farmhouse, Barn, Windmill, Lab, etc.) */}
              {tile.buildingId && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${screenX}px`,
                    top: `${screenY}px`,
                    zIndex: zIndexBase + 4,
                    pointerEvents: 'none',
                  }}
                >
                  <IsometricBuilding
                    buildingId={tile.buildingId}
                    isSelected={isSelected}
                    onClick={(e) => handleTileSelect(tile, e)}
                    isArabic={isArabic}
                  />
                </div>
              )}

              {/* 5. Special Decoration Props (Flowerbeds, Papyrus urns, etc.) */}
              {tile.decorationId && (
                <div
                  className="absolute pointer-events-none select-none text-3xl animate-sway"
                  style={{
                    left: `${screenX + 35}px`,
                    top: `${screenY + 5}px`,
                    zIndex: zIndexBase + 2,
                  }}
                >
                  {tile.decorationId === 'flower_patch'
                    ? '💐'
                    : tile.decorationId === 'solar_lamp'
                    ? '🏮'
                    : '🏺'}
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Physical Living Characters In The Farm World */}
        {/* Foxy near the Farmhouse */}
        <IsometricCharacter
          type="FOXY"
          position={{ x: worldCenterX - 10, y: worldCenterY + 45 }}
          onClick={handleCharacterClick}
          isArabic={isArabic}
        />

        {/* Adam near the crop field */}
        <IsometricCharacter
          type="ADAM"
          position={{ x: worldCenterX + 90, y: worldCenterY + 160 }}
          onClick={handleCharacterClick}
          isArabic={isArabic}
        />

        {/* Talia near the animal pasture */}
        <IsometricCharacter
          type="TALIA"
          position={{ x: worldCenterX + 220, y: worldCenterY + 100 }}
          onClick={handleCharacterClick}
          isArabic={isArabic}
        />

        {/* Spark the Robot floating above mission zone with glowing alert */}
        <IsometricCharacter
          type="SPARK"
          position={{ x: worldCenterX + 160, y: worldCenterY + 20 }}
          hasMissionAlert={hasPendingHomework}
          onClick={handleCharacterClick}
          isArabic={isArabic}
        />

        {/* Floating Reward Particle Effects (+Coins, +XP) */}
        <FloatingRewardParticles particles={particles} />

        {/* Contextual Action Menu Popup Anchored Above Selected Tile */}
        {selectedTile && menuScreenPos && (
          <FloatingActionMenu
            tile={selectedTile}
            screenPos={menuScreenPos}
            inventory={inventory}
            selectedSeedId={selectedSeedId}
            onPlant={(id, cropId) => {
              onPlant(id, cropId);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '🌱 Planted!', undefined, '🌾');
            }}
            onWater={(id) => {
              onWater(id);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '💧 Watered!', undefined, '✨');
            }}
            onHarvest={(id) => {
              onHarvest(id);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '+25 🪙', '+12 XP', '🌾');
            }}
            onFeedAnimal={(id) => {
              onFeedAnimal(id);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '🥛 Collected!', '+35 XP', '✨');
            }}
            onPlow={(id) => {
              onPlow(id);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '⛏️ Soil Plowed!', undefined, '🌱');
            }}
            onUnlockLand={(id) => {
              onUnlockLand(id);
              spawnReward(menuScreenPos.x, menuScreenPos.y, '🎉 Land Unlocked!', '+50 XP', '⭐');
            }}
            onSelectSeed={onSelectSeed}
            onOpenShop={onOpenShop}
            onClose={() => {
              setSelectedTile(null);
              setMenuScreenPos(null);
            }}
            isArabic={isArabic}
          />
        )}
      </div>

      {/* Floating Camera & Navigation Controls (Top Right Overlay) */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg select-none">
        <button
          onClick={handleZoomIn}
          title={isArabic ? 'تكبير المشهد' : 'Zoom In'}
          className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title={isArabic ? 'تصغير المشهد' : 'Zoom Out'}
          className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetCamera}
          title={isArabic ? 'إعادة ضبط الكاميرا' : 'Center Farm'}
          className="w-8 h-8 rounded-xl bg-[#FDD835] hover:bg-[#FBC02D] text-amber-950 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
        >
          <Compass className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* SPARK MISSION QUICK LAUNCHER (Bottom Left Floating Widget) */}
      {hasPendingHomework && (
        <div
          onClick={onOpenHomework}
          className="absolute bottom-4 left-4 z-40 bg-linear-to-r from-[#00E5FF] via-[#00B0FF] to-[#2979FF] text-slate-950 font-black px-3.5 py-2 rounded-2xl border-2 border-white shadow-[0_6px_20px_rgba(0,229,255,0.6)] flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all animate-bounce"
        >
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-lg shadow-xs animate-pulse">
            🤖
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider text-slate-800">
              {isArabic ? 'مهمة تعليمية جاهزة!' : 'New Mission Available!'}
            </span>
            <span className="text-xs font-black text-slate-950">
              {isArabic ? '⚡ افتح مهمة سبارك الآن' : '⚡ Open Spark Mission'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
