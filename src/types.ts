export type CropType = 'carrot' | 'wheat' | 'melon' | 'pumpkin' | 'strawberry' | 'tomato' | 'flax';

export interface CropDefinition {
  id: CropType;
  name: string;
  category: 'Vegetable' | 'Grain' | 'Fruit' | 'Fiber';
  growthTimeSeconds: number;
  seedCost: number;
  sellPrice: number;
  xpReward: number;
  waterRequired: number;
  modelPath: string;
  iconEmoji: string;
  color: string;
  fact: string;
}

export interface FarmPlot {
  id: number;
  unlocked: boolean;
  crop: CropType | null;
  plantedAt: number | null;
  growthProgress: number; // 0 to 100
  isWatered: boolean;
  isFertilized: boolean;
  isReadyToHarvest: boolean;
  unlockCost: number;
}

export interface Animal {
  id: string;
  name: string;
  species: 'Baladi Chicken' | 'Dairy Cow' | 'Nubian Goat' | 'Honeybee Hive' | 'Nile Duck';
  level: number;
  hunger: number; // 0 to 100 (100 = full)
  happiness: number; // 0 to 100
  favoriteFood: CropType;
  productName: string;
  productEmoji: string;
  productionTimeSeconds: number;
  lastFedAt: number;
  lastProducedAt: number;
  isProductReady: boolean;
  modelPath: string;
  fact: string;
}

export interface HomeworkMission {
  id: string;
  title: string;
  subject: 'Science & Biology' | 'Math & Irrigation' | 'Environmental Studies' | 'Agri-Tech & Solar' | 'English & Vocabulary';
  grade: string;
  description: string;
  rewardCoins: number;
  rewardXp: number;
  rewardSeeds: { crop: CropType; count: number };
  rewardWater: number;
  isCompleted: boolean;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  sheetUrl: string;
  greeting: string;
  color: string;
}

export interface MarketUpgrade {
  id: string;
  name: string;
  category: 'Irrigation' | 'Green Tech' | 'Soil Science' | 'Storage';
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  bonusText: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'farming' | 'learning' | 'animals' | 'eco';
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  coins: number;
  xp: number;
  level: number;
  waterDroplets: number;
  solarEnergy: number;
  organicFertilizer: number;
  seedsInventory: Record<CropType, number>;
  harvestInventory: Record<string, number>;
  completedMissionsCount: number;
  harvestedCropsCount: number;
  studyStreakDays: number;
}
