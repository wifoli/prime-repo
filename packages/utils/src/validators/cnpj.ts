import { cnpj } from 'cpf-cnpj-validator';
import { z } from 'zod';

// Zod schema for CNPJ
export const cnpjSchema = z
  .string()
  .refine((value) => cnpj.isValid(value), {
    message: 'CNPJ inválido',
  });

// Validator function
export function isValidCNPJ(value: string): boolean {
  return cnpj.isValid(value);
}

// Strip formatting (remove dots, dashes and slashes)
export function stripCNPJ(value: string): string {
  return cnpj.strip(value);
}

// Generate random valid CNPJ (for testing)
export function generateCNPJ(): string {
  return cnpj.generate();
}

// Validate and get error message
export function validateCNPJ(value: string): { valid: boolean; error?: string } {
  const result = cnpjSchema.safeParse(value);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}
