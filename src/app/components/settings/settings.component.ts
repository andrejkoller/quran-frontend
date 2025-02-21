import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeService } from '../../services/theme.service';
import { QuranService } from '../../services/quran.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonToggleModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [QuranService],
})
export class SettingsComponent implements OnInit {
  selectedTheme: string = 'auto';
  saveFontSize: number = 16;
  selectedLanguage: string = 'english';

  constructor(
    private themeService: ThemeService,
    private quranService: QuranService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('theme') || 'auto';
    this.saveFontSize = parseInt(localStorage.getItem('font-size') || '16', 10);
    this.selectedLanguage = localStorage.getItem('language') || 'english';
  }

  changeTheme(theme: string) {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme);
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.languageService.setLanguage(language);
  }

  setIncreasedFontSize() {
    this.quranService.increaseFontSize(this.saveFontSize);
    this.loadFontSize();
  }

  setDecreasedFontSize() {
    this.quranService.decreaseFontSize(this.saveFontSize);
    this.loadFontSize();
  }

  loadFontSize() {
    this.saveFontSize = parseInt(localStorage.getItem('font-size') || '16', 10);
  }
}
