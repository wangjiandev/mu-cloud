'use client';

import { Edit, Trash } from 'lucide-react';
import { NoItemsFound } from '@/components/no-items-found';
import { Button } from '@/components/ui/button';
import { alert } from '@/lib/use-global-store';
import { useServingUnitStore } from '../_lib/use-serving-store';
import { useServingUnitDelete } from '../_service/use-serving-mutations';
import { useServingUnits } from '../_service/use-serving-queries';
import { ServingUnitCardsSkeleton } from './ServingUnitCardsSkeleton';

const ServingUnitCard = () => {
  const servingUnits = useServingUnits();
  const deleteServingUnitMutation = useServingUnitDelete();

  const { updateSelectedServingUnitId, updateServingUnitDialogOpen } =
    useServingUnitStore();

  if (servingUnits.isLoading) return <ServingUnitCardsSkeleton />;
  if (servingUnits.data?.length === 0) {
    return (
      <NoItemsFound
        onClick={() => {
          updateSelectedServingUnitId(null);
          updateServingUnitDialogOpen(true);
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {servingUnits.data?.map((servingUnit) => (
        <div
          className="flex flex-col justify-between gap-3 bg-accent p-6"
          key={servingUnit.id}
        >
          <p className="truncate">{servingUnit.name}</p>
          <div className="flex gap-1">
            <Button
              onClick={() => {
                updateSelectedServingUnitId(servingUnit.id);
                updateServingUnitDialogOpen(true);
              }}
              size="icon"
              variant="ghost"
            >
              <Edit className="size-4" />
            </Button>
            <Button
              onClick={() => {
                alert({
                  title: 'Delete Serving Unit',
                  description: `Are you sure you want to delete ${servingUnit.name}?`,
                  confirmLabel: 'Delete',
                  onConfirm: () =>
                    deleteServingUnitMutation.mutate(servingUnit.id),
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

export default ServingUnitCard;
