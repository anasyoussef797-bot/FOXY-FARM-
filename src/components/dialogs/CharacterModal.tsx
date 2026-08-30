import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../assets/characters';
import { X, Volume2 } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';
import { useTranslation } from '../../i18n';

export const CharacterModal: React.FC = () => {
  const { activeDialog, closeDialog } = useGame();
  const { t, isRTL } = useTranslation();

  useEffect(() => {
    if (activeDialog?.character) {
      soundEngine.playCharacterVoice(activeDialog.character);
    }
  }, [activeDialog]);

  if (!activeDialog) return null;

  const character = CHARACTERS[activeDialog.character] || CHARACTERS.FOXY;

  return (
    <div className="fixed inset-0 z-50 bg-[#1B5E20]/80 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#FDD835] relative animate-in zoom-in-95 duration-150">
        <button
          onClick={closeDialog}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#F1F8E9] hover:bg-[#DCEDC8] text-[#2E4018] transition-colors cursor-pointer border border-[#C5E1A5]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-18 h-18 rounded-2xl object-cover border-2 shadow-md"
              style={{ borderColor: character.color }}
            />
            <span className="absolute -bottom-1 -right-1 text-base">
              {character.avatarEmoji}
            </span>
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${character.bgBadge}`}>
                {character.name}
              </span>
              <button
                onClick={() => soundEngine.playCharacterVoice(character.id)}
                className="p-1 text-slate-500 hover:text-[#2E7D32] cursor-pointer"
                title="Play voice"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <h3 className="text-base font-black text-[#2E4018] mt-1">
              {activeDialog.title || `${character.name}:`}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium truncate">
              {character.roleTitle}
            </p>
          </div>
        </div>

        <div className="bg-[#F1F8E9] border-2 border-[#C5E1A5] rounded-2xl p-4 my-4">
          <p className="text-xs sm:text-sm font-semibold text-[#4E342E] leading-relaxed">
            "{activeDialog.text}"
          </p>
        </div>

        <div className="flex items-center justify-end gap-2">
          {activeDialog.actionLabel && activeDialog.onAction ? (
            <button
              onClick={() => {
                activeDialog.onAction?.();
                closeDialog();
              }}
              className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl shadow-[0_3px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-transform hover:scale-105 cursor-pointer"
            >
              {activeDialog.actionLabel}
            </button>
          ) : (
            <button
              onClick={closeDialog}
              className="px-6 py-2.5 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black text-xs rounded-xl shadow-[0_3px_0_#1B5E20] active:translate-y-0.5 active:shadow-none transition-colors cursor-pointer"
            >
              {t.confirm} 👍
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
