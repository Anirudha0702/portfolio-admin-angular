import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  processing = false;
  constructor(private auth: AuthService,private router:Router) {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/dashboard'])
    }
  }
  errorMessage: string|null=null;
  login(event: any) {
    event.preventDefault();
    this.processing = true;
    const form = event.target;
    const formdata = new FormData(form);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    this.auth.login(email,  password).subscribe({
      next: () => {
        console.log('User loggedin');
        this.processing = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.processing = false;
      }
    });
  }
}
