import { z } from 'zod';
import validator from 'validator';
import { ValidationResult } from './types';

/**
 * URL validation
 */
export function url(value: string): ValidationResult {
  if (!value) {
    return { valid: true };
  }

  const valid = validator.isURL(value);
  return {
    valid,
    error: valid ? undefined : 'URL inválida',
  };
}

/**
 * Zod schema for URL
 */
export const urlSchema = z
  .string()
  .min(1, 'URL é obrigatória')
  .url('URL inválida');
