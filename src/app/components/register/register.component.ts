import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { DbService } from '../../Services/db.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string|null=null;
  uid:string|null=null;
  constructor(private auth: AuthService,private db:DbService) {}
  register(event: any) {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const username = formdata.get('username') as string;
    
    console.log(email, password, username)
    this.auth.register(email, username, password).subscribe({
      next: (user) => {
        this.db.createUser(user).then(()=>{ 
          console.log("USer created")
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
    
  }
}
