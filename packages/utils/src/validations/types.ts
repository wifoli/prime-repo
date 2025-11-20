import { z } from 'zod';

/**
 * Standard validation result - ALL validations return this
 */
export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Validation function type
 */
export type ValidatorFn = (value: any) => ValidationResult;

/**
 * Field validation rule for forms
 */
export interface FieldRule {
    validator: ValidatorFn;
    message?: string;
}

/**
 * Form validation schema
 */
export type FormSchema = Record<string, FieldRule | FieldRule[]>;

/**
 * Form validation errors
 */
export type FormErrors = Record<string, string>;

/**
 * Zod schema type helper
 */
export type ZodSchema<T = any> = z.ZodType<T>;