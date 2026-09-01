import React, { useState } from 'react';
import { CHARACTERS_DATA } from '../data/initialData';
import { CharacterProfile } from '../types';
import { Sparkles, X, Users, BookOpen, Layers, Award } from 'lucide-react';
import { playPopSound } from '../utils/audio';

interface CharactersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTutor?: (characterName: string) => void;
  lang: 'ar' | 'en';
}

export const CharactersModal: React.FC<CharactersModalProps> = ({
  isOpen,
  onClose,
  onSelectTutor,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile>(CHARACTERS_DATA[0]);
  const [viewMode, setViewMode] = useState<'profile' | 'poses' | 'group'>('profile');

  if (!isOpen) return null;

  return (
    <div
      id="characters-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl shadow-inner">
              🦊
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                {isAr ? 'فريق أبطال مزرعة فوكسي' : 'Foxy Farm Character Squad'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  Impact Hub Egypt
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'تعرف على مرشدي الزراعة الذكية، علماء التربة، مهندسي الطاقة الشمسية، والمساعد الذكي!'
                  : 'Meet your educational mentors, botanists, engineers, and AI companions.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 hidden sm:flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setViewMode('profile')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'profile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'الملفات الشخصية' : 'Profiles'}
              </button>
              <button
                onClick={() => setViewMode('poses')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'poses' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'رسومات الأوضاع' : 'Pose Sheets'}
              </button>
              <button
                onClick={() => setViewMode('group')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === 'group' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'صورة الفريق' : 'Farm Poster'}
              </button>
            </div>

            <button
              onClick={() => {
                playPopSound();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewMode === 'group' ? (
            <div className="space-y-4 text-center">
              <div className="rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950 max-h-[500px] flex items-center justify-center p-2">
                <img
                  src="/images/foxy_farm_characters_group_1787682518054.jpg"
                  alt="Foxy Farm Characters Group"
                  className="w-full h-auto max-h-[460px] object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-amber-200 font-medium">
                {isAr
                  ? '🌱 معاً من أجل مصر خضراء ومستدامة: فوكسي، تاليا، آدم، وسبارك لتمكين الطلاب عبر التعليم الزراعي التفاعلي!'
                  : '🌱 Together for a greener Egypt: Foxy, Talia, Adam, and Spark empowering students through agricultural STEM!'}
              </p>
            </div>
          ) : viewMode === 'poses' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {CHARACTERS_DATA.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      playPopSound();
                      setSelectedCharacter(char);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all border ${
                      selectedCharacter.id === char.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {isAr ? char.nameAr : char.name}
                  </button>
                ))}
              </div>

              <div className="rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 p-2 shadow-2xl">
                <img
                  src={selectedCharacter.sheetUrl}
                  alt={`${selectedCharacter.name} Sheet`}
                  className="w-full h-auto max-h-[460px] object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Character Selector Thumbnails (5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  {isAr ? 'أعضاء الفريق الزراعي' : 'Select Squad Member'}
                </h4>
                <div className="space-y-2.5">
                  {CHARACTERS_DATA.map((char) => {
                    const isSelected = selectedCharacter.id === char.id;
                    return (
                      <div
                        key={char.id}
                        onClick={() => {
                          playPopSound();
                          setSelectedCharacter(char);
                        }}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/10'
                            : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-600 shrink-0 bg-slate-950">
                          <img
                            src={char.avatarUrl}
                            alt={char.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-white truncate">
                              {isAr ? char.nameAr : char.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-amber-300 block truncate">
                            {isAr ? char.roleAr : char.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Character Feature Card (7 cols) */}
              <div className="md:col-span-7 bg-slate-950/80 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg bg-slate-900">
                    <img
                      src={selectedCharacter.avatarUrl}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {isAr ? selectedCharacter.nameAr : selectedCharacter.name}
                    </h3>
                    <div className="text-xs font-bold text-amber-300 mt-0.5">
                      {isAr ? selectedCharacter.roleAr : selectedCharacter.role}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                      {isAr ? selectedCharacter.specialtyAr : selectedCharacter.specialty}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs italic">
                  "{isAr ? selectedCharacter.greetingAr : selectedCharacter.greeting}"
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-300">
                    {isAr ? 'نبذة عن المرشد:' : 'Biography & Educational Background:'}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr ? selectedCharacter.bioAr : selectedCharacter.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
