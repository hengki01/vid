import { configureStore } from '@reduxjs/toolkit';

import recipeReducer, { RecipeState } from './recipe.slice';

export interface RootState {
  recipe: RecipeState;
}

export const store = configureStore({
  reducer: {
    recipe: recipeReducer
  },
});
