import AuthError from 'next-auth';
import { ZodError } from 'zod';
import { fromError } from 'zod-validation-error';
import { Prisma } from '@/generated/prisma';

const PRISMA_ERROR_CODES = new Map<string, string>([
  [
    'P2000',
    'The provided value for the column is too long for the column type.',
  ],
  ['P2001', 'The record searched for in the database was not found.'],
  ['P2002', 'Unique constraint failed on the fields: `{field}`'],
  ['P2003', 'Foreign key constraint failed on the field: `{field}`'],
  ['P2004', 'A constraint failed on the database.'],
  [
    'P2005',
    'The value stored in the database is not valid for the column type.',
  ],
  ['P2006', 'The provided value for the column is invalid.'],
  ['P2007', 'Data validation failed on the `{field}`'],
  ['P2008', 'Failed to parse the query.'],
  ['P2009', 'Failed to validate the query.'],
  ['P2010', 'Row query failed.'],
  ['P2011', 'Null constraint failed on the field: `{field}`'],
  ['P2012', 'Missing required value for the column: `{field}`'],
  ['P2013', 'Missing required argument: `{field}`'],
  ['P2014', 'The change you are trying to make is invalid.'],
  ['P2015', 'A related record could not be found.'],
  ['P2016', 'Query interpretation error.'],
  [
    'P2017',
    'The record for relation between the parent and child models are not found.',
  ],
  ['P2018', 'The required connected records ware not found.'],
  ['P2019', 'Input validation error.'],
  ['P2020', 'Value out of range for the type.'],
  ['P2021', 'The table does not exist in the database.'],
  ['P2022', 'The column does not exist in the database.'],
  ['P2023', 'Inconsistent column data.'],
  ['P2024', 'Timed out fetching a new connection from the pool.'],
  [
    'P2025',
    'An operation failed because it depends on one or more records that were required but not found.',
  ],
  [
    'P2026',
    'The current database provider does not support a feature required that the query used.',
  ],
  [
    'P2027',
    'Multiple errors occurred on the database during the query execution.',
  ],
]);

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AuthError) {
    return 'Wrong credentials or the user does not exist.';
  }
  if (error instanceof ZodError) {
    const message = fromError(error);
    if (message) {
      return message.toString();
    }
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errorCode = error.code;
    const errorMessage = PRISMA_ERROR_CODES.get(errorCode);
    if (errorMessage) {
      return errorMessage;
    }
    if (errorCode === 'P2002') {
      const field = (error.meta?.target as string[])?.[0] || 'unknown field';
      return `Unique constraint failed on the fields: ${field}`;
    }
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return 'Invalid input data.';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred.';
};
