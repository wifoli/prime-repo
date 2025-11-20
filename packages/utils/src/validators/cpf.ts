import { cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';

// Zod schema for CPF
export const cpfSchema = z
  .string()
  .refine((value) => cpf.isValid(value), {
    message: 'CPF inválido',
  });

// Validator function
export function isValidCPF(value: string): boolean {
  return cpf.isValid(value);
}

// Strip formatting (remove dots and dashes)
export function stripCPF(value: string): string {
  return cpf.strip(value);
}

// Generate random valid CPF (for testing)
export function generateCPF(): string {
  return cpf.generate();
}

// Validate and get error message
export function validateCPF(value: string): { valid: boolean; error?: string } {
  const result = cpfSchema.safeParse(value);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}
