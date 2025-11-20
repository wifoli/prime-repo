import { z } from 'zod';
import validator from 'validator';
import { ValidationResult } from './types';
import { PATTERNS } from './patterns';

/**
 * Email validation
 */
export function email(value: string): ValidationResult {
  if (!value) {
    return { valid: true }; // Optional by default, use required() if needed
  }

  const valid = validator.isEmail(value) && PATTERNS.email.test(value);
  return {
    valid,
    error: valid ? undefined : 'Email inválido',
  };
}

/**
 * Zod schema for email
 */
export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Email inválido');
