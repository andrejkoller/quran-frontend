import { Component } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(protected navigationService: NavigationService) {}

  triggerMenu = () => {
    this.navigationService.closeMenu();
  };
}
