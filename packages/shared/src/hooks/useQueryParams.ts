import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Hook to sync state with URL query parameters
 */
export function useQueryParams<T extends Record<string, any>>(
  defaultValues?: T
): [T, (updates: Partial<T>) => void, () => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current params as object
  const getParams = useCallback((): T => {
    const params: any = { ...defaultValues };
    
    searchParams.forEach((value, key) => {
      // Try to parse as JSON for complex types
      try {
        params[key] = JSON.parse(value);
      } catch {
        params[key] = value;
      }
    });

    return params;
  }, [searchParams, defaultValues]);

  // Update params
  const setParams = useCallback((updates: Partial<T>) => {
    const current = getParams();
    const newParams = { ...current, ...updates };

    // Remove undefined/null values
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === undefined || newParams[key] === null) {
        delete newParams[key];
      }
    });

    // Convert to URLSearchParams
    const params = new URLSearchParams();
    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      }
    });

    setSearchParams(params);
  }, [getParams, setSearchParams]);

  // Clear all params
  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return [getParams(), setParams, clearParams];
}
