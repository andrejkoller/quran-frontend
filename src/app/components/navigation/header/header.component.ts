import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../services/navigation.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private navigationService: NavigationService,
    protected router: Router
  ) {}

  triggerMenu = () => {
    this.navigationService.openMenu();
  };

  triggerChapterMenu = () => {
    this.navigationService.openChapterMenu();
  };

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
