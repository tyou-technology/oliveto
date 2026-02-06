
const STORAGE_KEY = 'auth_token_storage';

interface StoredToken {
  value: string;
  expires: number;
}

export const authStorage = {
  setToken: (token: string) => {
    if (typeof window === 'undefined') return;
    // 7 days expiration to match previous cookie behavior
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const data: StoredToken = { value: token, expires };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save auth token", e);
    }
  },

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;

    try {
      const data: StoredToken = JSON.parse(item);
      // Check for expiration
      if (Date.now() > data.expires) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.value;
    } catch {
      // Invalid format
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },

  removeToken: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
};
