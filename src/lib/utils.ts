import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher(url: string) {
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  
  return response.json()
}

export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

export function createEmitter() {
  const listeners: Array<(value: any) => void> = []
  
  return {
    emit(value: any) {
      listeners.forEach(listener => listener(value))
    },
    on(listener: (value: any) => void) {
      listeners.push(listener)
      return () => {
        const index = listeners.indexOf(listener)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }
    }
  }
}

export function nextTick(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}
