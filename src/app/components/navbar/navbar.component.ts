import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IUser } from '../../Types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  currUser: IUser | null = null;
  
  constructor(public auth: AuthService, private router: Router) {
    this.auth.getCurrentUser().subscribe((user) => (this.currUser = user));
    console.log(this.currUser);
  }
  logout() {
    this.auth.logout().subscribe({
      next: () => {
        console.log('logged out');
      },

      error: () => {
        console.log('error');
      },
      complete: () => {},
    });
  }
  login() {
    this.router.navigate(['/login']);
  }
}
