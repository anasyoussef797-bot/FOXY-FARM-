import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FarmCanvas3D } from './components/FarmCanvas3D';
import { FarmGrid } from './components/FarmGrid';
import { MissionsView } from './components/MissionsView';
import { AnimalsView } from './components/AnimalsView';
import { MarketView } from './components/MarketView';
import { ModelExplorer3D } from './components/ModelExplorer3D';
import { AchievementsView } from './components/AchievementsView';
import { AIMentorModal } from './components/AIMentorModal';
import { CharactersModal } from './components/CharactersModal';
import {
  CROPS_DATA,
  INITIAL_PLOTS,
  INITIAL_ANIMALS,
  HOMEWORK_MISSIONS,
  MARKET_UPGRADES,
  INITIAL_ACHIEVEMENTS,
} from './data/initialData';
import { FarmPlot, CropType, UserStats, Animal, HomeworkMission, MarketUpgrade, Achievement } from './types';
import { Sparkles, Sprout, Sun, Droplets, BookOpen, Heart, Trophy, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY_PREFIX = 'foxy_farm_v1_';

export default function App() {
  const [activeTab, setActiveTab] = useState<'farm' | 'missions' | 'animals' | 'market' | '3d-lab' | 'achievements'>('farm');
  const [view3DMode, setView3DMode] = useState<'split' | '3d-only' | 'grid-only'>('split');
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [aiMentorTopic, setAIMentorTopic] = useState('');
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Core State
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      coins: 120,
      xp: 0,
      level: 1,
      waterDroplets: 15,
      solarEnergy: 20,
      organicFertilizer: 4,
      seedsInventory: {
        carrot: 5,
        wheat: 3,
        melon: 2,
        pumpkin: 1,
        strawberry: 2,
        tomato: 2,
        flax: 1,
      },
      harvestInventory: {
        carrot: 2,
        wheat: 1,
      },
      completedMissionsCount: 0,
      harvestedCropsCount: 0,
      studyStreakDays: 3,
    };
  });

  const [plots, setPlots] = useState<FarmPlot[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'plots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_PLOTS;
  });

  const [animals, setAnimals] = useState<Animal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'animals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ANIMALS;
  });

  const [missions, setMissions] = useState<HomeworkMission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'missions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return HOMEWORK_MISSIONS;
  });

  const [upgrades, setUpgrades] = useState<MarketUpgrade[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'upgrades');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return MARKET_UPGRADES;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_ACHIEVEMENTS;
  });

  // Save to localStorage
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

  // Show quick toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Gameloop: Crop Growth & Passive Tech Generation
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Crop Growth
      setPlots((prevPlots) =>
        prevPlots.map((plot) => {
          if (!plot.unlocked || !plot.crop || plot.growthProgress >= 100) {
            return plot;
          }

          const cropDef = CROPS_DATA[plot.crop];
          // Growth speed multiplier: watered = 1.0, dry = 0.2, fertilized = +0.5
          const speedMultiplier = (plot.isWatered ? 1.0 : 0.2) * (plot.isFertilized ? 1.5 : 1.0);
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

      // 2. Animal product generation
      setAnimals((prevAnimals) =>
        prevAnimals.map((animal) => {
          if (animal.isProductReady || animal.hunger < 20) return animal;
          const now = Date.now();
          const elapsed = (now - animal.lastProducedAt) / 1000;
          if (elapsed >= animal.productionTimeSeconds) {
            return {
              ...animal,
              isProductReady: true,
              hunger: Math.max(0, animal.hunger - 15),
            };
          }
          return animal;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [upgrades]);

  // Passive Solar Pump & Drip Generation timer
  useEffect(() => {
    const solarPumpLvl = upgrades.find((u) => u.id === 'solar-pumps')?.level || 0;
    const interval = setInterval(() => {
      setUserStats((prev) => ({
        ...prev,
        solarEnergy: prev.solarEnergy + 1,
        waterDroplets: prev.waterDroplets + (solarPumpLvl > 0 ? solarPumpLvl : 0),
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, [upgrades]);

  // Actions
  const handlePlant = (plotId: number, crop: CropType) => {
    if ((userStats.seedsInventory[crop] || 0) <= 0) {
      showToast(`⚠️ No ${CROPS_DATA[crop].name} seeds in inventory! Complete missions or buy in market.`);
      return;
    }

    // Deduct seed
    setUserStats((prev) => ({
      ...prev,
      seedsInventory: {
        ...prev.seedsInventory,
        [crop]: Math.max(0, prev.seedsInventory[crop] - 1),
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
              isWatered: true, // initial planting watering
              isFertilized: false,
              isReadyToHarvest: false,
            }
          : p
      )
    );

    showToast(`🌱 Planted ${CROPS_DATA[crop].name} in Plot #${plotId}!`);
  };

  const handleWater = (plotId: number) => {
    if (userStats.waterDroplets < 1) {
      showToast('⚠️ Out of water droplets! Solve science homework missions to earn water.');
      return;
    }

    setUserStats((prev) => ({
      ...prev,
      waterDroplets: Math.max(0, prev.waterDroplets - 1),
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, isWatered: true } : p))
    );
    showToast(`💧 Soil Plot #${plotId} hydrated!`);
  };

  const handleFertilize = (plotId: number) => {
    if (userStats.organicFertilizer < 1) {
      showToast('⚠️ No bio-compost fertilizer! Care for farm animals to collect compost.');
      return;
    }

    setUserStats((prev) => ({
      ...prev,
      organicFertilizer: Math.max(0, prev.organicFertilizer - 1),
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, isFertilized: true } : p))
    );
    showToast(`✨ Organic bio-compost added to Plot #${plotId}! (+50% Speed)`);
  };

  const handleHarvest = (plotId: number) => {
    const targetPlot = plots.find((p) => p.id === plotId);
    if (!targetPlot || !targetPlot.crop || !targetPlot.isReadyToHarvest) return;

    const cropDef = CROPS_DATA[targetPlot.crop];
    const newHarvestCount = userStats.harvestedCropsCount + 1;
    const newXp = userStats.xp + cropDef.xpReward;
    const newLevel = Math.floor(newXp / 100) + 1;

    setUserStats((prev) => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      harvestedCropsCount: newHarvestCount,
      harvestInventory: {
        ...prev.harvestInventory,
        [targetPlot.crop!]: (prev.harvestInventory[targetPlot.crop!] || 0) + 1,
      },
    }));

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

    // Achievements check
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'first-harvest') {
          return { ...ach, unlocked: true, progress: 1 };
        }
        if (ach.id === 'crop-master') {
          const prog = Math.min(ach.maxProgress, newHarvestCount);
          return { ...ach, progress: prog, unlocked: prog >= ach.maxProgress };
        }
        return ach;
      })
    );

    showToast(`🌾 Harvested 1x ${cropDef.name}! (+${cropDef.xpReward} XP)`);
  };

  const handleUnlockPlot = (plotId: number) => {
    const targetPlot = plots.find((p) => p.id === plotId);
    if (!targetPlot || userStats.coins < targetPlot.unlockCost) return;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - targetPlot.unlockCost,
    }));

    setPlots((prev) =>
      prev.map((p) => (p.id === plotId ? { ...p, unlocked: true } : p))
    );

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
    });

    showToast(`🎉 Soil Plot #${plotId} is now unlocked for cultivation!`);
  };

  const handleFeedAnimal = (animalId: string) => {
    const animal = animals.find((a) => a.id === animalId);
    if (!animal) return;

    const favFood = animal.favoriteFood;
    if ((userStats.harvestInventory[favFood] || 0) <= 0) {
      showToast(`⚠️ You need ${CROPS_DATA[favFood].name} to feed ${animal.name}!`);
      return;
    }

    setUserStats((prev) => ({
      ...prev,
      harvestInventory: {
        ...prev.harvestInventory,
        [favFood]: prev.harvestInventory[favFood] - 1,
      },
      organicFertilizer: prev.organicFertilizer + 1,
    }));

    setAnimals((prev) =>
      prev.map((a) =>
        a.id === animalId
          ? {
              ...a,
              hunger: 100,
              happiness: Math.min(100, a.happiness + 15),
              lastFedAt: Date.now(),
            }
          : a
      )
    );

    showToast(`🥣 Fed ${animal.name}! Collected +1 Bio-Compost Fertilizer ✨`);
  };

  const handleCollectAnimalProduct = (animalId: string) => {
    const animal = animals.find((a) => a.id === animalId);
    if (!animal || !animal.isProductReady) return;

    const coinReward = 35;
    const xpReward = 20;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + coinReward,
      xp: prev.xp + xpReward,
      harvestInventory: {
        ...prev.harvestInventory,
        [animal.productName]: (prev.harvestInventory[animal.productName] || 0) + 1,
      },
    }));

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

    // Achievements
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'animal-whisperer') {
          const prog = Math.min(ach.maxProgress, ach.progress + 1);
          return { ...ach, progress: prog, unlocked: prog >= ach.maxProgress };
        }
        return ach;
      })
    );

    showToast(`🧺 Collected ${animal.productEmoji} ${animal.productName}! (+${coinReward} 🪙)`);
  };

  const handleSellCrop = (cropKey: string, quantity: number) => {
    const inStock = userStats.harvestInventory[cropKey] || 0;
    if (inStock < quantity || quantity <= 0) return;

    const cropDef = (CROPS_DATA as any)[cropKey];
    const unitPrice = cropDef ? cropDef.sellPrice : 30;
    const totalEarnings = unitPrice * quantity;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + totalEarnings,
      harvestInventory: {
        ...prev.harvestInventory,
        [cropKey]: inStock - quantity,
      },
    }));

    showToast(`💰 Sold ${quantity}x ${cropDef?.name || cropKey} for +${totalEarnings} 🪙!`);
  };

  const handleBuySeed = (cropKey: CropType, quantity: number) => {
    const crop = CROPS_DATA[cropKey];
    const totalCost = crop.seedCost * quantity;

    if (userStats.coins < totalCost) {
      showToast('⚠️ Not enough gold coins in your farm vault!');
      return;
    }

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - totalCost,
      seedsInventory: {
        ...prev.seedsInventory,
        [cropKey]: (prev.seedsInventory[cropKey] || 0) + quantity,
      },
    }));

    showToast(`📦 Purchased ${quantity}x ${crop.name} seeds!`);
  };

  const handleBuyUpgrade = (upgradeId: string) => {
    const upg = upgrades.find((u) => u.id === upgradeId);
    if (!upg || userStats.coins < upg.cost || upg.level >= upg.maxLevel) return;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins - upg.cost,
    }));

    const newLevel = upg.level + 1;
    setUpgrades((prev) =>
      prev.map((u) =>
        u.id === upgradeId
          ? {
              ...u,
              level: newLevel,
              cost: Math.round(u.cost * 1.5),
            }
          : u
      )
    );

    // Achievements
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'green-innovator') {
          const prog = Math.min(ach.maxProgress, ach.progress + 1);
          return { ...ach, progress: prog, unlocked: prog >= ach.maxProgress };
        }
        return ach;
      })
    );

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });

    showToast(`⚡ Installed Tier ${newLevel} ${upg.name}!`);
  };

  const handleCompleteMission = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isCompleted) return;

    const newCompletedCount = userStats.completedMissionsCount + 1;

    setUserStats((prev) => ({
      ...prev,
      coins: prev.coins + mission.rewardCoins,
      xp: prev.xp + mission.rewardXp,
      waterDroplets: prev.waterDroplets + mission.rewardWater,
      completedMissionsCount: newCompletedCount,
      seedsInventory: {
        ...prev.seedsInventory,
        [mission.rewardSeeds.crop]: (prev.seedsInventory[mission.rewardSeeds.crop] || 0) + mission.rewardSeeds.count,
      },
    }));

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isCompleted: true } : m))
    );

    // Achievements
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === 'homework-hero') {
          const prog = Math.min(ach.maxProgress, newCompletedCount);
          return { ...ach, progress: prog, unlocked: prog >= ach.maxProgress };
        }
        return ach;
      })
    );

    showToast(`🎓 Homework Mission Solved! +${mission.rewardCoins} 🪙, +${mission.rewardWater} 💧, +${mission.rewardSeeds.count} Seeds!`);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        onOpenAIMentor={() => {
          setAIMentorTopic('');
          setIsAIMentorOpen(true);
        }}
        onOpenCharacters={() => setIsCharactersOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900/95 border border-amber-500/80 text-amber-200 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'farm' && (
          <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 font-display">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                  Cultivation Plots & Field View
                </h2>
              </div>

              <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-semibold">
                <button
                  onClick={() => setView3DMode('split')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    view3DMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D + Grid View
                </button>
                <button
                  onClick={() => setView3DMode('3d-only')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    view3DMode === '3d-only' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D View Only
                </button>
                <button
                  onClick={() => setView3DMode('grid-only')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    view3DMode === 'grid-only' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Fast Grid
                </button>
              </div>
            </div>

            {/* 3D Farm View */}
            {(view3DMode === 'split' || view3DMode === '3d-only') && (
              <FarmCanvas3D
                plots={plots}
                onPlotClick={(plot) => {
                  if (plot.isReadyToHarvest) {
                    handleHarvest(plot.id);
                  } else if (!plot.isWatered && plot.crop) {
                    handleWater(plot.id);
                  }
                }}
                onHarvest={handleHarvest}
                onWater={handleWater}
              />
            )}

            {/* Farm Interactive Grid */}
            {(view3DMode === 'split' || view3DMode === 'grid-only') && (
              <FarmGrid
                plots={plots}
                userStats={userStats}
                onPlant={handlePlant}
                onWater={handleWater}
                onFertilize={handleFertilize}
                onHarvest={handleHarvest}
                onUnlockPlot={handleUnlockPlot}
              />
            )}
          </div>
        )}

        {activeTab === 'missions' && (
          <MissionsView
            missions={missions}
            userStats={userStats}
            onCompleteMission={handleCompleteMission}
            onOpenAIMentor={(topic) => {
              setAIMentorTopic(topic || '');
              setIsAIMentorOpen(true);
            }}
          />
        )}

        {activeTab === 'animals' && (
          <AnimalsView
            animals={animals}
            userStats={userStats}
            onFeedAnimal={handleFeedAnimal}
            onCollectProduct={handleCollectAnimalProduct}
          />
        )}

        {activeTab === 'market' && (
          <MarketView
            upgrades={upgrades}
            userStats={userStats}
            onBuyUpgrade={handleBuyUpgrade}
            onSellCrop={handleSellCrop}
            onBuySeed={handleBuySeed}
          />
        )}

        {activeTab === '3d-lab' && <ModelExplorer3D />}

        {activeTab === 'achievements' && (
          <AchievementsView achievements={achievements} userStats={userStats} />
        )}
      </main>

      {/* AI Farm Mentor / Tutor Modal */}
      <AIMentorModal
        isOpen={isAIMentorOpen}
        onClose={() => setIsAIMentorOpen(false)}
        initialTopic={aiMentorTopic}
        onRewardBonus={(coins, water) => {
          setUserStats((prev) => ({
            ...prev,
            coins: prev.coins + coins,
            waterDroplets: prev.waterDroplets + water,
          }));
          showToast(`💡 Learning Bonus: +${coins} 🪙 and +${water} 💧!`);
        }}
      />

      {/* Characters Showcase Modal */}
      <CharactersModal
        isOpen={isCharactersOpen}
        onClose={() => setIsCharactersOpen(false)}
        onSelectTutor={(characterName) => {
          setAIMentorTopic(`Hello ${characterName}!`);
          setIsAIMentorOpen(true);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 bg-slate-950/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🦊 FOXY FARM</span>
            <span>•</span>
            <span>Impact Hub Egypt Youth Agriculture & STEM Initiative</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Powered by Google AI Studio & Three.js 3D Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
