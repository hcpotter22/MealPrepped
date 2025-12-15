import React, { useState } from 'react';
import { Wand2, Dices, ChevronRight, Minus, Plus } from 'lucide-react';
import { Button, Input, TextArea, Header } from '../components/SharedComponents';
import { GenerateParams } from '../types';

interface GenerateViewProps {
  onGenerate: (params: GenerateParams) => void;
  isGenerating: boolean;
}

const CUISINES = ["Italian", "Mexican", "Thai", "Mediterranean", "Japanese", "Indian", "American", "French"];

export const GenerateView = ({ onGenerate, isGenerating }: GenerateViewProps) => {
  const [cuisine, setCuisine] = useState("");
  const [mealTime, setMealTime] = useState("Dinner");
  const [servings, setServings] = useState(2);
  const [pantryItems, setPantryItems] = useState("");

  const handleRandomCuisine = () => {
    const random = CUISINES[Math.floor(Math.random() * CUISINES.length)];
    setCuisine(random);
  };

  const handleSubmit = () => {
    if (!cuisine) return;
    onGenerate({ cuisine, mealTime, servings, pantryItems });
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <Header title="New Recipe" subtitle="Let AI plan your meal" />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {/* Cuisine */}
        <section className="space-y-4">
          <label className="text-sm font-bold text-stone-900 uppercase tracking-wide">Cuisine</label>
          <div className="flex gap-2">
            <Input 
              value={cuisine} 
              onChange={(e) => setCuisine(e.target.value)} 
              placeholder="e.g. Spicy Thai Curry"
              className="flex-1"
            />
            <button 
              onClick={handleRandomCuisine}
              className="px-4 bg-stone-200 rounded-2xl hover:bg-stone-300 active:scale-95 transition-all"
              title="Surprise me"
            >
              <Dices className="w-6 h-6 text-stone-700" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CUISINES.slice(0, 5).map(c => (
              <button 
                key={c}
                onClick={() => setCuisine(c)}
                className="px-3 py-1.5 rounded-full bg-white border border-stone-200 text-sm text-stone-600 whitespace-nowrap hover:border-olive-500 hover:text-olive-700"
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Meal Time & Servings */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-bold text-stone-900 uppercase tracking-wide">Meal Time</label>
            <div className="grid grid-cols-3 gap-2 bg-stone-200/50 p-1.5 rounded-2xl">
              {["Breakfast", "Lunch", "Dinner"].map((time) => (
                <button
                  key={time}
                  onClick={() => setMealTime(time)}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${
                    mealTime === time 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-500 hover:text-stone-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-stone-900 uppercase tracking-wide">Servings</label>
            <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-stone-200">
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-stone-100 text-stone-600"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold text-stone-900 w-12 text-center">{servings}</span>
              <button 
                 onClick={() => setServings(servings + 1)}
                 className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-stone-100 text-stone-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Pantry Items */}
        <section className="space-y-4">
          <label className="text-sm font-bold text-stone-900 uppercase tracking-wide flex justify-between">
            <span>Use My Ingredients (Optional)</span>
          </label>
          <TextArea 
            value={pantryItems} 
            onChange={(e) => setPantryItems(e.target.value)}
            placeholder="List ingredients you have, one per line...&#10;e.g.&#10;Chicken breast&#10;Rice&#10;Onions"
          />
          <p className="text-xs text-stone-500">
            We'll try to use 2-5 of these items to reduce your shopping list.
          </p>
        </section>

        {/* Generate Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!cuisine || isGenerating}
            className="w-full py-4 text-lg shadow-xl shadow-olive-600/30"
            icon={Wand2}
          >
            {isGenerating ? "Creating Magic..." : "Generate Recipe"}
          </Button>
        </div>
      </div>
    </div>
  );
};