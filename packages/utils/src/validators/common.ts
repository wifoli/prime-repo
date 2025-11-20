import { z } from 'zod';
import validator from 'validator';

// URL validator
export const urlSchema = z.string().url('URL inválida');

export function isValidURL(url: string): boolean {
  return validator.isURL(url);
}

export function isValidURLStrict(url: string): boolean {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
  });
}

// Password strength validator
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[a-z]/, 'Senha deve conter letra minúscula')
  .regex(/[A-Z]/, 'Senha deve conter letra maiúscula')
  .regex(/[0-9]/, 'Senha deve conter número')
  .regex(/[^a-zA-Z0-9]/, 'Senha deve conter caractere especial');

export function isStrongPassword(password: string): boolean {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}

export function getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}

// UUID validator
export function isValidUUID(uuid: string): boolean {
  return validator.isUUID(uuid);
}

// Credit card validator
export function isValidCreditCard(card: string): boolean {
  return validator.isCreditCard(card);
}

// Validate and get error message
export function validatePassword(password: string): { valid: boolean; error?: string } {
  const result = passwordSchema.safeParse(password);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}
