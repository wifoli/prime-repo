import { z } from 'zod';
import { ValidationResult } from './types';
import { PATTERNS } from './patterns';

/**
 * Password validation (min 8 chars, 1 upper, 1 lower, 1 number)
 */
export function password(value: string): ValidationResult {
  if (!value) {
    return { valid: true };
  }

  const valid = PATTERNS.password.test(value);
  return {
    valid,
    error: valid ? undefined : 'Senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número',
  };
}

/**
 * Strong password validation (includes special char)
 */
export function strongPassword(value: string): ValidationResult {
  if (!value) {
    return { valid: true };
  }

  const valid = PATTERNS.passwordStrong.test(value);
  return {
    valid,
    error: valid ? undefined : 'Senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial',
  };
}

/**
 * Get password strength
 */
export function getPasswordStrength(value: string): 'weak' | 'medium' | 'strong' {
  if (!value) return 'weak';

  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[^a-zA-Z0-9]/.test(value);
  const isLongEnough = value.length >= 8;

  const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
}

/**
 * Zod schema for password
 */
export const passwordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[a-z]/, 'Senha deve conter letra minúscula')
  .regex(/[A-Z]/, 'Senha deve conter letra maiúscula')
  .regex(/[0-9]/, 'Senha deve conter número');

/**
 * Zod schema for strong password
 */
export const strongPasswordSchema = z
  .string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[a-z]/, 'Senha deve conter letra minúscula')
  .regex(/[A-Z]/, 'Senha deve conter letra maiúscula')
  .regex(/[0-9]/, 'Senha deve conter número')
  .regex(/[^a-zA-Z0-9]/, 'Senha deve conter caractere especial');
