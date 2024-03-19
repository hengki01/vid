import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const LeftSidebar: React.FC = () => {
  const ingredients = useSelector((state: RootState) => state.recipe.ingredients.filter(ingredient => ingredient.dumped));

  return (
    <div className="flex flex-col justify-center items-center mt-10 bg-gray-200">
      <h2 className="text-lg font-bold text-center">Bahan Masakan Tidak Terpakai</h2>
      <ul className='mt-4 list-disc'>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="py-1">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeftSidebar;
