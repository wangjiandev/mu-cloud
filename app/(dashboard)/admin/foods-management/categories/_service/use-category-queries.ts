import { useQuery } from '@tanstack/react-query';
import { getCategories } from './categoryQueries';

export const useCategoryQueries = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
