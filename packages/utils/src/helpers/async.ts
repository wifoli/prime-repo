// Sleep/delay
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry function with exponential backoff
export async function retry<T>(
    fn: () => Promise<T>,
    options?: {
        retries?: number;
        delay?: number;
        backoff?: number;
    }
): Promise<T> {
    const { retries = 3, delay = 1000, backoff = 2 } = options || {};

    let lastError: Error | undefined;

    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            if (i < retries - 1) {
                await sleep(delay * Math.pow(backoff, i));
            }
        }
    }

    throw lastError;
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function(...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Memoize function (cache results)
export function memoize<T extends (...args: any[]) => any>(
    func: T
): T {
    const cache = new Map();

    return function(...args: Parameters<T>): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    } as T;
}
