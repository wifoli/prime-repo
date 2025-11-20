import { z } from 'zod';

// Brazilian phone regex patterns
const PHONE_REGEX = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
const PHONE_WITH_COUNTRY = /^\+?55\s?\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;

// Zod schema for phone
export const phoneSchema = z
  .string()
  .refine((value) => isValidPhone(value), {
    message: 'Telefone inválido',
  });

// Validator function
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Brazilian phone: 10 digits (with area code) or 11 digits (with 9)
  if (cleaned.length === 10 || cleaned.length === 11) {
    return PHONE_REGEX.test(phone) || PHONE_WITH_COUNTRY.test(phone);
  }
  
  return false;
}

// Check if is mobile (has 9 as first digit after area code)
export function isMobilePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    const firstDigit = cleaned.charAt(2);
    return firstDigit === '9';
  }
  
  return false;
}

// Strip formatting
export function stripPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// Validate and get error message
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const result = phoneSchema.safeParse(phone);
  return {
    valid: result.success,
    error: result.success ? undefined : result.error.errors[0]?.message,
  };
}
