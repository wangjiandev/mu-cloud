'use server';

import prisma from '@/lib/prisma';
import type { CategorySchema } from '../_types/categorySchema';

export async function getCategories() {
  return await prisma.category.findMany();
}

export async function getCategoryById(id: number): Promise<CategorySchema> {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return {
    action: 'update',
    name: category?.name ?? '',
    id,
  };
}
