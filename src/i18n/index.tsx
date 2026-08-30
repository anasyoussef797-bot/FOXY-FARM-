import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en' | 'fr' | 'de';

export interface Translations {
  // Navigation & General
  gameTitle: string;
  gameSubtitle: string;
  farm: string;
  missions: string;
  homework: string;
  shop: string;
  market: string;
  inventory: string;
  achievements: string;
  quests: string;
  teacher: string;
  settings: string;
  close: string;
  confirm: string;
  cancel: string;
  save: string;
  back: string;
  level: string;
  xp: string;
  coins: string;
  dinars: string;
  energy: string;
  streak: string;
  notifications: string;
  noNotifications: string;
  markAllRead: string;
  switchUser: string;
  logout: string;
  student: string;
  levelUp: string;
  levelUpMessage: string;
  gotIt: string;

  // Farm & Tools
  seedBag: string;
  noSeedsInBag: string;
  buySeedsPrompt: string;
  clickToSelectSeed: string;
  tilledSoil: string;
  emptyPlot: string;
  growing: string;
  readyToHarvest: string;
  watered: string;
  needsWater: string;
  remainingTime: string;
  secondsShort: string;
  minutesShort: string;
  plant: string;
  water: string;
  harvest: string;
  plow: string;
  feed: string;
  collect: string;
  expandLand: string;
  expandTitle: string;
  expandCost: string;
  expandReqLevel: string;
  unlockNow: string;
  landLocked: string;
  needMoreCoins: string;
  needHigherLevel: string;
  farmExpansionSuccess: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;

  // Shop
  shopTitle: string;
  shopSubtitle: string;
  tabSeeds: string;
  tabAnimals: string;
  tabBuildings: string;
  tabDecor: string;
  buy: string;
  owned: string;
  price: string;
  sellPrice: string;
  growthTime: string;
  reqLevel: string;
  quantity: string;
  totalCost: string;
  buyQuantity: string;
  buySuccess: string;
  insufficientCoins: string;
  spaceNeeded: string;

  // Inventory & Storage
  inventoryTitle: string;
  inventorySubtitle: string;
  tabAll: string;
  tabSeedsOnly: string;
  tabProduceOnly: string;
  tabAnimalGoods: string;
  tabDecorBuildings: string;
  emptyInventory: string;
  emptyInventoryDesc: string;
  itemQuantity: string;
  unitValue: string;
  sell: string;
  sellAll: string;
  sellSelected: string;
  useItem: string;

  // Market / Sell
  marketTitle: string;
  marketSubtitle: string;
  sellCropPrompt: string;
  sellQuantity: string;
  earnCoins: string;
  sellSuccess: string;
  noSellableItems: string;
  noSellableItemsDesc: string;

  // Homework & Missions
  homeworkHubTitle: string;
  homeworkHubSubtitle: string;
  activeMissions: string;
  completedMissions: string;
  missionReward: string;
  startMission: string;
  retryMission: string;
  reviewAnswers: string;
  question: string;
  of: string;
  checkAnswer: string;
  nextQuestion: string;
  submitMission: string;
  correctAnswer: string;
  wrongAnswer: string;
  tryAgain: string;
  missionCompletedTitle: string;
  missionCompletedDesc: string;
  claimReward: string;
  returnToFarm: string;
  allSubjects: string;
  subjectMath: string;
  subjectEnglish: string;
  subjectArabic: string;
  subjectScience: string;
  subjectGeneral: string;

  // Daily Quests & Achievements
  dailyQuestsTitle: string;
  dailyQuestsSubtitle: string;
  claim: string;
  claimed: string;
  inProgress: string;
  achievementsTitle: string;
  achievementsSubtitle: string;
  unlockedAt: string;

  // Character Dialogues
  foxyGreeting: string;
  adamGreeting: string;
  taliaGreeting: string;
  sparkGreeting: string;
  sparkMissionAlert: string;
  foxyShopPrompt: string;
  adamMathPrompt: string;
  taliaBotanyPrompt: string;

  // Crops
  cropWheat: string;
  cropWheatDesc: string;
  cropCarrot: string;
  cropCarrotDesc: string;
  cropCorn: string;
  cropCornDesc: string;
  cropTomato: string;
  cropTomatoDesc: string;
  cropStrawberry: string;
  cropStrawberryDesc: string;
  cropPotato: string;
  cropPotatoDesc: string;
  cropPumpkin: string;
  cropPumpkinDesc: string;
  cropSunflower: string;
  cropSunflowerDesc: string;
  cropCotton: string;
  cropCottonDesc: string;
  cropApple: string;
  cropAppleDesc: string;

  // Animals
  animalCow: string;
  animalCowDesc: string;
  animalChicken: string;
  animalChickenDesc: string;
  animalSheep: string;
  animalSheepDesc: string;
  animalPig: string;
  animalPigDesc: string;
  animalRabbit: string;
  animalRabbitDesc: string;
  animalDuck: string;
  animalDuckDesc: string;
  animalHorse: string;
  animalHorseDesc: string;
  animalGoat: string;
  animalGoatDesc: string;

  // Animal Products
  prodMilk: string;
  prodEgg: string;
  prodWool: string;
  prodTruffle: string;
  prodRabbitWool: string;
  prodDuckFeather: string;
  prodHorseHorseshoe: string;
  prodGoatCheese: string;

  // Buildings
  bldgFarmhouse: string;
  bldgFarmhouseDesc: string;
  bldgBarn: string;
  bldgBarnDesc: string;
  bldgSilo: string;
  bldgSiloDesc: string;
  bldgCoop: string;
  bldgCoopDesc: string;
  bldgWindmill: string;
  bldgWindmillDesc: string;
  bldgGreenhouse: string;
  bldgGreenhouseDesc: string;
  bldgMarketStall: string;
  bldgMarketStallDesc: string;
  bldgSeedShop: string;
  bldgSeedShopDesc: string;

  // Teacher Dashboard
  teacherDashboard: string;
  assignHomework: string;
  studentSubmissions: string;
  classManagement: string;
  awardBonus: string;
  gradeSubmission: string;
  score: string;
  feedback: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Navigation & General
    gameTitle: 'مزرعة فوكسي',
    gameSubtitle: 'مزرعة تعليمية ذكية - إمباكت هب مصر',
    farm: 'المزرعة',
    missions: 'المهمات',
    homework: 'الواجبات',
    shop: 'المتجر',
    market: 'السوق والبيع',
    inventory: 'المخزن',
    achievements: 'الإنجازات',
    quests: 'المهام اليومية',
    teacher: 'بوابة المعلم',
    settings: 'الإعدادات',
    close: 'إغلاق',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    save: 'حفظ',
    back: 'رجوع',
    level: 'المستوى',
    xp: 'الخبرة',
    coins: 'الذهب',
    dinars: 'الدنانير',
    energy: 'الطاقة',
    streak: 'أيام متتالية',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة حالياً',
    markAllRead: 'تحديد الكل كمقروء',
    switchUser: 'تبديل الحساب',
    logout: 'تسجيل الخروج',
    student: 'طالب',
    levelUp: 'ترقية المستوى! 🌟',
    levelUpMessage: 'تهانينا! لقد وصلت إلى المستوى الجديد، وتوفرت محاصيل وعناصر إضافية في المتجر!',
    gotIt: 'حسناً! 👍',

    // Farm & Tools
    seedBag: 'كيس البذور المتاح:',
    noSeedsInBag: 'لا توجد بذور في حقيبتك!',
    buySeedsPrompt: 'شراء بذور من المتجر',
    clickToSelectSeed: 'انقر لاختيار البذرة للزراعة',
    tilledSoil: 'تربة محروثة جاهزة',
    emptyPlot: 'أرض زراعية خالية',
    growing: 'ينمو حالياً...',
    readyToHarvest: 'جاهز للحصاد! ✨',
    watered: 'تم السقي 💧',
    needsWater: 'بحاجة إلى سقي',
    remainingTime: 'الوقت المتبقي:',
    secondsShort: 'ث',
    minutesShort: 'د',
    plant: 'زراعة',
    water: 'سقي 💧',
    harvest: 'حصاد 🌾',
    plow: 'حرث ⛏️',
    feed: 'إطعام 🥕',
    collect: 'جمع الإنتاج',
    expandLand: 'توسيع الأرض',
    expandTitle: 'توسعة أرض المزرعة 🚜',
    expandCost: 'تكلفة التوسعة:',
    expandReqLevel: 'المستوى المطلوب:',
    unlockNow: 'فتح التوسعة الآن',
    landLocked: 'أرض مقفلة للتوسعة',
    needMoreCoins: 'تحتاج إلى مزيد من الذهب لفتح هذه الأرض!',
    needHigherLevel: 'يجب رفع مستواك لفتح هذه التوسعة!',
    farmExpansionSuccess: 'تمت توسعة مزرعتك بنجاح! أصبحت مساحة المزرعة أكبر وجاهزة لمزيد من المزروعات!',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    resetView: 'إعادة ضبط الكاميرا',

    // Shop
    shopTitle: 'متجر مزرعة فوكسي 🏪',
    shopSubtitle: 'اشترِ البذور، الحيوانات، المباني والزينة بالذهب المكتسب من تفوقك!',
    tabSeeds: '🌱 البذور والمحاصيل',
    tabAnimals: '🐾 الحيوانات',
    tabBuildings: '🏛️ المباني والمرافق',
    tabDecor: '✨ الزينة والممرات',
    buy: 'شراء',
    owned: 'مملوك لديك:',
    price: 'السعر:',
    sellPrice: 'سعر البيع:',
    growthTime: 'فترة النمو:',
    reqLevel: 'المستوى:',
    quantity: 'الكمية:',
    totalCost: 'الإجمالي:',
    buyQuantity: 'شراء الكمية المحددة',
    buySuccess: 'تم الشراء بنجاح وإضافة العناصر إلى مخزنك!',
    insufficientCoins: 'لا تملك ذهباً كافياً! أنجز واجباتك الدراسية لكسب المزيد من الذهب!',
    spaceNeeded: 'لا توجد مساحة خالية على العشب لوضع هذا العنصر!',

    // Inventory & Storage
    inventoryTitle: 'صومعة ومخزن المزرعة 📦',
    inventorySubtitle: 'جميع البذور والمحاصيل والمنتجات المخزنة - يمكنك زراعتها أو بيعها في السوق',
    tabAll: 'جميع العناصر',
    tabSeedsOnly: '🌱 البذور',
    tabProduceOnly: '🌾 المحاصيل المحصودة',
    tabAnimalGoods: '🥛 منتجات الحيوانات',
    tabDecorBuildings: '🏛️ المنشآت والزينة',
    emptyInventory: 'المخزن فارغ حالياً',
    emptyInventoryDesc: 'احصد محاصيلك أو اشترِ البذور أو أنجز واجباتك لتملأ مخزنك!',
    itemQuantity: 'العدد:',
    unitValue: 'القيمة للوحدة:',
    sell: 'بيع',
    sellAll: 'بيع الكل',
    sellSelected: 'بيع المحدد',
    useItem: 'استخدام',

    // Market / Sell
    marketTitle: 'سوق المزرعة لبيع المحاصيل 💰',
    marketSubtitle: 'بع محاصيلك ومنتجات حيواناتك واكسب الذهب ونقاط الخبرة فوراً!',
    sellCropPrompt: 'اختر المنتجات التي ترغب ببيعها لتجار السوق:',
    sellQuantity: 'كمية البيع:',
    earnCoins: 'ستربح:',
    sellSuccess: 'تم بيع المحصول بنجاح وإضافة الذهب والخبرة إلى رصيدك!',
    noSellableItems: 'لا توجد محاصيل جاهزة للبيع في مخزنك حالياً',
    noSellableItemsDesc: 'قم بزراعة المحاصيل وحصادها أو رعاية حيواناتك لإنتاج بضائع للبيع!',

    // Homework & Missions
    homeworkHubTitle: 'مهمات وواجبات التعلم الذكية 📚',
    homeworkHubSubtitle: 'حل الواجبات المدرسية مع فوكسي، آدم، تاليا وسبارك واكسب الذهب والبذور النادرة!',
    activeMissions: 'المهمات المتاحة',
    completedMissions: 'المهمات المكتملة',
    missionReward: 'المكافأة:',
    startMission: 'بدء المهمة الآن 🚀',
    retryMission: 'إعادة المحاولة 🔄',
    reviewAnswers: 'مراجعة الإجابات',
    question: 'السؤال',
    of: 'من',
    checkAnswer: 'تحقق من الإجابة',
    nextQuestion: 'السؤال التالي ➡️',
    submitMission: 'تسليم المهمة والحصول على المكافآت 🏆',
    correctAnswer: 'إجابة ممتازة وصحيحة! 🎉',
    wrongAnswer: 'إجابة غير صحيحة، حاول مجدداً!',
    tryAgain: 'حاول مرة أخرى',
    missionCompletedTitle: 'أحسنت! اكتملت المهمة الدراسية بنجاح 🌟',
    missionCompletedDesc: 'حصلت على نقاط الخبرة والذهب وتمت إضافة المكافأة إلى حسابك!',
    claimReward: 'استلام المكافأة والعودة للمزرعة',
    returnToFarm: 'العودة إلى المزرعة',
    allSubjects: '🌟 جميع المواد',
    subjectMath: 'الرياضيات',
    subjectEnglish: 'اللغة الإنجليزية',
    subjectArabic: 'اللغة العربية',
    subjectScience: 'العلوم والطبيعة',
    subjectGeneral: 'المعرفة العامة',

    // Daily Quests & Achievements
    dailyQuestsTitle: 'المهام اليومية للمزرعة 🎯',
    dailyQuestsSubtitle: 'أنجز مهام المزرعة والتعلم اليومية لتحصل على مكافآت إضافية كل يوم!',
    claim: 'استلام الجائزة',
    claimed: 'تم الاستلام ✓',
    inProgress: 'قيد الإنجاز',
    achievementsTitle: 'سجل إنجازات المزرعة 🏆',
    achievementsSubtitle: 'أوسمة وجوائز تفوقك في الزراعة والتعلم',
    unlockedAt: 'تم الفتح في:',

    // Character Dialogues
    foxyGreeting: 'أهلاً بك يا بطل في مزرعة فوكسي! أنا مستعد لمساعدتك في كل خطوة لزراعة أجمل المحاصيل.',
    adamGreeting: 'مرحباً! أنا آدم، مستكشف الرياضيات والعلوم. هل أنت مستعد لحل ألغاز اليوم وكسب الذهب؟',
    taliaGreeting: 'أهلاً يا صديقي! أنا تاليا، عاشقة النباتات واللغات. دعنا نعتني بأزهار المزرعة ونقرأ معاً.',
    sparkGreeting: 'بييب بوب! سبارك في الخدمة. أنظمة المزرعة تعمل بكفاءة، ولدينا مهام تعليمية جديدة تنتظرك!',
    sparkMissionAlert: 'تنبيه ذكي! لديك مهمة دراسية جديدة من معلمك. أجب عليها لتكسب الذهب ونقاط الخبرة!',
    foxyShopPrompt: 'زر متجر البذور لشراء محاصيل جديدة وتوسيع مزرعتك!',
    adamMathPrompt: 'لدينا مسائل رياضية ممتعة جاهزة لك اليوم!',
    taliaBotanyPrompt: 'هل قمت بسقي نباتاتك اليوم؟ تحتاج إلى الرعاية لتنمو بسرعة!',

    // Crops
    cropWheat: 'القمح الذهبي',
    cropWheatDesc: 'محصول سريع النمو غني بالبركة، رائع لبداية المزارعين الأذكياء.',
    cropCarrot: 'الجزر المقرمش',
    cropCarrotDesc: 'جزر طازج ولذيذ يحبه الجميع ويمنح طاقة ونشاطاً كبيراً.',
    cropCorn: 'الذرة الحلوة',
    cropCornDesc: 'سيقان ذرة طويلة ممتلئة بالحبات الصفراء المغذية واللذيذة.',
    cropTomato: 'طماطم الياقوت',
    cropTomatoDesc: 'طماطم حمراء نضرة وعصارية غنية بالفيتامينات والمعادن.',
    cropStrawberry: 'الفراولة الشهية',
    cropStrawberryDesc: 'توت فراولة عالي القيمة والطلب في سوق المزرعة.',
    cropPotato: 'البطاطس الذهبية',
    cropPotatoDesc: 'درنات بطاطس غنية بالطاقة وسهلة التخزين.',
    cropPumpkin: 'القرع العسلي',
    cropPumpkinDesc: 'قرع عميق اللون كبير الحجم يدر أرباحاً ممتازة عند بيعه.',
    cropSunflower: 'دوار الشمس',
    cropSunflowerDesc: 'زهور مشرقة تبتهج مع أشعة الشمس وتزيد من جاذبية المزرعة.',
    cropCotton: 'القطن المصري',
    cropCottonDesc: 'الذهب الأبيض الشهير طويل التيلة من وادي النيل الخصيب.',
    cropApple: 'تفاح البساتين',
    cropAppleDesc: 'تفاح مقرمش وحلو المذاق من أشجار المزرعة المثمرة.',

    // Animals
    animalCow: 'البقرة الحلوب',
    animalCowDesc: 'بقرة هادئة ترعى العشب وتنتج الحليب الصافي يومياً.',
    animalChicken: 'الدجاجة النشيطة',
    animalChickenDesc: 'تنقر الأرض وتبحث عن الحبوب لتضع بيضاً طازجاً كل صباح.',
    animalSheep: 'الخروف الصوفي',
    animalSheepDesc: 'خروف ذو صوف ناعم وكثيف يمكن قصه وبيعه في السوق.',
    animalPig: 'الخنزير الوردي',
    animalPigDesc: 'حيوان مرح يبحث في التربة ويكتشف الكمأ والكنوز.',
    animalRabbit: 'الأرنب اللطيف',
    animalRabbitDesc: 'أرنب يقفز برشاقة ويحب أكل الجزر الطازج من محصولك.',
    animalDuck: 'البطة المائية',
    animalDuckDesc: 'تسبح في الجداول وتوفر ريشاً وبيضاً نادراً عالي القيمة.',
    animalHorse: 'الحصان العربي',
    animalHorseDesc: 'حصان أصيل رشيق يساعد في جولات المزرعة السريعة.',
    animalGoat: 'الماعز الجبلي',
    animalGoatDesc: 'ماعز نشيط يوفر حليباً وجبناً رائع المذاق.',

    // Animal Products
    prodMilk: 'حليب طازج 🥛',
    prodEgg: 'بيض عضوي 🥚',
    prodWool: 'صوف دافئ 🧶',
    prodTruffle: 'فطر الكمأة 🍄',
    prodRabbitWool: 'صوف الأرنب 🪶',
    prodDuckFeather: 'ريش البط 🪶',
    prodHorseHorseshoe: 'حذوة حصان 🧲',
    prodGoatCheese: 'جبن ماعز 🧀',

    // Buildings
    bldgFarmhouse: 'بيت المزرعة الخشبي',
    bldgFarmhouseDesc: 'منزل المزرعة الرئيسي الدافئ الذي تنطلق منه جميع المغامرات.',
    bldgBarn: 'حظيرة الحيوانات الكبرى',
    bldgBarnDesc: 'حظيرة مريحة وواسعة لإيواء ورعاية حيوانات المزرعة.',
    bldgSilo: 'صومعة الغلال والحبوب',
    bldgSiloDesc: 'مخزن متطور لحفظ المحاصيل والحبوب المحصودة بأمان.',
    bldgCoop: 'خم الدجاج الأنيق',
    bldgCoopDesc: 'مأوى دافئ للدواجن يرفع من إنتاجية البيض اليومي.',
    bldgWindmill: 'طاحونة الهواء الكلاسيكية',
    bldgWindmillDesc: 'تطحن الحبوب لتصنيع الدقيق وتزيد من سرعة نمو المحاصيل.',
    bldgGreenhouse: 'البيت الزجاجي للعلوم',
    bldgGreenhouseDesc: 'مختبر تاليا النباتي لحماية وزراعة المحاصيل النادرة.',
    bldgMarketStall: 'كشك سوق المزرعة',
    bldgMarketStallDesc: 'منفذ بيع المنتجات مباشرة للتجار والزوار لكسب الذهب.',
    bldgSeedShop: 'متجر بذور الواحة',
    bldgSeedShopDesc: 'متجر مخصص لتوفير أجود أنواع البذور والأشتال المعتمدة.',

    // Teacher Dashboard
    teacherDashboard: 'لوحة تحكم المعلم 🎓',
    assignHomework: 'إسناد واجب جديد',
    studentSubmissions: 'إجابات الطلاب',
    classManagement: 'الفصول الدراسية',
    awardBonus: 'منح مكافأة ذهبية',
    gradeSubmission: 'تصحيح الإجابة',
    score: 'الدرجة',
    feedback: 'الملاحظات والتوجيه',
  },

  en: {
    // Navigation & General
    gameTitle: 'Foxy Farm',
    gameSubtitle: 'Smart Educational Farm - Impact Hub Egypt',
    farm: 'Farm',
    missions: 'Missions',
    homework: 'Homework',
    shop: 'Shop',
    market: 'Market & Sell',
    inventory: 'Storage',
    achievements: 'Achievements',
    quests: 'Daily Quests',
    teacher: 'Teacher Portal',
    settings: 'Settings',
    close: 'Close',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    level: 'Level',
    xp: 'XP',
    coins: 'Coins',
    dinars: 'Dinars',
    energy: 'Energy',
    streak: 'Streak Days',
    notifications: 'Notifications',
    noNotifications: 'No new notifications right now',
    markAllRead: 'Mark all as read',
    switchUser: 'Switch User',
    logout: 'Log Out',
    student: 'Student',
    levelUp: 'Level Up! 🌟',
    levelUpMessage: 'Congratulations! You reached a new level, unlocking exciting new crops and items in the shop!',
    gotIt: 'Got it! 👍',

    // Farm & Tools
    seedBag: 'Available Seed Bag:',
    noSeedsInBag: 'No seeds in your storage bag!',
    buySeedsPrompt: 'Buy Seeds in Market',
    clickToSelectSeed: 'Click to select seed for planting',
    tilledSoil: 'Tilled Soil Bed',
    emptyPlot: 'Empty Farm Land',
    growing: 'Growing...',
    readyToHarvest: 'Ready to Harvest! ✨',
    watered: 'Watered 💧',
    needsWater: 'Needs Water',
    remainingTime: 'Time remaining:',
    secondsShort: 's',
    minutesShort: 'm',
    plant: 'Plant',
    water: 'Water 💧',
    harvest: 'Harvest 🌾',
    plow: 'Plow ⛏️',
    feed: 'Feed 🥕',
    collect: 'Collect',
    expandLand: 'Expand Land',
    expandTitle: 'Expand Farm Territory 🚜',
    expandCost: 'Expansion Cost:',
    expandReqLevel: 'Required Level:',
    unlockNow: 'Unlock Land Now',
    landLocked: 'Wilderness Plot',
    needMoreCoins: 'You need more Coins to unlock this farm plot!',
    needHigherLevel: 'Reach a higher level to unlock this territory!',
    farmExpansionSuccess: 'Expansion successful! Your farm is now larger and ready for more crops and buildings!',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetView: 'Reset Camera',

    // Shop
    shopTitle: 'Foxy Farm Market & Shop 🏪',
    shopSubtitle: 'Buy seeds, animals, buildings, and decorations with your hard-earned coins!',
    tabSeeds: '🌱 Seeds & Crops',
    tabAnimals: '🐾 Farm Animals',
    tabBuildings: '🏛️ Buildings & Facilities',
    tabDecor: '✨ Decorations & Paths',
    buy: 'Buy',
    owned: 'Owned:',
    price: 'Price:',
    sellPrice: 'Sell Price:',
    growthTime: 'Grow Time:',
    reqLevel: 'Level:',
    quantity: 'Quantity:',
    totalCost: 'Total Cost:',
    buyQuantity: 'Buy Selected Quantity',
    buySuccess: 'Items purchased successfully and added to your storage!',
    insufficientCoins: 'Insufficient coins! Complete educational missions to earn more gold coins!',
    spaceNeeded: 'No open grass space found to place this item!',

    // Inventory & Storage
    inventoryTitle: 'Farm Silo & Storage 📦',
    inventorySubtitle: 'All your stored seeds, harvested produce, and animal goods - ready to plant or sell.',
    tabAll: 'All Items',
    tabSeedsOnly: '🌱 Seeds',
    tabProduceOnly: '🌾 Harvested Produce',
    tabAnimalGoods: '🥛 Animal Goods',
    tabDecorBuildings: '🏛️ Buildings & Decor',
    emptyInventory: 'Storage is currently empty',
    emptyInventoryDesc: 'Harvest crops, purchase seeds, or complete homework to stock your barn!',
    itemQuantity: 'Qty:',
    unitValue: 'Unit Value:',
    sell: 'Sell',
    sellAll: 'Sell All',
    sellSelected: 'Sell Selected',
    useItem: 'Use',

    // Market / Sell
    marketTitle: 'Farm Market & Crop Sell 💰',
    marketSubtitle: 'Sell your crops and animal produce to merchants for instant Coins and XP!',
    sellCropPrompt: 'Choose the items you wish to sell:',
    sellQuantity: 'Quantity to sell:',
    earnCoins: 'You will earn:',
    sellSuccess: 'Produce sold successfully! Coins and XP added to your balance.',
    noSellableItems: 'No sellable produce in your storage currently',
    noSellableItemsDesc: 'Plant crops, harvest them, or feed animals to produce goods to sell at the market!',

    // Homework & Missions
    homeworkHubTitle: 'Educational Learning Missions 📚',
    homeworkHubSubtitle: 'Solve curriculum quests with Foxy, Adam, Talia, and Spark to earn Coins and rare seeds!',
    activeMissions: 'Available Missions',
    completedMissions: 'Completed Missions',
    missionReward: 'Reward:',
    startMission: 'Start Mission 🚀',
    retryMission: 'Retry Mission 🔄',
    reviewAnswers: 'Review Answers',
    question: 'Question',
    of: 'of',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question ➡️',
    submitMission: 'Submit Mission & Claim Rewards 🏆',
    correctAnswer: 'Excellent and correct answer! 🎉',
    wrongAnswer: 'Not quite right, give it another try!',
    tryAgain: 'Try Again',
    missionCompletedTitle: 'Bravo! Mission Completed Successfully 🌟',
    missionCompletedDesc: 'You earned XP and Coins, and your bonus rewards have been delivered to your farm!',
    claimReward: 'Claim Reward & Return to Farm',
    returnToFarm: 'Return to Farm',
    allSubjects: '🌟 All Subjects',
    subjectMath: 'Mathematics',
    subjectEnglish: 'English Language',
    subjectArabic: 'Arabic Language',
    subjectScience: 'Science & Nature',
    subjectGeneral: 'General Knowledge',

    // Daily Quests & Achievements
    dailyQuestsTitle: 'Daily Farm Quests 🎯',
    dailyQuestsSubtitle: 'Complete daily farming and learning goals to earn extra bonuses every day!',
    claim: 'Claim Prize',
    claimed: 'Claimed ✓',
    inProgress: 'In Progress',
    achievementsTitle: 'Farm Achievements 🏆',
    achievementsSubtitle: 'Medals and trophies celebrating your farming and learning milestones.',
    unlockedAt: 'Unlocked on:',

    // Character Dialogues
    foxyGreeting: 'Welcome back to Foxy Farm! I am thrilled to guide you in cultivating the finest farm in Egypt.',
    adamGreeting: 'Greetings! I am Adam, the science and math explorer. Ready to solve today’s puzzles and earn gold?',
    taliaGreeting: 'Hello friend! I am Talia, the botanist and language guide. Let us tend to the blossoms together!',
    sparkGreeting: 'Beep boop! Spark online. Farm systems nominal, and exciting new homework missions await!',
    sparkMissionAlert: 'Smart alert! You have a new homework assignment from your teacher. Complete it to earn gold & XP!',
    foxyShopPrompt: 'Visit the seed shop to buy fresh crops and expand your fields!',
    adamMathPrompt: 'We have fun arithmetic challenges ready for you today!',
    taliaBotanyPrompt: 'Have you watered your seedlings today? They thrive with care!',

    // Crops
    cropWheat: 'Golden Wheat',
    cropWheatDesc: 'Fast-growing nutritious golden grain, perfect for beginner farmers.',
    cropCarrot: 'Sweet Carrot',
    cropCarrotDesc: 'Crisp and crunchy root vegetables loved by bunnies and students.',
    cropCorn: 'Sweet Corn',
    cropCornDesc: 'Tall golden stalks packed with sweet sunny corn kernels.',
    cropTomato: 'Ruby Tomato',
    cropTomatoDesc: 'Juicy plump red tomatoes filled with vitamins and sunshine.',
    cropStrawberry: 'Berry Delight',
    cropStrawberryDesc: 'Fragrant sweet berries that bring high value at the market.',
    cropPotato: 'Golden Potato',
    cropPotatoDesc: 'Nutrient-rich tubers that store well and provide hearty harvests.',
    cropPumpkin: 'Giant Pumpkin',
    cropPumpkinDesc: 'Prized heavy pumpkins bringing grand profits at autumn harvest.',
    cropSunflower: 'Sunny Blossom',
    cropSunflowerDesc: 'Bright cheerful blossoms that track the sun and boost farm happiness.',
    cropCotton: 'Egyptian Cotton',
    cropCottonDesc: 'World-renowned long-staple luxury cotton native to the Nile valley.',
    cropApple: 'Orchard Apple',
    cropAppleDesc: 'Sweet crisp apples harvested directly from fertile farm trees.',

    // Animals
    animalCow: 'Dairy Cow',
    animalCowDesc: 'A gentle cow that grazes peacefully and produces fresh creamy milk.',
    animalChicken: 'Happy Hen',
    animalChickenDesc: 'Pecks around the soil and lays wholesome organic eggs every morning.',
    animalSheep: 'Fluffy Sheep',
    animalSheepDesc: 'A gentle sheep with thick warm wool ready for shearing.',
    animalPig: 'Playful Pig',
    animalPigDesc: 'A joyful companion that sniffs the ground for valuable truffles.',
    animalRabbit: 'Hoppy Bunny',
    animalRabbitDesc: 'A nimble bunny that nibbles fresh carrots and produces soft angora wool.',
    animalDuck: 'River Duck',
    animalDuckDesc: 'Glides across the water and provides rare down feathers and eggs.',
    animalHorse: 'Arabian Steed',
    animalHorseDesc: 'A majestic companion that gallops across the open fields.',
    animalGoat: 'Mountain Goat',
    animalGoatDesc: 'An energetic goat providing rich artisanal goat milk and cheese.',

    // Animal Products
    prodMilk: 'Fresh Milk 🥛',
    prodEgg: 'Organic Eggs 🥚',
    prodWool: 'Soft Wool 🧶',
    prodTruffle: 'Rare Truffle 🍄',
    prodRabbitWool: 'Angora Wool 🪶',
    prodDuckFeather: 'Duck Down 🪶',
    prodHorseHorseshoe: 'Horseshoe 🧲',
    prodGoatCheese: 'Goat Cheese 🧀',

    // Buildings
    bldgFarmhouse: 'Cozy Farmhouse',
    bldgFarmhouseDesc: 'The warm central farmhouse where all farm adventures begin.',
    bldgBarn: 'Grand Red Barn',
    bldgBarnDesc: 'A spacious traditional shelter to house and nurture all farm animals.',
    bldgSilo: 'Grain Silo',
    bldgSiloDesc: 'A tall high-capacity storage silo to preserve all harvested crops.',
    bldgCoop: 'Chicken Coop',
    bldgCoopDesc: 'A snug hen house that elevates daily egg production.',
    bldgWindmill: 'Classic Windmill',
    bldgWindmillDesc: 'Harnesses the breeze to mill grain and accelerate crop growth.',
    bldgGreenhouse: 'Science Greenhouse',
    bldgGreenhouseDesc: 'Talia’s botanical research laboratory protecting rare plant species.',
    bldgMarketStall: 'Market Stall',
    bldgMarketStallDesc: 'A bustling trading stall to sell produce directly for Coins.',
    bldgSeedShop: 'Oasis Seed Shop',
    bldgSeedShopDesc: 'Supplies certified premium quality crop seeds and seedlings.',

    // Teacher Dashboard
    teacherDashboard: 'Teacher Command Center 🎓',
    assignHomework: 'Assign New Homework',
    studentSubmissions: 'Student Submissions',
    classManagement: 'Classrooms',
    awardBonus: 'Award Gold Coins',
    gradeSubmission: 'Grade Submission',
    score: 'Score',
    feedback: 'Feedback & Notes',
  },

  fr: {
    // Navigation & General
    gameTitle: 'Ferme Foxy',
    gameSubtitle: 'Ferme Éducative Intelligente - Impact Hub Égypte',
    farm: 'Ferme',
    missions: 'Missions',
    homework: 'Devoirs',
    shop: 'Boutique',
    market: 'Marché & Vente',
    inventory: 'Stockage',
    achievements: 'Succès',
    quests: 'Quêtes du Jour',
    teacher: 'Portail Enseignant',
    settings: 'Paramètres',
    close: 'Fermer',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    save: 'Enregistrer',
    back: 'Retour',
    level: 'Niveau',
    xp: 'XP',
    coins: 'Pièces',
    dinars: 'Dinars',
    energy: 'Énergie',
    streak: 'Jours d’affilée',
    notifications: 'Notifications',
    noNotifications: 'Aucune nouvelle notification',
    markAllRead: 'Tout marquer comme lu',
    switchUser: 'Changer d’utilisateur',
    logout: 'Déconnexion',
    student: 'Élève',
    levelUp: 'Niveau Supérieur ! 🌟',
    levelUpMessage: 'Félicitations ! Vous avez atteint un nouveau niveau, débloquant de nouvelles cultures et articles !',
    gotIt: 'Compris ! 👍',

    // Farm & Tools
    seedBag: 'Sac de Graines :',
    noSeedsInBag: 'Aucune graine dans votre sac !',
    buySeedsPrompt: 'Acheter des graines au marché',
    clickToSelectSeed: 'Cliquez pour choisir une graine',
    tilledSoil: 'Terre labourée',
    emptyPlot: 'Parcelle libre',
    growing: 'En pousse...',
    readyToHarvest: 'Prêt à récolter ! ✨',
    watered: 'Arrosé 💧',
    needsWater: 'A besoin d’eau',
    remainingTime: 'Temps restant :',
    secondsShort: 's',
    minutesShort: 'm',
    plant: 'Planter',
    water: 'Arroser 💧',
    harvest: 'Récolter 🌾',
    plow: 'Labourer ⛏️',
    feed: 'Nourrir 🥕',
    collect: 'Collecter',
    expandLand: 'Agrandir',
    expandTitle: 'Agrandir la Ferme 🚜',
    expandCost: 'Coût d’expansion :',
    expandReqLevel: 'Niveau requis :',
    unlockNow: 'Débloquer maintenant',
    landLocked: 'Terrain verrouillé',
    needMoreCoins: 'Vous avez besoin de plus de pièces !',
    needHigherLevel: 'Niveau insuffisant pour agrandir cette zone !',
    farmExpansionSuccess: 'Expansion réussie ! Votre ferme s’est agrandie avec succès !',
    zoomIn: 'Zoom +',
    zoomOut: 'Zoom -',
    resetView: 'Réinitialiser',

    // Shop
    shopTitle: 'Marché & Boutique de Foxy 🏪',
    shopSubtitle: 'Achetez des graines, des animaux, des bâtiments avec vos pièces !',
    tabSeeds: '🌱 Graines & Cultures',
    tabAnimals: '🐾 Animaux',
    tabBuildings: '🏛️ Bâtiments',
    tabDecor: '✨ Décorations',
    buy: 'Acheter',
    owned: 'Possédé :',
    price: 'Prix :',
    sellPrice: 'Prix de vente :',
    growthTime: 'Temps de pousse :',
    reqLevel: 'Niveau :',
    quantity: 'Quantité :',
    totalCost: 'Total :',
    buyQuantity: 'Acheter la quantité',
    buySuccess: 'Articles achetés et ajoutés au stockage avec succès !',
    insufficientCoins: 'Pièces insuffisantes ! Terminez vos devoirs pour gagner de l’or !',
    spaceNeeded: 'Aucun espace d’herbe libre pour placer cet objet !',

    // Inventory & Storage
    inventoryTitle: 'Silo & Réserve de la Ferme 📦',
    inventorySubtitle: 'Toutes vos graines, récoltes et produits stockés.',
    tabAll: 'Tous les articles',
    tabSeedsOnly: '🌱 Graines',
    tabProduceOnly: '🌾 Récoltes',
    tabAnimalGoods: '🥛 Produits animaux',
    tabDecorBuildings: '🏛️ Bâtiments & Décor',
    emptyInventory: 'La réserve est vide',
    emptyInventoryDesc: 'Récoltez vos champs ou faites vos devoirs pour remplir la réserve !',
    itemQuantity: 'Qté :',
    unitValue: 'Valeur unitaire :',
    sell: 'Vendre',
    sellAll: 'Tout vendre',
    sellSelected: 'Vendre la sélection',
    useItem: 'Utiliser',

    // Market / Sell
    marketTitle: 'Marché de Vente des Récoltes 💰',
    marketSubtitle: 'Vendez vos récoltes et produits animaux pour gagner instantanément des pièces et de l’XP !',
    sellCropPrompt: 'Choisissez les articles à vendre aux marchands :',
    sellQuantity: 'Quantité à vendre :',
    earnCoins: 'Vous gagnerez :',
    sellSuccess: 'Produits vendus avec succès ! Pièces et XP ajoutés.',
    noSellableItems: 'Aucun produit vendable en réserve',
    noSellableItemsDesc: 'Plantez, récoltez ou nourrissez vos animaux pour créer des marchandises !',

    // Homework & Missions
    homeworkHubTitle: 'Missions d’Apprentissage Éducatives 📚',
    homeworkHubSubtitle: 'Résolvez vos devoirs avec Foxy, Adam, Talia et Spark pour gagner des pièces et graines !',
    activeMissions: 'Missions Disponibles',
    completedMissions: 'Missions Terminées',
    missionReward: 'Récompense :',
    startMission: 'Commencer 🚀',
    retryMission: 'Recommencer 🔄',
    reviewAnswers: 'Revoir les réponses',
    question: 'Question',
    of: 'sur',
    checkAnswer: 'Vérifier la réponse',
    nextQuestion: 'Question suivante ➡️',
    submitMission: 'Valider la mission 🏆',
    correctAnswer: 'Excellente réponse ! 🎉',
    wrongAnswer: 'Ce n’est pas tout à fait ça, réessayez !',
    tryAgain: 'Réessayer',
    missionCompletedTitle: 'Bravo ! Mission accomplie avec succès 🌟',
    missionCompletedDesc: 'Vous avez gagné de l’XP et des pièces pour votre ferme !',
    claimReward: 'Récupérer la récompense',
    returnToFarm: 'Retourner à la ferme',
    allSubjects: '🌟 Toutes les matières',
    subjectMath: 'Mathématiques',
    subjectEnglish: 'Anglais',
    subjectArabic: 'Arabe',
    subjectScience: 'Sciences & Nature',
    subjectGeneral: 'Culture Générale',

    // Daily Quests & Achievements
    dailyQuestsTitle: 'Quêtes Quotidiennes 🎯',
    dailyQuestsSubtitle: 'Remplissez vos objectifs journaliers pour gagner des bonus supplémentaires !',
    claim: 'Récupérer',
    claimed: 'Récupéré ✓',
    inProgress: 'En cours',
    achievementsTitle: 'Succès de la Ferme 🏆',
    achievementsSubtitle: 'Médailles et trophées récompensant vos progrès.',
    unlockedAt: 'Débloqué le :',

    // Character Dialogues
    foxyGreeting: 'Bienvenue sur la Ferme Foxy ! Je suis ravi de vous guider dans vos plantations.',
    adamGreeting: 'Bonjour ! Je suis Adam, l’explorateur des sciences. Prêt pour les défis du jour ?',
    taliaGreeting: 'Salut l’ami ! Je suis Talia, la botaniste. Prenons soin des plantes ensemble !',
    sparkGreeting: 'Bip bop ! Spark en ligne. Tous les systèmes fonctionnent, de nouvelles missions vous attendent !',
    sparkMissionAlert: 'Alerte ! Vous avez un nouveau devoir de votre enseignant. Répondez pour gagner des pièces !',
    foxyShopPrompt: 'Visitez la boutique pour acheter de nouvelles graines et agrandir vos champs !',
    adamMathPrompt: 'Des énigmes mathématiques passionnantes vous attendent aujourd’hui !',
    taliaBotanyPrompt: 'Avez-vous arrosé vos pousses aujourd’hui ? Elles ont besoin d’attention !',

    // Crops
    cropWheat: 'Blé Doré',
    cropWheatDesc: 'Céréale à croissance rapide, idéale pour les fermiers débutants.',
    cropCarrot: 'Carotte Sucrée',
    cropCarrotDesc: 'Légume croquant et savoureux adoré par les lapins et les élèves.',
    cropCorn: 'Maïs Doux',
    cropCornDesc: 'Hautes tiges dorées pleines de grains de maïs savoureux.',
    cropTomato: 'Tomate Rubis',
    cropTomatoDesc: 'Tomates rouges juteuses et gorgées de vitamines.',
    cropStrawberry: 'Fraise Délice',
    cropStrawberryDesc: 'Baies sucrées très prisées au marché de la ferme.',
    cropPotato: 'Pomme de Terre Dorée',
    cropPotatoDesc: 'Tubercules nourrissants faciles à conserver.',
    cropPumpkin: 'Citrouille Géante',
    cropPumpkinDesc: 'Grosses citrouilles rapportant d’excellents profits à la récolte.',
    cropSunflower: 'Tournesol Éclatant',
    cropSunflowerDesc: 'Fleurs lumineuses qui suivent le soleil et embellissent la ferme.',
    cropCotton: 'Coton Égyptien',
    cropCottonDesc: 'Le fameux or blanc de la vallée fertile du Nil.',
    cropApple: 'Pomme du Verger',
    cropAppleDesc: 'Pommes douces et croquantes cueillies sur les arbres de la ferme.',

    // Animals
    animalCow: 'Vache Laitière',
    animalCowDesc: 'Une douce vache qui broute paisiblement et donne du bon lait frais.',
    animalChicken: 'Poule Heureuse',
    animalChickenDesc: 'Picore le sol et pond des œufs frais chaque matin.',
    animalSheep: 'Mouton Laineux',
    animalSheepDesc: 'Un mouton doux avec une laine épaisse à tondre.',
    animalPig: 'Cochon Joueur',
    animalPigDesc: 'Un compagnon joyeux qui cherche de délicieuses truffes.',
    animalRabbit: 'Lapin Agile',
    animalRabbitDesc: 'Saute gaiement et produit une douce laine angora.',
    animalDuck: 'Canard de Rivière',
    animalDuckDesc: 'Glisse sur l’eau et fournit des plumes douces et des œufs.',
    animalHorse: 'Étalon Arabe',
    animalHorseDesc: 'Un noble destrier qui galope à travers les prés.',
    animalGoat: 'Chèvre des Montagnes',
    animalGoatDesc: 'Une chèvre vive fournissant un délicieux lait et du fromage.',

    // Animal Products
    prodMilk: 'Lait Frais 🥛',
    prodEgg: 'Œufs Frais 🥚',
    prodWool: 'Laine Chaude 🧶',
    prodTruffle: 'Truffe Rare 🍄',
    prodRabbitWool: 'Laine Angora 🪶',
    prodDuckFeather: 'Plume de Canard 🪶',
    prodHorseHorseshoe: 'Fer à Cheval 🧲',
    prodGoatCheese: 'Fromage de Chèvre 🧀',

    // Buildings
    bldgFarmhouse: 'Maison de Ferme',
    bldgFarmhouseDesc: 'Le foyer chaleureux où commencent toutes les aventures.',
    bldgBarn: 'Grande Grange Rouge',
    bldgBarnDesc: 'Un grand abri traditionnel pour tous vos animaux.',
    bldgSilo: 'Silo à Grain',
    bldgSiloDesc: 'Un haut réservoir pour conserver toutes vos récoltes en sécurité.',
    bldgCoop: 'Poulailler Douillet',
    bldgCoopDesc: 'Un nid douillet qui augmente la ponte quotidienne des œufs.',
    bldgWindmill: 'Moulin à Vent',
    bldgWindmillDesc: 'Moud le grain et accélère la croissance de vos plantations.',
    bldgGreenhouse: 'Serre Scientifique',
    bldgGreenhouseDesc: 'Le laboratoire botanique de Talia protégeant les plantes rares.',
    bldgMarketStall: 'Étal du Marché',
    bldgMarketStallDesc: 'Un stand animé pour vendre vos récoltes directement aux marchands.',
    bldgSeedShop: 'Boutique de Graines',
    bldgSeedShopDesc: 'Fournit des semences certifiées de haute qualité.',

    // Teacher Dashboard
    teacherDashboard: 'Espace Enseignant 🎓',
    assignHomework: 'Assigner un devoir',
    studentSubmissions: 'Réponses des élèves',
    classManagement: 'Gestion des classes',
    awardBonus: 'Attribuer des pièces',
    gradeSubmission: 'Noter le devoir',
    score: 'Note',
    feedback: 'Commentaires',
  },

  de: {
    // Navigation & General
    gameTitle: 'Foxy Farm',
    gameSubtitle: 'Smarte Bildungsfarm - Impact Hub Ägypten',
    farm: 'Bauernhof',
    missions: 'Missionen',
    homework: 'Hausaufgaben',
    shop: 'Laden',
    market: 'Markt & Verkauf',
    inventory: 'Lager',
    achievements: 'Erfolge',
    quests: 'Tagesquests',
    teacher: 'Lehrerportal',
    settings: 'Einstellungen',
    close: 'Schließen',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    save: 'Speichern',
    back: 'Zurück',
    level: 'Stufe',
    xp: 'EP',
    coins: 'Münzen',
    dinars: 'Dinare',
    energy: 'Energie',
    streak: 'Tages-Serie',
    notifications: 'Benachrichtigungen',
    noNotifications: 'Keine neuen Benachrichtigungen',
    markAllRead: 'Alle als gelesen markieren',
    switchUser: 'Benutzer wechseln',
    logout: 'Abmelden',
    student: 'Schüler',
    levelUp: 'Stufenaufstieg! 🌟',
    levelUpMessage: 'Glückwunsch! Du hast ein neues Level erreicht und neue Pflanzen freigeschaltet!',
    gotIt: 'Verstanden! 👍',

    // Farm & Tools
    seedBag: 'Verfügbare Saaten:',
    noSeedsInBag: 'Keine Samen im Beutel!',
    buySeedsPrompt: 'Samen im Markt kaufen',
    clickToSelectSeed: 'Klicken zum Auswählen der Saat',
    tilledSoil: 'Gepflügter Acker',
    emptyPlot: 'Freies Land',
    growing: 'Wächst...',
    readyToHarvest: 'Erntereif! ✨',
    watered: 'Gegossen 💧',
    needsWater: 'Braucht Wasser',
    remainingTime: 'Verbleibende Zeit:',
    secondsShort: 's',
    minutesShort: 'm',
    plant: 'Pflanzen',
    water: 'Gießen 💧',
    harvest: 'Ernten 🌾',
    plow: 'Pflügen ⛏️',
    feed: 'Füttern 🥕',
    collect: 'Einsammeln',
    expandLand: 'Erweitern',
    expandTitle: 'Farm vergrößern 🚜',
    expandCost: 'Erweiterungskosten:',
    expandReqLevel: 'Erforderliche Stufe:',
    unlockNow: 'Jetzt freischalten',
    landLocked: 'Gesperrtes Land',
    needMoreCoins: 'Du brauchst mehr Münzen für dieses Grundstück!',
    needHigherLevel: 'Erreiche ein höheres Level für diese Erweiterung!',
    farmExpansionSuccess: 'Erweiterung erfolgreich! Deine Farm ist nun größer!',
    zoomIn: 'Vergrößern',
    zoomOut: 'Verkleinern',
    resetView: 'Kamera zurücksetzen',

    // Shop
    shopTitle: 'Foxy Farm Markt & Laden 🏪',
    shopSubtitle: 'Kaufe Samen, Tiere, Gebäude und Dekorationen mit deinen Münzen!',
    tabSeeds: '🌱 Samen & Pflanzen',
    tabAnimals: '🐾 Tiere',
    tabBuildings: '🏛️ Gebäude',
    tabDecor: '✨ Dekorationen',
    buy: 'Kaufen',
    owned: 'Im Besitz:',
    price: 'Preis:',
    sellPrice: 'Verkaufspreis:',
    growthTime: 'Wachstumszeit:',
    reqLevel: 'Stufe:',
    quantity: 'Menge:',
    totalCost: 'Gesamt:',
    buyQuantity: 'Ausgewählte Menge kaufen',
    buySuccess: 'Erfolgreich gekauft und ins Lager gelegt!',
    insufficientCoins: 'Nicht genügend Münzen! Löse Hausaufgaben für mehr Gold!',
    spaceNeeded: 'Kein freier Grasplatz für diesen Gegenstand!',

    // Inventory & Storage
    inventoryTitle: 'Farm Silo & Lager 📦',
    inventorySubtitle: 'Alle deine gelagerten Samen, Ernten und tierischen Erzeugnisse.',
    tabAll: 'Alle Gegenstände',
    tabSeedsOnly: '🌱 Samen',
    tabProduceOnly: '🌾 Erntegut',
    tabAnimalGoods: '🥛 Tierprodukte',
    tabDecorBuildings: '🏛️ Gebäude & Deko',
    emptyInventory: 'Das Lager ist derzeit leer',
    emptyInventoryDesc: 'Ernte Felder oder mache Hausaufgaben, um dein Lager zu füllen!',
    itemQuantity: 'Menge:',
    unitValue: 'Einzelwert:',
    sell: 'Verkaufen',
    sellAll: 'Alles verkaufen',
    sellSelected: 'Auswahl verkaufen',
    useItem: 'Verwenden',

    // Market / Sell
    marketTitle: 'Markt zum Ernteverkauf 💰',
    marketSubtitle: 'Verkaufe deine Ernte und Erzeugnisse für sofortige Münzen und Erfahrungspunkte!',
    sellCropPrompt: 'Wähle die Waren zum Verkauf an Händler:',
    sellQuantity: 'Verkaufsmenge:',
    earnCoins: 'Du verdienst:',
    sellSuccess: 'Waren erfolgreich verkauft! Münzen und EP gutgeschrieben.',
    noSellableItems: 'Keine verkaufbaren Erzeugnisse im Lager',
    noSellableItemsDesc: 'Pflanze, ernte oder füttere Tiere, um Waren zum Verkauf herzustellen!',

    // Homework & Missions
    homeworkHubTitle: 'Pädagogische Lernmissionen 📚',
    homeworkHubSubtitle: 'Löse Schulaufgaben mit Foxy, Adam, Talia und Spark für Münzen und seltene Samen!',
    activeMissions: 'Verfügbare Missionen',
    completedMissions: 'Abgeschlossene Missionen',
    missionReward: 'Belohnung:',
    startMission: 'Mission starten 🚀',
    retryMission: 'Wiederholen 🔄',
    reviewAnswers: 'Antworten ansehen',
    question: 'Frage',
    of: 'von',
    checkAnswer: 'Antwort prüfen',
    nextQuestion: 'Nächste Frage ➡️',
    submitMission: 'Mission abgeben & Belohnung holen 🏆',
    correctAnswer: 'Ausgezeichnete und richtige Antwort! 🎉',
    wrongAnswer: 'Leider nicht ganz richtig, versuche es noch einmal!',
    tryAgain: 'Erneut versuchen',
    missionCompletedTitle: 'Klasse! Mission erfolgreich beendet 🌟',
    missionCompletedDesc: 'Du hast EP und Münzen für deine Farm erhalten!',
    claimReward: 'Belohnung abholen',
    returnToFarm: 'Zurück zur Farm',
    allSubjects: '🌟 Alle Fächer',
    subjectMath: 'Mathematik',
    subjectEnglish: 'Englisch',
    subjectArabic: 'Arabisch',
    subjectScience: 'Naturwissenschaften',
    subjectGeneral: 'Allgemeinwissen',

    // Daily Quests & Achievements
    dailyQuestsTitle: 'Tägliche Farm-Quests 🎯',
    dailyQuestsSubtitle: 'Erfülle tägliche Aufgaben für zusätzliche Belohnungen!',
    claim: 'Abholen',
    claimed: 'Abgeholt ✓',
    inProgress: 'In Arbeit',
    achievementsTitle: 'Farm-Erfolge 🏆',
    achievementsSubtitle: 'Medaillen und Trophäen für deine Meilensteine.',
    unlockedAt: 'Freigeschaltet am:',

    // Character Dialogues
    foxyGreeting: 'Willkommen auf der Foxy Farm! Ich freue mich darauf, dir beim Gärtnern zu helfen.',
    adamGreeting: 'Hallo! Ich bin Adam, der Wissenschafts-Entdecker. Bereit für die heutigen Rätsel?',
    taliaGreeting: 'Hallo mein Freund! Ich bin Talia. Lass uns gemeinsam die Blumen pflegen!',
    sparkGreeting: 'Piep-piep! Spark ist online. Farmsysteme bereit, neue Missionen warten auf dich!',
    sparkMissionAlert: 'Schlau-Alarm! Eine neue Hausaufgabe von deinem Lehrer wartet auf dich!',
    foxyShopPrompt: 'Besuche den Saatgutladen, um neue Pflanzen zu kaufen!',
    adamMathPrompt: 'Wir haben heute spannende Rechenrätsel für dich vorbereitet!',
    taliaBotanyPrompt: 'Hast du heute schon deine Pflanzen gegossen?',

    // Crops
    cropWheat: 'Goldener Weizen',
    cropWheatDesc: 'Schnell wachsendes Getreide, ideal für Einsteiger.',
    cropCarrot: 'Süße Karotte',
    cropCarrotDesc: 'Knackiges Wurzelgemüse, beliebt bei Hasen und Schülern.',
    cropCorn: 'Süßer Mais',
    cropCornDesc: 'Hohe Stängel voll süßer, sonniger Maiskörner.',
    cropTomato: 'Rubin-Tomate',
    cropTomatoDesc: 'Saftige rote Tomaten voller Vitamine.',
    cropStrawberry: 'Erdbeer-Traum',
    cropStrawberryDesc: 'Aromatische Beeren mit hohem Marktwert.',
    cropPotato: 'Gold-Kartoffel',
    cropPotatoDesc: 'Nahrhafte Knollen, die sich gut lagern lassen.',
    cropPumpkin: 'Riesen-Kürbis',
    cropPumpkinDesc: 'Prachtvolle Kürbisse für hohe Ernteerträge.',
    cropSunflower: 'Sonnenblume',
    cropSunflowerDesc: 'Fröhliche Blumen, die der Sonne folgen.',
    cropCotton: 'Ägyptische Baumwolle',
    cropCottonDesc: 'Weltberühmtes weißes Gold aus dem fruchtbaren Niltal.',
    cropApple: 'Garten-Apfel',
    cropAppleDesc: 'Knackig-süße Äpfel von den Obstbäumen der Farm.',

    // Animals
    animalCow: 'Milchkuh',
    animalCowDesc: 'Eine friedliche Kuh, die saftiges Gras frisst und frische Milch liefert.',
    animalChicken: 'Glückliches Huhn',
    animalChickenDesc: 'Pickt im Boden und legt jeden Morgen frische Eier.',
    animalSheep: 'Wolliges Schaf',
    animalSheepDesc: 'Ein sanftes Schaf mit dichter, warmer Wolle.',
    animalPig: 'Verspieltes Schwein',
    animalPigDesc: 'Sucht im Erdboden nach seltenen Trüffeln.',
    animalRabbit: 'Flinkes Häschen',
    animalRabbitDesc: 'Hüpft munter umher und liefert weiche Angorawolle.',
    animalDuck: 'Fluss-Ente',
    animalDuckDesc: 'Gleitet über das Wasser und liefert Daunenfedern und Eier.',
    animalHorse: 'Arabisches Pferd',
    animalHorseDesc: 'Ein edles Ross für schnelle Ausritte über die Felder.',
    animalGoat: 'Bergziege',
    animalGoatDesc: 'Eine muntere Ziege, die beste Milch für Ziegenkäse liefert.',

    // Animal Products
    prodMilk: 'Frische Milch 🥛',
    prodEgg: 'Frische Eier 🥚',
    prodWool: 'Warme Wolle 🧶',
    prodTruffle: 'Seltener Trüffel 🍄',
    prodRabbitWool: 'Angorawolle 🪶',
    prodDuckFeather: 'Entendaunen 🪶',
    prodHorseHorseshoe: 'Hufeisen 🧲',
    prodGoatCheese: 'Ziegenkäse 🧀',

    // Buildings
    bldgFarmhouse: 'Gemütliches Bauernhaus',
    bldgFarmhouseDesc: 'Das warme Zentrum deiner Farm.',
    bldgBarn: 'Große Rote Scheune',
    bldgBarnDesc: 'Ein geräumiges traditionelles Zuhause für deine Tiere.',
    bldgSilo: 'Kornsilo',
    bldgSiloDesc: 'Ein hoher Speicher zur sicheren Lagerung aller Feldfrüchte.',
    bldgCoop: 'Hühnerstall',
    bldgCoopDesc: 'Ein sicheres Heim, das die tägliche Eierproduktion steigert.',
    bldgWindmill: 'Klassische Windmühle',
    bldgWindmillDesc: 'Mahlt Getreide und beschleunigt das Pflanzenwachstum.',
    bldgGreenhouse: 'Wissenschafts-Gewächshaus',
    bldgGreenhouseDesc: 'Talias botanisches Labor für seltene Pflanzenarten.',
    bldgMarketStall: 'Marktstand',
    bldgMarketStallDesc: 'Ein lebendiger Stand zum Direktverkauf an Händler.',
    bldgSeedShop: 'Saatgutladen',
    bldgSeedShopDesc: 'Bietet zertifiziertes Qualitäts-Saatgut.',

    // Teacher Dashboard
    teacherDashboard: 'Lehrer-Zentrale 🎓',
    assignHomework: 'Hausaufgabe aufgeben',
    studentSubmissions: 'Schülerabgaben',
    classManagement: 'Klassenverwaltung',
    awardBonus: 'Goldmünzen vergeben',
    gradeSubmission: 'Abgabe bewerten',
    score: 'Punkte',
    feedback: 'Rückmeldung & Hinweise',
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('foxy_farm_language');
    if (saved === 'ar' || saved === 'en' || saved === 'fr' || saved === 'de') {
      return saved as Language;
    }
    return 'ar'; // Default to Arabic per requirements
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('foxy_farm_language', newLang);
  };

  const isRTL = language === 'ar';
  const t = translations[language] || translations.ar;

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={`w-full min-h-screen ${isRTL ? 'font-arabic' : ''}`}>
        {children}
      </div>
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
