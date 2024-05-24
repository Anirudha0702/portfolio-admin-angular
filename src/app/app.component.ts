import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './Services/auth.service';
// import { User } from '@angular/fire/auth';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
  ],
})
export class AppComponent  {
  title = 'portfolio-admin-angular';
 
  constructor(private authService: AuthService) {
    this.authService.initialize();
  }
  ngOnInit(): void {
    console.log('App component initialized');
    console.log(this.authService.isAuthenticated())
  }
  // ngOnInit(): void {
  //   this.userSubscription = this.authService.user$.subscribe((user: User | null) => {
  //     console.log(user)
  //     if (user) {
  //       this.authService.currUser.set({
  //         uid: user.uid!,
  //         username: user.displayName!,
  //         email: user.email!,
  //       });
  //     } else {
  //       this.authService.currUser.set(null);
  //     }
  //   });
  //   console.log(this.authService.currUser())
  // }

  // ngOnDestroy(): void {
  //   if (this.userSubscription) {
  //     this.userSubscription.unsubscribe();
  //   }
  // }
}
