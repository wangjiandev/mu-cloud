'use server';

import { executeAction } from '@/lib/executeAction';
import prisma from '@/lib/prisma';
import type { CategorySchema } from '../_types/categorySchema';

export const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => {
      return prisma.category.delete({
        where: {
          id,
        },
      });
    },
  });
};

export const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () => {
      return prisma.category.create({
        data: {
          name: data.name,
        },
      });
    },
  });
};

export const updateCategory = async (data: CategorySchema) => {
  if (data.action === 'update') {
    await executeAction({
      actionFn: () => {
        return prisma.category.update({
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
