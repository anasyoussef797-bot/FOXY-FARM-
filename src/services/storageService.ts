import {
  Achievement,
  Classroom,
  DailyQuest,
  FarmTile,
  GameNotification,
  Homework,
  HomeworkSubmission,
  StudentProfile,
  TeacherProfile,
  User,
} from '../types';
import {
  ANIMALS_CONFIG,
  CROPS_CONFIG,
  INITIAL_ACHIEVEMENTS,
  INITIAL_DAILY_QUESTS,
  getLevelFromXP,
} from '../data/gameConfigs';
import {
  SEED_CLASSROOMS,
  SEED_HOMEWORKS,
  SEED_NOTIFICATIONS,
  SEED_STUDENT_PROFILES,
  SEED_SUBMISSIONS,
  SEED_USERS,
  generateInitialFarmGrid,
} from '../data/seedData';

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'foxy_farm_current_user_id',
  USERS: 'foxy_farm_users',
  STUDENT_PROFILES: 'foxy_farm_student_profiles',
  FARMS: 'foxy_farm_student_farms',
  HOMEWORKS: 'foxy_farm_homeworks',
  SUBMISSIONS: 'foxy_farm_submissions',
  ACHIEVEMENTS: 'foxy_farm_achievements',
  DAILY_QUESTS: 'foxy_farm_daily_quests',
  NOTIFICATIONS: 'foxy_farm_notifications',
  CLASSROOMS: 'foxy_farm_classrooms',
  TUTORIAL_COMPLETED: 'foxy_farm_tutorial_completed',
};

export class StorageService {
  // Get all users
  public static getUsers(): User[] {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  }

  // Get current active user
  public static getCurrentUser(): User {
    const users = this.getUsers();
    const currentId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || 'student_1';
    const found = users.find((u) => u.id === currentId);
    if (found) return found;
    return users[0] || SEED_USERS[0];
  }

  public static setCurrentUser(userId: string): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
  }

  // Get student profile
  public static getStudentProfile(studentId: string): StudentProfile {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
    let profiles: Record<string, StudentProfile> = raw ? JSON.parse(raw) : SEED_STUDENT_PROFILES;

    if (!profiles[studentId]) {
      // Create new profile if not exists
      const baseUser = this.getUsers().find((u) => u.id === studentId);
      profiles[studentId] = {
        id: studentId,
        name: baseUser?.name || 'New Student',
        email: baseUser?.email || `${studentId}@impacthub.edu.eg`,
        role: 'STUDENT',
        avatar: baseUser?.avatar || '👦🏽',
        schoolId: 'school_1',
        schoolName: 'Impact Hub Learning Academy - Cairo',
        classId: 'class_g4',
        className: 'Grade 4 - Nile Explorers',
        grade: 'Grade 4',
        coins: 300,
        xp: 100,
        level: 1,
        energy: 40,
        maxEnergy: 50,
        streakDays: 1,
        lastLoginDate: new Date().toISOString().split('T')[0],
        completedMissionsCount: 0,
        totalHarvestsCount: 0,
        activeGuide: 'FOXY',
        farmGridWidth: 8,
        farmGridHeight: 8,
        unlockedLandArea: 1,
        inventory: [
          { id: 'seed_init_1', type: 'seed', referenceId: 'wheat', name: 'Wheat Seeds', icon: '🌾', quantity: 5, sellPrice: 5 },
          { id: 'seed_init_2', type: 'seed', referenceId: 'carrot', name: 'Carrot Seeds', icon: '🥕', quantity: 3, sellPrice: 10 },
        ],
      };
      this.saveStudentProfiles(profiles);
    }
    return profiles[studentId];
  }

  public static saveStudentProfiles(profiles: Record<string, StudentProfile>): void {
    localStorage.setItem(STORAGE_KEYS.STUDENT_PROFILES, JSON.stringify(profiles));
  }

  public static updateStudentProfile(profile: StudentProfile): void {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT_PROFILES);
    const profiles: Record<string, StudentProfile> = raw ? JSON.parse(raw) : SEED_STUDENT_PROFILES;
    profiles[profile.id] = profile;
    this.saveStudentProfiles(profiles);
  }

  // Get student farm tiles with live time-based calculation
  public static getFarmTiles(studentId: string): FarmTile[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.FARMS}_${studentId}`);
    let tiles: FarmTile[];
    if (!raw) {
      tiles = generateInitialFarmGrid(studentId);
      this.saveFarmTiles(studentId, tiles);
    } else {
      tiles = JSON.parse(raw);
    }

    // Live update crop statuses based on real-time elapsed
    const now = Date.now();
    let changed = false;

    tiles.forEach((tile) => {
      if (tile.cropId && tile.plantedAt && tile.status !== 'ready') {
        const cropConf = CROPS_CONFIG[tile.cropId];
        const durationSec = tile.growthDurationSec || cropConf?.growthSeconds || 30;
        const elapsedSec = (now - tile.plantedAt) / 1000;

        if (elapsedSec >= durationSec) {
          tile.status = 'ready';
          changed = true;
        } else if (tile.status === 'empty' && tile.wateredAt) {
          tile.status = 'watered';
          changed = true;
        }
      }
    });

    if (changed) {
      this.saveFarmTiles(studentId, tiles);
    }

    return tiles;
  }

  public static saveFarmTiles(studentId: string, tiles: FarmTile[]): void {
    localStorage.setItem(`${STORAGE_KEYS.FARMS}_${studentId}`, JSON.stringify(tiles));
  }

  // Homework assignments
  public static getHomeworks(): Homework[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HOMEWORKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HOMEWORKS, JSON.stringify(SEED_HOMEWORKS));
      return SEED_HOMEWORKS;
    }
    return JSON.parse(raw);
  }

  public static saveHomeworks(homeworks: Homework[]): void {
    localStorage.setItem(STORAGE_KEYS.HOMEWORKS, JSON.stringify(homeworks));
  }

  public static addHomework(hw: Homework): void {
    const list = this.getHomeworks();
    list.unshift(hw);
    this.saveHomeworks(list);
  }

  // Submissions
  public static getSubmissions(): HomeworkSubmission[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SEED_SUBMISSIONS));
      return SEED_SUBMISSIONS;
    }
    return JSON.parse(raw);
  }

  public static saveSubmissions(subs: HomeworkSubmission[]): void {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
  }

  public static saveSubmission(sub: HomeworkSubmission): void {
    const list = this.getSubmissions();
    const idx = list.findIndex((s) => s.id === sub.id || (s.homeworkId === sub.homeworkId && s.studentId === sub.studentId));
    if (idx >= 0) {
      list[idx] = sub;
    } else {
      list.unshift(sub);
    }
    this.saveSubmissions(list);
  }

  // Achievements
  public static getAchievements(studentId: string): Achievement[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.ACHIEVEMENTS}_${studentId}`);
    if (!raw) {
      localStorage.setItem(`${STORAGE_KEYS.ACHIEVEMENTS}_${studentId}`, JSON.stringify(INITIAL_ACHIEVEMENTS));
      return INITIAL_ACHIEVEMENTS;
    }
    return JSON.parse(raw);
  }

  public static saveAchievements(studentId: string, achs: Achievement[]): void {
    localStorage.setItem(`${STORAGE_KEYS.ACHIEVEMENTS}_${studentId}`, JSON.stringify(achs));
  }

  // Daily Quests
  public static getDailyQuests(studentId: string): DailyQuest[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.DAILY_QUESTS}_${studentId}`);
    if (!raw) {
      localStorage.setItem(`${STORAGE_KEYS.DAILY_QUESTS}_${studentId}`, JSON.stringify(INITIAL_DAILY_QUESTS));
      return INITIAL_DAILY_QUESTS;
    }
    return JSON.parse(raw);
  }

  public static saveDailyQuests(studentId: string, quests: DailyQuest[]): void {
    localStorage.setItem(`${STORAGE_KEYS.DAILY_QUESTS}_${studentId}`, JSON.stringify(quests));
  }

  // Notifications
  public static getNotifications(userId: string): GameNotification[] {
    const raw = localStorage.getItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`);
    if (!raw) {
      localStorage.setItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`, JSON.stringify(SEED_NOTIFICATIONS));
      return SEED_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  }

  public static saveNotifications(userId: string, notifs: GameNotification[]): void {
    localStorage.setItem(`${STORAGE_KEYS.NOTIFICATIONS}_${userId}`, JSON.stringify(notifs));
  }

  public static addNotification(userId: string, notif: GameNotification): void {
    const list = this.getNotifications(userId);
    list.unshift(notif);
    this.saveNotifications(userId, list);
  }

  // Classrooms
  public static getClassrooms(): Classroom[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CLASSROOMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLASSROOMS, JSON.stringify(SEED_CLASSROOMS));
      return SEED_CLASSROOMS;
    }
    return JSON.parse(raw);
  }

  // Tutorial Flag
  public static isTutorialCompleted(studentId: string): boolean {
    return localStorage.getItem(`${STORAGE_KEYS.TUTORIAL_COMPLETED}_${studentId}`) === 'true';
  }

  public static setTutorialCompleted(studentId: string, val: boolean = true): void {
    localStorage.setItem(`${STORAGE_KEYS.TUTORIAL_COMPLETED}_${studentId}`, String(val));
  }

  // Reset demo state
  public static resetAllData(): void {
    localStorage.clear();
  }
}
