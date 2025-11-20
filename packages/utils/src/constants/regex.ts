/**
 * Regex patterns for common validations
 */

export const REGEX_PATTERNS = {
  // Email
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // CPF (apenas números)
  CPF: /^\d{11}$/,
  
  // CNPJ (apenas números)
  CNPJ: /^\d{14}$/,
  
  // Phone numbers
  PHONE_BR: /^(\d{2})(\d{4,5})(\d{4})$/, // (11)98765-4321
  PHONE_BR_WITH_MASK: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
  
  // Password (mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número)
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  
  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  
  // UUID
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  
  // Credit Card (basic)
  CREDIT_CARD: /^\d{13,19}$/,
  
  // Postal Code (CEP)
  CEP: /^\d{5}-?\d{3}$/,
  
  // Only letters
  ONLY_LETTERS: /^[a-zA-ZÀ-ÿ\s]+$/,
  
  // Only numbers
  ONLY_NUMBERS: /^\d+$/,
  
  // Alphanumeric
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
} as const;
