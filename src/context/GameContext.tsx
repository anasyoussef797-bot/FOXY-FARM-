import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Achievement,
  Classroom,
  DailyQuest,
  FarmTile,
  FarmTool,
  GameNotification,
  Homework,
  HomeworkSubmission,
  InventoryItem,
  StudentProfile,
  User,
} from '../types';
import { ANIMALS_CONFIG, CROPS_CONFIG, getLevelFromXP } from '../data/gameConfigs';
import { ensureSurroundingLockedTiles } from '../data/seedData';
import { StorageService } from '../services/storageService';
import { soundEngine } from '../services/soundEngine';

interface GameContextType {
  currentUser: User;
  allUsers: User[];
  studentProfile: StudentProfile;
  farmTiles: FarmTile[];
  selectedTool: FarmTool;
  selectedSeedId: string | null;
  homeworks: Homework[];
  submissions: HomeworkSubmission[];
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  notifications: GameNotification[];
  classrooms: Classroom[];
  isMuted: boolean;
  isBgmActive: boolean;
  activeDialog: {
    character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';
    text: string;
    title?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;
  isTutorialOpen: boolean;
  isShopOpen: boolean;
  setIsShopOpen: (open: boolean) => void;
  isInventoryOpen: boolean;
  setIsInventoryOpen: (open: boolean) => void;
  isMarketOpen: boolean;
  setIsMarketOpen: (open: boolean) => void;

  // Actions
  switchUser: (userId: string) => void;
  setSelectedTool: (tool: FarmTool) => void;
  setSelectedSeedId: (seedId: string | null) => void;
  toggleMute: () => void;
  toggleBGM: () => void;
  closeDialog: () => void;
  triggerDialog: (
    character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK',
    text: string,
    title?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => void;
  completeTutorial: () => void;
  openTutorial: () => void;

  // Farm Actions
  handleTileClick: (tile: FarmTile) => void;
  plantCrop: (tileId: string, cropId: string) => boolean;
  waterCrop: (tileId: string) => boolean;
  harvestCrop: (tileId: string) => boolean;
  feedAnimal: (tileId: string) => boolean;
  plowSoil: (tileId: string) => boolean;
  unlockLandTile: (tileId: string) => boolean;
  placeItemOnTile: (tileId: string, itemType: 'building' | 'decor' | 'animal', itemId: string) => boolean;
  moveFarmItem: (fromTileId: string, toTileId: string) => boolean;

  // Inventory & Market
  buyShopItem: (itemType: 'seed' | 'animal' | 'building' | 'decor', itemId: string, cost: number, quantity?: number) => boolean;
  sellInventoryItem: (itemId: string, quantity?: number) => boolean;

  // Homework & Missions
  submitHomeworkMission: (homeworkId: string, answers: Record<string, any>, score: number, maxScore: number) => HomeworkSubmission;
  createTeacherHomework: (hw: Homework) => void;
  gradeHomeworkSubmission: (submissionId: string, gradeScore: number, teacherNote: string, bonusCoins?: number, bonusXP?: number) => void;
  teacherAwardStudent: (studentId: string, coins: number, xp: number, reason: string, character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK') => void;

  // Quests & Achievements
  claimDailyQuest: (questId: string) => void;
  claimAchievement: (achievementId: string) => void;
  markNotificationRead: (notifId: string) => void;

  // Utility
  addEnergy: (amount: number) => void;
  consumeEnergy: (amount: number) => boolean;
  triggerCelebration: () => void;
  refreshState: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

const getIsArabic = (): boolean => {
  try {
    return (localStorage.getItem('impact_hub_farm_lang') || 'ar') === 'ar';
  } catch {
    return true;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => StorageService.getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(() => StorageService.getUsers());
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() =>
    StorageService.getStudentProfile(currentUser.id)
  );
  const [farmTiles, setFarmTiles] = useState<FarmTile[]>(() => StorageService.getFarmTiles(currentUser.id));
  const [selectedTool, setSelectedTool] = useState<FarmTool>('select');
  const [selectedSeedId, setSelectedSeedId] = useState<string | null>('wheat');
  const [homeworks, setHomeworks] = useState<Homework[]>(() => StorageService.getHomeworks());
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(() => StorageService.getSubmissions());
  const [achievements, setAchievements] = useState<Achievement[]>(() => StorageService.getAchievements(currentUser.id));
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(() => StorageService.getDailyQuests(currentUser.id));
  const [notifications, setNotifications] = useState<GameNotification[]>(() =>
    StorageService.getNotifications(currentUser.id)
  );
  const [classrooms, setClassrooms] = useState<Classroom[]>(() => StorageService.getClassrooms());

  const [isMuted, setIsMuted] = useState<boolean>(() => soundEngine.getIsMuted());
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [activeDialog, setActiveDialog] = useState<{
    character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';
    text: string;
    title?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null>(null);

  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);

  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(() => {
    return currentUser.role === 'STUDENT' && !StorageService.isTutorialCompleted(currentUser.id);
  });

  // Keep state synced when user changes
  const switchUser = useCallback((userId: string) => {
    soundEngine.playClick();
    StorageService.setCurrentUser(userId);
    const user = StorageService.getCurrentUser();
    setCurrentUser(user);
    const prof = StorageService.getStudentProfile(user.id);
    setStudentProfile(prof);
    setFarmTiles(StorageService.getFarmTiles(user.id));
    setAchievements(StorageService.getAchievements(user.id));
    setDailyQuests(StorageService.getDailyQuests(user.id));
    setNotifications(StorageService.getNotifications(user.id));

    if (user.role === 'STUDENT' && !StorageService.isTutorialCompleted(user.id)) {
      setIsTutorialOpen(true);
    } else {
      setIsTutorialOpen(false);
    }
  }, []);

  const refreshState = useCallback(() => {
    setStudentProfile(StorageService.getStudentProfile(currentUser.id));
    setFarmTiles(StorageService.getFarmTiles(currentUser.id));
    setHomeworks(StorageService.getHomeworks());
    setSubmissions(StorageService.getSubmissions());
    setAchievements(StorageService.getAchievements(currentUser.id));
    setDailyQuests(StorageService.getDailyQuests(currentUser.id));
    setNotifications(StorageService.getNotifications(currentUser.id));
  }, [currentUser.id]);

  // Periodic timer for crop growth and energy regeneration
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentUser.role === 'STUDENT') {
        const updatedTiles = StorageService.getFarmTiles(currentUser.id);
        setFarmTiles(updatedTiles);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentUser.id, currentUser.role]);

  // Sound toggles
  const toggleMute = useCallback(() => {
    const nextMute = soundEngine.toggleMute();
    setIsMuted(nextMute);
  }, []);

  const toggleBGM = useCallback(() => {
    if (isBgmActive) {
      soundEngine.stopBGM();
      setIsBgmActive(false);
    } else {
      soundEngine.startBGM();
      setIsBgmActive(true);
    }
  }, [isBgmActive]);

  const triggerDialog = useCallback(
    (
      character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK',
      text: string,
      title?: string,
      actionLabel?: string,
      onAction?: () => void
    ) => {
      soundEngine.playClick();
      setActiveDialog({ character, text, title, actionLabel, onAction });
    },
    []
  );

  const closeDialog = useCallback(() => {
    soundEngine.playClick();
    setActiveDialog(null);
  }, []);

  const completeTutorial = useCallback(() => {
    StorageService.setTutorialCompleted(currentUser.id, true);
    setIsTutorialOpen(false);
    triggerCelebration();
    soundEngine.playVictory();
    triggerDialog(
      'FOXY',
      'Awesome job finishing your farm orientation! Now plant your seeds, complete Spark missions, and watch your farm blossom!',
      'Welcome to Foxy Farm!'
    );
  }, [currentUser.id, triggerDialog]);

  const openTutorial = useCallback(() => {
    setIsTutorialOpen(true);
  }, []);

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ea580c', '#3b82f6', '#9333ea', '#06b6d4', '#eab308', '#22c55e'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  // Energy
  // The user rule: Play is completely open with unlimited energy if the student has completed all assigned homework.
  // The energy system is ONLY activated when there is an active pending homework from the teacher that has not been submitted yet.
  const consumeEnergy = useCallback(
    (amount: number): boolean => {
      // Check if student has pending unsubmitted homework
      const currentSubmissions = StorageService.getSubmissions();
      const currentHomeworks = StorageService.getHomeworks();
      const submittedHwIds = new Set(
        currentSubmissions
          .filter((s) => s.studentId === currentUser.id)
          .map((s) => s.homeworkId)
      );
      const pendingHws = currentHomeworks.filter((h) => !submittedHwIds.has(h.id));
      const hasPending = pendingHws.length > 0;

      // If no pending homework, play is free and energy is never depleted or restricted!
      if (!hasPending) {
        if (studentProfile.energy < studentProfile.maxEnergy) {
          const updated = { ...studentProfile, energy: studentProfile.maxEnergy };
          setStudentProfile(updated);
          StorageService.updateStudentProfile(updated);
        }
        return true;
      }

      // If there IS pending homework, consume energy:
      if (studentProfile.energy < amount) {
        const isAr = getIsArabic();
        const pendingHw = pendingHws[0];
        triggerDialog(
          'SPARK',
          isAr
            ? `تنبيه الطاقة! ⚡ لديك مهمة دراسية بانتظارك من المعلم (${pendingHw?.title || 'واجب مدرسي'}). أنجز واجبك الدراسي الآن لشحن طاقتك ومواصلة بناء مزرعتك السعيدة!`
            : `Low energy warning! You have pending homework from your teacher (${pendingHw?.title || 'Homework'}). Complete your homework mission now to restore energy and continue playing!`,
          isAr ? 'الطاقة نفدت - أنجز واجبك! ⚡' : 'Energy Depleted - Do Homework! ⚡',
          isAr ? 'الذهاب للواجبات 📚' : 'Go to Homework 📚',
          () => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('open-homework-hub'));
            }
          }
        );
        return false;
      }

      const updated = { ...studentProfile, energy: studentProfile.energy - amount };
      setStudentProfile(updated);
      StorageService.updateStudentProfile(updated);
      return true;
    },
    [studentProfile, currentUser.id, triggerDialog]
  );

  const addEnergy = useCallback(
    (amount: number) => {
      const updated = {
        ...studentProfile,
        energy: Math.min(studentProfile.maxEnergy, studentProfile.energy + amount),
      };
      setStudentProfile(updated);
      StorageService.updateStudentProfile(updated);
    },
    [studentProfile]
  );

  // Add Coins & XP with level progression
  const addCoinsAndXP = useCallback(
    (coinsToAdd: number, xpToAdd: number) => {
      const newCoins = studentProfile.coins + coinsToAdd;
      const newXP = studentProfile.xp + xpToAdd;
      const { level: newLevel } = getLevelFromXP(newXP);

      const leveledUp = newLevel > studentProfile.level;

      const updated: StudentProfile = {
        ...studentProfile,
        coins: newCoins,
        xp: newXP,
        level: newLevel,
      };

      setStudentProfile(updated);
      StorageService.updateStudentProfile(updated);

      if (leveledUp) {
        soundEngine.playVictory();
        triggerCelebration();
        const isAr = getIsArabic();
        triggerDialog(
          'FOXY',
          isAr
            ? `مبارك! لقد وصلت إلى المستوى ${newLevel}! تم فتح محاصيل وحيوانات ومبانٍ جديدة في المتجر!`
            : `Hooray! You reached LEVEL ${newLevel}! You unlocked brand new crops, animals, and building upgrades in the Shop!`,
          isAr ? `ترقية المستوى! (المستوى ${newLevel}) 🌟` : `Level Up! (Level ${newLevel})`
        );
        StorageService.addNotification(currentUser.id, {
          id: `lvl_${Date.now()}`,
          title: isAr ? `ترقية إلى المستوى ${newLevel}! 🌟` : `Level Up to Level ${newLevel}! 🌟`,
          message: isAr
            ? `تهانينا! تفقد المتجر لاستكشاف العناصر والمحاصيل التي تم فتحها حديثاً.`
            : `Congratulations! Check the Shop to explore your newly unlocked farm items.`,
          character: 'FOXY',
          type: 'level_up',
          timestamp: isAr ? 'الآن' : 'Just now',
          read: false,
        });
      }
    },
    [studentProfile, currentUser.id, triggerCelebration, triggerDialog]
  );

  // Farming actions
  const plowSoil = useCallback(
    (tileId: string): boolean => {
      const PLOW_COST = 10;
      const isAr = getIsArabic();

      if (studentProfile.coins < PLOW_COST) {
        triggerDialog(
          'ADAM',
          isAr
            ? `تحتاج إلى ${PLOW_COST} عملات ذهبية لحراثة هذه الرقعة! أكمل واجباتك المدرسية لكسب الذهب!`
            : `You need ${PLOW_COST} Gold Coins to plow this soil plot! Complete homework missions to earn coins!`,
          isAr ? 'الذهب غير كافٍ 🪙' : 'Insufficient Coins 🪙'
        );
        return false;
      }

      if (!consumeEnergy(2)) return false;

      soundEngine.playPlant();

      // Deduct 10 coins and grant 10 XP
      const newXP = studentProfile.xp + 10;
      const { level: newLevel } = getLevelFromXP(newXP);
      const updatedProfile = {
        ...studentProfile,
        coins: studentProfile.coins - PLOW_COST,
        xp: newXP,
        level: newLevel,
      };
      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);

      const rawTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return { ...t, type: 'soil' as const, status: 'empty' as const };
        }
        return t;
      });

      // Keep infinite perimeter updated around all plowed/unlocked tiles
      const updatedTiles = ensureSurroundingLockedTiles(rawTiles, currentUser.id);
      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);
      return true;
    },
    [farmTiles, studentProfile, currentUser.id, consumeEnergy, triggerDialog]
  );

  const plantCrop = useCallback(
    (tileId: string, cropId: string): boolean => {
      const seedItem = studentProfile.inventory.find(
        (i) => i.type === 'seed' && i.referenceId === cropId && i.quantity > 0
      );

      if (!seedItem) {
        return false;
      }

      if (!consumeEnergy(1)) return false;

      soundEngine.playPlant();
      const cropConf = CROPS_CONFIG[cropId];
      const now = Date.now();

      // Deduct 1 seed from inventory
      const updatedInventory = studentProfile.inventory
        .map((item) => {
          if (item.id === seedItem.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      const updatedProfile = { ...studentProfile, inventory: updatedInventory };
      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);

      // Update tile
      const updatedTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return {
            ...t,
            type: 'soil' as const,
            status: 'planted' as const,
            cropId,
            plantedAt: now,
            growthDurationSec: cropConf?.growthSeconds || 30,
          };
        }
        return t;
      });

      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);

      // Update daily quests
      const updatedQuests = dailyQuests.map((q) => {
        if (q.type === 'plant' && !q.completed) {
          const nextProg = q.progress + 1;
          return { ...q, progress: nextProg, completed: nextProg >= q.target };
        }
        return q;
      });
      setDailyQuests(updatedQuests);
      StorageService.saveDailyQuests(currentUser.id, updatedQuests);

      return true;
    },
    [studentProfile, farmTiles, currentUser.id, dailyQuests, consumeEnergy, triggerDialog]
  );

  const waterCrop = useCallback(
    (tileId: string): boolean => {
      if (!consumeEnergy(1)) return false;
      soundEngine.playWater();
      const now = Date.now();

      const updatedTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return {
            ...t,
            status: t.status === 'planted' ? ('watered' as const) : t.status,
            wateredAt: now,
          };
        }
        return t;
      });

      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);

      // Daily water quest update
      const updatedQuests = dailyQuests.map((q) => {
        if (q.type === 'water' && !q.completed) {
          const nextProg = q.progress + 1;
          return { ...q, progress: nextProg, completed: nextProg >= q.target };
        }
        return q;
      });
      setDailyQuests(updatedQuests);
      StorageService.saveDailyQuests(currentUser.id, updatedQuests);

      return true;
    },
    [farmTiles, currentUser.id, dailyQuests, consumeEnergy]
  );

  const harvestCrop = useCallback(
    (tileId: string): boolean => {
      const tile = farmTiles.find((t) => t.id === tileId);
      if (!tile || !tile.cropId) return false;

      const cropConf = CROPS_CONFIG[tile.cropId];
      if (!cropConf) return false;

      soundEngine.playHarvest();
      soundEngine.playCoin();

      // Add harvested produce to inventory
      const existingProduce = studentProfile.inventory.find(
        (i) => i.type === 'produce' && i.referenceId === tile.cropId
      );

      let newInventory: InventoryItem[];
      if (existingProduce) {
        newInventory = studentProfile.inventory.map((item) => {
          if (item.id === existingProduce.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        newInventory = [
          ...studentProfile.inventory,
          {
            id: `prod_${tile.cropId}_${Date.now()}`,
            type: 'produce',
            referenceId: tile.cropId,
            name: cropConf.name,
            icon: cropConf.icon,
            quantity: 1,
            sellPrice: cropConf.sellPrice,
          },
        ];
      }

      // Add XP and coins for harvesting
      addCoinsAndXP(Math.round(cropConf.sellPrice * 0.4), cropConf.xpReward);

      // Reset tile to soil
      const updatedTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return {
            ...t,
            type: 'soil' as const,
            status: 'empty' as const,
            cropId: undefined,
            plantedAt: undefined,
            wateredAt: undefined,
          };
        }
        return t;
      });

      const updatedProfile = {
        ...studentProfile,
        inventory: newInventory,
        totalHarvestsCount: studentProfile.totalHarvestsCount + 1,
      };

      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);
      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);

      // Daily quests
      const updatedQuests = dailyQuests.map((q) => {
        if (q.type === 'harvest' && !q.completed) {
          const nextProg = q.progress + 1;
          return { ...q, progress: nextProg, completed: nextProg >= q.target };
        }
        return q;
      });
      setDailyQuests(updatedQuests);
      StorageService.saveDailyQuests(currentUser.id, updatedQuests);

      // Check achievement
      const updatedAchievements = achievements.map((a) => {
        if (a.id === 'first_harvest' && !a.unlocked) {
          return { ...a, unlocked: true, progress: 1 };
        }
        if (a.id === 'harvest_master_1' && !a.unlocked) {
          const nextProg = a.progress + 1;
          return { ...a, progress: nextProg, unlocked: nextProg >= a.maxProgress };
        }
        return a;
      });
      setAchievements(updatedAchievements);
      StorageService.saveAchievements(currentUser.id, updatedAchievements);

      return true;
    },
    [farmTiles, studentProfile, currentUser.id, dailyQuests, achievements, addCoinsAndXP]
  );

  const feedAnimal = useCallback(
    (tileId: string): boolean => {
      const tile = farmTiles.find((t) => t.id === tileId);
      if (!tile || !tile.animalId) return false;

      const animalConf = ANIMALS_CONFIG[tile.animalId];
      if (!animalConf) return false;

      if (!consumeEnergy(animalConf.feedEnergyCost)) return false;

      soundEngine.playFeed();
      soundEngine.playCoin();

      const prod = animalConf.produceItem;

      // Add animal product to inventory
      const existing = studentProfile.inventory.find(
        (i) => i.type === 'animal_product' && i.referenceId === prod.id
      );

      let newInventory: InventoryItem[];
      if (existing) {
        newInventory = studentProfile.inventory.map((item) => {
          if (item.id === existing.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        newInventory = [
          ...studentProfile.inventory,
          {
            id: `anim_prod_${prod.id}_${Date.now()}`,
            type: 'animal_product',
            referenceId: prod.id,
            name: prod.name,
            icon: prod.icon,
            quantity: 1,
            sellPrice: prod.sellPrice,
          },
        ];
      }

      addCoinsAndXP(Math.round(prod.sellPrice * 0.3), prod.xpPerCollect);

      const now = Date.now();
      const updatedTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return { ...t, animalFedAt: now };
        }
        return t;
      });

      const updatedProfile = { ...studentProfile, inventory: newInventory };
      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);
      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);

      return true;
    },
    [farmTiles, studentProfile, currentUser.id, consumeEnergy, addCoinsAndXP]
  );

  const unlockLandTile = useCallback(
    (tileId: string): boolean => {
      const tile = farmTiles.find((t) => t.id === tileId);
      if (!tile || !tile.isLocked) return false;

      const UNLOCK_COST = 15;
      const isAr = getIsArabic();

      if (studentProfile.coins < UNLOCK_COST) {
        triggerDialog(
          'FOXY',
          isAr
            ? `تحتاج إلى ${UNLOCK_COST} عملة ذهبية لتوسيع وفتح هذه الرقعة! لديك حالياً ${studentProfile.coins} عملة فقط. أكمل الواجبات لكسب الذهب!`
            : `You need ${UNLOCK_COST} Coins to unlock and expand this land plot. You currently have ${studentProfile.coins} coins. Complete homework missions to earn more!`,
          isAr ? 'الذهب غير كافٍ 🪙' : 'Insufficient Coins 🪙'
        );
        return false;
      }

      soundEngine.playHarvest();
      triggerCelebration();

      // Deduct 15 coins & give 30 XP
      const newXP = studentProfile.xp + 30;
      const { level: newLevel } = getLevelFromXP(newXP);
      const updatedProfile = {
        ...studentProfile,
        coins: studentProfile.coins - UNLOCK_COST,
        xp: newXP,
        level: newLevel,
      };
      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);

      const rawTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          return { ...t, isLocked: false, status: 'empty' as const, type: 'grass' as const };
        }
        return t;
      });

      // Dynamically generate the next row/column of surrounding locked tiles around all unlocked tiles!
      const updatedTiles = ensureSurroundingLockedTiles(rawTiles, currentUser.id);
      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);

      return true;
    },
    [farmTiles, studentProfile, currentUser.id, triggerCelebration, triggerDialog]
  );

  const moveFarmItem = useCallback(
    (fromTileId: string, toTileId: string): boolean => {
      const fromTile = farmTiles.find((t) => t.id === fromTileId);
      const toTile = farmTiles.find((t) => t.id === toTileId);
      if (!fromTile || !toTile || toTile.isLocked) return false;

      // Check if target tile is occupied by animal or building
      if (toTile.animalId || toTile.buildingId) {
        return false;
      }

      soundEngine.playHarvest();
      triggerCelebration();

      const updatedTiles = farmTiles.map((t) => {
        if (t.id === toTileId) {
          return {
            ...t,
            animalId: fromTile.animalId,
            animalFedAt: fromTile.animalFedAt,
            animalHungry: fromTile.animalHungry,
            buildingId: fromTile.buildingId,
            decorationId: fromTile.decorationId,
            cropId: fromTile.cropId,
            plantedAt: fromTile.plantedAt,
            wateredAt: fromTile.wateredAt,
            growthDurationSec: fromTile.growthDurationSec,
            status: fromTile.status,
            type: fromTile.cropId ? ('soil' as const) : t.type,
          };
        }
        if (t.id === fromTileId) {
          return {
            ...t,
            animalId: undefined,
            animalFedAt: undefined,
            animalHungry: undefined,
            buildingId: undefined,
            decorationId: undefined,
            cropId: undefined,
            plantedAt: undefined,
            wateredAt: undefined,
            growthDurationSec: undefined,
            status: 'empty' as const,
            type: 'grass' as const,
          };
        }
        return t;
      });

      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);
      return true;
    },
    [farmTiles, currentUser.id, triggerCelebration, triggerDialog]
  );

  const placeItemOnTile = useCallback(
    (tileId: string, itemType: 'building' | 'decor' | 'animal', itemId: string): boolean => {
      const updatedTiles = farmTiles.map((t) => {
        if (t.id === tileId) {
          if (itemType === 'building') return { ...t, buildingId: itemId, type: 'grass' as const, cropId: undefined };
          if (itemType === 'decor') return { ...t, decorationId: itemId, type: 'grass' as const, cropId: undefined };
          if (itemType === 'animal') return { ...t, animalId: itemId, animalFedAt: Date.now(), type: 'grass' as const, cropId: undefined };
        }
        return t;
      });
      setFarmTiles(updatedTiles);
      StorageService.saveFarmTiles(currentUser.id, updatedTiles);
      soundEngine.playPlant();
      return true;
    },
    [farmTiles, currentUser.id]
  );

  // Shop & Inventory
  const buyShopItem = useCallback(
    (itemType: 'seed' | 'animal' | 'building' | 'decor', itemId: string, unitCost: number, quantity: number = 1): boolean => {
      const totalCost = unitCost * quantity;
      const isAr = getIsArabic();
      if (studentProfile.coins < totalCost) {
        triggerDialog(
          'FOXY',
          isAr
            ? `تحتاج إلى ${totalCost} عملة لشراء هذا العنصر، ولديك حالياً ${studentProfile.coins} عملة فقط. أكمل الواجبات لكسب المزيد من الذهب!`
            : `You need ${totalCost} Coins to buy ${quantity > 1 ? `${quantity}x ` : ''}this item, but you only have ${studentProfile.coins} Coins. Complete teacher homework missions to earn more coins!`,
          isAr ? 'رصيد العملات غير كافٍ 🪙' : 'Insufficient Coins'
        );
        return false;
      }

      soundEngine.playCoin();
      const newCoins = studentProfile.coins - totalCost;

      if (itemType === 'seed') {
        const cropConf = CROPS_CONFIG[itemId];
        const existing = studentProfile.inventory.find((i) => i.type === 'seed' && i.referenceId === itemId);

        let newInv: InventoryItem[];
        if (existing) {
          newInv = studentProfile.inventory.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          newInv = [
            ...studentProfile.inventory,
            {
              id: `seed_${itemId}_${Date.now()}`,
              type: 'seed',
              referenceId: itemId,
              name: isAr ? `بذور ${cropConf.name}` : `${cropConf.name} Seeds`,
              icon: cropConf.icon,
              quantity: quantity,
              sellPrice: Math.round(cropConf.seedPrice * 0.5),
            },
          ];
        }

        const updatedProfile = { ...studentProfile, coins: newCoins, inventory: newInv };
        setStudentProfile(updatedProfile);
        StorageService.updateStudentProfile(updatedProfile);
        setSelectedSeedId(itemId);
        setSelectedTool('plant');
        return true;
      }

      // For animal, building or decor: find an empty grass tile and place it
      const emptyTile = farmTiles.find(
        (t) => !t.isLocked && t.type === 'grass' && !t.buildingId && !t.animalId && !t.decorationId && !t.cropId
      );

      if (!emptyTile) {
        triggerDialog(
          'SPARK',
          isAr
            ? 'لا توجد مساحة عشبية فارغة كافية في مزرعتك! يرجى توسيع المزرعة أو إخلاء مساحة لوضع العنصر الجديد.'
            : 'No empty grass tile found! Please plow or clear a space on your farm to place your new item.',
          isAr ? 'المزرعة بحاجة لمساحة فارغة' : 'Farm Space Needed'
        );
        return false;
      }

      const updatedProfile = { ...studentProfile, coins: newCoins };
      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);

      placeItemOnTile(emptyTile.id, itemType, itemId);
      triggerCelebration();
      return true;
    },
    [studentProfile, farmTiles, placeItemOnTile, triggerCelebration, triggerDialog]
  );

  const sellInventoryItem = useCallback(
    (itemId: string, quantity: number = 1): boolean => {
      const item = studentProfile.inventory.find((i) => i.id === itemId);
      if (!item || item.quantity < quantity) return false;

      soundEngine.playCoin();
      const revenue = item.sellPrice * quantity;

      const updatedInventory = studentProfile.inventory
        .map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - quantity } : i))
        .filter((i) => i.quantity > 0);

      const updatedProfile = {
        ...studentProfile,
        coins: studentProfile.coins + revenue,
        inventory: updatedInventory,
      };

      setStudentProfile(updatedProfile);
      StorageService.updateStudentProfile(updatedProfile);
      return true;
    },
    [studentProfile]
  );

  // Homework Missions
  const submitHomeworkMission = useCallback(
    (homeworkId: string, answers: Record<string, any>, score: number, maxScore: number): HomeworkSubmission => {
      const hw = homeworks.find((h) => h.id === homeworkId);
      const percentage = Math.round((score / maxScore) * 100);
      const coinsEarned = hw?.coinsReward || 100;
      const xpEarned = hw?.xpReward || 80;

      const sub: HomeworkSubmission = {
        id: `sub_${homeworkId}_${currentUser.id}_${Date.now()}`,
        homeworkId,
        studentId: currentUser.id,
        studentName: studentProfile.name,
        studentAvatar: studentProfile.avatar,
        status: 'submitted',
        score,
        maxScore,
        percentage,
        answers,
        coinsEarned,
        xpEarned,
        submittedAt: new Date().toISOString(),
        teacherNote: 'Awaiting teacher review',
      };

      StorageService.saveSubmission(sub);
      setSubmissions(StorageService.getSubmissions());

      // Reward student instantly
      addCoinsAndXP(coinsEarned, xpEarned);
      soundEngine.playVictory();
      triggerCelebration();

      // Bonus item reward check
      if (hw?.bonusItemReward) {
        const bonus = hw.bonusItemReward;
        const newInv: InventoryItem[] = [
          ...studentProfile.inventory,
          {
            id: `bonus_${bonus.id}_${Date.now()}`,
            type: bonus.type === 'seed' ? 'seed' : bonus.type === 'decor' ? 'decor' : 'special',
            referenceId: bonus.id,
            name: bonus.name,
            icon: bonus.icon,
            quantity: bonus.count,
            sellPrice: 50,
          },
        ];
        const updatedProf = {
          ...studentProfile,
          energy: studentProfile.maxEnergy || 100,
          inventory: newInv,
          completedMissionsCount: studentProfile.completedMissionsCount + 1,
        };
        setStudentProfile(updatedProf);
        StorageService.updateStudentProfile(updatedProf);
      } else {
        const updatedProf = {
          ...studentProfile,
          energy: studentProfile.maxEnergy || 100,
          completedMissionsCount: studentProfile.completedMissionsCount + 1,
        };
        setStudentProfile(updatedProf);
        StorageService.updateStudentProfile(updatedProf);
      }

      // Daily homework quest
      const updatedQuests = dailyQuests.map((q) => {
        if (q.type === 'homework' && !q.completed) {
          return { ...q, progress: 1, completed: true };
        }
        return q;
      });
      setDailyQuests(updatedQuests);
      StorageService.saveDailyQuests(currentUser.id, updatedQuests);

      return sub;
    },
    [homeworks, currentUser.id, studentProfile, dailyQuests, addCoinsAndXP, triggerCelebration]
  );

  const createTeacherHomework = useCallback((hw: Homework) => {
    soundEngine.playHarvest();
    StorageService.addHomework(hw);
    setHomeworks(StorageService.getHomeworks());

    // Notify target students
    hw.targetClassIds.forEach((classId) => {
      const cls = classrooms.find((c) => c.id === classId);
      if (cls) {
        cls.studentIds.forEach((stId) => {
          StorageService.addNotification(stId, {
            id: `hw_notif_${hw.id}_${Date.now()}`,
            title: `New Mission: ${hw.title}`,
            message: `${hw.teacherName} assigned a new ${hw.subject} mission! Rewards: +${hw.coinsReward} Coins, +${hw.xpReward} XP.`,
            character: hw.characterHost,
            type: 'mission',
            timestamp: 'Just now',
            read: false,
            actionType: 'open_homework',
            actionPayload: hw.id,
          });
        });
      }
    });
  }, [classrooms]);

  const gradeHomeworkSubmission = useCallback(
    (submissionId: string, gradeScore: number, teacherNote: string, bonusCoins = 0, bonusXP = 0) => {
      const subs = StorageService.getSubmissions();
      const target = subs.find((s) => s.id === submissionId);
      if (!target) return;

      target.status = 'graded';
      target.score = gradeScore;
      target.percentage = Math.round((gradeScore / target.maxScore) * 100);
      target.teacherNote = teacherNote;
      target.reviewedAt = new Date().toISOString();

      StorageService.saveSubmissions(subs);
      setSubmissions([...subs]);

      // If bonus coins/XP awarded by teacher, credit student profile
      if (bonusCoins > 0 || bonusXP > 0) {
        const studentProf = StorageService.getStudentProfile(target.studentId);
        studentProf.coins += bonusCoins;
        studentProf.xp += bonusXP;
        const { level: newLvl } = getLevelFromXP(studentProf.xp);
        studentProf.level = newLvl;
        StorageService.updateStudentProfile(studentProf);

        StorageService.addNotification(target.studentId, {
          id: `grade_notif_${Date.now()}`,
          title: `Homework Graded with Star Praise! ⭐`,
          message: `Your teacher reviewed your work: "${teacherNote}". Bonus: +${bonusCoins} Coins, +${bonusXP} XP!`,
          character: 'TALIA',
          type: 'teacher_note',
          timestamp: 'Just now',
          read: false,
        });
      }
      soundEngine.playHarvest();
    },
    []
  );

  const teacherAwardStudent = useCallback(
    (studentId: string, coins: number, xp: number, reason: string, character: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK') => {
      const studentProf = StorageService.getStudentProfile(studentId);
      studentProf.coins += coins;
      studentProf.xp += xp;
      const { level: newLvl } = getLevelFromXP(studentProf.xp);
      studentProf.level = newLvl;
      StorageService.updateStudentProfile(studentProf);

      StorageService.addNotification(studentId, {
        id: `award_notif_${Date.now()}`,
        title: `Teacher Award: ${reason}! 🎖️`,
        message: `Your teacher awarded you +${coins} Coins and +${xp} XP!`,
        character,
        type: 'reward',
        timestamp: 'Just now',
        read: false,
      });
      soundEngine.playVictory();
    },
    []
  );

  const claimDailyQuest = useCallback(
    (questId: string) => {
      const q = dailyQuests.find((item) => item.id === questId);
      if (!q || !q.completed || q.claimed) return;

      soundEngine.playVictory();
      triggerCelebration();

      addCoinsAndXP(q.rewardCoins, q.rewardXP);

      const updated = dailyQuests.map((item) => (item.id === questId ? { ...item, claimed: true } : item));
      setDailyQuests(updated);
      StorageService.saveDailyQuests(currentUser.id, updated);
    },
    [dailyQuests, currentUser.id, addCoinsAndXP, triggerCelebration]
  );

  const claimAchievement = useCallback(
    (achievementId: string) => {
      const ach = achievements.find((item) => item.id === achievementId);
      if (!ach || !ach.unlocked || ach.unlockedAt) return;

      soundEngine.playVictory();
      triggerCelebration();

      addCoinsAndXP(ach.rewardCoins, ach.rewardXP);

      const updated = achievements.map((item) =>
        item.id === achievementId ? { ...item, unlockedAt: new Date().toISOString().split('T')[0] } : item
      );
      setAchievements(updated);
      StorageService.saveAchievements(currentUser.id, updated);
    },
    [achievements, currentUser.id, addCoinsAndXP, triggerCelebration]
  );

  const markNotificationRead = useCallback(
    (notifId: string) => {
      const updated = notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n));
      setNotifications(updated);
      StorageService.saveNotifications(currentUser.id, updated);
    },
    [notifications, currentUser.id]
  );

  const handleTileClick = useCallback(
    (tile: FarmTile) => {
      if (tile.isLocked) {
        unlockLandTile(tile.id);
        return;
      }

      // If tile has animal
      if (tile.animalId) {
        feedAnimal(tile.id);
        return;
      }

      // If tile has building or decor
      if (tile.buildingId || tile.decorationId) {
        soundEngine.playClick();
        return;
      }

      // Farming tool execution
      if (selectedTool === 'hoe') {
        if (tile.type === 'grass') {
          plowSoil(tile.id);
        }
      } else if (selectedTool === 'water') {
        if (tile.type === 'soil' && (tile.status === 'planted' || tile.status === 'empty')) {
          waterCrop(tile.id);
        }
      } else if (selectedTool === 'harvest') {
        if (tile.status === 'ready' && tile.cropId) {
          harvestCrop(tile.id);
        }
      } else if (selectedTool === 'plant') {
        if (tile.type === 'soil' && (tile.status === 'empty' || tile.status === 'watered')) {
          if (selectedSeedId) {
            plantCrop(tile.id, selectedSeedId);
          }
        }
      } else if (selectedTool === 'select') {
        // Smart context action
        if (tile.status === 'ready') {
          harvestCrop(tile.id);
        } else if (tile.type === 'soil' && tile.status === 'empty') {
          if (selectedSeedId) {
            plantCrop(tile.id, selectedSeedId);
          }
        } else if (tile.type === 'soil' && tile.status === 'planted') {
          waterCrop(tile.id);
        } else if (tile.type === 'grass') {
          plowSoil(tile.id);
        }
      }
    },
    [selectedTool, selectedSeedId, unlockLandTile, feedAnimal, plowSoil, waterCrop, harvestCrop, plantCrop]
  );

  return (
    <GameContext.Provider
      value={{
        currentUser,
        allUsers,
        studentProfile,
        farmTiles,
        selectedTool,
        selectedSeedId,
        homeworks,
        submissions,
        achievements,
        dailyQuests,
        notifications,
        classrooms,
        isMuted,
        isBgmActive,
        activeDialog,
        isTutorialOpen,
        isShopOpen,
        setIsShopOpen,
        isInventoryOpen,
        setIsInventoryOpen,
        isMarketOpen,
        setIsMarketOpen,
        switchUser,
        setSelectedTool,
        setSelectedSeedId,
        toggleMute,
        toggleBGM,
        closeDialog,
        triggerDialog,
        completeTutorial,
        openTutorial,
        handleTileClick,
        plantCrop,
        waterCrop,
        harvestCrop,
        feedAnimal,
        plowSoil,
        unlockLandTile,
        placeItemOnTile,
        moveFarmItem,
        buyShopItem,
        sellInventoryItem,
        submitHomeworkMission,
        createTeacherHomework,
        gradeHomeworkSubmission,
        teacherAwardStudent,
        claimDailyQuest,
        claimAchievement,
        markNotificationRead,
        addEnergy,
        consumeEnergy,
        triggerCelebration,
        refreshState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
