import React, { useState, useEffect } from 'react';
import { Home, PlusCircle, BookHeart } from 'lucide-react';
import { ViewState, AppData, GenerateParams, SavedRecipe } from './types';
import { generateRecipe, refineRecipe } from './services/geminiService';
import * as storage from './services/storageService';

// Views
import { IntroView } from './views/IntroView';
import { HomeView } from './views/HomeView';
import { GenerateView } from './views/GenerateView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { BrowseView } from './views/BrowseView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.INTRO);
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  const [currentRecipe, setCurrentRecipe] = useState<AppData | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);

  // Load initial state
  useEffect(() => {
    const saved = storage.getSavedRecipes();
    setSavedRecipes(saved);
    
    const key = storage.getApiKey();
    if (key) setApiKey(key);

    // Skip intro if we have used the app before
    if (saved.length > 0 || key) {
       setView(ViewState.HOME);
    }
  }, []);

  const handleStart = () => {
    setView(ViewState.HOME);
  };

  const handleSaveKey = (key: string) => {
    storage.saveApiKey(key);
    setApiKey(key);
  };

  const handleGenerate = async (params: GenerateParams) => {
    if (!apiKey) {
      alert("Please configure your API Key in Settings first.");
      setView(ViewState.SETTINGS);
      return;
    }

    setIsGenerating(true);
    try {
      const data = await generateRecipe(apiKey, params.cuisine, params.mealTime, params.servings, params.pantryItems);
      setCurrentRecipe(data);
      setView(ViewState.RECIPE_DETAIL);
    } catch (e) {
      alert("Failed to generate recipe. Check your API Key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!currentRecipe || !apiKey) {
      if (!apiKey) setView(ViewState.SETTINGS);
      return;
    }
    setIsRefining(true);
    try {
      const newData = await refineRecipe(apiKey, currentRecipe, instruction);
      setCurrentRecipe(newData);
    } catch (e) {
      alert("Failed to refine. Try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleSaveRecipe = (data: AppData) => {
    storage.saveRecipe(data);
    setSavedRecipes(storage.getSavedRecipes());
  };

  const handleDeleteRecipe = (id: string) => {
    storage.deleteRecipe(id);
    setSavedRecipes(storage.getSavedRecipes());
  };

  const handleSelectSaved = (recipe: SavedRecipe) => {
    setCurrentRecipe(recipe);
    setView(ViewState.RECIPE_DETAIL);
  };

  // Views Rendering
  if (view === ViewState.INTRO) {
    return (
      <IntroView onStart={handleStart} />
    );
  }

  return (
    <div className="h-full flex flex-col max-w-md mx-auto bg-stone-50 shadow-2xl relative overflow-hidden md:max-w-md md:border-x md:border-stone-200">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {view === ViewState.HOME && <HomeView onNavigate={setView} recentRecipes={savedRecipes.slice(0,3)} />}
        {view === ViewState.GENERATE && <GenerateView onGenerate={handleGenerate} isGenerating={isGenerating} />}
        {view === ViewState.BROWSE && <BrowseView savedRecipes={savedRecipes} onSelect={handleSelectSaved} onDelete={handleDeleteRecipe} />}
        {view === ViewState.SAVED && <BrowseView savedRecipes={savedRecipes} onSelect={handleSelectSaved} onDelete={handleDeleteRecipe} />}
        {view === ViewState.SETTINGS && <SettingsView onBack={() => setView(ViewState.HOME)} onSave={handleSaveKey} />}
        {view === ViewState.RECIPE_DETAIL && currentRecipe && (
          <RecipeDetailView 
            data={currentRecipe} 
            onBack={() => setView(ViewState.HOME)}
            onSave={handleSaveRecipe}
            onRefine={handleRefine}
            isRefining={isRefining}
          />
        )}
      </div>

      {/* Bottom Navigation (Hidden for Details and Settings) */}
      {view !== ViewState.RECIPE_DETAIL && view !== ViewState.SETTINGS && (
        <div className="bg-white/90 backdrop-blur-lg border-t border-stone-100 flex justify-around items-center h-20 px-6 pb-2 absolute bottom-0 w-full z-50">
          <NavButton 
            active={view === ViewState.HOME} 
            onClick={() => setView(ViewState.HOME)} 
            icon={Home} 
            label="Home" 
          />
          <NavButton 
            active={view === ViewState.GENERATE} 
            onClick={() => setView(ViewState.GENERATE)} 
            icon={PlusCircle} 
            label="Create" 
          />
          <NavButton 
            active={view === ViewState.SAVED} 
            onClick={() => setView(ViewState.SAVED)} 
            icon={BookHeart} 
            label="Saved" 
          />
        </div>
      )}
    </div>
  );
}

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-16 transition-all ${
      active ? 'text-olive-600 scale-105' : 'text-stone-400 hover:text-stone-600'
    }`}
  >
    <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
  </button>
);