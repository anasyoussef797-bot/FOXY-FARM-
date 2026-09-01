import React from 'react';
import { Animal, UserStats, CropType } from '../types';
import { CROPS_DATA } from '../data/initialData';
import { Heart, Sparkles, Utensils, Award, Clock, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnimalsViewProps {
  animals: Animal[];
  userStats: UserStats;
  onFeedAnimal: (animalId: string) => void;
  onCollectProduct: (animalId: string) => void;
}

export const AnimalsView: React.FC<AnimalsViewProps> = ({
  animals,
  userStats,
  onFeedAnimal,
  onCollectProduct,
}) => {
  const handleCollectWithConfetti = (animalId: string) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#3b82f6', '#ec4899', '#22c55e'],
    });
    onCollectProduct(animalId);
  };

  return (
    <div id="animals-sanctuary-hub" className="space-y-6">
      {/* Sanctuary Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-900/60 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              Eco-Sanctuary & Animal Welfare
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1.5">Egyptian Farm Animals & Pollinators</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Feed your animals crops harvested from your fields to keep them happy, generate organic produce, and collect bio-fertilizer!
          </p>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 flex items-center gap-3">
          <span className="text-2xl">🍯</span>
          <div>
            <div className="text-xs text-slate-400">Total Animal Goods</div>
            <div className="text-sm font-bold text-white">
              {Object.values(userStats.harvestInventory).reduce((a, b) => a + b, 0)} Items Collected
            </div>
          </div>
        </div>
      </div>

      {/* Animal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {animals.map((animal) => {
          const favoriteCrop = CROPS_DATA[animal.favoriteFood];
          const hasFavoriteCropInInventory = (userStats.harvestInventory[animal.favoriteFood] || 0) > 0;

          return (
            <div
              key={animal.id}
              id={`animal-card-${animal.id}`}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-md">
                    {animal.species === 'Baladi Chicken' ? '🐔' : animal.species === 'Dairy Cow' ? '🐄' : animal.species === 'Nubian Goat' ? '🐐' : '🐝'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{animal.name}</h3>
                    <span className="text-xs text-emerald-400 font-semibold">{animal.species} • Lvl {animal.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded-xl text-xs font-bold text-rose-300">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  {animal.happiness}% Happy
                </div>
              </div>

              {/* Animal Bio Fact */}
              <div className="my-3.5 bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{animal.fact}</p>
              </div>

              {/* Status Bars */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Utensils className="w-3 h-3 text-amber-400" />
                    Hunger / Nourishment
                  </span>
                  <span className="font-bold text-white">{animal.hunger}% Full</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${animal.hunger}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
                <button
                  id={`btn-feed-animal-${animal.id}`}
                  onClick={() => onFeedAnimal(animal.id)}
                  disabled={!hasFavoriteCropInInventory || animal.hunger >= 100}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    animal.hunger >= 100
                      ? 'bg-slate-800 text-slate-500 cursor-default'
                      : hasFavoriteCropInInventory
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  Feed {favoriteCrop.name.split(' ')[0]} ({userStats.harvestInventory[animal.favoriteFood] || 0} in stock)
                </button>

                <button
                  id={`btn-collect-animal-${animal.id}`}
                  onClick={() => handleCollectWithConfetti(animal.id)}
                  disabled={!animal.isProductReady}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    animal.isProductReady
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/20 animate-pulse active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {animal.isProductReady ? `Collect ${animal.productEmoji} ${animal.productName}` : `Producing ${animal.productEmoji}...`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
