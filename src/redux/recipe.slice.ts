import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ingredient {
  id: number,
  name: string,
  used: boolean,
  focused: boolean,
  dumped: boolean,
  amount: number,
  unit: 'kg' | 'sdm' | 'sdt'
}

export interface RecipeState {
  cookingSteps: (string | number | null)[];
  ingredients: Ingredient[];
}

const initialState: RecipeState = {
  cookingSteps: [],
  ingredients: [
    {
      id: 1,
      name: 'tepung terigu',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 2,
      name: 'telur ayam',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 3,
      name: 'garam',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'sdt'
    },
    {
      id: 4,
      name: 'minyak goreng',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'sdm'
    },
    {
      id: 5,
      name: 'kecap manis',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'sdm'
    },
    {
      id: 6,
      name: 'bawang merah',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 7,
      name: 'kentang',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 8,
      name: 'jagung',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 9,
      name: 'gula pasir',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    },
    {
      id: 10,
      name: 'cabe merah',
      used: false,
      focused: true,
      dumped: false,
      amount: 1,
      unit: 'kg'
    }
  ]
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    toggleUsed(state, action: PayloadAction<number>) {
      const ingredient = state.ingredients.find(item => item.id === action.payload);
      if (ingredient) {
        ingredient.used = true;
        state.cookingSteps = [...state.cookingSteps, ingredient.id];
      }
    },
    editAmount(state, action: PayloadAction<{ id: number; newAmount: number }>) {
      const { id, newAmount } = action.payload;
      const ingredient = state.ingredients.find(item => item.id === id);
      if (ingredient) {
        ingredient.amount = newAmount;
      }
    },
    setFocusedIngredient(state, action: PayloadAction<{ id: number; focused: boolean }>) {
      const { id, focused } = action.payload;
      const ingredient = state.ingredients.find(item => item.id === id);
      if (ingredient) {
        ingredient.focused = focused;
      }
    },
    markIngredientAsDumped(state, action: PayloadAction<number>) {
      const ingredient = state.ingredients.find(item => item.id === action.payload);
      if (ingredient) {
        ingredient.dumped = true;
      }
      const updatedCookingSteps = state.cookingSteps.filter(step => step !== action.payload);
      console.log(action.payload, updatedCookingSteps);
      state.cookingSteps = updatedCookingSteps;
    },
    addCookingStep(state, action: PayloadAction<string>) {
      state.cookingSteps.push(action.payload);
    },
    updateCookingSteps(state, action: PayloadAction<(string | number | null)[]>) {
      state.cookingSteps = action.payload;
    },
    deleteCookingStep(state, action: PayloadAction<number>) {
      state.cookingSteps.splice(action.payload, 1);
    },
  },
});

export const {
  toggleUsed,
  editAmount,
  setFocusedIngredient,
  markIngredientAsDumped,
  updateCookingSteps,
  addCookingStep,
  deleteCookingStep
} = recipeSlice.actions;

export default recipeSlice.reducer;