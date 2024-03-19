import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleUsed } from '@/redux/recipe.slice';

function RightSidebar() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state: RootState) => state.recipe.ingredients);

  const handleIngredientClick = (id: number) => {
    dispatch(toggleUsed(id));
  };

  const unusedIngredients = ingredients.filter(ingredient => !ingredient.used);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 mt-10">
      <h2 className="text-lg font-bold">Bahan Masakan</h2>
      <ul className="mt-4 list-disc cursor-pointer">
        {unusedIngredients.map(ingredient => (
          <li key={ingredient.id} onClick={() => handleIngredientClick(ingredient.id)} className="py-1">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightSidebar;
