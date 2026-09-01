import React, { useState } from 'react';
import { CHARACTERS_DATA } from '../data/initialData';
import { CharacterProfile } from '../types';
import { Sparkles, X, Users, BookOpen, Layers, Award } from 'lucide-react';

interface CharactersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTutor?: (characterName: string) => void;
}

export const CharactersModal: React.FC<CharactersModalProps> = ({
  isOpen,
  onClose,
  onSelectTutor,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile>(CHARACTERS_DATA[0]);
  const [viewMode, setViewMode] = useState<'profile' | 'poses' | 'group'>('profile');

  if (!isOpen) return null;

  return (
    <div id="characters-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Foxy Farm Character Squad
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
                  Impact Hub Egypt
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Meet your educational mentors, botanists, engineers, and AI companions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700 hidden sm:flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setViewMode('profile')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'profile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Profiles
              </button>
              <button
                onClick={() => setViewMode('poses')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'poses' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Pose Sheets
              </button>
              <button
                onClick={() => setViewMode('group')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  viewMode === 'group' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Farm Poster
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {viewMode === 'group' ? (
            <div className="space-y-4 text-center">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 max-h-[500px] flex items-center justify-center">
                <img
                  src="/images/foxy_farm_characters_group_1787682518054.jpg"
                  alt="Foxy Farm Characters Group"
                  className="w-full h-auto max-h-[480px] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-slate-300">
                🌱 Together for a greener Egypt: Foxy, Talia, Adam, and Spark empowering students through agricultural STEM!
              </p>
            </div>
          ) : viewMode === 'poses' ? (
            <div className="space-y-4">
              {/* Pose Character Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {CHARACTERS_DATA.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCharacter(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                      selectedCharacter.id === c.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 flex flex-col items-center justify-center p-3">
                <img
                  src={selectedCharacter.sheetUrl}
                  alt={`${selectedCharacter.name} Posheet`}
                  className="w-full max-h-[450px] object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-3 text-xs text-slate-400">
                  Pose Sheet & Expressions for <strong>{selectedCharacter.name}</strong> ({selectedCharacter.role})
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Character Selector List */}
              <div className="md:col-span-4 space-y-3">
                {CHARACTERS_DATA.map((c) => {
                  const isSelected = selectedCharacter.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCharacter(c)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                          : 'bg-slate-850 bg-slate-900/60 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                        <img
                          src={c.avatarUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{c.name}</div>
                        <div className="text-xs text-amber-400/90 font-medium line-clamp-1">{c.role}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Character Detail Card */}
              <div className="md:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl shrink-0 bg-slate-800">
                    <img
                      src={selectedCharacter.avatarUrl}
                      alt={selectedCharacter.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/60">
                      {selectedCharacter.role}
                    </span>
                    <h4 className="text-2xl font-bold text-white">{selectedCharacter.name}</h4>
                    <p className="text-xs font-semibold text-emerald-400">
                      Specialty: {selectedCharacter.specialty}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {selectedCharacter.bio}
                    </p>
                  </div>
                </div>

                {/* Character Greeting Quote */}
                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-xs sm:text-sm text-amber-200 italic flex items-start gap-2.5">
                  <span className="text-lg">💬</span>
                  <p>"{selectedCharacter.greeting}"</p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  {onSelectTutor && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTutor(selectedCharacter.name);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <Sparkles className="w-4 h-4" />
                      Chat with {selectedCharacter.name}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
