export interface Ingredient {
  item: string;
  quantity: string;
  notes?: string;
  from_pantry: boolean;
}

export interface Recipe {
  title: string;
  cuisine: string;
  meal_time: string;
  servings: number;
  prep_time_min: number;
  cook_time_min: number;
  total_time_min: number;
  difficulty: "Easy" | "Medium" | "Hard";
  calories_per_serving_est: number;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  tips: string[];
}

export interface GroceryItem {
  item: string;
  quantity: string;
  notes?: string;
  needed: boolean;
  checked?: boolean; // UI state
}

export interface GroceryCategory {
  category: string;
  items: GroceryItem[];
}

export interface AppData {
  recipe: Recipe;
  grocery_list: GroceryCategory[];
  used_home_ingredients: string[];
  assumptions: string[];
}

export interface SavedRecipe extends AppData {
  id: string;
  savedAt: number;
}

export enum ViewState {
  INTRO = 'INTRO',
  HOME = 'HOME',
  GENERATE = 'GENERATE',
  BROWSE = 'BROWSE',
  SAVED = 'SAVED',
  RECIPE_DETAIL = 'RECIPE_DETAIL',
}

export interface GenerateParams {
  cuisine: string;
  mealTime: string;
  servings: number;
  pantryItems: string;
}