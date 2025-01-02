import { z } from 'zod';

export const createFormSchema = (fields: Record<string, z.ZodType>) => {
  return z.object(fields);
};

export const validateField = (value: unknown, schema: z.ZodType) => {
  try {
    schema.parse(value);
    return { valid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message };
    }
    return { valid: false, error: 'Invalid value' };
  }
};

export const formatFormErrors = (errors: Record<string, any>) => {
  return Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = value.message;
    return acc;
  }, {} as Record<string, string>);
};