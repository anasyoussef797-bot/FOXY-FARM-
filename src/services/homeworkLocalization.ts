import { Homework, Question, SubjectCategory } from '../types';

export interface LocalizedHomeworkData {
  titleAr: string;
  descriptionAr: string;
  missionPromptAr: string;
  subjectAr: string;
  bonusItemNameAr?: string;
  questionsAr: Record<string, Partial<Question>>;
}

export const SEEDED_HOMEWORKS_ARABIC: Record<string, LocalizedHomeworkData> = {
  hw_math_01: {
    titleAr: 'رحلة آدم للهندسة والمساحات الزراعية',
    descriptionAr: 'آدم بحاجة لمساعدتك في حساب حدود المزرعة، ومحيط الأحواض، ومساحات رقع المحاصيل!',
    missionPromptAr: 'حل هذه التحديات الهندسية الأربعة لتعزيز حسابات مزرعتنا!',
    subjectAr: 'الرياضيات',
    bonusItemNameAr: 'بذور دوار الشمس الذهبية',
    questionsAr: {
      q_m1: {
        prompt: 'إذا كانت رقعة الخضار المستطيلة طولها 6 أمتار وعرضها 4 أمتار، فما هي مساحتها بالأمتار المربعة؟',
        options: ['10 م²', '20 م²', '24 م²', '28 م²'],
        correctAnswer: '24 م²',
        explanation: 'مساحة المستطيل = الطول × العرض = 6 × 4 = 24 متر مربع.',
      },
      q_m2: {
        prompt: 'حقل مربع طول ضلعه 5 أمتار يكون محيطه 20 متراً.',
        options: ['صحيح (True)', 'خطأ (False)'],
        correctAnswer: 'صحيح (True)',
        explanation: 'محيط المربع = 4 × طول الضلع = 4 × 5 = 20 متراً.',
      },
      q_m3: {
        prompt: 'لديك 48 بذرة جزر وتريد زراعتها بالتساوي في 6 صفوف. كم بذرة توضع في كل صف؟',
        mathExpr: '48 ÷ 6 = ؟',
        correctAnswer: '8',
        explanation: '48 مقسومة على 6 تساوي 8 بذور في كل صف.',
      },
      q_m4: {
        prompt: 'طابق بين كل شكل هندسي وعدد أضلاعه الصحيح:',
        pairs: [
          { left: 'المثلث', right: '3 أضلاع' },
          { left: 'المستطيل', right: '4 أضلاع' },
          { left: 'المخمس (خماسي الأضلاع)', right: '5 أضلاع' },
          { left: 'المسدس (سداسي الأضلاع)', right: '6 أضلاع' },
        ],
        correctAnswer: 'matched',
        explanation: 'المثلث: 3 أضلاع، المستطيل: 4 أضلاع، الخماسي: 5 أضلاع، السداسي: 6 أضلاع.',
      },
    },
  },
  hw_eng_02: {
    titleAr: 'حديقة حكايات تاليا ومفردات اللغة',
    descriptionAr: 'ساعد تاليا في استعادة الكلمات الوصفية المفقودة لكتابة يوميات مغامرات المزرعة!',
    missionPromptAr: 'أعدت لك تاليا 3 ألغاز لغوية وتحديات للمفردات المفيدة!',
    subjectAr: 'اللغة الإنجليزية',
    bonusItemNameAr: 'جرة البردي المصرية الأثرية',
    questionsAr: {
      q_e1: {
        prompt: 'أي من الكلمات التالية تعتبر صفة (Adjective) تصف المحصول الناضج بشكل أفضل؟',
        options: ['Quickly (بسرعة)', 'Golden (ذهبي)', 'Run (يركض)', 'Soil (تربة)'],
        correctAnswer: 'Golden (ذهبي)',
        explanation: 'كلمة "Golden" تصف اسماً (لون أو جودة المحصول)، مما يجعلها صفة (Adjective)!',
      },
      q_e2: {
        prompt: 'أكمل الجملة باستخدام الفعل الصحيح في زمن الماضي (Past Tense):',
        blankParts: [
          { text: 'Yesterday, Foxy ' },
          { text: 'planted', isBlank: true, correctWord: 'planted' },
          { text: ' six seeds in the fertile soil.' },
        ],
        options: ['plant', 'planted', 'planting', 'plants'],
        correctAnswer: 'planted',
        explanation: 'الفعل في زمن الماضي لكلمة "plant" هو "planted".',
      },
      q_e3: {
        prompt: 'طابق كل حيوان في المزرعة مع اسم صغيره بالإنجليزية:',
        pairs: [
          { left: 'Cow (البقرة)', right: 'Calf (العجل)' },
          { left: 'Chicken (الدجاجة)', right: 'Chick (الكتكوت)' },
          { left: 'Sheep (الخروف)', right: 'Lamb (الحمل)' },
          { left: 'Duck (البطة)', right: 'Duckling (صغير البط)' },
        ],
        correctAnswer: 'matched',
        explanation: 'Cow -> Calf, Hen -> Chick, Sheep -> Lamb, Duck -> Duckling.',
      },
    },
  },
  hw_sci_03: {
    titleAr: 'مختبر سبارك للبناء الضوئي والطاقة الشمسية',
    descriptionAr: 'سبارك يعاير مستشعرات البيت الزجاجي الذكي. اختبر معلوماتك العلمية حول كيفية صنع النبات لغذائه!',
    missionPromptAr: 'بدء روتين تحليل علم النبات والطاقة الشمسية. فلنتفوق معاً!',
    subjectAr: 'العلوم',
    bonusItemNameAr: 'تذكرة تبني أرنب أبيض لطيف',
    questionsAr: {
      q_s1: {
        prompt: 'ما هي الصبغة الخضراء في أوراق النبات التي تمتص ضوء الشمس لعملية البناء الضوئي؟',
        options: ['الكلوروفيل (Chlorophyll)', 'الهيموجلوبين (Hemoglobin)', 'الميلانين (Melanin)', 'الكاروتين (Carotene)'],
        correctAnswer: 'الكلوروفيل (Chlorophyll)',
        explanation: 'الكلوروفيل هو الجزيء الأخضر المسؤول عن امتصاص ضوء الشمس داخل خلايا النبات.',
      },
      q_s2: {
        prompt: 'أثناء عملية البناء الضوئي، يمتص النبات غاز ثاني أكسيد الكربون ويطلق غاز الأكسجين في الهواء.',
        options: ['صحيح (True)', 'خطأ (False)'],
        correctAnswer: 'صحيح (True)',
        explanation: 'صحيح! يحول النبات ثاني أكسيد الكربون والماء إلى جلوكوز ويطلق الأكسجين اللازم لحياة الإنسان والحيوان.',
      },
      q_s3: {
        prompt: 'ما هي العناصر الثلاثة الأساسية التي يحتاجها النبات لينمو قوياً وصحياً؟',
        options: [
          'ضوء الشمس، الماء، ومغذيات التربة',
          'الظلام، الجليد، والرمال الجافة',
          'الملح، السكر، والزيوت',
          'البلاستيك، الدخان، والرياح القوية',
        ],
        correctAnswer: 'ضوء الشمس، الماء، ومغذيات التربة',
        explanation: 'يزدهر النبات عند توفر أشعة الشمس، والماء النقي، ومعادن التربة الغنية.',
      },
    },
  },
  hw_gk_04: {
    titleAr: 'مهمة فوكسي للزراعة على ضفاف نيل مصر القديمة',
    descriptionAr: 'اكتشف كيف زرع الفلاحون المصريون القدماء الضفاف الخصبة لنهر النيل العظيم!',
    missionPromptAr: 'يريد فوكسي التعلم عن التاريخ المصري العريق وجذورنا الزراعية الخصبة على وادي النيل!',
    subjectAr: 'المعلومات العامة',
    bonusItemNameAr: 'حزمة بذور نيلية فاخرة',
    questionsAr: {
      q_g1: {
        prompt: 'ما هو الحدث الطبيعي السنوي الذي كان يرسب الطمي الأسود الخصب على تربة مزارع مصر القديمة؟',
        options: ['فيضان النيل السنوي', 'العواصف الرملية الصحراوية', 'ذوبان ثلوج الجبال', 'أمواج المد والجزر البحرية'],
        correctAnswer: 'فيضان النيل السنوي',
        explanation: 'كان فيضان النيل السنوي يغمر الحقول ويترك طبقة غنية من الطمي الأسود الخصب تسمى "كيميت".',
      },
      q_g2: {
        prompt: 'ما هو النبات الشهير الذي نما على طول ضفاف النيل واستخدمه المصريون القدماء لصنع ورق الكتابة؟',
        options: ['نبات البردي (Papyrus)', 'الخيزران (Bamboo)', 'نخيل البلح', 'زهرة اللوتس'],
        correctAnswer: 'نبات البردي (Papyrus)',
        explanation: 'كانت سيقان البردي تُضغط معاً لصنع لفائف ناعمة ومرنة للكتابة وتدوين التاريخ والعلوم.',
      },
    },
  },
};

/**
 * Checks if the homework was specifically written in English by a teacher
 * (user rule: display in selected language UNLESS teacher added the homework in English).
 */
export function isTeacherEnglishHomework(hw: Homework): boolean {
  // If it's one of the seeded homeworks with explicit Arabic support, it's not a teacher-exclusive English homework
  if (SEEDED_HOMEWORKS_ARABIC[hw.id]) {
    return false;
  }

  // If title or description has English characters and no Arabic characters
  const hasArabic = /[\u0600-\u06FF]/.test(hw.title + hw.description);
  const hasEnglish = /[a-zA-Z]/.test(hw.title);

  return hasEnglish && !hasArabic;
}

/**
 * Localizes a homework object based on current UI language.
 * If language is 'ar' and there is an Arabic localization (or translation data),
 * it returns the localized homework.
 * If it's a teacher-added English homework without Arabic translation, it preserves English content.
 */
export function getLocalizedHomework(homework: Homework, language: 'ar' | 'en'): Homework {
  if (language === 'en') {
    return homework;
  }

  // Check if it's a seeded homework with full Arabic translation
  const arData = SEEDED_HOMEWORKS_ARABIC[homework.id];
  if (arData) {
    const localizedQuestions: Question[] = homework.questions.map((q) => {
      const qAr = arData.questionsAr[q.id];
      if (!qAr) return q;

      return {
        ...q,
        prompt: qAr.prompt || q.prompt,
        instruction: qAr.instruction || q.instruction,
        options: qAr.options || q.options,
        correctAnswer: qAr.correctAnswer !== undefined ? qAr.correctAnswer : q.correctAnswer,
        pairs: qAr.pairs || q.pairs,
        blankParts: qAr.blankParts || q.blankParts,
        mathExpr: qAr.mathExpr || q.mathExpr,
        explanation: qAr.explanation || q.explanation,
      };
    });

    return {
      ...homework,
      title: arData.titleAr || homework.title,
      description: arData.descriptionAr || homework.description,
      missionPrompt: arData.missionPromptAr || homework.missionPrompt,
      subject: (arData.subjectAr as SubjectCategory) || homework.subject,
      bonusItemReward: homework.bonusItemReward
        ? {
            ...homework.bonusItemReward,
            name: arData.bonusItemNameAr || homework.bonusItemReward.name,
          }
        : undefined,
      questions: localizedQuestions,
    };
  }

  // If teacher wrote homework in Arabic or mixed, return as-is
  return homework;
}

export const SUBJECT_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  all: { ar: '🌟 جميع المهام', en: '🌟 All Missions' },
  Mathematics: { ar: '📐 الرياضيات', en: '📐 Mathematics' },
  English: { ar: '📚 اللغة الإنجليزية', en: '📚 English' },
  Science: { ar: '🔬 العلوم والبيئة', en: '🔬 Science' },
  'General Knowledge': { ar: '🏛️ المعلومات العامة', en: '🏛️ General Knowledge' },
};

export const DIFFICULTY_TRANSLATIONS: Record<string, { ar: string; en: string }> = {
  Easy: { ar: 'سهل 🌱', en: 'Easy 🌱' },
  Medium: { ar: 'متوسط 🌿', en: 'Medium 🌿' },
  Challenging: { ar: 'تحدي 🌳', en: 'Challenging 🌳' },
};
