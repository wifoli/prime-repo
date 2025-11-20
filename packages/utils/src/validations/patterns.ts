/**
 * Regex patterns for validations
 * Single source of truth for all regex
 */
export const PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  cpf: /^\d{11}$/,
  cpfFormatted: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cnpj: /^\d{14}$/,
  cnpjFormatted: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
  phone: /^(\d{2})(\d{4,5})(\d{4})$/,
  phoneFormatted: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
  cep: /^\d{5}-?\d{3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  passwordStrong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  onlyLetters: /^[a-zA-ZÀ-ÿ\s]+$/,
  onlyNumbers: /^\d+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
} as const;
