'use server';

import prisma from '@/lib/prisma';
import type { ServingUnitSchema } from '../_types/ServingUnitSchema';

export async function getServingUnits() {
  return await prisma.servingUnit.findMany();
}

export async function getServingUnitById(
  id: number
): Promise<ServingUnitSchema> {
  const servingUnit = await prisma.servingUnit.findUnique({
    where: {
      id,
    },
  });
  return {
    action: 'update',
    name: servingUnit?.name ?? '',
    id,
  };
}
