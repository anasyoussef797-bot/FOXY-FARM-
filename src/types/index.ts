export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'STUDENT';

export type CharacterId = 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';

export type SubjectCategory =
  | 'Mathematics'
  | 'English'
  | 'Arabic'
  | 'Science'
  | 'General Knowledge'
  | 'Phonics'
  | 'Shapes & Colors'
  | 'Numbers'
  | 'Custom';

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'matching'
  | 'fill_blank'
  | 'math_input'
  | 'image_choice'
  | 'drag_drop';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  schoolId?: string;
  schoolName?: string;
  classId?: string;
  className?: string;
  grade?: string;
  title?: string;
}

export interface StudentProfile extends User {
  role: 'STUDENT';
  coins: number;
  dinars?: number; // Dinar currency (الدنانير) in Happy Farm
  xp: number;
  level: number;
  energy: number;
  maxEnergy: number;
  streakDays: number;
  lastLoginDate: string;
  completedMissionsCount: number;
  totalHarvestsCount: number;
  activeGuide: CharacterId;
  inventory: InventoryItem[];
  unlockedLandArea: number; // grid radius or zone level (e.g. 1 = 6x6, 2 = 8x8, etc.)
  farmGridWidth: number;
  farmGridHeight: number;
}

export interface TeacherProfile extends User {
  role: 'TEACHER';
  assignedClasses: string[];
  subjectsTaught: string[];
}

export type TileType = 'grass' | 'soil' | 'water' | 'path' | 'stone' | 'wood_fence';

export type TileStatus = 'empty' | 'planted' | 'watered' | 'ready' | 'wilted';

export interface FarmTile {
  id: string;
  x: number;
  y: number;
  type: TileType;
  status: TileStatus;
  cropId?: string;
  plantedAt?: number; // timestamp in ms
  wateredAt?: number; // timestamp in ms
  growthDurationSec?: number;
  buildingId?: string;
  animalId?: string;
  animalFedAt?: number;
  decorationId?: string;
  isLocked?: boolean;
  unlockLevel?: number;
  unlockCostCoins?: number;
}

export interface CropConfig {
  id: string;
  name: string;
  icon: string;
  seedPrice: number;
  sellPrice: number;
  xpReward: number;
  growthSeconds: number;
  unlockLevel: number;
  description: string;
  color: string;
  stages: {
    sprout: string;
    growing: string;
    ripe: string;
  };
}

export interface AnimalConfig {
  id: string;
  name: string;
  icon: string;
  type: 'cow' | 'chicken' | 'sheep' | 'horse' | 'duck' | 'rabbit';
  cost: number;
  xpReward: number;
  produceItem: {
    id: string;
    name: string;
    icon: string;
    sellPrice: number;
    xpPerCollect: number;
  };
  produceDurationSec: number;
  unlockLevel: number;
  feedEnergyCost: number;
  description: string;
  characterDialogue: string;
}

export interface BuildingConfig {
  id: string;
  name: string;
  icon: string;
  category: 'house' | 'storage' | 'science' | 'special' | 'learning';
  cost: number;
  unlockLevel: number;
  description: string;
  perk: string;
  size: [number, number]; // [width, height] in tiles
}

export interface DecorationConfig {
  id: string;
  name: string;
  icon: string;
  category: 'nature' | 'monument' | 'path' | 'lighting' | 'cultural';
  cost: number;
  unlockLevel: number;
  charmBonus: number;
  description: string;
}

export interface InventoryItem {
  id: string;
  type: 'seed' | 'produce' | 'animal_product' | 'tool' | 'decor' | 'special';
  referenceId: string;
  name: string;
  icon: string;
  quantity: number;
  sellPrice: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  instruction?: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  pairs?: { left: string; right: string }[];
  blankParts?: { text: string; isBlank?: boolean; correctWord?: string }[];
  mathExpr?: string;
  audioText?: string;
  imageHint?: string;
  explanation: string;
  points: number;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: SubjectCategory;
  gradeLevel: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  assignedByTeacherId: string;
  teacherName: string;
  targetClassIds: string[];
  targetStudentIds?: string[];
  dueDate: string;
  coinsReward: number;
  xpReward: number;
  bonusItemReward?: {
    name: string;
    icon: string;
    type: 'seed' | 'decor' | 'animal';
    id: string;
    count: number;
  };
  characterHost: CharacterId;
  missionPrompt: string;
  questions: Question[];
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'graded' | 'approved';
  score: number;
  maxScore: number;
  percentage: number;
  answers: Record<string, any>;
  feedback?: string;
  coinsEarned: number;
  xpEarned: number;
  bonusClaimed?: boolean;
  submittedAt?: string;
  reviewedAt?: string;
  teacherNote?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  rewardCoins: number;
  rewardXP: number;
  completed: boolean;
  claimed: boolean;
  type: 'plant' | 'harvest' | 'homework' | 'feed' | 'login' | 'water';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'farming' | 'education' | 'streaks' | 'animals' | 'social';
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rewardCoins: number;
  rewardXP: number;
  unlockedAt?: string;
}

export interface GameNotification {
  id: string;
  title: string;
  message: string;
  character?: CharacterId;
  type: 'mission' | 'reward' | 'harvest' | 'level_up' | 'teacher_note' | 'streak';
  timestamp: string;
  read: boolean;
  actionType?: 'open_homework' | 'open_farm' | 'open_shop' | 'open_achievements';
  actionPayload?: string;
}

export type FarmTool =
  | 'select'
  | 'hoe'
  | 'water'
  | 'plant'
  | 'harvest'
  | 'feed'
  | 'demolish';

export interface Classroom {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  schoolId: string;
  studentIds: string[];
}
