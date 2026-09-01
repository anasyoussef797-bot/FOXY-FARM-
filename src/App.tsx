import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IsometricFarmBoard } from './components/IsometricFarmBoard';
import { StorageModal } from './components/StorageModal';
import { MissionsView } from './components/MissionsView';
import { MarketView } from './components/MarketView';
import { AchievementsView } from './components/AchievementsView';
import { ModelExplorer3D } from './components/ModelExplorer3D';
import { AIMentorModal } from './components/AIMentorModal';
import { CharactersModal } from './components/CharactersModal';
import {
  CROPS_DATA,
  INITIAL_PLOTS,
  INITIAL_ANIMALS,
  HOMEWORK_MISSIONS,
  MARKET_UPGRADES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_USER_STATS,
} from './data/initialData';
import { FarmPlot, CropType, UserStats, Animal, HomeworkMission, MarketUpgrade, Achievement, GameTool } from './types';
import confetti from 'canvas-confetti';
import {
  playHarvestSound,
  playWaterSound,
  playPlantSound,
  playCoinSound,
  playLevelUpSound,
  playPopSound,
} from './utils/audio';

const STORAGE_KEY_PREFIX = 'foxy_farm_v2_';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [viewMode, setViewMode] = useState<'farm' | '3d-lab'>('farm');
  const [activeTool, setActiveTool] = useState<GameTool>('select');
  const [selectedSeed, setSelectedSeed] = useState<CropType>('corn');

  // Modals state
  const [isStorageOpen, setIsStorageOpen] = useState<boolean>(false);
  const [isMissionsOpen, setIsMissionsOpen] = useState<boolean>(false);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState<boolean>(false);
  const [aiMentorTopic, setAIMentorTopic] = useState<string>('');
  const [isCharactersOpen, setIsCharactersOpen] = useState<boolean>(false);

  // User Stats State
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_USER_STATS;
  });

  // Plots State
  const [plots, setPlots] = useState<FarmPlot[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'plots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_PLOTS;
  });

  // Animals State
  const [animals, setAnimals] = useState<Animal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'animals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ANIMALS;
  });

  // Missions State
  const [missions, setMissions] = useState<HomeworkMission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'missions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return HOMEWORK_MISSIONS;
  });

  // Upgrades State
  const [upgrades, setUpgrades] = useState<MarketUpgrade[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'upgrades');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return MARKET_UPGRADES;
  });

  // Achievements State
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'plots', JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'animals', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'upgrades', JSON.stringify(upgrades));
  }, [upgrades]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Gameloop: Crop Growth & Animal Production Timers
  useEffect(() => {
    const dripUpgradeLvl = upgrades.find((u) => u.id === 'solar-drip')?.level || 0;
    const compostUpgradeLvl = upgrades.find((u) => u.id === 'compost-accelerator')?.level || 0;

    const interval = setInterval(() => {
      // 1. Crop Growth
      setPlots((prevPlots) =>
        prevPlots.map((plot) => {
          if (!plot.unlocked || !plot.crop || plot.growthProgress >= 100) {
            return plot;
          }

          const cropDef = CROPS_DATA[plot.crop];
          // Growth speed multiplier: watered = 1.0, dry = 0.2, upgrades boost
          const speedMultiplier = (plot.isWatered ? 1.0 : 0.2) * (1 + dripUpgradeLvl * 0.25);
          const increment = (100 / cropDef.growthTimeSeconds) * speedMultiplier;
          const newProgress = Math.min(100, plot.growthProgress + increment);
          const isReady = newProgress >= 100;

          return {
            ...plot,
            growthProgress: newProgress,
            isReadyToHarvest: isReady,
          };
        })
      );

      // 2. Animal production
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => {
          if (animal.isProductReady) return animal;
          const now = Date.now();
          const elapsed = (now - animal.lastProducedAt) / 1000;
          if (elapsed >= animal.productionTimeSeconds) {
            return {
              ...animal,
              isProductReady: true,
            };
          }
          return animal;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [upgrades]);

  // Passive Solar Pumping Generator
  useEffect(() => {
    const solarPumpLvl = upgrades.find((u) => u.id === 'solar-panels')?.level || 0;
    if (solarPumpLvl <= 0) return;

    const interval = setInterval(() => {
      setUserStats((prev) => ({
        ...prev,
        waterDroplets: prev.waterDroplets + solarPumpLvl * 2,
        solarEnergy: Math.min(100, prev.solarEnergy + 5),
      }));
    }, 12000);

    return () => clearInterval(interval);
  }, [upgrades]);

  // Check Level Up
  const addXpAndCheckLevel = (currentStats: UserStats, xpEarned: number): UserStats => {
    const newXp = currentStats.xp + xpEarned;
    const newLevel = Math.floor(newXp / 100) + 1;

    if (newLevel > currentStats.level) {
      playLevelUpSound();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#eab308', '#22c55e', '#38bdf8', '#ec4899'],
      });
    }

    return {
      ...currentStats,
      xp: newXp,
      level: newLevel,
    };
  };

  // Handlers
  const handlePlant = (plotId: number, crop: CropType) => {
    const seedCount = userStats.seedsInventory[crop] || 0;
    if (seedCount <= 0) return;

    // Deduct seed
    setUserStats((prev) => ({
      ...prev,
      seedsInventory: {
        ...prev.seedsInventory,
        [crop]: seedCount - 1,
      },
    }));

    setPlots((prev) =>
      prev.map((p) =>
        p.id === plotId
          ? {
              ...p,
              crop,
              plantedAt: Date.now(),
              growthProgress: 0,
              isWatered: false,
              isFertilized: false,
              isReadyToHarvest: false,
            }
          : p
      )
    );
  };

  const handleWater = (plotId: number) => {
    if (userStats.waterDroplets <= 0) return;

    setUserStats((prev) => ({
      ...prev,
      waterDroplets: prev.waterDroplets - 1,
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, isWatered: true } : p))
    );
  };

  const handleFertilize = (plotId: number) => {
    if (userStats.organicFertilizer <= 0) return;

    setUserStats((prev) => ({
      ...prev,
      organicFertilizer: prev.organicFertilizer - 1,
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, isFertilized: true } : p))
    );
  };

  const handleHarvest = (plotId: number) => {
    const plot = plots.find((p) => p.id === plotId);
    if (!plot || !plot.crop || !plot.isReadyToHarvest) return;

    const cropDef = CROPS_DATA[plot.crop];
    const cropName = lang === 'ar' ? cropDef.nameAr : cropDef.name;

    // Add to Silo Harvest Inventory
    setUserStats((prev) => {
      const currentCount = prev.harvestInventory[cropName] || 0;
      const updatedStats = {
        ...prev,
        harvestInventory: {
          ...prev.harvestInventory,
          [cropName]: currentCount + 1,
        },
        harvestedCropsCount: prev.harvestedCropsCount + 1,
      };
      return addXpAndCheckLevel(updatedStats, cropDef.xpReward);
    });

    // Reset plot
    setPlots((prev) =>
      prev.map((p) =>
        p.id === plotId
          ? {
              ...p,
              crop: null,
              plantedAt: null,
              growthProgress: 0,
              isWatered: false,
              isFertilized: false,
              isReadyToHarvest: false,
            }
          : p
      )
    );

    // Update Achievement progress
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'first-harvest') {
          return { ...ach, progress: 1, unlocked: true };
        }
        if (ach.id === 'crop-master') {
          const nextProg = Math.min(ach.maxProgress, ach.progress + 1);
          return { ...ach, progress: nextProg, unlocked: nextProg >= ach.maxProgress };
        }
        return ach;
      })
    );
  };

  const handleHarvestAll = () => {
    const readyPlots = plots.filter((p) => p.unlocked && p.isReadyToHarvest && p.crop);
    readyPlots.forEach((p) => handleHarvest(p.id));
  };

  const handleWaterAll = () => {
    const unwateredPlots = plots.filter((p) => p.unlocked && p.crop && !p.isWatered);
    if (unwateredPlots.length === 0 || userStats.waterDroplets <= 0) return;

    const waterToUse = Math.min(userStats.waterDroplets, unwateredPlots.length);
    setUserStats((prev) => ({
      ...prev,
      waterDroplets: prev.waterDroplets - waterToUse,
    }));

    setPlots((prev) =>
      prev.map((p) => {
        if (p.unlocked && p.crop && !p.isWatered) {
          return { ...p, isWatered: true };
        }
        return p;
      })
    );
  };

  const handleUnlockPlot = (plotId: number) => {
    const plot = plots.find((p) => p.id === plotId);
    if (!plot || plot.unlocked || userStats.coins < plot.unlockCost) return;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - plot.unlockCost,
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, unlocked: true } : p))
    );
  };

  const handleCollectAnimalProduct = (animalId: string) => {
    const animal = animals.find((a) => a.id === animalId);
    if (!animal || !animal.isProductReady) return;

    const prodName = lang === 'ar' ? animal.productNameAr : animal.productName;

    setUserStats((prev) => {
      const currentCount = prev.harvestInventory[prodName] || 0;
      const updated = {
        ...prev,
        harvestInventory: {
          ...prev.harvestInventory,
          [prodName]: currentCount + 1,
        },
      };
      return addXpAndCheckLevel(updated, 25);
    });

    setAnimals((prev) =>
      prev.map((a) =>
        a.id === animalId
          ? {
              ...a,
              isProductReady: false,
              lastProducedAt: Date.now(),
            }
          : a
      )
    );

    // Update Animal Whisperer Achievement
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'animal-whisperer') {
          const nextProg = Math.min(ach.maxProgress, ach.progress + 1);
          return { ...ach, progress: nextProg, unlocked: nextProg >= ach.maxProgress };
        }
        return ach;
      })
    );
  };

  const handleCompleteMission = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isCompleted) return;

    // Grant rewards
    setUserStats((prev) => {
      const cropKey = mission.rewardSeeds.crop;
      const seedCount = prev.seedsInventory[cropKey] || 0;

      const updated = {
        ...prev,
        coins: prev.coins + mission.rewardCoins,
        dinars: prev.dinars + (mission.rewardDinars || 5),
        waterDroplets: prev.waterDroplets + mission.rewardWater,
        completedMissionsCount: prev.completedMissionsCount + 1,
        seedsInventory: {
          ...prev.seedsInventory,
          [cropKey]: seedCount + mission.rewardSeeds.count,
        },
      };
      return addXpAndCheckLevel(updated, mission.rewardXp);
    });

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isCompleted: true } : m))
    );

    // Update Homework Hero Achievement
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'homework-hero') {
          const nextProg = Math.min(ach.maxProgress, ach.progress + 1);
          return { ...ach, progress: nextProg, unlocked: nextProg >= ach.maxProgress };
        }
        return ach;
      })
    );
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade || userStats.coins < upgrade.cost || upgrade.level >= upgrade.maxLevel) return;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - upgrade.cost,
    }));

    setUpgrades((prev) =>
      prev.map((u) =>
        u.id === upgradeId
          ? {
              ...u,
              level: u.level + 1,
              cost: Math.round(u.cost * 1.5),
            }
          : u
      )
    );
  };

  const handleBuySeed = (cropKey: CropType, quantity: number) => {
    const crop = CROPS_DATA[cropKey];
    const totalCost = crop.seedCost * quantity;
    if (userStats.coins < totalCost) return;

    setUserStats((prev) => {
      const current = prev.seedsInventory[cropKey] || 0;
      return {
        ...prev,
        coins: prev.coins - totalCost,
        seedsInventory: {
          ...prev.seedsInventory,
          [cropKey]: current + quantity,
        },
      };
    });
  };

  const handleSellStorageItem = (itemName: string, count: number, pricePerUnit: number) => {
    const currentCount = userStats.harvestInventory[itemName] || 0;
    if (currentCount <= 0) return;

    const countToSell = Math.min(currentCount, count);
    const earnedCoins = countToSell * pricePerUnit;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + earnedCoins,
      harvestInventory: {
        ...prev.harvestInventory,
        [itemName]: currentCount - countToSell,
      },
    }));
  };

  const handleSellAllStorage = () => {
    let totalCoinsEarned = 0;
    const newInventory = { ...userStats.harvestInventory };

    Object.entries(newInventory).forEach(([name, count]) => {
      if (count > 0) {
        // Find price
        let price = 25;
        for (const k of Object.keys(CROPS_DATA)) {
          const c = CROPS_DATA[k as CropType];
          if (c.name === name || c.nameAr === name) {
            price = c.sellPrice;
            break;
          }
        }
        totalCoinsEarned += price * count;
        newInventory[name] = 0;
      }
    });

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + totalCoinsEarned,
      harvestInventory: newInventory,
    }));
  };

  return (
    <div className="min-h-screen bg-[#10220a] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top HUD Game Header (Matching 1.png) */}
      <Navbar
        userStats={userStats}
        onUpdateStats={setUserStats}
        lang={lang}
        setLang={setLang}
        onOpenCharacters={() => setIsCharactersOpen(true)}
        onOpenAIMentor={() => {
          setAIMentorTopic('');
          setIsAIMentorOpen(true);
        }}
        onOpenMissions={() => setIsMissionsOpen(true)}
        onOpenMarket={() => setIsMarketOpen(true)}
        onOpenStorage={() => setIsStorageOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {viewMode === 'farm' ? (
          <IsometricFarmBoard
            plots={plots}
            animals={animals}
            userStats={userStats}
            selectedSeed={selectedSeed}
            setSelectedSeed={setSelectedSeed}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            onPlant={handlePlant}
            onWater={handleWater}
            onFertilize={handleFertilize}
            onHarvest={handleHarvest}
            onHarvestAll={handleHarvestAll}
            onWaterAll={handleWaterAll}
            onUnlockPlot={handleUnlockPlot}
            onCollectAnimalProduct={handleCollectAnimalProduct}
            onOpenMissions={() => setIsMissionsOpen(true)}
            onOpenMarket={() => setIsMarketOpen(true)}
            onOpenStorage={() => setIsStorageOpen(true)}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            onOpenAIMentor={() => {
              setAIMentorTopic('');
              setIsAIMentorOpen(true);
            }}
            onOpenCharacters={() => setIsCharactersOpen(true)}
            lang={lang}
          />
        ) : (
          <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full flex-1">
            <ModelExplorer3D />
          </div>
        )}
      </main>

      {/* Silo & Storage Inventory Modal */}
      <StorageModal
        isOpen={isStorageOpen}
        onClose={() => setIsStorageOpen(false)}
        userStats={userStats}
        onSellItem={handleSellStorageItem}
        onSellAll={handleSellAllStorage}
        lang={lang}
      />

      {/* Homework Missions Modal */}
      {isMissionsOpen && (
        <MissionsView
          missions={missions}
          userStats={userStats}
          onCompleteMission={handleCompleteMission}
          onOpenAIMentor={(topic) => {
            setAIMentorTopic(topic || '');
            setIsMissionsOpen(false);
            setIsAIMentorOpen(true);
          }}
          lang={lang}
          isModal={true}
          onClose={() => setIsMissionsOpen(false)}
        />
      )}

      {/* Market & Upgrades Modal */}
      {isMarketOpen && (
        <MarketView
          upgrades={upgrades}
          userStats={userStats}
          onBuyUpgrade={handleBuyUpgrade}
          onSellCrop={() => {}}
          onBuySeed={handleBuySeed}
          lang={lang}
          isModal={true}
          onClose={() => setIsMarketOpen(false)}
        />
      )}

      {/* Achievements Modal */}
      {isAchievementsOpen && (
        <AchievementsView
          achievements={achievements}
          userStats={userStats}
          lang={lang}
          isModal={true}
          onClose={() => setIsAchievementsOpen(false)}
        />
      )}

      {/* Spark AI Mentor Modal */}
      <AIMentorModal
        isOpen={isAIMentorOpen}
        onClose={() => setIsAIMentorOpen(false)}
        initialTopic={aiMentorTopic}
        lang={lang}
      />

      {/* Characters Squad Modal */}
      <CharactersModal
        isOpen={isCharactersOpen}
        onClose={() => setIsCharactersOpen(false)}
        lang={lang}
      />
    </div>
  );
}
