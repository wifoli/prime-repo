// Remove duplicates from array
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Group array by key
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// Chunk array into smaller arrays
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Sort array by key
export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// Flatten nested array
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.flat(Infinity) as T[];
}

// Get random item from array
export function sample<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

// Shuffle array
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Sum array of numbers
export function sum(array: number[]): number {
  return array.reduce((acc, val) => acc + val, 0);
}

// Average of array
export function average(array: number[]): number {
  return array.length > 0 ? sum(array) / array.length : 0;
}

// Find max value
export function max(array: number[]): number | undefined {
  return array.length > 0 ? Math.max(...array) : undefined;
}

// Find min value
export function min(array: number[]): number | undefined {
  return array.length > 0 ? Math.min(...array) : undefined;
}

// Partition array by condition
export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  
  array.forEach(item => {
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  });
  
  return [pass, fail];
}
