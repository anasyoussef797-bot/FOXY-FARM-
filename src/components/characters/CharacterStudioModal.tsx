import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Volume2,
  Check,
  Copy,
  Layers,
  Activity,
  Compass,
  Palette,
  Award,
  BookOpen,
  Info,
  Maximize2,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  CHARACTERS,
  CHARACTER_IMAGES,
  CharacterProfile,
  PoseType,
  CharacterPoseSpec,
} from '../../assets/characters';
import { soundEngine } from '../../services/soundEngine';

interface CharacterStudioModalProps {
  onClose: () => void;
  isArabic?: boolean;
  initialCharacterId?: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';
}

const POSE_LIST: { id: PoseType; labelEn: string; labelAr: string; icon: string }[] = [
  { id: 'idle', labelEn: 'Idle Stance', labelAr: 'وقفة الاستعداد', icon: '🌟' },
  { id: 'happy', labelEn: 'Happy & Cheerful', labelAr: 'سعادة وبهجة', icon: '😄' },
  { id: 'surprised', labelEn: 'Surprised Discovery', labelAr: 'دهشة واكتشاف', icon: '😲' },
  { id: 'celebration', labelEn: 'Celebration Victory', labelAr: 'احتفال النصر', icon: '🎉' },
  { id: 'thinking', labelEn: 'Curious Thinking', labelAr: 'تفكير واستنتاج', icon: '🤔' },
  { id: 'pointing', labelEn: 'Guiding Pointer', labelAr: 'توجيه وإشارة', icon: '👉' },
  { id: 'walking', labelEn: 'Walking Cycle', labelAr: 'دورة المشي', icon: '🏃' },
];

export const CharacterStudioModal: React.FC<CharacterStudioModalProps> = ({
  onClose,
  isArabic = true,
  initialCharacterId = 'FOXY',
}) => {
  const [selectedCharId, setSelectedCharId] = useState<'FOXY' | 'ADAM' | 'TALIA' | 'SPARK'>(
    initialCharacterId
  );
  const [selectedPose, setSelectedPose] = useState<PoseType>('idle');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'poses' | 'anatomy' | 'palette' | 'dialogue' | 'all'>('poses');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showFullSheet, setShowFullSheet] = useState(false);

  const character: CharacterProfile = CHARACTERS[selectedCharId];
  const currentPoseSpec: CharacterPoseSpec = character.poses[selectedPose];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    soundEngine.playClick();
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    soundEngine.playCharacterVoice(selectedCharId);
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B3014]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-4 border-[#AFB42B] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        
        {/* Header with 3D Universe Group Banner */}
        <div className="relative bg-linear-to-r from-[#2E7D32] via-[#388E3C] to-[#1B5E20] px-4 sm:px-6 py-3.5 border-b-4 border-[#FDD835] flex items-center justify-between text-white select-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF9C4] border-2 border-white flex items-center justify-center text-2xl shadow-md">
              🎨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-[#FFF9C4] drop-shadow-sm">
                  {isArabic ? 'استوديو شخصيات المزرعة السعيدة (3D)' : 'Foxy Farm 3D Character Studio'}
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FDD835] text-[#3E2723] uppercase tracking-wider">
                  Canonical 3D Universe
                </span>
              </div>
              <p className="text-xs text-[#DCEDC8] font-medium hidden sm:block">
                {isArabic
                  ? 'الهوية البصرية الرسمية، وضعيات التحريك، لوحات الألوان والتعبيرات التفاعلية'
                  : 'Official Visual Direction, Animation Poses, Color System & Expressive Portraits'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-[#1B5E20] hover:bg-[#2E7D32] text-[#FFF9C4] transition-colors cursor-pointer border border-[#81C784]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Canonical Character Selector Buttons */}
        <div className="bg-[#F1F8E9] p-2.5 sm:p-3.5 border-b border-[#AFB42B]/30 flex items-center gap-2 sm:gap-3 overflow-x-auto select-none scrollbar-none">
          {(['FOXY', 'ADAM', 'TALIA', 'SPARK'] as const).map((id) => {
            const char = CHARACTERS[id];
            const isSelected = selectedCharId === id;
            return (
              <button
                key={id}
                onClick={() => {
                  setSelectedCharId(id);
                  soundEngine.playCharacterVoice(id);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all font-black text-xs sm:text-sm cursor-pointer shrink-0 border-2 ${
                  isSelected
                    ? 'bg-white shadow-md scale-102 border-[#558B2F]'
                    : 'bg-white/60 hover:bg-white text-slate-700 border-transparent hover:border-[#AFB42B]/40'
                }`}
                style={{
                  borderColor: isSelected ? char.color : undefined,
                }}
              >
                <div
                  className="relative w-9 h-9 rounded-xl overflow-hidden border-2 shadow-xs shrink-0"
                  style={{ borderColor: char.color }}
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 text-[10px]">
                    {char.avatarEmoji}
                  </span>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-slate-900">
                      {isArabic ? char.nameAr : char.name}
                    </span>
                    {isSelected && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: char.color }}
                      />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                    {isArabic ? char.speciesRoleAr : char.speciesRole}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Main Content (Split View: Left 3D Model & Poses / Right Detail Specifications) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT COLUMN: 3D Visualizer & Pose Controller (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Live 3D Pose Preview Card */}
            <div className="bg-linear-to-b from-[#F9FBE7] to-[#F1F8E9] border-2 border-[#AFB42B]/40 rounded-3xl p-4 shadow-sm relative overflow-hidden flex flex-col items-center">
              
              {/* Top Bar with Character Tag & Audio synthesis button */}
              <div className="w-full flex items-center justify-between gap-2 mb-2 z-10">
                <span
                  className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border ${character.bgBadge}`}
                >
                  {isArabic ? character.nameAr : character.name} • {character.roleTitle}
                </span>

                <button
                  onClick={handlePlayVoice}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs border border-slate-200 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isPlayingAudio ? 'text-[#558B2F] animate-ping' : 'text-slate-600'
                    }`}
                  />
                  <span>{isArabic ? 'صوت' : 'Voice'}</span>
                </button>
              </div>

              {/* Character 3D Animated Avatar Display */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 my-1 flex items-center justify-center">
                {/* Background Halo Glow */}
                <div
                  className="absolute inset-4 rounded-full blur-xl opacity-35"
                  style={{ backgroundColor: character.accentColor }}
                />

                {/* Animated Character 3D Image */}
                <div
                  className={`relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-3xl p-2 bg-white border-4 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${currentPoseSpec.animationClass}`}
                  style={{ borderColor: character.color }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {character.avatarEmoji}
                  </div>
                </div>

                {/* Ground Shadow */}
                <div className="absolute -bottom-1 w-32 h-4 bg-black/20 rounded-full blur-xs" />
              </div>

              {/* Current Active Pose Title & Live Dialogue Preview Bubble */}
              <div className="w-full mt-2 bg-white rounded-2xl p-3 border-2 border-[#AFB42B]/30 shadow-xs">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span>{POSE_LIST.find((p) => p.id === selectedPose)?.icon}</span>
                    <span>{isArabic ? currentPoseSpec.titleAr : currentPoseSpec.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {currentPoseSpec.expression}
                  </span>
                </div>

                {/* Speech Bubble */}
                <div className="bg-[#F1F8E9] p-2.5 rounded-xl border border-[#AFB42B]/40 text-xs font-medium text-[#2E4018] leading-relaxed relative mt-2">
                  <span className="font-bold text-[#558B2F] mr-1">💬</span>
                  "{isArabic ? currentPoseSpec.dialoguePreviewAr : currentPoseSpec.dialoguePreview}"
                </div>
              </div>
            </div>

            {/* Pose Matrix Buttons */}
            <div className="bg-white border-2 border-[#AFB42B]/30 rounded-2xl p-3 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#558B2F]" />
                  <span>{isArabic ? 'مصفوفة وضعيات التحريك (Pose Matrix)' : 'Animation Pose Matrix'}</span>
                </h4>
                <span className="text-[10px] text-slate-500 font-bold">7 Poses</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {POSE_LIST.map((pose) => {
                  const isSelected = selectedPose === pose.id;
                  return (
                    <button
                      key={pose.id}
                      onClick={() => {
                        setSelectedPose(pose.id);
                        soundEngine.playClick();
                      }}
                      className={`flex items-center gap-1.5 p-2 rounded-xl text-left font-bold text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#558B2F] text-white border-[#33691E] shadow-sm scale-102'
                          : 'bg-[#F9FBE7] hover:bg-[#F1F8E9] text-slate-700 border-[#AFB42B]/30'
                      }`}
                    >
                      <span className="text-sm">{pose.icon}</span>
                      <span className="truncate text-[11px]">
                        {isArabic ? pose.labelAr : pose.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Specifications, Pose Sheet, Anatomy & Palette (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* View Sub-Tabs */}
            <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none select-none">
              {[
                { id: 'poses', labelEn: '3D Pose Sheet', labelAr: 'لوحة الوضعيات 3D', icon: Layers },
                { id: 'anatomy', labelEn: 'Canonical Anatomy', labelAr: 'التشريح والزي الرسمي', icon: Compass },
                { id: 'palette', labelEn: 'Color Palette', labelAr: 'لوحة الألوان الرسمية', icon: Palette },
                { id: 'dialogue', labelEn: 'Voice & Quotes', labelAr: 'الحوارات والعبارات', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      soundEngine.playClick();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer shrink-0 border ${
                      isSelected
                        ? 'bg-[#558B2F] text-white border-[#33691E] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: 1. 3D Pose Sheet Reference */}
            {activeTab === 'poses' && (
              <div className="flex flex-col gap-3">
                <div className="bg-slate-900 rounded-3xl p-3 relative overflow-hidden group shadow-lg border-2 border-slate-800">
                  <div className="flex items-center justify-between text-white text-xs font-bold mb-2 px-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FDD835]" />
                      <span>
                        {isArabic
                          ? `ورقة الوضعيات الكاملة لـ ${character.nameAr}`
                          : `${character.name} Complete 3D Pose Reference Sheet`}
                      </span>
                    </span>
                    <button
                      onClick={() => setShowFullSheet(!showFullSheet)}
                      className="flex items-center gap-1 text-[11px] text-[#81C784] hover:text-white transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>{showFullSheet ? (isArabic ? 'تصغير' : 'Compact') : (isArabic ? 'تكبير' : 'Expand')}</span>
                    </button>
                  </div>

                  {/* Pose Sheet Image Display */}
                  <div className={`relative rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center transition-all ${
                    showFullSheet ? 'max-h-[550px]' : 'max-h-[290px]'
                  }`}>
                    <img
                      src={character.poseSheetImage}
                      alt={`${character.name} Pose Sheet`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Pose Breakdown Card */}
                <div className="bg-[#F1F8E9] border-2 border-[#AFB42B]/30 rounded-2xl p-3.5 shadow-xs">
                  <h4 className="text-xs font-black text-[#2E4018] mb-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#558B2F]" />
                    <span>
                      {isArabic
                        ? `تفاصيل وضعية: ${currentPoseSpec.titleAr}`
                        : `Pose Direction: ${currentPoseSpec.title}`}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {isArabic ? currentPoseSpec.descriptionAr : currentPoseSpec.description}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. Canonical Anatomy & Outfit Breakdown */}
            {activeTab === 'anatomy' && (
              <div className="flex flex-col gap-3">
                <div className="bg-white border-2 border-[#AFB42B]/30 rounded-2xl p-4 shadow-xs">
                  <h4 className="text-xs font-black text-[#2E4018] mb-3 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#558B2F]" />
                    <span>{isArabic ? 'مواصفات الزي والملامح الرسمية' : 'Canonical Outfit & Feature Specs'}</span>
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    <div className="bg-[#F9FBE7] p-2.5 rounded-xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] block mb-0.5">
                        {isArabic ? '👤 الرأس والوجه والشعر / الخوذة:' : '👤 Head, Hair & Facial Specs:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isArabic ? character.outfitBreakdownAr.head : character.outfitBreakdown.head}
                      </p>
                    </div>

                    <div className="bg-[#F9FBE7] p-2.5 rounded-xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] block mb-0.5">
                        {isArabic ? '👕 الجزء العلوي والملابس المميزة:' : '👕 Upper Body & Signature Clothing:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isArabic ? character.outfitBreakdownAr.torso : character.outfitBreakdown.torso}
                      </p>
                    </div>

                    <div className="bg-[#F9FBE7] p-2.5 rounded-xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] block mb-0.5">
                        {isArabic ? '👖 الساقين والأطراف:' : '👖 Legs & Lower Body:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isArabic ? character.outfitBreakdownAr.legs : character.outfitBreakdown.legs}
                      </p>
                    </div>

                    <div className="bg-[#F9FBE7] p-2.5 rounded-xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] block mb-0.5">
                        {isArabic ? '👟 الأحذية والقوائم / المحركات:' : '👟 Footwear & Movement Base:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isArabic ? character.outfitBreakdownAr.feet : character.outfitBreakdown.feet}
                      </p>
                    </div>

                    <div className="bg-[#F9FBE7] p-2.5 rounded-xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] block mb-0.5">
                        {isArabic ? '🎒 الإكسسوارات والأدوات المميزة:' : '🎒 Signature Props & Accessories:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isArabic ? character.outfitBreakdownAr.accessories : character.outfitBreakdown.accessories}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="bg-[#F1F8E9] border-2 border-[#AFB42B]/30 rounded-2xl p-3.5">
                  <span className="text-xs font-black text-[#2E4018] block mb-2">
                    {isArabic ? 'السمات الشخصية والتربوية:' : 'Educational & Personality Traits:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isArabic ? character.personalityTraitsAr : character.personalityTraits).map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-white border border-[#AFB42B]/40 text-[#2E4018] text-xs font-bold shadow-xs"
                      >
                        ⭐ {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. Official Color Palette */}
            {activeTab === 'palette' && (
              <div className="bg-white border-2 border-[#AFB42B]/30 rounded-2xl p-4 shadow-xs">
                <h4 className="text-xs font-black text-[#2E4018] mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-[#558B2F]" />
                    <span>{isArabic ? 'لوحة الألوان الرسمية (Color Swatches)' : 'Official Color Swatches'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    {isArabic ? 'اضغط لنسخ الكود HEX' : 'Click to copy HEX'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {character.colorPalette.map((color) => {
                    const isCopied = copiedHex === color.hex;
                    return (
                      <button
                        key={color.hex}
                        onClick={() => handleCopyColor(color.hex)}
                        className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#F9FBE7] hover:bg-[#F1F8E9] border border-[#AFB42B]/30 text-left transition-all cursor-pointer group"
                      >
                        <div
                          className="w-10 h-10 rounded-xl border-2 border-white shadow-md shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isCopied && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs text-slate-800 truncate">
                              {color.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#558B2F] bg-white px-1.5 py-0.5 rounded-md border border-[#AFB42B]/30">
                              {color.hex}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">
                            {color.usage}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. Voice & Dialogue Scripts */}
            {activeTab === 'dialogue' && (
              <div className="bg-white border-2 border-[#AFB42B]/30 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
                <h4 className="text-xs font-black text-[#2E4018] mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#558B2F]" />
                  <span>{isArabic ? 'نصوص الحوارات الرسمية للمزرعة' : 'Canonical In-Game Dialogue Scripts'}</span>
                </h4>

                <div className="space-y-2 text-xs">
                  {Object.entries(character.dialogues).map(([key, val]) => (
                    <div key={key} className="bg-[#F9FBE7] p-3 rounded-2xl border border-[#AFB42B]/30">
                      <span className="font-black text-[#558B2F] text-[11px] block uppercase tracking-wider mb-1">
                        {key === 'greeting'
                          ? isArabic ? '👋 عبارة الترحيب' : '👋 Welcome Greeting'
                          : key === 'questAssigned'
                          ? isArabic ? '📜 إسناد المهمات' : '📜 Quest Assignment'
                          : key === 'harvestPraise'
                          ? isArabic ? '🌾 ثناء الحصاد' : '🌾 Harvest Praise'
                          : key === 'levelUpCheer'
                          ? isArabic ? '⭐ ترقية المستوى' : '⭐ Level Up Cheer'
                          : isArabic ? '📚 تنبيه الواجب المدرسي' : '📚 Homework Mission Prompt'}
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        "{isArabic ? val.ar : val.en}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F1F8E9] px-4 sm:px-6 py-3 border-t border-[#AFB42B]/30 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#558B2F] animate-pulse" />
            <span>
              {isArabic
                ? 'جميع الشخصيات مصممة بنمط 3D الموحد والمناسب للمزرعة السعيدة التعليمية'
                : 'All 4 characters unified in premium stylized 3D game aesthetic'}
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-[#558B2F] hover:bg-[#33691E] text-white font-black text-xs rounded-xl shadow-[0_3px_0_#2E4018] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer"
          >
            {isArabic ? 'إغلاق الاستوديو 👍' : 'Close Studio 👍'}
          </button>
        </div>
      </div>
    </div>
  );
};
