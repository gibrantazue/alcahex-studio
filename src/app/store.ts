// Simple store for landing page theme and language preferences
interface AppState {
  theme: 'light' | 'dark';
  language: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
}

export const appStore = {
  theme: 'light' as const,
  language: 'en',
  setTheme: (theme: 'light' | 'dark') => {
    // Simple theme setter for landing page
  },
  setLanguage: (language: string) => {
    // Simple language setter for landing page
  }
};
