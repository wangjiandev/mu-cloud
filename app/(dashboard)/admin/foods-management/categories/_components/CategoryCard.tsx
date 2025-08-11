'use client';

import { Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategoryDelete } from '../_service/use-category-mutations';
import { useCategoryQueries } from '../_service/use-category-queries';

const CategoryCard = () => {
  const categories = useCategoryQueries();
  const deleteCategory = useCategoryDelete();
  return (
    <div className="grid grid-cols-4 gap-2">
      {categories.data?.map((category) => (
        <div
          className="flex flex-col justify-between gap-3 bg-accent p-6"
          key={category.id}
        >
          <p className="truncate">{category.name}</p>
          <div className="flex gap-1">
            <Button
              onClick={() => deleteCategory.mutate(category.id)}
              size="icon"
              variant="ghost"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              onClick={() => deleteCategory.mutate(category.id)}
              size="icon"
              variant="ghost"
            >
              <Trash className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
