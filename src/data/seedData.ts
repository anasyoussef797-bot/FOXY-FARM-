import {
  Classroom,
  FarmTile,
  GameNotification,
  Homework,
  HomeworkSubmission,
  StudentProfile,
  TeacherProfile,
  User,
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'student_1',
    name: 'Youssef El-Masry',
    email: 'youssef@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👦🏽',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g4',
    className: 'Grade 4 - Nile Explorers',
    grade: 'Grade 4',
  },
  {
    id: 'student_2',
    name: 'Nour Amin',
    email: 'nour@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👧🏻',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g4',
    className: 'Grade 4 - Nile Explorers',
    grade: 'Grade 4',
  },
  {
    id: 'student_3',
    name: 'Layla Hassan',
    email: 'layla@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👧🏽',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g5',
    className: 'Grade 5 - Pyramid Innovators',
    grade: 'Grade 5',
  },
  {
    id: 'student_4',
    name: 'Karim Adel',
    email: 'karim@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👦🏻',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g5',
    className: 'Grade 5 - Pyramid Innovators',
    grade: 'Grade 5',
  },
  {
    id: 'teacher_1',
    name: 'Mr. Tarek (STEM & Math)',
    email: 'tarek.teacher@impacthub.edu.eg',
    role: 'TEACHER',
    avatar: '👨🏻‍🏫',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    title: 'Lead STEM & Mathematics Educator',
  },
  {
    id: 'teacher_2',
    name: 'Ms. Sarah (Languages & Phonics)',
    email: 'sarah.teacher@impacthub.edu.eg',
    role: 'TEACHER',
    avatar: '👩🏻‍🏫',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    title: 'Lead English & Literacy Specialist',
  },
  {
    id: 'admin_1',
    name: 'Dr. Farida Mostafa',
    email: 'farida.admin@impacthub.edu.eg',
    role: 'SCHOOL_ADMIN',
    avatar: '👩🏽‍💼',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    title: 'Academic Director & School Principal',
  },
  {
    id: 'super_admin_1',
    name: 'Impact Hub Egypt Director',
    email: 'director@impacthub.eg',
    role: 'SUPER_ADMIN',
    avatar: '🌟',
    title: 'Impact Hub Egypt Educational Platform Admin',
  },
];

export const SEED_STUDENT_PROFILES: Record<string, StudentProfile> = {
  student_1: {
    id: 'student_1',
    name: 'Youssef El-Masry',
    email: 'youssef@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👦🏽',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g4',
    className: 'Grade 4 - Nile Explorers',
    grade: 'Grade 4',
    coins: 480,
    dinars: 15,
    xp: 520,
    level: 4,
    energy: 45,
    maxEnergy: 50,
    streakDays: 5,
    lastLoginDate: '2026-08-25',
    completedMissionsCount: 7,
    totalHarvestsCount: 18,
    activeGuide: 'FOXY',
    farmGridWidth: 8,
    farmGridHeight: 8,
    unlockedLandArea: 1,
    inventory: [
      { id: 'inv_1', type: 'seed', referenceId: 'wheat', name: 'Wheat Seeds', icon: '🌾', quantity: 6, sellPrice: 5 },
      { id: 'inv_2', type: 'seed', referenceId: 'carrot', name: 'Carrot Seeds', icon: '🥕', quantity: 4, sellPrice: 10 },
      { id: 'inv_3', type: 'seed', referenceId: 'corn', name: 'Corn Seeds', icon: '🌽', quantity: 2, sellPrice: 18 },
      { id: 'inv_4', type: 'produce', referenceId: 'wheat', name: 'Harvested Wheat', icon: '🌾', quantity: 5, sellPrice: 22 },
      { id: 'inv_5', type: 'produce', referenceId: 'carrot', name: 'Crunchy Carrot', icon: '🥕', quantity: 3, sellPrice: 48 },
      { id: 'inv_6', type: 'animal_product', referenceId: 'milk', name: 'Organic Milk', icon: '🥛', quantity: 2, sellPrice: 75 },
    ],
  },
  student_2: {
    id: 'student_2',
    name: 'Nour Amin',
    email: 'nour@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👧🏻',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g4',
    className: 'Grade 4 - Nile Explorers',
    grade: 'Grade 4',
    coins: 820,
    dinars: 24,
    xp: 880,
    level: 5,
    energy: 50,
    maxEnergy: 50,
    streakDays: 7,
    lastLoginDate: '2026-08-25',
    completedMissionsCount: 11,
    totalHarvestsCount: 32,
    activeGuide: 'TALIA',
    farmGridWidth: 8,
    farmGridHeight: 8,
    unlockedLandArea: 1,
    inventory: [
      { id: 'inv_n1', type: 'seed', referenceId: 'strawberry', name: 'Strawberry Seeds', icon: '🍓', quantity: 5, sellPrice: 35 },
      { id: 'inv_n2', type: 'produce', referenceId: 'strawberry', name: 'Fresh Strawberries', icon: '🍓', quantity: 8, sellPrice: 190 },
      { id: 'inv_n3', type: 'animal_product', referenceId: 'egg', name: 'Golden Eggs', icon: '🥚', quantity: 4, sellPrice: 30 },
    ],
  },
  student_3: {
    id: 'student_3',
    name: 'Layla Hassan',
    email: 'layla@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👧🏽',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g5',
    className: 'Grade 5 - Pyramid Innovators',
    grade: 'Grade 5',
    coins: 210,
    dinars: 8,
    xp: 180,
    level: 2,
    energy: 35,
    maxEnergy: 40,
    streakDays: 2,
    lastLoginDate: '2026-08-25',
    completedMissionsCount: 2,
    totalHarvestsCount: 6,
    activeGuide: 'ADAM',
    farmGridWidth: 8,
    farmGridHeight: 8,
    unlockedLandArea: 1,
    inventory: [
      { id: 'inv_l1', type: 'seed', referenceId: 'wheat', name: 'Wheat Seeds', icon: '🌾', quantity: 3, sellPrice: 5 },
    ],
  },
  student_4: {
    id: 'student_4',
    name: 'Karim Adel',
    email: 'karim@impacthub.edu.eg',
    role: 'STUDENT',
    avatar: '👦🏻',
    schoolId: 'school_1',
    schoolName: 'Impact Hub Learning Academy - Cairo',
    classId: 'class_g5',
    className: 'Grade 5 - Pyramid Innovators',
    grade: 'Grade 5',
    coins: 340,
    dinars: 12,
    xp: 320,
    level: 3,
    energy: 40,
    maxEnergy: 45,
    streakDays: 4,
    lastLoginDate: '2026-08-24',
    completedMissionsCount: 5,
    totalHarvestsCount: 14,
    activeGuide: 'SPARK',
    farmGridWidth: 8,
    farmGridHeight: 8,
    unlockedLandArea: 1,
    inventory: [
      { id: 'inv_k1', type: 'seed', referenceId: 'carrot', name: 'Carrot Seeds', icon: '🥕', quantity: 2, sellPrice: 10 },
    ],
  },
};

export const SEED_CLASSROOMS: Classroom[] = [
  {
    id: 'class_g4',
    name: 'Grade 4 - Nile Explorers',
    grade: 'Grade 4',
    teacherId: 'teacher_1',
    schoolId: 'school_1',
    studentIds: ['student_1', 'student_2'],
  },
  {
    id: 'class_g5',
    name: 'Grade 5 - Pyramid Innovators',
    grade: 'Grade 5',
    teacherId: 'teacher_2',
    schoolId: 'school_1',
    studentIds: ['student_3', 'student_4'],
  },
];

export function generateInitialFarmGrid(studentId: string): FarmTile[] {
  const tiles: FarmTile[] = [];
  const now = Date.now();

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const id = `${studentId}_t_${x}_${y}`;
      const isPerimeter = x === 0 || x === 7 || y === 0 || y === 7;

      if (isPerimeter) {
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          isLocked: true,
          unlockLevel: 5,
          unlockCostCoins: 150,
        });
        continue;
      }

      // Default Farm Layout Setup for active zone (1 to 6)
      if (x === 1 && y === 1) {
        // Farmhouse
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          buildingId: 'farmhouse',
          isLocked: false,
        });
      } else if (x === 5 && y === 1) {
        // Red Barn
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          buildingId: 'barn',
          isLocked: false,
        });
      } else if (x === 5 && y === 2) {
        // Daisy Cow
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          animalId: 'cow',
          animalFedAt: now - 30000,
          isLocked: false,
        });
      } else if (x === 4 && y === 2) {
        // Clucky Hen
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          animalId: 'chicken',
          animalFedAt: now - 20000,
          isLocked: false,
        });
      } else if (x === 2 && y === 3) {
        // Planted Wheat Ready to Harvest
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'ready',
          cropId: 'wheat',
          plantedAt: now - 35000,
          wateredAt: now - 35000,
          growthDurationSec: 20,
          isLocked: false,
        });
      } else if (x === 3 && y === 3) {
        // Planted Carrot Growing
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'watered',
          cropId: 'carrot',
          plantedAt: now - 15000,
          wateredAt: now - 15000,
          growthDurationSec: 45,
          isLocked: false,
        });
      } else if (x === 4 && y === 3) {
        // Plowed Soil (empty ready to plant)
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'empty',
          isLocked: false,
        });
      } else if (x === 2 && y === 4) {
        // Plowed Soil
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'empty',
          isLocked: false,
        });
      } else if (x === 3 && y === 4) {
        // Planted Corn (just planted)
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'watered',
          cropId: 'corn',
          plantedAt: now - 5000,
          wateredAt: now - 5000,
          growthDurationSec: 75,
          isLocked: false,
        });
      } else if (x === 4 && y === 4) {
        // Plowed Soil
        tiles.push({
          id,
          x,
          y,
          type: 'soil',
          status: 'empty',
          isLocked: false,
        });
      } else if (x === 1 && y === 4) {
        // Stone path
        tiles.push({
          id,
          x,
          y,
          type: 'path',
          status: 'empty',
          isLocked: false,
        });
      } else if (x === 1 && y === 5) {
        // Flower patch
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          decorationId: 'flower_patch',
          isLocked: false,
        });
      } else if (x === 5 && y === 5) {
        // Solar Lamp
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          decorationId: 'solar_lamp',
          isLocked: false,
        });
      } else {
        // Standard lush grass tile
        tiles.push({
          id,
          x,
          y,
          type: 'grass',
          status: 'empty',
          isLocked: false,
        });
      }
    }
  }

  return tiles;
}

export const SEED_HOMEWORKS: Homework[] = [
  {
    id: 'hw_math_01',
    title: "Adam's Geometry & Area Expedition",
    description: "Adam needs your help calculating farm boundaries, tile perimeters, and crop patch areas!",
    subject: 'Mathematics',
    gradeLevel: 'Grade 4',
    difficulty: 'Medium',
    assignedByTeacherId: 'teacher_1',
    teacherName: 'Mr. Tarek',
    targetClassIds: ['class_g4'],
    dueDate: '2026-08-30',
    coinsReward: 120,
    xpReward: 90,
    bonusItemReward: {
      id: 'sunflower',
      name: 'Golden Sunflower Seeds',
      type: 'seed',
      icon: '🌻',
      count: 3,
    },
    characterHost: 'ADAM',
    missionPrompt: 'Solve these 4 geometry challenges to power up our farm calculations!',
    createdAt: '2026-08-24',
    questions: [
      {
        id: 'q_m1',
        type: 'multiple_choice',
        prompt: 'If a rectangular vegetable plot is 6 meters long and 4 meters wide, what is its Area in square meters?',
        options: ['10 m²', '20 m²', '24 m²', '28 m²'],
        correctAnswer: '24 m²',
        points: 25,
        explanation: 'Area of a rectangle = Length × Width = 6 × 4 = 24 m².',
      },
      {
        id: 'q_m2',
        type: 'true_false',
        prompt: 'A square field with side length 5 meters has a Perimeter of 20 meters.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        points: 25,
        explanation: 'Perimeter of a square = 4 × Side = 4 × 5 = 20 meters.',
      },
      {
        id: 'q_m3',
        type: 'math_input',
        prompt: 'You have 48 carrot seeds and want to plant them equally into 6 rows. How many seeds go into each row?',
        mathExpr: '48 ÷ 6 = ?',
        correctAnswer: '8',
        points: 25,
        explanation: '48 divided by 6 equals 8 seeds per row.',
      },
      {
        id: 'q_m4',
        type: 'matching',
        prompt: 'Match each geometric shape with its number of sides:',
        pairs: [
          { left: 'Triangle', right: '3 Sides' },
          { left: 'Rectangle', right: '4 Sides' },
          { left: 'Pentagon', right: '5 Sides' },
          { left: 'Hexagon', right: '6 Sides' },
        ],
        correctAnswer: 'matched',
        points: 25,
        explanation: 'Triangle: 3, Rectangle: 4, Pentagon: 5, Hexagon: 6.',
      },
    ],
  },
  {
    id: 'hw_eng_02',
    title: "Talia's Story Garden & Vocabulary Bloom",
    description: 'Help Talia restore missing descriptive words to our farm adventure journal!',
    subject: 'English',
    gradeLevel: 'Grade 4',
    difficulty: 'Easy',
    assignedByTeacherId: 'teacher_2',
    teacherName: 'Ms. Sarah',
    targetClassIds: ['class_g4', 'class_g5'],
    dueDate: '2026-08-31',
    coinsReward: 100,
    xpReward: 80,
    bonusItemReward: {
      id: 'papyrus_planter',
      name: 'Egyptian Papyrus Urn',
      type: 'decor',
      icon: '🏺',
      count: 1,
    },
    characterHost: 'TALIA',
    missionPrompt: 'Talia has prepared 3 language riddles and vocabulary challenges for you!',
    createdAt: '2026-08-23',
    questions: [
      {
        id: 'q_e1',
        type: 'multiple_choice',
        prompt: "Which word is an Adjective that best describes the ripe harvest?",
        options: ['Quickly', 'Golden', 'Run', 'Soil'],
        correctAnswer: 'Golden',
        points: 30,
        explanation: '"Golden" describes a noun (color/quality), making it an adjective!',
      },
      {
        id: 'q_e2',
        type: 'fill_blank',
        prompt: 'Complete the sentence with the correct past-tense verb:',
        blankParts: [
          { text: 'Yesterday, Foxy ' },
          { text: 'planted', isBlank: true, correctWord: 'planted' },
          { text: ' six seeds in the fertile soil.' },
        ],
        options: ['plant', 'planted', 'planting', 'plants'],
        correctAnswer: 'planted',
        points: 35,
        explanation: 'Past tense of "plant" is "planted".',
      },
      {
        id: 'q_e3',
        type: 'matching',
        prompt: 'Match each animal with its baby name:',
        pairs: [
          { left: 'Cow', right: 'Calf' },
          { left: 'Chicken', right: 'Chick' },
          { left: 'Sheep', right: 'Lamb' },
          { left: 'Duck', right: 'Duckling' },
        ],
        correctAnswer: 'matched',
        points: 35,
        explanation: 'Cow -> Calf, Hen -> Chick, Sheep -> Lamb, Duck -> Duckling.',
      },
    ],
  },
  {
    id: 'hw_sci_03',
    title: "Spark's Photosynthesis & Solar Energy Lab",
    description: 'Spark is calibrating the greenhouse sensors. Test your science knowledge on how plants create food!',
    subject: 'Science',
    gradeLevel: 'Grade 4',
    difficulty: 'Medium',
    assignedByTeacherId: 'teacher_1',
    teacherName: 'Mr. Tarek',
    targetClassIds: ['class_g4'],
    dueDate: '2026-09-02',
    coinsReward: 140,
    xpReward: 110,
    bonusItemReward: {
      id: 'rabbit',
      name: 'Fluffy Bunny Adoption Ticket',
      type: 'animal',
      icon: '🐇',
      count: 1,
    },
    characterHost: 'SPARK',
    missionPrompt: 'Initiating Botany and Solar Analysis Subroutine. Let’s succeed together!',
    createdAt: '2026-08-25',
    questions: [
      {
        id: 'q_s1',
        type: 'multiple_choice',
        prompt: 'What green pigment in plant leaves absorbs sunlight for photosynthesis?',
        options: ['Chlorophyll', 'Hemoglobin', 'Melanin', 'Carotene'],
        correctAnswer: 'Chlorophyll',
        points: 30,
        explanation: 'Chlorophyll is the green molecule that traps sunlight inside plant cells.',
      },
      {
        id: 'q_s2',
        type: 'true_false',
        prompt: 'During photosynthesis, plants take in Carbon Dioxide and release Oxygen into the air.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        points: 35,
        explanation: 'True! Plants convert CO2 and water into glucose and release oxygen for humans and animals.',
      },
      {
        id: 'q_s3',
        type: 'multiple_choice',
        prompt: 'Which three essential components do plants need to grow healthy and strong?',
        options: ['Sunlight, Water, and Soil Nutrients', 'Darkness, Ice, and Sand', 'Salt, Sugar, and Oil', 'Plastic, Smoke, and Wind'],
        correctAnswer: 'Sunlight, Water, and Soil Nutrients',
        points: 35,
        explanation: 'Plants thrive with radiant sunlight, clean water, and rich soil minerals.',
      },
    ],
  },
  {
    id: 'hw_gk_04',
    title: "Foxy's Ancient Egypt Nile Agriculture Quest",
    description: 'Discover how ancient Egyptian farmers cultivated the fertile banks of the River Nile!',
    subject: 'General Knowledge',
    gradeLevel: 'Grade 4',
    difficulty: 'Easy',
    assignedByTeacherId: 'teacher_2',
    teacherName: 'Ms. Sarah',
    targetClassIds: ['class_g4', 'class_g5'],
    dueDate: '2026-09-05',
    coinsReward: 110,
    xpReward: 85,
    characterHost: 'FOXY',
    missionPrompt: 'Foxy wants to learn about Egyptian history and our fertile Nile valley roots!',
    createdAt: '2026-08-22',
    questions: [
      {
        id: 'q_g1',
        type: 'multiple_choice',
        prompt: 'What was the annual natural event that deposited rich black silt on Egyptian farm soil?',
        options: ['The Nile Flood (Inundation)', 'Desert Sandstorms', 'Mountain Snowmelt', 'Ocean Tides'],
        correctAnswer: 'The Nile Flood (Inundation)',
        points: 50,
        explanation: 'The annual flooding of the Nile River left behind rich fertile black silt called "Kemet".',
      },
      {
        id: 'q_g2',
        type: 'multiple_choice',
        prompt: 'Which famous plant growing along the Nile was used by ancient Egyptians to make writing paper?',
        options: ['Papyrus', 'Bamboo', 'Palm dates', 'Lotus'],
        correctAnswer: 'Papyrus',
        points: 50,
        explanation: 'Papyrus reeds were pressed together into smooth scrolls for writing and recording history.',
      },
    ],
  },
];

export const SEED_SUBMISSIONS: HomeworkSubmission[] = [
  {
    id: 'sub_1',
    homeworkId: 'hw_gk_04',
    studentId: 'student_1',
    studentName: 'Youssef El-Masry',
    studentAvatar: '👦🏽',
    status: 'graded',
    score: 100,
    maxScore: 100,
    percentage: 100,
    answers: {
      q_g1: 'The Nile Flood (Inundation)',
      q_g2: 'Papyrus',
    },
    feedback: 'Splendid mastery of Egyptian agricultural heritage, Youssef! Foxy is proud!',
    coinsEarned: 110,
    xpEarned: 85,
    bonusClaimed: true,
    submittedAt: '2026-08-23T14:20:00Z',
    reviewedAt: '2026-08-23T16:00:00Z',
    teacherNote: 'Outstanding score! Keep up the brilliant streak.',
  },
  {
    id: 'sub_2',
    homeworkId: 'hw_math_01',
    studentId: 'student_2',
    studentName: 'Nour Amin',
    studentAvatar: '👧🏻',
    status: 'approved',
    score: 100,
    maxScore: 100,
    percentage: 100,
    answers: {
      q_m1: '24 m²',
      q_m2: 'True',
      q_m3: '8',
      q_m4: 'matched',
    },
    feedback: 'Perfect mathematical logic and step precision, Nour!',
    coinsEarned: 120,
    xpEarned: 90,
    bonusClaimed: true,
    submittedAt: '2026-08-24T10:15:00Z',
    reviewedAt: '2026-08-24T11:00:00Z',
    teacherNote: 'Exceptional work as always!',
  },
];

export const SEED_NOTIFICATIONS: GameNotification[] = [
  {
    id: 'notif_1',
    title: 'New Mission Assigned!',
    message: "Spark has prepared a new Science mission: 'Photosynthesis & Solar Energy Lab'.",
    character: 'SPARK',
    type: 'mission',
    timestamp: '10 minutes ago',
    read: false,
    actionType: 'open_homework',
    actionPayload: 'hw_sci_03',
  },
  {
    id: 'notif_2',
    title: 'Crop Ready for Harvest!',
    message: 'Your Golden Wheat patch is ripe and gleaming with golden ears.',
    character: 'FOXY',
    type: 'harvest',
    timestamp: '25 minutes ago',
    read: false,
    actionType: 'open_farm',
  },
  {
    id: 'notif_3',
    title: '5-Day Learning Streak Active! 🔥',
    message: 'You have logged in and learned 5 days in a row! Keep going for the 7-day bonus!',
    character: 'TALIA',
    type: 'streak',
    timestamp: 'Today',
    read: true,
  },
];
