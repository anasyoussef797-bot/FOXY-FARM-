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
    <div
      className="fixed inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 999999 }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute flex flex-col items-center animate-fly-up select-none pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 999999,
          }}
        >
          <div className="bg-linear-to-r from-[#FFF59D] via-[#FDD835] to-[#FBC02D] text-amber-950 font-black text-xs px-3.5 py-1.5 rounded-2xl border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex items-center gap-1.5 backdrop-blur-xs whitespace-nowrap">
            {p.icon && <span className="text-base drop-shadow-xs">{p.icon}</span>}
            <span className="tracking-wide font-black">{p.text}</span>
          </div>
          {p.subText && (
            <div className="text-[10px] font-black text-[#00E676] bg-slate-950/95 px-2.5 py-0.5 rounded-full border border-emerald-400/50 mt-1 shadow-md whitespace-nowrap">
              {p.subText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
