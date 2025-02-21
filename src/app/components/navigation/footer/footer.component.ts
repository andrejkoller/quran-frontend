import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemeService } from '../../../services/theme.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  selectedTheme: string = 'auto';
  selectedLanguage: string = 'english';

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.selectedTheme = localStorage.getItem('theme') || 'auto';
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
}
