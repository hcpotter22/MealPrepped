import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Flame, Clock, ChefHat, Check, MessageCircle, Copy, RefreshCw, Send } from 'lucide-react';
import { AppData, GroceryItem } from '../types';
import { Button } from '../components/SharedComponents';

interface RecipeDetailViewProps {
  data: AppData;
  onBack: () => void;
  onSave: (data: AppData) => void;
  onRefine: (instruction: string) => void;
  isSaving?: boolean;
  isRefining?: boolean;
}

export const RecipeDetailView = ({ data, onBack, onSave, onRefine, isSaving, isRefining }: RecipeDetailViewProps) => {
  const [activeTab, setActiveTab] = useState<'recipe' | 'grocery'>('recipe');
  const [groceryState, setGroceryState] = useState(data.grocery_list);
  const [refineInput, setRefineInput] = useState("");
  const [saved, setSaved] = useState(false);

  // Sync internal state if data prop updates (e.g. after refine)
  useEffect(() => {
    setGroceryState(data.grocery_list);
  }, [data]);

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const newState = [...groceryState];
    const item = newState[catIdx].items[itemIdx];
    item.checked = !item.checked;
    setGroceryState(newState);
  };

  const handleSave = () => {
    onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refineInput.trim()) {
      onRefine(refineInput);
      setRefineInput("");
    }
  };

  // Generate SMS Content
  const getSMSLink = () => {
    let body = `Grocery List for ${data.recipe.title}\n\n`;
    
    groceryState.forEach(cat => {
      // Include unchecked items
      const activeItems = cat.items.filter(i => !i.checked);
      if (activeItems.length > 0) {
        body += `[${cat.category}]\n`;
        activeItems.forEach(item => {
           body += `- ${item.quantity} ${item.item}\n`;
        });
        body += `\n`;
      }
    });
    
    body += `Sent from MealPrepped`;
    
    // Improved iOS compatibility check
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';
    
    return `sms:${separator}body=${encodeURIComponent(body)}`;
  };

  const copyToClipboard = () => {
    let body = `Grocery List for ${data.recipe.title}\n\n`;
    groceryState.forEach(cat => {
      body += `${cat.category}:\n`;
      cat.items.forEach(item => {
        body += `- ${item.quantity} ${item.item}\n`;
      });
      body += `\n`;
    });
    navigator.clipboard.writeText(body);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Custom Header with Image */}
      <div className="relative h-64 shrink-0">
        <img src="https://picsum.photos/seed/recipe/800/400" alt="Dish" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-stone-50/90" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-20">
          <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button onClick={handleSave} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30">
              {saved ? <Check className="w-6 h-6 text-green-400" /> : <Save className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h1 className="font-serif text-3xl font-bold text-stone-900 leading-tight mb-2 drop-shadow-sm">{data.recipe.title}</h1>
          <div className="flex gap-4 text-sm font-medium text-stone-700">
            <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-olive-600" /> {data.recipe.total_time_min} min</div>
            <div className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500" /> {data.recipe.calories_per_serving_est} kcal</div>
            <div className="flex items-center gap-1"><ChefHat className="w-4 h-4 text-stone-500" /> {data.recipe.difficulty}</div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="px-6 py-2 flex gap-4 border-b border-stone-200 bg-stone-50 sticky top-0 z-10">
        <button 
          onClick={() => setActiveTab('recipe')}
          className={`flex-1 py-3 text-center font-bold text-sm uppercase tracking-wide rounded-xl transition-all ${
            activeTab === 'recipe' ? 'bg-olive-600 text-white shadow-lg shadow-olive-600/20' : 'text-stone-500 hover:bg-stone-200'
          }`}
        >
          Recipe
        </button>
        <button 
          onClick={() => setActiveTab('grocery')}
          className={`flex-1 py-3 text-center font-bold text-sm uppercase tracking-wide rounded-xl transition-all ${
            activeTab === 'grocery' ? 'bg-olive-600 text-white shadow-lg shadow-olive-600/20' : 'text-stone-500 hover:bg-stone-200'
          }`}
        >
          Grocery List
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar">
        {activeTab === 'recipe' ? (
          <>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
              <p className="text-stone-600 italic leading-relaxed mb-6">"{data.recipe.description}"</p>
              
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-olive-500 rounded-full"></span>
                Ingredients
              </h3>
              <ul className="space-y-3 mb-8">
                {data.recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-800">
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${ing.from_pantry ? 'bg-orange-400' : 'bg-olive-400'}`} />
                    <span className="flex-1">
                      <span className="font-bold">{ing.quantity}</span> {ing.item}
                      {ing.from_pantry && <span className="ml-2 text-xs text-orange-600 font-medium bg-orange-100 px-2 py-0.5 rounded-full">Pantry</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                 <span className="w-8 h-1 bg-olive-500 rounded-full"></span>
                 Instructions
              </h3>
              <div className="space-y-6">
                {data.recipe.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-500 font-bold flex items-center justify-center text-sm border border-stone-200">
                      {i + 1}
                    </div>
                    <p className="text-stone-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-stone-100 p-4 rounded-2xl border border-stone-200">
               <h4 className="font-bold text-stone-700 text-sm uppercase mb-2">Chef's Safety Note</h4>
               <p className="text-xs text-stone-500">
                 Always verify ingredients for allergies. Ensure poultry and meats are cooked to safe internal temperatures. Cross-contamination can occur; wash hands and surfaces frequently.
               </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-2">
               <a 
                 href={getSMSLink()}
                 className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all"
               >
                 <MessageCircle className="w-4 h-4" /> Text Me
               </a>
               <button 
                 onClick={copyToClipboard}
                 className="px-4 bg-stone-200 text-stone-800 rounded-xl hover:bg-stone-300 transition-colors"
               >
                 <Copy className="w-5 h-5" />
               </button>
            </div>

            {groceryState.map((cat, catIdx) => (
              <div key={catIdx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                <div className="bg-stone-100/50 px-6 py-3 border-b border-stone-100">
                  <h3 className="font-bold text-stone-800 text-sm uppercase tracking-wide">{cat.category}</h3>
                </div>
                <div className="divide-y divide-stone-100">
                  {cat.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      className={`px-6 py-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-stone-50 ${
                        item.checked ? 'opacity-40' : 'opacity-100'
                      }`}
                    >
                      <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.checked ? 'bg-olive-600 border-olive-600' : 'border-stone-300'
                      }`}>
                        {item.checked && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium text-stone-900 ${item.checked ? 'line-through' : ''}`}>{item.item}</p>
                        <p className="text-sm text-stone-500">{item.quantity} {item.notes && `• ${item.notes}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refine Section */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 mt-8">
            <h4 className="font-bold text-stone-800 text-sm mb-3">Refine this result</h4>
            <form onSubmit={handleRefineSubmit} className="relative">
                <input 
                  type="text" 
                  value={refineInput}
                  onChange={(e) => setRefineInput(e.target.value)}
                  placeholder="e.g. Make it spicy, No nuts..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-olive-500 outline-none"
                />
                <button 
                  type="submit" 
                  disabled={isRefining || !refineInput}
                  className="absolute right-2 top-2 p-1.5 bg-olive-600 text-white rounded-lg hover:bg-olive-700 disabled:opacity-50"
                >
                  {isRefining ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};