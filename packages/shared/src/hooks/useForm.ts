import { useState, useCallback, FormEvent } from 'react';
import type { ValidationResult, ValidatorFn } from '@prime-repo/utils/validations';

export interface FieldConfig {
  validators?: ValidatorFn[];
  initialValue?: any;
}

export interface FormConfig {
  [field: string]: FieldConfig;
}

export interface FormErrors {
  [field: string]: string;
}

export interface FormValues {
  [field: string]: any;
}

export interface UseFormResult {
  values: FormValues;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: string, value: any) => void;
  setValues: (values: Partial<FormValues>) => void;
  setError: (field: string, error: string) => void;
  setErrors: (errors: FormErrors) => void;
  setTouched: (field: string, touched: boolean) => void;
  validateField: (field: string) => boolean;
  validateForm: () => boolean;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (field: string) => () => void;
  handleSubmit: (onSubmit: (values: FormValues) => void | Promise<void>) => (e: FormEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for form management with validation
 */
export function useForm(config: FormConfig): UseFormResult {
  // Initialize values
  const initialValues = Object.entries(config).reduce((acc, [field, cfg]) => {
    acc[field] = cfg.initialValue ?? '';
    return acc;
  }, {} as FormValues);

  const [values, setValuesState] = useState<FormValues>(initialValues);
  const [errors, setErrorsState] = useState<FormErrors>({});
  const [touched, setTouchedState] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate single field
  const validateField = useCallback((field: string): boolean => {
    const fieldConfig = config[field];
    if (!fieldConfig?.validators) return true;

    const value = values[field];

    for (const validator of fieldConfig.validators) {
      const result: ValidationResult = validator(value);
      if (!result.valid) {
        setErrorsState(prev => ({ ...prev, [field]: result.error || 'Campo inválido' }));
        return false;
      }
    }

    // Clear error if valid
    setErrorsState(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    return true;
  }, [config, values]);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    Object.keys(config).forEach(field => {
      const fieldConfig = config[field];
      if (!fieldConfig?.validators) return;

      const value = values[field];

      for (const validator of fieldConfig.validators) {
        const result: ValidationResult = validator(value);
        if (!result.valid) {
          newErrors[field] = result.error || 'Campo inválido';
          isValid = false;
          break;
        }
      }
    });

    setErrorsState(newErrors);
    return isValid;
  }, [config, values]);

  // Set single value
  const setValue = useCallback((field: string, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }));
  }, []);

  // Set multiple values
  const setValues = useCallback((newValues: Partial<FormValues>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  // Set error
  const setError = useCallback((field: string, error: string) => {
    setErrorsState(prev => ({ ...prev, [field]: error }));
  }, []);

  // Set errors
  const setErrors = useCallback((newErrors: FormErrors) => {
    setErrorsState(newErrors);
  }, []);

  // Set touched
  const setTouched = useCallback((field: string, isTouched: boolean) => {
    setTouchedState(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  // Handle input change
  const handleChange = useCallback((field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(field, e.target.value);
      
      // Validate on change if already touched
      if (touched[field]) {
        validateField(field);
      }
    };
  }, [setValue, touched, validateField]);

  // Handle input blur
  const handleBlur = useCallback((field: string) => {
    return () => {
      setTouched(field, true);
      validateField(field);
    };
  }, [setTouched, validateField]);

  // Handle form submit
  const handleSubmit = useCallback((onSubmit: (values: FormValues) => void | Promise<void>) => {
    return async (e: FormEvent) => {
      e.preventDefault();

      // Mark all as touched
      const allTouched = Object.keys(config).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouchedState(allTouched);

      // Validate
      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  }, [config, values, validateForm]);

  // Reset form
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrorsState({});
    setTouchedState({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setValues,
    setError,
    setErrors,
    setTouched,
    validateField,
    validateForm,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}
