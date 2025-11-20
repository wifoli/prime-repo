import { z } from 'zod';
import validator from 'validator';

// Zod schema for email
export const emailSchema = z.string().email('Email inválido');

// Validator function
export function isValidEmail(email: string): boolean {
  return validator.isEmail(email);
}

// Validator with custom options
export function isValidEmailStrict(email: string): boolean {
  return validator.isEmail(email, {
    allow_display_name: false,
    require_display_name: false,
    allow_utf8_local_part: true,
    require_tld: true,
  });
}

// Validate and get error message
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}
