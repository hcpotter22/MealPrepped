import React from 'react';
import { Trash2, ChevronRight, Clock, Flame } from 'lucide-react';
import { SavedRecipe } from '../types';
import { Header } from '../components/SharedComponents';

export const BrowseView = ({ 
  savedRecipes, 
  onSelect, 
  onDelete 
}: { 
  savedRecipes: SavedRecipe[]; 
  onSelect: (r: SavedRecipe) => void; 
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col h-full bg-stone-50">
      <Header title="Saved Recipes" subtitle="Your personal cookbook" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-24 no-scrollbar">
        {savedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400">
            <div className="w-16 h-16 bg-stone-200 rounded-full mb-4 flex items-center justify-center">
               <Clock className="w-8 h-8 text-stone-300" />
            </div>
            <p>No saved recipes yet.</p>
          </div>
        ) : (
          savedRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className="group bg-white rounded-3xl p-4 shadow-sm border border-stone-100 flex gap-4 transition-all active:scale-98"
            >
              <div 
                className="w-24 h-24 rounded-2xl bg-stone-200 bg-cover bg-center shrink-0 cursor-pointer"
                style={{ backgroundImage: `url(https://picsum.photos/seed/${recipe.id}/200/200)` }}
                onClick={() => onSelect(recipe)}
              />
              <div className="flex-1 flex flex-col justify-between">
                <div onClick={() => onSelect(recipe)} className="cursor-pointer">
                  <h3 className="font-serif font-bold text-stone-900 line-clamp-1">{recipe.recipe.title}</h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{recipe.recipe.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-3 text-xs font-medium text-stone-500">
                     <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.recipe.total_time_min}m</span>
                     <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {recipe.recipe.calories_per_serving_est}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(recipe.id); }}
                    className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};