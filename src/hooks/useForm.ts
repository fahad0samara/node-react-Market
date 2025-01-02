import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateField } from '../utils/form';

export function useForm<T extends z.ZodType>(schema: T) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((name: string, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    const fieldSchema = (schema as any).shape[name];
    if (fieldSchema) {
      const { valid, error } = validateField(value, fieldSchema);
      setErrors(prev => ({
        ...prev,
        [name]: valid ? '' : (error || '')
      }));
    }
  }, [schema]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: z.infer<T>) => Promise<void>
  ) => {
    setIsSubmitting(true);
    try {
      const validatedData = schema.parse(values);
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0] as string;
          acc[path] = curr.message;
          return acc;
        }, {} as Record<string, string>);
        setErrors(formattedErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [values, schema]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}