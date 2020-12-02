import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from './models/loginUser.entity';

import { AuthenticationService } from './service/authentication.service';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isNavbarCollapsed = false;
  currentUser: LoginUser;

  constructor(
    private srv: MainService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
