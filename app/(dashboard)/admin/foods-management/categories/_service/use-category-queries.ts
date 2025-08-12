import { useQuery } from '@tanstack/react-query';
import { useCategoryStore } from '../_lib/use-category-store';
import { getCategories, getCategoryById } from './categoryQueries';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};

export const useCategory = () => {
  const { selectedCategoryId } = useCategoryStore();
  return useQuery({
    queryKey: ['category', { selectedCategoryId }],
    queryFn: () => getCategoryById(selectedCategoryId!),
    enabled: !!selectedCategoryId,
  });
};
