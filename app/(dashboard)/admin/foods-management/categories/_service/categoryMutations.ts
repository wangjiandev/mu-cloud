'use server';

import { executeAction } from '@/lib/executeAction';
import prisma from '@/lib/prisma';

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
