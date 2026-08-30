import foxyImg from './images/character_foxy_1787680530182.jpg';
import adamImg from './images/character_adam_1787680542718.jpg';
import taliaImg from './images/character_talia_1787680555000.jpg';
import sparkImg from './images/character_spark_1787680567230.jpg';
import heroImg from './images/foxy_farm_characters_group_1787682518054.jpg';
import foxyPoses from './images/foxy_poses_sheet_1787682443483.jpg';
import adamPoses from './images/adam_poses_sheet_1787682461121.jpg';
import taliaPoses from './images/talia_poses_sheet_1787682482011.jpg';
import sparkPoses from './images/spark_poses_sheet_1787682498943.jpg';

export const CHARACTER_IMAGES = {
  FOXY: foxyImg,
  ADAM: adamImg,
  TALIA: taliaImg,
  SPARK: sparkImg,
  HERO: heroImg,
  POSES: {
    FOXY: foxyPoses,
    ADAM: adamPoses,
    TALIA: taliaPoses,
    SPARK: sparkPoses,
  },
};

export type PoseType = 
  | 'idle' 
  | 'happy' 
  | 'surprised' 
  | 'celebration' 
  | 'thinking' 
  | 'pointing' 
  | 'walking';

export interface CharacterPoseSpec {
  id: PoseType;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  animationClass: string;
  expression: string;
  soundEffect: string;
  dialoguePreview: string;
  dialoguePreviewAr: string;
}

export interface CharacterColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

export interface CharacterProfile {
  id: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';
  name: string;
  nameAr: string;
  speciesRole: string;
  speciesRoleAr: string;
  roleTitle: string;
  roleTitleAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  color: string;
  accentColor: string;
  bgBadge: string;
  image: string;
  poseSheetImage: string;
  specialty: string;
  specialtyAr: string;
  avatarEmoji: string;
  outfitBreakdown: {
    head: string;
    torso: string;
    legs: string;
    feet: string;
    accessories: string;
  };
  outfitBreakdownAr: {
    head: string;
    torso: string;
    legs: string;
    feet: string;
    accessories: string;
  };
  colorPalette: CharacterColorSwatch[];
  personalityTraits: string[];
  personalityTraitsAr: string[];
  poses: Record<PoseType, CharacterPoseSpec>;
  dialogues: {
    greeting: { en: string; ar: string };
    questAssigned: { en: string; ar: string };
    harvestPraise: { en: string; ar: string };
    levelUpCheer: { en: string; ar: string };
    homeworkPrompt: { en: string; ar: string };
  };
}

export const CHARACTERS: Record<'FOXY' | 'ADAM' | 'TALIA' | 'SPARK', CharacterProfile> = {
  FOXY: {
    id: 'FOXY',
    name: 'Foxy',
    nameAr: 'فوكسي',
    speciesRole: 'Fennec Fox Cub Guide',
    speciesRoleAr: 'ثعلب الفنك الصغير والمرشد الرئيسي',
    roleTitle: 'Farm Mascot & Chief Guide',
    roleTitleAr: 'تميمة المزرعة والمرشد الرئيسي',
    tagline: 'Energetic, cheerful, and your best farming buddy!',
    taglineAr: 'نشيط، مرح، وصديقك الأوفى في عالم المزرعة!',
    description: 'Foxy is an agile, ultra-cute fennec fox cub with oversized expressive ears, fluffy golden-sand fur, and a trademark green neck bandana with a stitched "H" insignia. He welcomes students to their land, bounds across the soil, and celebrates every harvest!',
    descriptionAr: 'ثعلب فنك صحراوي صغير ذو أذنين كبيرتين معبرتين وفراء رملي ذهبي ناعم مع منديل عنق أخضر يحمل شعار H. يرحب بالطلاب ويقفز بحماس مشجعاً إياهم مع كل محصول!',
    color: '#ea580c',
    accentColor: '#f97316',
    bgBadge: 'bg-orange-500/10 text-orange-600 border-orange-200',
    image: CHARACTER_IMAGES.FOXY,
    poseSheetImage: CHARACTER_IMAGES.POSES.FOXY,
    specialty: 'Farming Tips, Crop Nurturing & Daily Motivation',
    specialtyAr: 'إرشادات الزراعة، رعاية المحاصيل والتشجيع اليومي',
    avatarEmoji: '🦊',
    outfitBreakdown: {
      head: 'Oversized fennec ears with soft peach-pink inner fur and tufts, expressive dark anime-shine eyes, button nose.',
      torso: 'Soft sandy golden fur, triangular forest-green bandana scarf tied around neck with white "H" emblem.',
      legs: 'Four fluffy cream paws with dark brown textured pads.',
      feet: 'Digitigrade paws with tiny claws, light bouncing stride.',
      accessories: 'Green farmer neck bandana with "H" embroidery, bushy cream-tipped tail.',
    },
    outfitBreakdownAr: {
      head: 'أذنان كبيرتان ببطانة وردية خوخية ناعمة، عينان عسليتان ببريق ساحر، وأنف أسود صغير.',
      torso: 'فراء رملي ذهبي فائق النعومة، ومنديل عنق مثلث بلون أخضر زمردي مطرز بحرف H أبيض.',
      legs: 'أقدام فراء ناعمة مع وسادات أصابع بنية رقيقة.',
      feet: 'مخالب صغيرة لطيفة وقفزات رشيقة مفعمة بالحيوية.',
      accessories: 'منديل العنق الأخضر المميز وذيل كثيف ملوح في الهواء.',
    },
    colorPalette: [
      { name: 'Sandy Golden Fur', hex: '#F3C583', usage: 'Main body fur, head, back' },
      { name: 'Peach Pink Ear Liner', hex: '#F8B4A5', usage: 'Inner ear glow, tongue' },
      { name: 'Forest Green Bandana', hex: '#43A047', usage: 'Signature neck scarf' },
      { name: 'Espresso Eyes', hex: '#3E2723', usage: 'Eye iris, nose, paw pads' },
      { name: 'Ivory White', hex: '#FFFDE7', usage: 'Tail tip, chest fur, "H" insignia' },
    ],
    personalityTraits: ['Enthusiastic', 'Loyal', 'Playful', 'Encouraging', 'Curious'],
    personalityTraitsAr: ['حماسي', 'وفي', 'مرح', 'مشجع', 'فضولي'],
    poses: {
      idle: {
        id: 'idle',
        title: 'Idle Stance (Bouncing Ready)',
        titleAr: 'وقفة الاستعداد (ترقب لطيف)',
        description: 'Foxy stands happily on four paws with ears perked up and bushy tail gently swaying side to side.',
        descriptionAr: 'يقف فوكسي برشاقة بأذنين منتصبتين وذيل ملوح ببطء بانتظار أمر المزارع.',
        animationClass: 'animate-sway',
        expression: 'Happy friendly smile, perked ears',
        soundEffect: 'fox_bark_soft',
        dialoguePreview: "Welcome back to our sunlit farm! What shall we plant today?",
        dialoguePreviewAr: "أهلاً بك مجدداً في مزرعتنا المشمسة! ماذا سنزرع اليوم؟",
      },
      happy: {
        id: 'happy',
        title: 'Happy Cheering (Ear Flutter)',
        titleAr: 'سعادة غامرة (رفرفة الأذنين)',
        description: 'Mouth wide open with cute pink tongue, front paws lifting with joyful ear twitches.',
        descriptionAr: 'فم مفتوح بابتسامة مشرقة ولسان وردي لطيف، وأذنان ترفرفان فرحاً.',
        animationClass: 'animate-bounce',
        expression: 'Sparkling eye crescents, open-mouthed grin',
        soundEffect: 'fox_joy_yip',
        dialoguePreview: "Yippee! Look at how green those sprouts are growing!",
        dialoguePreviewAr: "يا للروعة! انظر كم تبدو هذه البراعم خضراء ونضرة!",
      },
      surprised: {
        id: 'surprised',
        title: 'Surprised Discovery (Wide Alert)',
        titleAr: 'دهشة واكتشاف (أذنان مشدودتان)',
        description: 'Ears angled high and spread wide, pupils dilated in wonder, tail pointing straight back.',
        descriptionAr: 'أذنان مشدودتان للأعلى، عينان متسعتان بانبهار، وذيل مستقيم بدهشة.',
        animationClass: 'animate-pulse',
        expression: 'O-shaped mouth, wide starry eyes',
        soundEffect: 'fox_gasp',
        dialoguePreview: "Whoa! Did you see that rare golden seed sprout?!",
        dialoguePreviewAr: "واو! هل رأيت تلك البذرة الذهبية النادرة وهي تنبت فجأة؟!",
      },
      celebration: {
        id: 'celebration',
        title: 'Harvest Celebration Jump',
        titleAr: 'قفزة الاحتفال بالحصاد',
        description: 'Mid-air leap with all four paws off the ground, bandana fluttering, golden sparkle aura.',
        descriptionAr: 'قفزة هوائية رشيقة في الهواء مع تطاير المنديل الأخضر وتوهج النجوم الذهبية.',
        animationClass: 'animate-harvest-bounce',
        expression: 'Ecstatic joy, eyes closed in bliss',
        soundEffect: 'fanfare_chime',
        dialoguePreview: "Bountiful harvest! You earned shiny gold coins and juicy XP!",
        dialoguePreviewAr: "حصاد مبارك ووفير! لقد ربحت عملات ذهبية ونقاط خبرة رائعة!",
      },
      thinking: {
        id: 'thinking',
        title: 'Curious Head Tilt',
        titleAr: 'تفكير مائل (تساؤل ذكي)',
        description: 'Head tilted 30 degrees to the side, one ear lowered slightly, paw tapping the soil.',
        descriptionAr: 'إمالة الرأس بزاوية لطيفة، مع خفض إحدى الأذنين والنقر بالقدم على التربة.',
        animationClass: 'animate-float-slow',
        expression: 'Pensive inquisitive brow, slight smile',
        soundEffect: 'fox_whine_curious',
        dialoguePreview: "Hmm, should we water the wheat first or feed Daisy the cow?",
        dialoguePreviewAr: "اممم، هل نسقي حقل القمح أولاً أم نطعم البقرة دايزي؟",
      },
      pointing: {
        id: 'pointing',
        title: 'Guiding Paw Pointer',
        titleAr: 'إشارة التوجيه بالقدم',
        description: 'Raised front right paw pointing forward toward the crop plot or homework beacon.',
        descriptionAr: 'رفع القدم الأمامية اليمنى مشيراً بدقة نحو الحقل أو مهمة الواجب.',
        animationClass: 'animate-pulse',
        expression: 'Focused guiding gaze',
        soundEffect: 'chime_ping',
        dialoguePreview: "Look over there! Spark has detected a new math mission from your teacher!",
        dialoguePreviewAr: "انظر هناك! سبارك رصد مهمة رياضيات جديدة من معلمك!",
      },
      walking: {
        id: 'walking',
        title: 'Trotting Walk Cycle',
        titleAr: 'دورة المشي والهرولة',
        description: 'Graceful 4-legged trot with buoyant bounce, tail bobbing in rhythm.',
        descriptionAr: 'هرولة متوازنة على أربع قوائم مع تمايل سلس للذيل المنسدل.',
        animationClass: 'animate-sway',
        expression: 'Confident explorer smile',
        soundEffect: 'footsteps_grass',
        dialoguePreview: "Let's take a stroll around our sunny farmland boundary!",
        dialoguePreviewAr: "هيا بنا في جولة تفقدية حول حدود مزرعتنا الجميلة!",
      },
    },
    dialogues: {
      greeting: {
        en: "Hi farmer! Foxy is here to help you tend the best crops in the kingdom!",
        ar: "مرحباً يا بطل المزرعة! فوكسي هنا لمساعدتك في زراعة أفضل المحاصيل!",
      },
      questAssigned: {
        en: "A new daily farming quest is ready! Let's get our paws dirty and complete it!",
        ar: "مهمة يومية جديدة بانتظارنا! دعنا نشمر عن سواعدنا وننجزها الآن!",
      },
      harvestPraise: {
        en: "What a spectacular crop! Your care and diligence make our farm bloom!",
        ar: "يا له من محصول رائع! اهتمامك واجتهادك يجعلان مزرعتنا تزدهر دائماً!",
      },
      levelUpCheer: {
        en: "LEVEL UP! We just unlocked brand new fertile land and exotic seeds!",
        ar: "ارتقاء في المستوى! فتحنا قطع أراضٍ خصبة وبذوراً جديدة مميزة!",
      },
      homeworkPrompt: {
        en: "Spark is beeping with your daily educational assignment! Ready for the challenge?",
        ar: "سبارك يطلق إشارات التنبيه لوجود واجب مدرسي! هل أنت مستعد للتحدي؟",
      },
    },
  },

  ADAM: {
    id: 'ADAM',
    name: 'Adam',
    nameAr: 'آدم',
    speciesRole: 'Curious Science & Math Explorer',
    speciesRoleAr: 'المستكشف العلمي وبطل الرياضيات',
    roleTitle: 'Discovery & Math Companion',
    roleTitleAr: 'رفيق الاستكشاف والرياضيات',
    tagline: 'Always ready for a curious calculation, puzzle, or science expedition!',
    taglineAr: 'دائماً مستعد للمسائل الحسابية، الألغاز العلمية، والاستكشاف الممتع!',
    description: 'Adam is an inquisitive young boy with rich curly brown ringlets, sparkling hazel-brown eyes, freckled cheeks, and a signature apple-green pullover hoodie with a white collegiate letter "I". He holds a classic round magnifying glass to inspect soil microbes, plant cells, and tricky math equations!',
    descriptionAr: 'فتى ذكي ذو شعر بني مجعد بخصلات ناعمة، ونمش لطيف على وجنتيه، يرتدي هودي أخضر تفاحي مع بنطال جينز مطوي وحذاء برتقالي. يحمل عدسته المكبرة لفحص التربة والمسائل الرياضية!',
    color: '#2563eb',
    accentColor: '#3b82f6',
    bgBadge: 'bg-blue-500/10 text-blue-600 border-blue-200',
    image: CHARACTER_IMAGES.ADAM,
    poseSheetImage: CHARACTER_IMAGES.POSES.ADAM,
    specialty: 'Mathematics, Logic Puzzles & Environmental Science',
    specialtyAr: 'الرياضيات، الألغاز المنطقية والعلوم البيئية',
    avatarEmoji: '👦🏽',
    outfitBreakdown: {
      head: 'Lush dark chocolate-brown curly ringlets, warm brown anime eyes, freckled nose and cheeks, joyful open smile.',
      torso: 'Bright apple/lime-green fleece hoodie with white drawstring cords, front kangaroo pouch, white collegiate "I" monogram.',
      legs: 'Medium-wash denim blue jeans with rolled/cuffed hems at ankles.',
      feet: 'Vibrant pumpkin-orange skate sneakers with crisp white rubber soles and white laces.',
      accessories: 'Round magnifying glass with matte black handle and optical glass lens.',
    },
    outfitBreakdownAr: {
      head: 'شعر بني شوكولاتي مموج بخصلات لولبية ناعمة، عينان دافئتان، ونمش جذاب وابتسامة مبهجة.',
      torso: 'سترة هودي خضراء تفاحية زاهية مع خيوط بيضاء وجيب كنغر وحرف I كلاسيكي أبيض.',
      legs: 'بنطال جينز أزرق متوسط الطراز مع أطراف مطوية أنيقة عند الكاحل.',
      feet: 'حذاء رياضي برتقالي زاهٍ مع نعل ومطاط أبيض وأربطة بيضاء.',
      accessories: 'عدسة مكبرة كلاسيكية بإطار وعدسة زجاجية لفحص التفاصيل.',
    },
    colorPalette: [
      { name: 'Apple Green Hoodie', hex: '#66BB6A', usage: 'Fleece pullover, pocket' },
      { name: 'Denim Wash Blue', hex: '#42A5F5', usage: 'Cuffed jeans fabric' },
      { name: 'Tangerine Orange', hex: '#FF7043', usage: 'Sneakers, eye highlights' },
      { name: 'Chocolate Curls', hex: '#4E342E', usage: 'Hair volume and ringlets' },
      { name: 'Optical Black', hex: '#212121', usage: 'Magnifying glass rim & handle' },
    ],
    personalityTraits: ['Inquisitive', 'Analytical', 'Inventive', 'Friendly', 'Optimistic'],
    personalityTraitsAr: ['فضولي', 'تحليلي', 'مبتكر', 'ودود', 'متفائل'],
    poses: {
      idle: {
        id: 'idle',
        title: 'Idle Discovery Stance',
        titleAr: 'وقفة الاستكشاف الترحيبية',
        description: 'Adam stands relaxed holding his magnifying glass in his right hand, left hand waving with a beaming smile.',
        descriptionAr: 'يقف آدم بابتسامة دافئة ممسكاً بعدسته المكبرة بيده اليمنى وموجهاً تحية ترحيبية بيده اليسرى.',
        animationClass: 'animate-sway',
        expression: 'Warm cheerful smile, open eye contact',
        soundEffect: 'adam_greeting',
        dialoguePreview: "Hey there! Ready to examine our soil ecosystem and solve today's puzzles?",
        dialoguePreviewAr: "أهلاً بك! هل أنت مستعد لفحص النظام البيئي وحل ألغاز اليوم الحسابية؟",
      },
      happy: {
        id: 'happy',
        title: 'Eureka Discovery Smile',
        titleAr: 'ابتسامة الاكتشاف (وجدتها!)',
        description: 'Raising his magnifying glass high with a wide smile and bright eyes, excited about a scientific finding.',
        descriptionAr: 'يرفع عدسته المكبرة عالياً مع ابتسامة عريضة وعينين لامعتين فرحاً بالاكتشاف.',
        animationClass: 'animate-bounce',
        expression: 'Enthusiastic open grin, sparkling eyes',
        soundEffect: 'success_bell',
        dialoguePreview: "Aha! The photosynthesis calculations match our harvest output perfectly!",
        dialoguePreviewAr: "رائع! حسابات التمثيل الضوئي تتطابق تماماً مع ناتج محصولنا اليوم!",
      },
      surprised: {
        id: 'surprised',
        title: 'Close-Up Inspection Shock',
        titleAr: 'دهشة الفحص الدقيق',
        description: 'Holding magnifying glass right up to his eye, eye appearing humorously magnified, eyebrows arched.',
        descriptionAr: 'يضع العدسة مباشرة أمام عينه لتظهر مكبرة بشكل طريف مع رفع حاجبيه دهشة.',
        animationClass: 'animate-pulse',
        expression: 'Giant magnified eye effect, dropped jaw',
        soundEffect: 'whoosh_high',
        dialoguePreview: "Incredible! Look at the micro-structure of this hybrid tomato seed!",
        dialoguePreviewAr: "مذهل حقاً! انظر إلى البنية الدقيقة لهذه البذرة الهجينة النادرة!",
      },
      celebration: {
        id: 'celebration',
        title: 'Double Fist Pump Victory',
        titleAr: 'احتفال النصر الرياضي',
        description: 'Jumping with both arms raised in victory, magnifying glass held proudly, confetti burst.',
        descriptionAr: 'قفزة نصر بذراعين مرفوعتين ممسكاً بعدسته بفخر وسط تطاير أوراق الاحتفال.',
        animationClass: 'animate-harvest-bounce',
        expression: 'Triumphant cheer, wide open smile',
        soundEffect: 'victory_tada',
        dialoguePreview: "100% on the math assignment! Our farm just received a giant bonus grant!",
        dialoguePreviewAr: "علامة كاملة 100% في الواجب! حصلت مزرعتنا على منحة تطوير إضافية!",
      },
      thinking: {
        id: 'thinking',
        title: 'Mathematical Peer Inspection',
        titleAr: 'تفكير حسابي متعمق',
        description: 'Leaning forward peering through lens at the ground, chin touched with thumb, calculating equations.',
        descriptionAr: 'انحناء طفيف للأمام مع النظر عبر العدسة ولمس الذقن وحساب التقديرات.',
        animationClass: 'animate-float-slow',
        expression: 'Concentrated inquisitive squint',
        soundEffect: 'math_ticking',
        dialoguePreview: "Let's calculate: 4 plots multiplied by 3 waterings per day equals...",
        dialoguePreviewAr: "دعنا نحسبها: 4 أحواض زراعية مضروبة في 3 ريات يومياً تعطينا...",
      },
      pointing: {
        id: 'pointing',
        title: 'Precision Lens Pointer',
        titleAr: 'توجيه دقيق بالعدسة',
        description: 'Extending the magnifying glass forward like a pointer toward the target crop bed or question.',
        descriptionAr: 'مد العدسة المكبرة للأمام كأداة إشارة دقيقة نحو حوض الزرع أو السؤال المستهدف.',
        animationClass: 'animate-pulse',
        expression: 'Confident guide expression',
        soundEffect: 'chime_ping',
        dialoguePreview: "Focus right here on question #3 to maximize your golden reward!",
        dialoguePreviewAr: "ركز هنا تماماً في السؤال رقم 3 لمضاعفة مكافأتك الذهبية!",
      },
      walking: {
        id: 'walking',
        title: 'Adventurous Explorer Walk',
        titleAr: 'خطوات المستكشف الواثق',
        description: 'Brisk natural stride with orange sneakers stepping forward, magnifying glass swinging by side.',
        descriptionAr: 'خطوات واثقة بحذائه البرتقالي وتأرجح سلس للعدسة المكبرة بجانبه.',
        animationClass: 'animate-sway',
        expression: 'Brisk optimistic stride',
        soundEffect: 'footsteps_gravel',
        dialoguePreview: "Let's inspect the irrigation channels around the eastern meadow!",
        dialoguePreviewAr: "هيا بنا نفحص قنوات الري المائية حول الحقل الشرقي!",
      },
    },
    dialogues: {
      greeting: {
        en: "Hi! Adam here. Every mystery on this farm has a scientific solution waiting to be uncovered!",
        ar: "مرحباً! أنا آدم. كل لغز في هذه المزرعة وراءه سر علمي ممتع ينتظر أن نكتشفه معاً!",
      },
      questAssigned: {
        en: "I noticed an interesting pattern in today's weather! Complete your quiz to test our hypothesis!",
        ar: "لاحظت نمطاً مثيراً للاهتمام في طقس اليوم! أنجز اختبارك لنختبر فرضيتنا العلمية!",
      },
      harvestPraise: {
        en: "The growth curve on that wheat field was quadratic perfection! Excellent farming strategy!",
        ar: "منحنى نمو محصول القمح كان نموذجياً ورائعاً! خطة زراعية ذكية ومتقنة!",
      },
      levelUpCheer: {
        en: "Formula verified! Level up achieved! Our laboratory equipment just got upgraded!",
        ar: "المعادلة مكتملة بنجاح! ارتقينا للمستوى التالي وحصلنا على معدات معملية متطورة!",
      },
      homeworkPrompt: {
        en: "I've reviewed the math questions on Spark's tablet. They look exciting! Let's solve them!",
        ar: "راجعت مسائل الرياضيات على جهاز سبارك، إنها شيقة وممتعة! هيا نحلها معاً!",
      },
    },
  },

  TALIA: {
    id: 'TALIA',
    name: 'Talia',
    nameAr: 'تاليا',
    speciesRole: 'Creative Botanist & Language Scholar',
    speciesRoleAr: 'عالمة النباتات والأديبة المبدعة',
    roleTitle: 'Language & Creativity Companion',
    roleTitleAr: 'رفيقة اللغات والإبداع الأدبي',
    tagline: 'Words, stories, blooming flowers, and poetic nature insights!',
    taglineAr: 'كلمات، قصص ملهمة، أزهار متفتحة، وإشراقات طبيعية ساحرة!',
    description: 'Talia is an articulate, artistic young girl with dark wavy twin pigtails tied with yellow and purple scrunchies, round golden wireframe glasses, and a sunny mustard-yellow smock dress with an embroidered flower pocket. She carries a floral spiral sketchbook and purple pencil to record plant species and literary poetry!',
    descriptionAr: 'فتاة ذكية ذات ضفيرتين مموجتين بربطات صفراء وبنفسجية، ونظارات ذهبية دائرية، ترتدي فستاناً أصفر مزيناً بجيب مطرز بوردة وبنطالاً بنفسجياً. تحمل دفتر رسم حلزوني وقلم رصاص بنفسجي لتدوين أسرار النباتات والكلمات!',
    color: '#9333ea',
    accentColor: '#a855f7',
    bgBadge: 'bg-purple-500/10 text-purple-600 border-purple-200',
    image: CHARACTER_IMAGES.TALIA,
    poseSheetImage: CHARACTER_IMAGES.POSES.TALIA,
    specialty: 'Languages, Botany, Creative Writing & Biology',
    specialtyAr: 'اللغات، علم النبات، الكتابة الإبداعية والأحياء',
    avatarEmoji: '👧🏻',
    outfitBreakdown: {
      head: 'Wavy brunette twin pigtails tied with yellow & lilac scrunchies, delicate gold round spectacles, gentle brown eyes.',
      torso: 'Sunny mustard-yellow smock dress with gathered neckline and left patch pocket embroidered with mini wild flowers.',
      legs: 'Plum lavender-purple form-fitting cotton leggings.',
      feet: 'Pure pearl-white ballerina flats with dainty knotted bows.',
      accessories: 'Spiral hardcover sketchbook with painted purple daisy pastel cover and a sharpened purple HB pencil.',
    },
    outfitBreakdownAr: {
      head: 'ضفيرتان مموجتان بربطات صفراء وبنفسجية، ونظارات دائرية ذهبية رقيقة وعينان بنيتان حالمتان.',
      torso: 'فستان فضفاض أصفر خردلي مع جيب مطرز بزهور برية ملونة وفتحة عنق مريحة.',
      legs: 'بنطال ضيق بلون لافندر بنفسجي ناعم ومريح.',
      feet: 'حذاء باليه أبيض لؤلؤي مع عقدة شريطية أنيقة.',
      accessories: 'دفتر ملاحظات حلزوني بغلاف زهرة الأقحوان وقلم رصاص بنفسجي أنيق.',
    },
    colorPalette: [
      { name: 'Mustard Sunbeam', hex: '#FBC02D', usage: 'Smock dress, yellow scrunchie' },
      { name: 'Lavender Plum', hex: '#8E24AA', usage: 'Fitted leggings, pencil body' },
      { name: 'Golden Wire', hex: '#FFD54F', usage: 'Round spectacle frames' },
      { name: 'Espresso Brunette', hex: '#3E2723', usage: 'Pigtails volume & curls' },
      { name: 'Daisy Pearl', hex: '#FFFFFF', usage: 'Ballerina flats, sketchbook pages' },
    ],
    personalityTraits: ['Artistic', 'Literary', 'Gentle', 'Thoughtful', 'Perceptive'],
    personalityTraitsAr: ['فنانة', 'أديبة', 'رقيقة', 'متأملة', 'لماحة'],
    poses: {
      idle: {
        id: 'idle',
        title: 'Poetic Pensive Stance',
        titleAr: 'وقفة التأمل والإلهام',
        description: 'Holding her floral sketchbook snugly against her chest with left arm, purple pencil resting near chin with thoughtful smile.',
        descriptionAr: 'تحتضن دفترها الحلزوني بذراعها وتضع قلمها البنفسجي قرب ذقنها بابتسامة متأملة.',
        animationClass: 'animate-sway',
        expression: 'Dreamy gentle smile, eyes reflecting curiosity',
        soundEffect: 'talia_greeting',
        dialoguePreview: "Greetings! I was just journaling about the sweet fragrance of our blossoming clover.",
        dialoguePreviewAr: "أهلاً بك! كنت أدون في مذكراتي عن العطر الزكي لزهور البرسيم المتفتحة.",
      },
      happy: {
        id: 'happy',
        title: 'Blooming Joy (Notebook Clasp)',
        titleAr: 'بهجة التفتح (عناق الدفتر)',
        description: 'Clasping notebook with both hands, spectacles glinting in the sunshine, radiating warmth.',
        descriptionAr: 'تضم دفترها بكلتا يديها مع بريق شاعري في نظارتها وابتسامة دافئة.',
        animationClass: 'animate-bounce',
        expression: 'Blissful smile, rosy cheeks',
        soundEffect: 'twinkle_harp',
        dialoguePreview: "How lovely! That poem and plant description you wrote is pure art!",
        dialoguePreviewAr: "يا للجمال! الوصف الذي كتبته لتلك الزهرة قطعة أدبية وفنية رائعة!",
      },
      surprised: {
        id: 'surprised',
        title: 'Glasses Slip Surprise',
        titleAr: 'دهشة انزلاق النظارة',
        description: 'Pushing glasses up bridge of nose with index finger, eyes wide with amazement at rare flora.',
        descriptionAr: 'تعدل نظارتها بإصبعها نحو الأعلى مع اتساع عينيها دهشة برؤية زهرة نادرة.',
        animationClass: 'animate-pulse',
        expression: 'Delighted gasp, wide-eyed look',
        soundEffect: 'chime_sparkle',
        dialoguePreview: "My goodness! Look at the iridescent petals on this midnight lily!",
        dialoguePreviewAr: "يا إلهي! انظر إلى تدرجات الألوان الساحرة على بتلات هذه الزنبقة النادرة!",
      },
      celebration: {
        id: 'celebration',
        title: 'Petal Dance Celebration',
        titleAr: 'رقصة بتلات الورد الاحتفالية',
        description: 'Graceful pirouette on white ballet flats, floral sketchbook opened to a golden star page, floral petals swirling.',
        descriptionAr: 'دوران رقيق على أطراف حذاء الباليه مع فتح الدفتر على صفحة نجمة التفوق وتطاير البتلات.',
        animationClass: 'animate-harvest-bounce',
        expression: 'Radiant triumphant joy',
        soundEffect: 'harp_glissando',
        dialoguePreview: "Magnificent! You scored high honors on the language comprehension module!",
        dialoguePreviewAr: "رائع وفائق الجمال! نلت مرتبة الشرف في اختبار فهم المقروء واللغات!",
      },
      thinking: {
        id: 'thinking',
        title: 'Pencil to Cheek Sketching',
        titleAr: 'تأمل القلم وتدوين الأفكار',
        description: 'Tapping eraser of pencil against cheek, gazing upward into the sky forming new sentences.',
        descriptionAr: 'تنقر بممحاة القلم على خدها وتنظر نحو الأفق لصياغة جمل وأفكار جديدة.',
        animationClass: 'animate-float-slow',
        expression: 'Deep poetic contemplation',
        soundEffect: 'paper_turn',
        dialoguePreview: "Let me find the most descriptive adjective for our rich harvest...",
        dialoguePreviewAr: "دعني أبحث عن أجمل صفة أدبية تليق بحصادنا الذهبي المبارك...",
      },
      pointing: {
        id: 'pointing',
        title: 'Pencil Pointer Direction',
        titleAr: 'إشارة بالقلم البنفسجي',
        description: 'Directing the tip of her purple pencil toward the greenhouse or vocabulary challenge.',
        descriptionAr: 'توجيه سن القلم البنفسجي نحو الصوبة الزجاجية أو تحدي المفردات.',
        animationClass: 'animate-pulse',
        expression: 'Gentle encouraging smile',
        soundEffect: 'chime_ping',
        dialoguePreview: "Right over there in the greenhouse, the botanical seedlings are ready for reading!",
        dialoguePreviewAr: "هناك في الصوبة الزجاجية، شتلات النباتات جاهزة للقراءة والتعرف عليها!",
      },
      walking: {
        id: 'walking',
        title: 'Graceful Ballet Stride',
        titleAr: 'خطوات الباليه الرشيقة',
        description: 'Poised walking motion on white flats with yellow dress swaying lightly in the breeze.',
        descriptionAr: 'مشية رشيقة متزنة بفستانها الأصفر الخردلي المتطاير بنعومة مع النسيم.',
        animationClass: 'animate-sway',
        expression: 'Serene elegant posture',
        soundEffect: 'footsteps_leaves',
        dialoguePreview: "Let us walk through the lavender rows to gather fresh inspiration!",
        dialoguePreviewAr: "دعنا نمشي بين صفوف زهور اللافندر لنستلهم أفكاراً جديدة لكتاباتنا!",
      },
    },
    dialogues: {
      greeting: {
        en: "Hello, dear friend! Nature and language bloom together when nurtured with love and patience.",
        ar: "أهلاً بك يا صديقي العزيز! الطبيعة واللغة تزهران معاً حين نرعاهما بالحب والصبر والاهتمام.",
      },
      questAssigned: {
        en: "I've drafted a lovely vocabulary quest in my notebook. Would you like to read it together?",
        ar: "كتبت في دفتري مهمة مفردات وقراءة شيقة وممتعة، هل تود أن نقرأها ونحلها معاً؟",
      },
      harvestPraise: {
        en: "What a picturesque yield! Every tomato and strawberry looks like an oil painting masterwork!",
        ar: "يا له من مشهد بديع! كل حبة طماطم وفراولة تبدو كلوحة فنية رسمتها الطبيعة بعناية!",
      },
      levelUpCheer: {
        en: "A new chapter unfolds in our farm chronicle! New rare flower seeds have arrived in our shop!",
        ar: "فصل جديد مشرق يكتب في قصة مزرعتنا! وصلت بذور زهور نادرة إلى المتجر!",
      },
      homeworkPrompt: {
        en: "The reading comprehension exercise on Spark's tablet is ready. Let's explore its story!",
        ar: "تمرين القراءة والفهم على جهاز سبارك أصبح جاهزاً، هيا نقرأ القصة ونستخرج معانيها!",
      },
    },
  },

  SPARK: {
    id: 'SPARK',
    name: 'Spark',
    nameAr: 'سبارك',
    speciesRole: 'Futuristic AI & Mission Companion',
    speciesRoleAr: 'الروبوت الذكي ورفيق المهمات الفضائية',
    roleTitle: 'Smart Robot Assistant & Mission AI',
    roleTitleAr: 'المساعد الآلي الذكي وخبير المهمات',
    tagline: 'Beep boop! Real-time analytics, homework alerts, and technological farm upgrades!',
    taglineAr: 'بيب بوب! تحليلات رقمية فورية، تنبيهات الواجبات وترقيات المزرعة التكنولوجية!',
    description: 'Spark is a state-of-the-art chibi humanoid companion robot constructed from glossy white and metallic royal cobalt blue armor with glowing cyan LED digital display eyes and smile. Glowing amber LED energy rings pulse at his joints and ears, and he hovers weightlessly on ion thrusters!',
    descriptionAr: 'روبوت ذكي لطيف بهيكل أبيض لامع ودروع زرقاء ملكية وشاشة رقمية بوجه مبتسم بلون أزرق سماوي مضيء. تحيط بمفاصله حلقات طاقة برتقالية متوهجة ويحلق بخفة بواسطة محركات دفع هوائية!',
    color: '#0891b2',
    accentColor: '#06b6d4',
    bgBadge: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
    image: CHARACTER_IMAGES.SPARK,
    poseSheetImage: CHARACTER_IMAGES.POSES.SPARK,
    specialty: 'Homework Beacons, Farm Analytics, IoT Irrigation & Tech Upgrades',
    specialtyAr: 'منارة الواجبات، التحليلات الزراعية، الري الذكي والترقيات التقنية',
    avatarEmoji: '🤖',
    outfitBreakdown: {
      head: 'Glossy white aerodynamic helmet with curved black OLED visor face screen showing cyan LED pixel eyes & mouth, amber ear ring lights.',
      torso: 'Glossy white chassis with royal metallic cobalt blue chest plate boldly printed with white "Spark" logo and amber seam lights.',
      legs: 'Segmented mechanical legs with circular amber LED knee rings and hovering thruster boots.',
      feet: 'Magnetic levitation boots with soft amber/cyan ion propulsion glow.',
      accessories: 'Retractable holographic projector antenna, wireless homework transceiver, digital HUD scanner.',
    },
    outfitBreakdownAr: {
      head: 'خوذة بيضاء انسيابية مع شاشة سوداء منحنية تعرض عيوناً وابتسامة بكسل زرقاء سماوية مضيئة وحلقات أذن برتقالية.',
      torso: 'درع أبيض مصقول مع لوحة صدر زرقاء ملكية مطبوع عليها اسم Spark بحروف بيضاء ناصعة وخطوط طاقة برتقالية.',
      legs: 'أطراف روبوتية متمفصلة مع حلقات طاقة LED برتقالية عند الركبتين وأحذية دفع نفاثة.',
      feet: 'محركات دفع هوائية مغناطيسية تطلق توهجاً دافئاً أثناء التحليق.',
      accessories: 'جهاز بث الهولوجرام، مستقبل إشارات الواجبات المدرسية وماسح رقمي ذكي.',
    },
    colorPalette: [
      { name: 'Ceramic White Armor', hex: '#ECEFF1', usage: 'Outer helmet and body chassis' },
      { name: 'Royal Cobalt Blue', hex: '#1565C0', usage: 'Chest plate with "Spark", limbs accent' },
      { name: 'Luminous Cyan LED', hex: '#00E5FF', usage: 'Digital eye display, mouth pixels' },
      { name: 'Amber Core Rings', hex: '#FF9100', usage: 'Joint energy rings, thruster flame' },
      { name: 'Deep Space Visor', hex: '#102027', usage: 'OLED face display backdrop' },
    ],
    personalityTraits: ['Intelligent', 'Prompt', 'Supportive', 'Methodical', 'High-Tech'],
    personalityTraitsAr: ['ذكي', 'دقيق', 'داعم', 'منهجي', 'عالي التقنية'],
    poses: {
      idle: {
        id: 'idle',
        title: 'Weightless Hover Stance',
        titleAr: 'تحليق التوازن الرقمي',
        description: 'Spark hovers 15cm off the ground with gentle vertical bobbing, amber thrusters humming softly, wave gesture with left hand.',
        descriptionAr: 'يحلق سبارك بخفة في الهواء على ارتفاع 15 سم ملوحاً بيده الروبوتية مع ابتسامة رقمية مشرقة.',
        animationClass: 'animate-float',
        expression: 'Bright cyan smiling LED pixels and steady eyes',
        soundEffect: 'robot_beep_happy',
        dialoguePreview: "Beep boop! Systems nominal. Farm network connected with 100% signal strength!",
        dialoguePreviewAr: "بيب بوب! جميع الأنظمة تعمل بكفاءة 100% وشبكة المزرعة متصلة بنجاح!",
      },
      happy: {
        id: 'happy',
        title: 'Energy Pulse Smile (Heart Display)',
        titleAr: 'ابتسامة الطاقة (قلب رقمي)',
        description: 'Screen pulses with cute cyan pixel hearts, amber LED rings brighten and flash in sync.',
        descriptionAr: 'تتحول عينا الشاشة إلى قلوب زرقاء سماوية مضيئة مع توهج حلقات الطاقة البرتقالية فرحاً.',
        animationClass: 'animate-pulse',
        expression: 'Pixel heart eyes and happy digital arc',
        soundEffect: 'robot_power_up',
        dialoguePreview: "Affirmative! Farm productivity metrics have exceeded all projected benchmarks!",
        dialoguePreviewAr: "تم التأكيد! مؤشرات الإنتاجية الزراعية تجاوزت جميع التوقعات القياسية!",
      },
      surprised: {
        id: 'surprised',
        title: 'Exclamation Scan Alert',
        titleAr: 'إنذار الرصد السريع (!)',
        description: 'Face screen flashes bright cyan "!" exclamation mark, head antenna pops up spinning with warning chime.',
        descriptionAr: 'تظهر علامة تعجب مضيئة (!) على الشاشة مع خروج الهوائي الدوار وصوت تنبيه سريع.',
        animationClass: 'animate-bounce',
        expression: 'Exclamation mark alert screen',
        soundEffect: 'robot_alert_chime',
        dialoguePreview: "Alert! New homework transmission received from Teacher Portal! Priority: High!",
        dialoguePreviewAr: "تنبيه هام! تم استلام إرسال واجب مدرسي جديد من بوابة المعلم! الأولوية: قصوى!",
      },
      celebration: {
        id: 'celebration',
        title: '360° Anti-Gravity Spin',
        titleAr: 'دوران 360 درجة ضد الجاذبية',
        description: 'Spinning 360 degrees mid-air leaving a trail of electric cyan spark particles, arms held out in cheer.',
        descriptionAr: 'دوران كامل في الهواء مع إطلاق شرارات ضوئية زرقاء احتفالاً بالإنجاز.',
        animationClass: 'animate-spin-slow',
        expression: 'Starry pixel eyes and rainbow display banner',
        soundEffect: 'robot_celebration_fanfare',
        dialoguePreview: "Mission complete! 100/100 points calculated! Reward coins deposited into vault!",
        dialoguePreviewAr: "اكتملت المهمة بنجاح! 100/100 نقطة! تم إيداع العملات في خزينة المزرعة!",
      },
      thinking: {
        id: 'thinking',
        title: 'Holographic Data Projection',
        titleAr: 'عرض البيانات الهولوجرامية',
        description: 'Beaming a 3D hologram of soil moisture and plant charts from forehead projector, LED eyes flickering in compute mode.',
        descriptionAr: 'إطلاق هولوجرام ثلاثي الأبعاد لبيانات التربة ونمو النباتات مع وميض عيني المعالجة الذكية.',
        animationClass: 'animate-float-slow',
        expression: 'Data streams scrolling across visor',
        soundEffect: 'data_processing_hum',
        dialoguePreview: "Calculating optimal crop rotation sequence for maximum gold yield...",
        dialoguePreviewAr: "جارٍ معالجة أفضل دورة زراعية لمضاعفة محصول العملات الذهبية...",
      },
      pointing: {
        id: 'pointing',
        title: 'Laser Target Beacon',
        titleAr: 'توجيه شعاع المنارة الذكية',
        description: 'Pointing mechanical blue index finger with a safe glowing guide ray directly at the target objective.',
        descriptionAr: 'توجيه إصبعه الروبوتي الأزرق مع شعاع ضوئي مرشد نحو الهدف التالي بدقة.',
        animationClass: 'animate-pulse',
        expression: 'Focused target lock visor',
        soundEffect: 'laser_ping',
        dialoguePreview: "Target lock confirmed: Complete question 4 to unlock the water pump upgrade!",
        dialoguePreviewAr: "تم تحديد الهدف: أجب عن السؤال 4 لفتح ترقية مضخة الري الآلية!",
      },
      walking: {
        id: 'walking',
        title: 'Ion Hover Cruise',
        titleAr: 'إبحار الدفع النفاث',
        description: 'Gliding smoothly forward through the air with glowing amber thruster trails, tilting dynamically into turns.',
        descriptionAr: 'طيران انسيابي في الهواء مع ذيل ضوئي برتقالي دافئ وميلان رشيق مع المنعطفات.',
        animationClass: 'animate-float',
        expression: 'Cruising navigation interface',
        soundEffect: 'hover_thruster_loop',
        dialoguePreview: "Initiating autonomous farm survey patrol. All sensors active and scanning.",
        dialoguePreviewAr: "بدء جولة المسح الجوي الشاملة للمزرعة. جميع المستشعرات في حالة جاهزية.",
      },
    },
    dialogues: {
      greeting: {
        en: "Greetings, Farmer! Unit Spark is online and ready to optimize your educational agriculture experience.",
        ar: "تحياتي يا بطل المزرعة! الوحدة سبارك متصلة بالشبكة وجاهزة لتطوير تجربتك الزراعية والتعليمية.",
      },
      questAssigned: {
        en: "Homework packet synchronization complete. Let's activate the learning module for bonus energy!",
        ar: "تم مزامنة حزمة الواجبات المدرسية بنجاح. هيا نبدأ لحصد طاقة إضافية وجوائز كبرى!",
      },
      harvestPraise: {
        en: "Crop harvesting executed with 99.8% perfection. Soil nutrient balance remains optimal.",
        ar: "تم تنفيذ عملية الحصاد بدقة بلغت 99.8%. توازن مغذيات التربة في أفضل مستوياته!",
      },
      levelUpCheer: {
        en: "Level Up Detected! Firmware updated, new farm blueprints decoded into system database!",
        ar: "تم رصد ارتقاء في المستوى! تم تحديث النظام وفك تشفير مخططات زراعية جديدة!",
      },
      homeworkPrompt: {
        en: "Teacher assigned mission ready! Tap my beacon to begin the interactive quiz module!",
        ar: "مهمة المعلم جاهزة الآن! اضغط على منارتي لبدء الاختبار التفاعلي وكسب الجوائز!",
      },
    },
  },
};
