import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/navigation/menu/menu.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { NavigationService } from './services/navigation.service';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from './services/theme.service';
import { ChapterMenuComponent } from './components/navigation/chapter-menu/chapter-menu.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    HeaderComponent,
    MatIconModule,
    ChapterMenuComponent,
    FooterComponent,
    NgStyle,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    protected navigationService: NavigationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.loadTheme();
  }

  scrollToTop() {
    const content = document.querySelector('.content-footer-wrap');
    if (content) {
      content.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  }
}
