import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

// Format CPF: 123.456.789-01
export function formatCPF(cpf: string): string {
  return cpfValidator.format(cpf);
}

// Format CNPJ: 12.345.678/0001-90
export function formatCNPJ(cnpj: string): string {
  return cnpjValidator.format(cnpj);
}

// Format phone: (11) 98765-4321 or (11) 3456-7890
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    // Mobile: (11) 98765-4321
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (cleaned.length === 10) {
    // Landline: (11) 3456-7890
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  
  return phone;
}

// Format phone with country code
export function formatPhoneWithCountry(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '+55 ($1) $2-$3');
  }
  
  return phone;
}

// Format CEP: 12345-678
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

// Format credit card: 1234 5678 9012 3456
export function formatCreditCard(card: string): string {
  const cleaned = card.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})/g, '$1 ').trim();
}

// Mask credit card (show only last 4 digits)
export function maskCreditCard(card: string): string {
  const cleaned = card.replace(/\D/g, '');
  const lastFour = cleaned.slice(-4);
  return `**** **** **** ${lastFour}`;
}
