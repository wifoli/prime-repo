/**
 * Mask patterns for formatting
 */

export const MASK_PATTERNS = {
  // CPF: 000.000.000-00
  CPF: '000.000.000-00',
  
  // CNPJ: 00.000.000/0000-00
  CNPJ: '00.000.000/0000-00',
  
  // Phone: (00) 00000-0000 or (00) 0000-0000
  PHONE: ['(00) 0000-0000', '(00) 00000-0000'],
  
  // CEP: 00000-000
  CEP: '00000-000',
  
  // Date: 00/00/0000
  DATE: '00/00/0000',
  
  // Credit Card: 0000 0000 0000 0000
  CREDIT_CARD: '0000 0000 0000 0000',
  
  // Currency (BRL)
  CURRENCY_BRL: {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
  },
} as const;

export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: false,
  },
  
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    ALLOWED_CHARS: /^[a-zA-Z0-9_-]+$/,
  },
  
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
} as const;
