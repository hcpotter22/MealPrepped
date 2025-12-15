import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AppData } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert chef and meal planner. 
Generate a recipe and grocery list based on the user's request. 
You strictly adhere to JSON output.
The user may provide a list of ingredients they already have ("pantry items").
If pantry items are provided, try to use at least 2-5 of them in the recipe to minimize waste.
Mark ingredients used from the pantry as "from_pantry": true in the recipe ingredient list.
In the grocery list, do NOT include items that are fully covered by the pantry items unless the quantity needed exceeds typical household stock.
Consolidate the grocery list intelligently (e.g., if multiple steps need garlic, list garlic once with total quantity).
Keep recipes realistic for a busy professional: simple but delicious, under 90 mins total unless specified.
Quantities should be human-readable (e.g., "1 cup", "2 cloves", "500g").
`;

const RECIPE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    recipe: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        cuisine: { type: Type.STRING },
        meal_time: { type: Type.STRING },
        servings: { type: Type.INTEGER },
        prep_time_min: { type: Type.INTEGER },
        cook_time_min: { type: Type.INTEGER },
        total_time_min: { type: Type.INTEGER },
        difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
        calories_per_serving_est: { type: Type.INTEGER },
        description: { type: Type.STRING },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              item: { type: Type.STRING },
              quantity: { type: Type.STRING },
              notes: { type: Type.STRING },
              from_pantry: { type: Type.BOOLEAN },
            },
            required: ["item", "quantity", "from_pantry"],
          },
        },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        tips: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["title", "cuisine", "ingredients", "steps"],
    },
    grocery_list: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                quantity: { type: Type.STRING },
                notes: { type: Type.STRING },
                needed: { type: Type.BOOLEAN },
              },
              required: ["item", "quantity", "needed"],
            },
          },
        },
        required: ["category", "items"],
      },
    },
    used_home_ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
    assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["recipe", "grocery_list"],
};

export const generateRecipe = async (
  cuisine: string,
  mealTime: string,
  servings: number,
  pantryItems: string
): Promise<AppData> => {
  // STRICTLY use the environment variable. 
  // Do NOT hardcode keys or accept them from UI inputs.
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Create a ${cuisine} recipe for ${mealTime}.
    Servings: ${servings}.
    ${pantryItems ? `I already have these ingredients at home: ${pantryItems}` : "I have no specific ingredients at home."}
    
    Return the result in the specified JSON structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RECIPE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AppData;
  } catch (error) {
    console.error("Generation error:", error);
    throw error;
  }
};

export const refineRecipe = async (
  currentData: AppData,
  instruction: string
): Promise<AppData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Here is the current recipe and grocery list JSON:
    ${JSON.stringify(currentData)}

    User request for refinement: "${instruction}"

    Please modify the recipe and grocery list according to the user's request.
    Keep the same JSON structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RECIPE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AppData;
  } catch (error) {
    console.error("Refinement error:", error);
    throw error;
  }
};