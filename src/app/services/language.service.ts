import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currengLanguage: string = 'english';

  constructor() {}

  setLanguage(language: string) {
    this.currengLanguage = language;
    localStorage.setItem('language', language);
  }

  loadLanguage() {
    const saveLanguage = localStorage.getItem('language') || 'english';
    this.setLanguage(saveLanguage);
  }
}
