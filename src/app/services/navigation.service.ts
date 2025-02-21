import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  menuActive: boolean = false;
  chapterMenuActive: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  openMenu = () => {
    this.menuActive = true;
    if (this.chapterMenuActive === true) {
      this.closeChapterMenu();
    }
  };

  closeMenu = () => {
    this.menuActive = false;
  };

  openChapterMenu = () => {
    this.chapterMenuActive = true;
    if (this.menuActive === true) {
      this.closeMenu();
    }
  };

  closeChapterMenu = () => {
    this.chapterMenuActive = false;
  };
}
