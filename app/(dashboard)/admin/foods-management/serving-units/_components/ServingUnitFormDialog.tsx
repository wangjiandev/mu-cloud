'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { ControlledInput } from '@/components/controlled-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useServingUnitStore } from '../_lib/use-serving-store';
import {
  useServingUnitCreate,
  useServingUnitUpdate,
} from '../_service/use-serving-mutations';
import { useServingUnit } from '../_service/use-serving-queries';
import {
  type ServingUnitSchema,
  servingUnitDefaultValues,
  servingUnitSchema,
} from '../_types/ServingUnitSchema';

type ServingUnitFormDialogProps = {
  smallTrigger?: boolean;
};
export const ServingUnitFormDialog = ({
  smallTrigger,
}: ServingUnitFormDialogProps) => {
  const form = useForm<ServingUnitSchema>({
    defaultValues: servingUnitDefaultValues,
    resolver: zodResolver(servingUnitSchema),
  });

  const {
    selectedServingUnitId,
    updateSelectedServingUnitId,
    servingUnitDialogOpen,
    updateServingUnitDialogOpen,
  } = useServingUnitStore();

  const servingUnitQuery = useServingUnit();
  const createServingUnitMutation = useServingUnitCreate();
  const updateServingUnitMutation = useServingUnitUpdate();

  const isPending =
    createServingUnitMutation.isPending || updateServingUnitMutation.isPending;

  useEffect(() => {
    if (!!selectedServingUnitId && servingUnitQuery.data) {
      form.reset(servingUnitQuery.data);
    }
  }, [servingUnitQuery.data, form, selectedServingUnitId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateServingUnitDialogOpen(open);

    if (!open) {
      updateSelectedServingUnitId(null);
      form.reset(servingUnitDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const onSubmit: SubmitHandler<ServingUnitSchema> = (data) => {
    if (data.action === 'create') {
      createServingUnitMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateServingUnitMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange} open={servingUnitDialogOpen}>
      <DialogTrigger asChild>
        {smallTrigger ? (
          <Button size="icon" type="button" variant="ghost">
            <Plus />
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2" />
            New Serving Unit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedServingUnitId
              ? 'Edit Serving Unit'
              : 'Create a New Serving Unit'}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <ControlledInput<ServingUnitSchema>
                  label="Name"
                  name="name"
                  placeholder="Enter serving unit name"
                />
              </div>
            </div>
          </FormProvider>
          <DialogFooter>
            <Button isLoading={isPending} type="submit">
              {selectedServingUnitId ? 'Edit' : 'Create'} Serving Unit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
