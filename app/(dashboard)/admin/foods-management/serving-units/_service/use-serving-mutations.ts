import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ServingUnitSchema } from '../_types/ServingUnitSchema';
import {
  createServingUnit,
  deleteServingUnit,
  updateServingUnit,
} from './ServingMutations';

export const useServingUnitDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await deleteServingUnit(id);
    },
    onSuccess: () => {
      toast.success('Serving unit deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['serving-units'] });
    },
  });
};

export const useServingUnitCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await createServingUnit(data);
    },
    onSuccess: () => {
      toast.success('Serving unit created successfully');
      queryClient.invalidateQueries({ queryKey: ['serving-units'] });
    },
  });
};

export const useServingUnitUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await updateServingUnit(data);
    },
    onSuccess: () => {
      toast.success('Serving unit updated successfully');
      queryClient.invalidateQueries({ queryKey: ['serving-units'] });
    },
  });
};
