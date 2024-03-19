import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import {
  addCookingStep
} from '@/redux/recipe.slice';
import Ingredient from './Ingredient';
import CookingStep from './CookingStep';

const CenterContent: React.FC = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector((state: RootState) => state.recipe.ingredients);
  const cookingSteps = useSelector((state: RootState) => state.recipe.cookingSteps);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if(e.target.value.trim() === '') return;
    dispatch(addCookingStep(e.target.value));
    e.target.value = '';
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.currentTarget.value.trim() === '') return;
    if (e.key === 'Enter') {
      dispatch(addCookingStep(e.currentTarget.value));
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 bg-gray-300">
      <h2 className="text-lg font-bold mb-10">Resep Masakan</h2>
      <ol className='list-decimal'>
        {cookingSteps.map((step: string | number | null, index: number) => (
          <li key={index} className='mb-3'>
            {step === null ? (
              <span>No step provided</span>
            ) : typeof step === 'string' ? (
              <CookingStep idx={index} />
            ) : (
              <Ingredient
                ingredient={ingredients.find(ingredient => ingredient.id === step)}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="flex flex-col items-center absolute bottom-20">
        <h2 className="text-lg font-bold mb-2">Tata Cara Memasak</h2>
        <textarea
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={5}
          cols={50}
          placeholder="Masukkan tata cara memasak..."
          className="mb-2"
        />
      </div>
    </div>
  );
}

export default CenterContent;
