import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useTranslation } from '../../i18n';
import { IsometricFarmWorld } from './IsometricFarmWorld';
import { HappyFarmBottomBar } from '../happyFarm/HappyFarmBottomBar';
import { NeighborVisitModal } from '../happyFarm/NeighborVisitModal';
import { DinarBonusModal } from '../happyFarm/DinarBonusModal';
import { User } from '../../types';

interface FarmCanvasProps {
  onOpenShop: () => void;
  onOpenInventory: () => void;
  onOpenHomework: () => void;
  onOpenAchievements: () => void;
  onOpenTeacher?: () => void;
  isArabic?: boolean;
}

export const FarmCanvas: React.FC<FarmCanvasProps> = ({
  onOpenShop,
  onOpenInventory,
  onOpenHomework,
  onOpenAchievements,
  onOpenTeacher = () => {},
}) => {
  const {
    farmTiles,
    studentProfile,
    selectedSeedId,
    homeworks,
    submissions,
    handleTileClick,
    plantCrop,
    waterCrop,
    harvestCrop,
    feedAnimal,
    plowSoil,
    unlockLandTile,
    setSelectedSeedId,
  } = useGame();

  const { language } = useTranslation();
  const isArabic = language === 'ar';

  const [visitingNeighbor, setVisitingNeighbor] = useState<User | null>(null);
  const [showDinarModal, setShowDinarModal] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Check if student has pending unsubmitted homework
  const submittedHwIds = new Set(submissions.map((s) => s.homeworkId));
  const pendingHomeworkCount = homeworks.filter((h) => !submittedHwIds.has(h.id)).length;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.65, prev - 0.1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden bg-[#689F38] flex flex-col justify-between select-none">
      
      {/* 2.5D Isometric Continuous Farm World Engine */}
      <div className="flex-1 relative overflow-hidden">
        <IsometricFarmWorld
          tiles={farmTiles}
          inventory={studentProfile.inventory}
          selectedSeedId={selectedSeedId}
          onTileClick={handleTileClick}
          onPlant={plantCrop}
          onWater={waterCrop}
          onHarvest={harvestCrop}
          onFeedAnimal={feedAnimal}
          onPlow={plowSoil}
          onUnlockLand={unlockLandTile}
          onSelectSeed={setSelectedSeedId}
          onOpenShop={onOpenShop}
          onOpenHomework={onOpenHomework}
          onOpenTeacher={onOpenTeacher}
          hasPendingHomework={pendingHomeworkCount > 0}
          isArabic={isArabic}
        />
      </div>

      {/* Classic Happy Farm Bottom Toolbar with Quick Seed Bag Ribbon & Tools */}
      <div className="relative z-30 pb-2 px-2">
        <HappyFarmBottomBar
          onOpenShop={onOpenShop}
          onOpenInventory={onOpenInventory}
          onOpenHomework={onOpenHomework}
          onOpenAchievements={onOpenAchievements}
          onVisitNeighbor={(neighbor) => setVisitingNeighbor(neighbor)}
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          isArabic={isArabic}
        />
      </div>

      {/* Neighbor Farm Visit Modal */}
      {visitingNeighbor && (
        <NeighborVisitModal
          neighbor={visitingNeighbor}
          onClose={() => setVisitingNeighbor(null)}
          isArabic={isArabic}
        />
      )}

      {/* Free Dinars Bonus Modal */}
      {showDinarModal && (
        <DinarBonusModal
          onClose={() => setShowDinarModal(false)}
          isArabic={isArabic}
        />
      )}
    </div>
  );
};
