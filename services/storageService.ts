import { SavedRecipe, AppData } from "../types";

const KEY_SAVED_RECIPES = "mealprepped_saved_recipes";

export const getSavedRecipes = (): SavedRecipe[] => {
  const raw = localStorage.getItem(KEY_SAVED_RECIPES);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveRecipe = (data: AppData): SavedRecipe => {
  const recipes = getSavedRecipes();
  const newSave: SavedRecipe = {
    ...data,
    id: Date.now().toString(),
    savedAt: Date.now(),
  };
  const updated = [newSave, ...recipes];
  localStorage.setItem(KEY_SAVED_RECIPES, JSON.stringify(updated));
  return newSave;
};

export const deleteRecipe = (id: string) => {
  const recipes = getSavedRecipes();
  const updated = recipes.filter((r) => r.id !== id);
  localStorage.setItem(KEY_SAVED_RECIPES, JSON.stringify(updated));
};