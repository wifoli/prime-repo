import { ValidationResult } from './types';
import { PATTERNS } from './patterns';

/**
 * Required field validation
 */
export function required(value: any): ValidationResult {
  const valid = value !== null && value !== undefined && value !== '';
  return {
    valid,
    error: valid ? undefined : 'Campo obrigatório',
  };
}

/**
 * Min length validation
 */
export function minLength(min: number) {
  return (value: string): ValidationResult => {
    const valid = value && value.length >= min;
    return {
      valid,
      error: valid ? undefined : `Mínimo de ${min} caracteres`,
    };
  };
}

/**
 * Max length validation
 */
export function maxLength(max: number) {
  return (value: string): ValidationResult => {
    const valid = !value || value.length <= max;
    return {
      valid,
      error: valid ? undefined : `Máximo de ${max} caracteres`,
    };
  };
}

/**
 * Min value validation (numbers)
 */
export function min(minValue: number) {
  return (value: number): ValidationResult => {
    const valid = value >= minValue;
    return {
      valid,
      error: valid ? undefined : `Valor mínimo é ${minValue}`,
    };
  };
}

/**
 * Max value validation (numbers)
 */
export function max(maxValue: number) {
  return (value: number): ValidationResult => {
    const valid = value <= maxValue;
    return {
      valid,
      error: valid ? undefined : `Valor máximo é ${maxValue}`,
    };
  };
}

/**
 * Pattern validation
 */
export function pattern(regex: RegExp, message: string = 'Formato inválido') {
  return (value: string): ValidationResult => {
    const valid = !value || regex.test(value);
    return {
      valid,
      error: valid ? undefined : message,
    };
  };
}

/**
 * Only letters validation
 */
export function onlyLetters(value: string): ValidationResult {
  const valid = !value || PATTERNS.onlyLetters.test(value);
  return {
    valid,
    error: valid ? undefined : 'Apenas letras são permitidas',
  };
}

/**
 * Only numbers validation
 */
export function onlyNumbers(value: string): ValidationResult {
  const valid = !value || PATTERNS.onlyNumbers.test(value);
  return {
    valid,
    error: valid ? undefined : 'Apenas números são permitidos',
  };
}

/**
 * Alphanumeric validation
 */
export function alphanumeric(value: string): ValidationResult {
  const valid = !value || PATTERNS.alphanumeric.test(value);
  return {
    valid,
    error: valid ? undefined : 'Apenas letras e números são permitidos',
  };
}

/**
 * Equal to another field (for password confirmation)
 */
export function equalTo(otherValue: any, fieldName: string = 'campo') {
  return (value: any): ValidationResult => {
    const valid = value === otherValue;
    return {
      valid,
      error: valid ? undefined : `Deve ser igual ao ${fieldName}`,
    };
  };
}

/**
 * One of values (enum)
 */
export function oneOf(values: any[]) {
  return (value: any): ValidationResult => {
    const valid = values.includes(value);
    return {
      valid,
      error: valid ? undefined : 'Valor inválido',
    };
  };
}
