// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Capitalize each word
export function capitalizeWords(str: string): string {
  return str.split(' ').map(capitalize).join(' ');
}

// Convert to slug
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim();
}

// Truncate string
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

// Remove extra spaces
export function cleanSpaces(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

// Check if string contains substring (case insensitive)
export function contains(str: string, search: string): boolean {
  return str.toLowerCase().includes(search.toLowerCase());
}

// Count occurrences of substring
export function countOccurrences(str: string, search: string): number {
  return (str.match(new RegExp(search, 'g')) || []).length;
}

// Reverse string
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

// Check if palindrome
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === reverse(cleaned);
}

// Mask string (show only first and last N chars)
export function mask(str: string, visibleChars: number = 4, maskChar: string = '*'): string {
  if (str.length <= visibleChars * 2) return str;
  
  const start = str.slice(0, visibleChars);
  const end = str.slice(-visibleChars);
  const middle = maskChar.repeat(str.length - visibleChars * 2);
  
  return start + middle + end;
}

// Generate random string
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Camel case to snake case
export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Snake case to camel case
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Remove accents
export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
