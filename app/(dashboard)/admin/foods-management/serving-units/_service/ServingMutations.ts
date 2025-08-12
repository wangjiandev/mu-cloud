'use server';

import { executeAction } from '@/lib/executeAction';
import prisma from '@/lib/prisma';
import type { ServingUnitSchema } from '../_types/ServingUnitSchema';

export const deleteServingUnit = async (id: number) => {
  await executeAction({
    actionFn: () => {
      return prisma.servingUnit.delete({
        where: {
          id,
        },
      });
    },
  });
};

export const createServingUnit = async (data: ServingUnitSchema) => {
  await executeAction({
    actionFn: () => {
      return prisma.servingUnit.create({
        data: {
          name: data.name,
        },
      });
    },
  });
};

export const updateServingUnit = async (data: ServingUnitSchema) => {
  if (data.action === 'update') {
    await executeAction({
      actionFn: () => {
        return prisma.servingUnit.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.name,
          },
        });
      },
    });
  }
};
