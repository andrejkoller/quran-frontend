import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'auto';

  constructor() {}

  setTheme(theme: string) {
    this.currentTheme = theme;
    document.documentElement.classList.remove(
      'light-theme',
      'dark-theme',
      'sepia-theme'
    );

    if (theme !== 'auto') {
      document.documentElement.classList.add(`${theme}-theme`);
    }

    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const saveTheme = localStorage.getItem('theme') || 'auto';
    this.setTheme(saveTheme);
  }
}
