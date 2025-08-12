import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CategorySchema } from '../_types/categorySchema';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from './categoryMutations';

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      toast.success('Category deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await createCategory(data);
    },
    onSuccess: () => {
      toast.success('Category created successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await updateCategory(data);
    },
    onSuccess: () => {
      toast.success('Category updated successfully');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
