import { z } from 'zod';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { ValidationResult } from './types';

/**
 * CNPJ validation (accepts formatted or unformatted)
 */
export function cnpj(value: string): ValidationResult {
  if (!value) {
    return { valid: true };
  }

  const valid = cnpjValidator.isValid(value);
  return {
    valid,
    error: valid ? undefined : 'CNPJ inválido',
  };
}

/**
 * Zod schema for CNPJ
 */
export const cnpjSchema = z
  .string()
  .min(1, 'CNPJ é obrigatório')
  .refine((val) => cnpjValidator.isValid(val), {
    message: 'CNPJ inválido',
  });

/**
 * Strip CNPJ formatting
 */
export function stripCNPJ(value: string): string {
  return cnpjValidator.strip(value);
}
