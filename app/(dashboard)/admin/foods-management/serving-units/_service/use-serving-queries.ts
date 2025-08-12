import { useQuery } from '@tanstack/react-query';
import { useServingUnitStore } from '../_lib/use-serving-store';
import { getServingUnitById, getServingUnits } from './ServingQueries';

export const useServingUnits = () => {
  return useQuery({
    queryKey: ['serving-units'],
    queryFn: getServingUnits,
  });
};

export const useServingUnit = () => {
  const { selectedServingUnitId } = useServingUnitStore();
  return useQuery({
    queryKey: ['serving-unit', { selectedServingUnitId }],
    queryFn: () => getServingUnitById(selectedServingUnitId!),
    enabled: !!selectedServingUnitId,
  });
};
