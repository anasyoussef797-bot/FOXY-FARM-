import React, { useState } from 'react';
import { User, StudentProfile } from '../../types';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../services/soundEngine';
import { X, Droplets, Gift, Sparkles, Heart, Award, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../../services/storageService';

interface NeighborVisitModalProps {
  neighbor: User;
  onClose: () => void;
  isArabic: boolean;
}

export const NeighborVisitModal: React.FC<NeighborVisitModalProps> = ({ neighbor, onClose, isArabic }) => {
  const { studentProfile, refreshState, triggerCelebration } = useGame();
  const neighborProfile: StudentProfile = StorageService.getStudentProfile(neighbor.id);
  const neighborTiles = StorageService.getFarmTiles(neighbor.id);

  const [wateredCount, setWateredCount] = useState(0);
  const [giftSent, setGiftSent] = useState(false);

  const handleHelpWater = () => {
    if (wateredCount >= 3) return;
    soundEngine.playWater();
    soundEngine.playCoin();
    setWateredCount((prev) => prev + 1);

    // Reward visiting student
    studentProfile.coins += 25;
    studentProfile.xp += 30;
    refreshState();

    if (wateredCount + 1 === 3) {
      triggerCelebration();
      soundEngine.playVictory();
    }
  };

  const handleSendGift = () => {
    if (giftSent) return;
    soundEngine.playDinar();
    triggerCelebration();
    setGiftSent(true);
    studentProfile.xp += 50;
    refreshState();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="w-full max-w-2xl bg-linear-to-b from-[#33691E] to-[#1B5E20] rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] border-4 border-[#FDD835] overflow-hidden text-white animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-[#558B2F] to-[#33691E] px-5 py-3.5 flex items-center justify-between border-b-2 border-[#81C784]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF9C4] text-amber-950 flex items-center justify-center text-2xl border-2 border-amber-300 shadow-sm">
              {neighbor.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-[#FFF9C4] leading-none">
                  {isArabic ? `مزرعة الصديق: ${neighbor.name}` : `${neighbor.name}'s Farm`}
                </h3>
                <span className="text-[10px] font-black bg-[#FDD835] text-amber-950 px-2 py-0.5 rounded-full">
                  ⭐ {isArabic ? 'المستوى' : 'Lvl'} {neighborProfile.level || 4}
                </span>
              </div>
              <p className="text-xs text-[#DCEDC8] mt-0.5">
                {neighbor.className || 'Impact Hub Classmate'} • {neighborProfile.totalHarvestsCount || 12} {isArabic ? 'محصول' : 'Harvests'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          
          {/* Mini Farm Preview Stage */}
          <div className="bg-[#7CB342]/30 p-3 sm:p-4 rounded-2xl border-2 border-[#81C784]/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-[#FFF9C4] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FDD835]" />
                <span>{isArabic ? 'حقول ومحاصيل الجار النشطة' : "Neighbor's Live Crops & Animals"}</span>
              </span>
              <span className="text-[11px] font-bold text-[#DCEDC8]">
                {isArabic ? 'ساعد في سقاية 3 محاصيل لكسب نقاط الخبرة والذهب!' : 'Help water 3 crops for bonus Coins & XP!'}
              </span>
            </div>

            {/* Farm Mini Tiles (8 cols preview) */}
            <div className="grid grid-cols-8 gap-1.5 sm:gap-2 p-2 bg-[#558B2F]/40 rounded-xl border border-[#C5E1A5]/40">
              {neighborTiles.slice(0, 32).map((t) => (
                <div
                  key={t.id}
                  className={`h-10 sm:h-12 rounded-lg flex items-center justify-center text-lg border ${
                    t.type === 'soil'
                      ? 'bg-[#5D4037] border-[#3E2723]'
                      : t.buildingId
                      ? 'bg-[#8D6E63] border-amber-300'
                      : t.animalId
                      ? 'bg-[#81C784] border-[#2E7D32]'
                      : 'bg-[#8BC34A] border-[#689F38]'
                  }`}
                >
                  {t.buildingId ? '🛖' : t.animalId ? '🐄' : t.cropId ? '🌾' : '🌱'}
                </div>
              ))}
            </div>
          </div>

          {/* Social Interaction Buttons (Water crops & Send Gift) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Help Water Neighbor's Crops */}
            <div className="bg-white/10 rounded-2xl p-3 border border-white/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-[#0288D1] text-white flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#FFF9C4]">
                      {isArabic ? 'سقاية محاصيل الجار' : 'Water Neighbor Crops'}
                    </h4>
                    <p className="text-[10px] text-cyan-200">
                      {isArabic ? '+25 ذهب و +30 خبرة لكل سقاية' : '+25 Coins & +30 XP each'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden my-2">
                  <div
                    className="bg-[#29B6F6] h-full transition-all"
                    style={{ width: `${(wateredCount / 3) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={handleHelpWater}
                disabled={wateredCount >= 3}
                className={`w-full py-2 rounded-xl font-black text-xs transition-transform flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  wateredCount >= 3
                    ? 'bg-emerald-700/80 text-white cursor-default'
                    : 'bg-[#0288D1] hover:bg-[#0277BD] text-white hover:scale-102 active:scale-98'
                }`}
              >
                {wateredCount >= 3 ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#76FF03]" />
                    {isArabic ? 'تمت السقاية بنجاح (3/3)' : 'Completed (3/3)'}
                  </span>
                ) : (
                  <>
                    <Droplets className="w-4 h-4 text-cyan-200" />
                    <span>{isArabic ? `اسقِ محصول (${wateredCount}/3)` : `Water Crop (${wateredCount}/3)`}</span>
                  </>
                )}
              </button>
            </div>

            {/* Send Daily Gift Basket */}
            <div className="bg-white/10 rounded-2xl p-3 border border-white/20 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#FF8F00] text-amber-950 flex items-center justify-center text-lg">
                  🎁
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#FFF9C4]">
                    {isArabic ? 'إرسال سلة هدايا للصديق' : 'Send Gift Basket'}
                  </h4>
                  <p className="text-[10px] text-amber-200">
                    {isArabic ? 'أرسل بذور نادرة وسماد مجاناً' : 'Send free seeds & fertilizer'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSendGift}
                disabled={giftSent}
                className={`w-full py-2 rounded-xl font-black text-xs transition-transform flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  giftSent
                    ? 'bg-emerald-700/80 text-white cursor-default'
                    : 'bg-linear-to-r from-[#FFB300] to-[#F57F17] hover:opacity-90 text-amber-950 hover:scale-102 active:scale-98'
                }`}
              >
                {giftSent ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#76FF03]" />
                    {isArabic ? 'تم إرسال الهدية بنجاح!' : 'Gift Sent!'}
                  </span>
                ) : (
                  <>
                    <Gift className="w-4 h-4 text-amber-950" />
                    <span>{isArabic ? 'إرسال هدية مجانية 🎁' : 'Send Free Gift'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
