'use client';

import { Edit, Trash } from 'lucide-react';
import { NoItemsFound } from '@/components/no-items-found';
import { Button } from '@/components/ui/button';
import { alert } from '@/lib/use-global-store';
import { useCategoryStore } from '../_lib/use-category-store';
import { useCategoryDelete } from '../_service/use-category-mutations';
import { useCategories } from '../_service/use-category-queries';
import { CategoryCardsSkeleton } from './CategoryCardsSkeleton';

const CategoryCard = () => {
  const { updateSelectedCategoryId, updateCategoryDialogOpen } =
    useCategoryStore();

  const categories = useCategories();
  const deleteCategory = useCategoryDelete();

  if (categories.isLoading) return <CategoryCardsSkeleton />;
  if (categories.data?.length === 0)
    return (
      <NoItemsFound
        onClick={() => {
          updateSelectedCategoryId(null);
          updateCategoryDialogOpen(true);
        }}
      />
    );
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
              onClick={() => {
                updateSelectedCategoryId(category.id);
                updateCategoryDialogOpen(true);
              }}
              size="icon"
              variant="ghost"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              onClick={() => {
                alert({
                  title: 'Delete Category',
                  description: `Are you sure you want to delete ${category.name}?`,
                  confirmLabel: 'Delete',
                  onConfirm: () => deleteCategory.mutate(category.id),
                });
              }}
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
