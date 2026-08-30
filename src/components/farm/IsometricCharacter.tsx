import React from 'react';
import { Sparkles, Zap, MessageCircle } from 'lucide-react';
import { CHARACTERS } from '../../assets/characters';

export type CharacterType = 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK';

interface IsometricCharacterProps {
  type: CharacterType;
  position: { x: number; y: number }; // Screen coordinate offset
  hasMissionAlert?: boolean;
  onClick: (character: CharacterType) => void;
  isArabic?: boolean;
}

export const IsometricCharacter: React.FC<IsometricCharacterProps> = ({
  type,
  position,
  hasMissionAlert = false,
  onClick,
  isArabic = true,
}) => {
  const profile = CHARACTERS[type] || CHARACTERS.FOXY;

  return (
    <div
      className="absolute select-none pointer-events-none flex flex-col items-center justify-center transition-all duration-200 z-30 group"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '90px',
        height: '90px',
      }}
    >
      {/* Ground Shadow */}
      <div className="absolute bottom-1 w-12 h-3.5 bg-black/25 rounded-full blur-xs pointer-events-none" />

      {/* Living Character Figure */}
      <div
        onClick={() => onClick(type)}
        className={`relative flex flex-col items-center pointer-events-auto cursor-pointer ${
          type === 'SPARK' ? 'animate-float' : 'animate-sway'
        }`}
      >
        {/* Spark Ion Thruster Glow */}
        {type === 'SPARK' && (
          <div className="absolute -bottom-2 w-4 h-4 bg-[#00E5FF] rounded-full blur-xs animate-ping" />
        )}

        {/* Character Avatar Container with 3D Image */}
        <div
          className="relative w-14 h-14 rounded-2xl bg-white border-2 shadow-lg flex items-center justify-center overflow-hidden transform group-hover:scale-115 transition-transform"
          style={{ borderColor: profile.color }}
        >
          {profile.image ? (
            <img
              src={profile.image}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                // fallback if image loading fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          ) : null}
          <div
            className="w-full h-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${profile.color}15` }}
          >
            {profile.avatarEmoji}
          </div>
          <span className="absolute bottom-0.5 right-0.5 text-xs drop-shadow bg-white/80 rounded-full px-1">
            {profile.avatarEmoji}
          </span>
        </div>

        {/* SPARK MISSION ALERT (Pulsing glowing speech bubble) */}
        {type === 'SPARK' && hasMissionAlert && (
          <div className="absolute -top-7 bg-linear-to-r from-[#FF1744] via-[#FF5252] to-[#D50000] text-white text-[9px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-[0_0_12px_#FF1744] flex items-center gap-1 animate-bounce whitespace-nowrap">
            <Zap className="w-3 h-3 text-[#FFEA00] fill-[#FFEA00]" />
            <span>{isArabic ? 'مهمة جديدة من المعلم!' : 'New Mission!'}</span>
          </div>
        )}

        {/* Normal Character Greeting Bubble on Hover */}
        {(!hasMissionAlert || type !== 'SPARK') && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-6 bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/30 shadow-sm flex items-center gap-1 whitespace-nowrap pointer-events-none">
            <MessageCircle className="w-2.5 h-2.5 text-[#81C784]" />
            <span>{isArabic ? profile.nameAr : profile.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

