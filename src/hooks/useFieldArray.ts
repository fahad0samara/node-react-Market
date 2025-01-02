import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export function useFieldArray(name: string) {
  const { getValues, setValue } = useFormContext();

  const fields = getValues(name) || [];

  const append = useCallback((value: any) => {
    setValue(name, [...fields, value]);
  }, [fields, name, setValue]);

  const remove = useCallback((index: number) => {
    setValue(name, fields.filter((_: any, i: number) => i !== index));
  }, [fields, name, setValue]);

  const update = useCallback((index: number, value: any) => {
    const newFields = [...fields];
    newFields[index] = value;
    setValue(name, newFields);
  }, [fields, name, setValue]);

  return {
    fields,
    append,
    remove,
    update
  };
}