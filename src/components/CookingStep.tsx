import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri';

import { updateCookingSteps, deleteCookingStep } from '@/redux/recipe.slice';

interface CookingStepsTextareaProps {
  idx: number;
}

const CookingStepsTextarea: React.FC<CookingStepsTextareaProps> = ({idx }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const isFocusedRef = useRef<boolean>(false);
  const forceUpdate = useForceUpdate();

  const cookingSteps = useSelector((state: RootState) => state.recipe.cookingSteps);

  const handleChange = () => {
    console.log(textareaRef.current?.value);
    if (textareaRef.current?.value.trim() !== '') {
      const updatedCookingSteps = [...cookingSteps];
      console.log(updatedCookingSteps, idx)
      updatedCookingSteps[idx] = textareaRef.current!.value;
      dispatch(updateCookingSteps(updatedCookingSteps));
    }
  };

  const handleBlur = () => {
    isFocusedRef.current = false;
    forceUpdate();
    if (textareaRef.current?.value.trim() !== '') {
      const updatedCookingSteps = [...cookingSteps];
      updatedCookingSteps[idx] = textareaRef.current!.value;
      dispatch(updateCookingSteps(updatedCookingSteps));
      textareaRef.current!.value = '';
    }
  };

  const handleDelete = () => {
    dispatch(deleteCookingStep(idx));
  };

  function useForceUpdate() {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return forceUpdate;
  }

  const handleEdit = () => {
    isFocusedRef.current = true;
    forceUpdate();
  };

  return (
    <div className="flex flex-col items-center">
      {isFocusedRef.current ? (
        <textarea
          ref={textareaRef}
          value={cookingSteps[idx] === null ? '' : String(cookingSteps[idx])}
          rows={4}
          cols={40}
          placeholder="Enter cooking steps..."
          className="mb-2"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <div className='flex justify-center items-center'>
          {cookingSteps[idx]}
          <RiEditLine className="ml-1 text-gray-500 cursor-pointer" onClick={handleEdit} />
          <RiDeleteBinLine className="ml-1 text-gray-500 cursor-pointer" onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}

export default CookingStepsTextarea;
