import { ValidationResult, FormSchema, FormErrors, FieldRule } from './types';

/**
 * Validate a single field with multiple rules
 */
export function validateField(value: any, rules: FieldRule | FieldRule[]): ValidationResult {
  const ruleArray = Array.isArray(rules) ? rules : [rules];

  for (const rule of ruleArray) {
    const result = rule.validator(value);
    if (!result.valid) {
      return {
        valid: false,
        error: rule.message || result.error,
      };
    }
  }

  return { valid: true };
}

/**
 * Validate entire form
 */
export function validateForm(data: Record<string, any>, schema: FormSchema): {
  valid: boolean;
  errors: FormErrors;
} {
  const errors: FormErrors = {};

  Object.entries(schema).forEach(([field, rules]) => {
    const result = validateField(data[field], rules);
    if (!result.valid) {
      errors[field] = result.error!;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Create validation rule with custom message
 */
export function withMessage(validator: (value: any) => ValidationResult, message: string): FieldRule {
  return {
    validator,
    message,
  };
}
