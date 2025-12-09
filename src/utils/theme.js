// Theme management utility
const THEME_STORAGE_KEY = 'app-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.applyTheme(this.currentTheme);
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  getSystemTheme() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME_DARK
        : THEME_LIGHT;
    }
    return THEME_LIGHT;
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === THEME_DARK) {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    } else {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    }
    
    // Update theme-color meta tag for browser UI
    this.updateThemeColorMeta(theme);
    
    // Dispatch custom event for theme change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme, isDark: theme === THEME_DARK }
      }));
    }
  }

  updateThemeColorMeta(theme) {
    if (typeof document === 'undefined') return;
    
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    // Set theme color based on theme
    // Light: white, Dark: modal-info color (#0e1a28)
    metaThemeColor.setAttribute('content', theme === THEME_DARK ? '#0e1a28' : '#ffffff');
  }

  toggleTheme() {
    const newTheme = this.currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    this.setTheme(newTheme);
    return newTheme;
  }

  isDark() {
    return this.currentTheme === THEME_DARK;
  }
}

// Create singleton instance
const themeManager = new ThemeManager();

// Listen for system theme changes
if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!themeManager.getStoredTheme()) {
      themeManager.setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
    }
  });
}

export default themeManager;

