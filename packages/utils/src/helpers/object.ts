// Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Pick keys from object
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// Omit keys from object
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

// Merge objects deeply
export function merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  const result = { ...target };
  
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key as keyof T];
      const targetValue = result[key as keyof T];
      
      if (isObject(sourceValue) && isObject(targetValue)) {
        result[key as keyof T] = merge(targetValue as any, sourceValue as any);
      } else {
        result[key as keyof T] = sourceValue as any;
      }
    });
  });
  
  return result;
}

// Check if value is object
function isObject(value: any): value is object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// Get nested property by path
export function get<T = any>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) {
      return defaultValue as T;
    }
  }
  
  return result as T;
}

// Set nested property by path
export function set(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  
  let current = obj;
  for (const key of keys) {
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
}

// Check if object is empty
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

// Get object keys with type safety
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

// Get object values with type safety
export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

// Get object entries with type safety
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
