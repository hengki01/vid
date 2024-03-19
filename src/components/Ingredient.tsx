import React from 'react';
import { useDispatch } from 'react-redux';
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri';

import { Ingredient, editAmount, setFocusedIngredient, updateCookingSteps, markIngredientAsDumped } from '@/redux/recipe.slice';

interface Props {
  ingredient: Ingredient | null | undefined;
}

const IngredientInput: React.FC<Props> = ({ ingredient }) => {
  const dispatch = useDispatch();

  if (!ingredient || ingredient.dumped) {
    return <></>;
  }

  const handleInputChange = (value: number) => {
    dispatch(editAmount({ id: ingredient.id, newAmount: value }));
  };

  const handleInputBlur = (value: number) => {
    dispatch(setFocusedIngredient({ id: ingredient.id, focused: false }));
    dispatch(editAmount({ id: ingredient.id, newAmount: value }));
  };

  const handleIngredientClick = (id: number) => {
    dispatch(setFocusedIngredient({ id, focused: true }));
  };

  const handleDeleteClick = (id: number) => {
    dispatch(markIngredientAsDumped(id));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleInputChange(parseInt(event.currentTarget.value));
      dispatch(setFocusedIngredient({ id: ingredient.id, focused: false }));
    }
  };


  return (
    <>
      {ingredient.focused ? (
        <>
        <input
          type="number"
          min='1'
          value={ingredient.amount}
          onChange={(e) => handleInputChange(parseInt(e.target.value))}
          onBlur={(e) => handleInputBlur(parseInt(e.target.value))}
          onKeyDown={handleKeyDown}
          autoFocus
          className='mr-3'
        />
        {ingredient.unit} {ingredient.name}
        </>
      ) : (
        <div className='flex justify-center items-center'>
          <span onClick={() => handleIngredientClick(ingredient.id)}>{ingredient.amount}</span>
          {ingredient.unit} {ingredient.name}
          <RiEditLine className="ml-1 text-gray-500 cursor-pointer" onClick={() => handleIngredientClick(ingredient.id)} />
          <RiDeleteBinLine className="ml-1 text-gray-500 cursor-pointer" onClick={() => handleDeleteClick(ingredient.id)} />
        </div>
      )}
    </>
  );
}

export default IngredientInput;
