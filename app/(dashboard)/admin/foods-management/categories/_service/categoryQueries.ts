'use server';

import prisma from '@/lib/prisma';

export async function getCategories() {
  return await prisma.category.findMany();
}
