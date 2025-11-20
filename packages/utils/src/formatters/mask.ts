import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

/**
 * Format CPF: 123.456.789-01
 */
export function cpf(value: string): string {
  if (!value) return '';
  return cpfValidator.format(value);
}

/**
 * Format CNPJ: 12.345.678/0001-90
 */
export function cnpj(value: string): string {
  if (!value) return '';
  return cnpjValidator.format(value);
}

/**
 * Format phone: (11) 98765-4321
 */
export function phone(value: string): string {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  return value;
}

/**
 * Format CEP: 12345-678
 */
export function cep(value: string): string {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

/**
 * Format credit card: 1234 5678 9012 3456
 */
export function creditCard(value: string): string {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})/g, '$1 ').trim();
}

/**
 * Mask credit card (show only last 4 digits)
 */
export function maskCreditCard(value: string): string {
  if (!value) return '';
  
  const cleaned = value.replace(/\D/g, '');
  const lastFour = cleaned.slice(-4);
  return `**** **** **** ${lastFour}`;
}
