import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/auth.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {
      label: 'Heroes List',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Add hero',
      icon: 'add_circle',
      url: './new-hero'
    },
    {
      label: 'Search Hero',
      icon: 'search',
      url: './search'
    }
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
