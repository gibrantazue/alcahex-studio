export interface StorageManager<T> {
  get(fallback: T): T;
  set(value: T): void;
  remove(): void;
}

export function getStorageManager<T>(key: string): StorageManager<T> {
  return {
    get(fallback: T): T {
      if (typeof window === 'undefined') {
        return fallback;
      }
      
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (error) {
        console.warn(`Error reading from localStorage for key "${key}":`, error);
        return fallback;
      }
    },
    
    set(value: T): void {
      if (typeof window === 'undefined') {
        return;
      }
      
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`Error writing to localStorage for key "${key}":`, error);
      }
    },
    
    remove(): void {
      if (typeof window === 'undefined') {
        return;
      }
      
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn(`Error removing from localStorage for key "${key}":`, error);
      }
    }
  };
}
