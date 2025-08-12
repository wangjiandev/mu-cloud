import { z } from 'zod';

export const servingUnitSchema = z.intersection(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }).max(255, {
      message: 'Name must be less than 255 characters',
    }),
  }),
  z.discriminatedUnion('action', [
    z.object({
      action: z.literal('create'),
    }),
    z.object({
      action: z.literal('update'),
      id: z.number().min(1, { message: 'ID is required' }),
    }),
  ])
);

export type ServingUnitSchema = z.infer<typeof servingUnitSchema>;

export const servingUnitDefaultValues: ServingUnitSchema = {
  action: 'create',
  name: '',
};
