export type CropType = 'corn' | 'carrot' | 'wheat' | 'melon' | 'pumpkin' | 'strawberry' | 'tomato' | 'flax';

export type GameTool = 'select' | 'plow' | 'plant' | 'water' | 'fertilize' | 'harvest';

export interface CropDefinition {
  id: CropType;
  name: string;
  nameAr: string;
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
  factAr: string;
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
  row?: number;
  col?: number;
}

export interface Animal {
  id: string;
  name: string;
  nameAr: string;
  species: 'Baladi Chicken' | 'Dairy Cow' | 'Nubian Goat' | 'Honeybee Hive' | 'Nile Duck' | 'Farm Bunny';
  level: number;
  hunger: number; // 0 to 100 (100 = full)
  happiness: number; // 0 to 100
  favoriteFood: CropType;
  productName: string;
  productNameAr: string;
  productEmoji: string;
  productionTimeSeconds: number;
  lastFedAt: number;
  lastProducedAt: number;
  isProductReady: boolean;
  modelPath: string;
  fact: string;
  factAr: string;
}

export interface HomeworkMission {
  id: string;
  title: string;
  titleAr: string;
  subject: 'Science & Biology' | 'Math & Irrigation' | 'Environmental Studies' | 'Agri-Tech & Solar' | 'English & Vocabulary';
  grade: string;
  description: string;
  descriptionAr: string;
  rewardCoins: number;
  rewardDinars?: number;
  rewardXp: number;
  rewardSeeds: { crop: CropType; count: number };
  rewardWater: number;
  isCompleted: boolean;
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctIndex: number;
  explanation: string;
  explanationAr: string;
  hint: string;
  hintAr: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  specialty: string;
  specialtyAr: string;
  bio: string;
  bioAr: string;
  avatarUrl: string;
  sheetUrl: string;
  greeting: string;
  greetingAr: string;
  color: string;
}

export interface MarketUpgrade {
  id: string;
  name: string;
  nameAr: string;
  category: 'Irrigation' | 'Green Tech' | 'Soil Science' | 'Storage';
  categoryAr: string;
  description: string;
  descriptionAr: string;
  cost: number;
  level: number;
  maxLevel: number;
  bonusText: string;
  bonusTextAr: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: 'farming' | 'learning' | 'animals' | 'eco';
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  playerName: string;
  avatar: string;
  coins: number;
  dinars: number;
  xp: number;
  level: number;
  waterDroplets: number;
  solarEnergy: number;
  organicFertilizer: number;
  seedsInventory: Record<string, number>;
  harvestInventory: Record<string, number>;
  completedMissionsCount: number;
  harvestedCropsCount: number;
  studyStreakDays: number;
}

