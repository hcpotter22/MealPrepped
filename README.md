# MealPrepped

MealPrepped is an AI powered web app that helps busy professionals and students quickly plan meals for the week by generating complete recipes and a ready to send grocery list in one flow.

The goal is to remove the repetitive and time consuming process of searching for recipes, scaling servings, and manually creating grocery lists every week.

---

## What MealPrepped Does

MealPrepped uses AI to generate a full meal prep recipe and a consolidated grocery list from just a few inputs.

Users can:
- Choose a cuisine or let the app surprise them with a random option.
- Select whether the meal is for breakfast, lunch, or dinner.
- Set the number of servings.
- Optionally list ingredients they already have at home so the recipe uses them when possible.
- Instantly receive a full recipe plus an email ready grocery list.

The app is designed to feel premium, calm, and food focused, similar to a modern iOS recipe app, while remaining fully web based.

---

## Target Users

MealPrepped is built for:
- Busy professionals who want to save time during weekly meal prep.
- Students managing tight schedules and budgets.
- Health conscious users who want structured, repeatable meal planning.

---

## Key Features

### AI Recipe Generation
- Generates a complete recipe including title, cuisine, servings, prep time, cook time, difficulty, estimated calories, ingredients, and step by step instructions.
- Recipes are realistic for meal prep and scale automatically based on servings.

### Smart Grocery List
- Automatically creates a consolidated grocery list from the recipe.
- Groups items by aisle category such as Produce, Protein, Dairy, Pantry, and Spices.
- Supports checking off items and copying or emailing the list.

### Use What You Already Have
- Users can enter ingredients already in their pantry.
- The AI incorporates relevant ingredients into the recipe and removes them from the grocery list when possible.

### Email Ready Output
- Generates a clean subject line and plain text grocery list body.
- One click email integration using a mailto link.
- Copy to clipboard support.

### Save and Browse
- Generated recipes and grocery lists can be saved locally.
- A browse view allows users to revisit saved meals without regenerating them.

---

## User Flow

1. User opens the app and lands on a brand focused intro screen.
2. User enters cuisine, meal time, and number of servings, or taps Random.
3. Optional pantry ingredients are added.
4. User clicks Generate.
5. The app displays the recipe and grocery list.
6. User can refine, save, email, or regenerate.

---

## AI Capabilities

MealPrepped relies on an LLM to:
- Generate structured recipe data.
- Consolidate and categorize grocery items.
- Adapt recipes based on user supplied pantry ingredients.
- Handle follow up refinements such as dietary changes or ingredient exclusions.

All AI responses are requested in structured JSON to ensure reliable rendering in the UI.

---

## Tech Stack

- HTML, CSS, and JavaScript
- Single page application architecture
- LocalStorage for saved recipes
- LLM integration configurable via API key
- No backend required

The app is intentionally lightweight and easy to deploy.

---

## Design Philosophy

MealPrepped emphasizes:
- Clean white space with deep black surfaces
- Muted olive green accents
- Rounded cards and circular imagery
- Editorial typography with serif headlines and sans serif body text
- Calm, premium, intentional layouts

---

## How to Run Locally

1. Clone the repository.
2. Open the main HTML file in a browser.
3. Add your AI API key in the configuration section.
4. Start generating meals.

No build step or server is required.

---

## Safety Notes

- Ingredient quantities and cooking times are estimates.
- Users should always verify allergies and food safety practices.
- MealPrepped does not provide medical or nutritional advice.

---

## Success Criteria

A user can generate a complete recipe and an email ready grocery list using three inputs and a single click.

---

## Roadmap Ideas

Potential future enhancements include:
- Nutrition preferences and macros
- Weekly meal planning across multiple meals
- Export to notes or task apps
- Account based syncing across devices

---

## License

This project is intended as a learning and productivity tool. Add your preferred license before publishing publicly.
