import React from 'react';

export interface RewardParticle {
  id: string;
  x: number;
  y: number;
  text: string;
  subText?: string;
  icon?: string;
}

interface FloatingRewardParticlesProps {
  particles: RewardParticle[];
}

export const FloatingRewardParticles: React.FC<FloatingRewardParticlesProps> = ({ particles }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute flex flex-col items-center animate-fly-up select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-linear-to-r from-[#FDD835] via-[#FFF59D] to-[#FBC02D] text-amber-950 font-black text-xs px-2.5 py-1 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center gap-1">
            {p.icon && <span className="text-sm">{p.icon}</span>}
            <span>{p.text}</span>
          </div>
          {p.subText && (
            <div className="text-[10px] font-black text-[#00E676] bg-slate-900/80 px-2 py-0.2 rounded-full border border-white/30 mt-0.5 shadow-xs">
              {p.subText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
