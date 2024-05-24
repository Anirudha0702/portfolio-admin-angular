import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService); 
  if(route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register'){
    console.log(auth.isAuthenticated())
    if (auth.isAuthenticated()){
      inject(Router).navigate(['/dashboard']);
      return true;
    }
  }
  if (auth.isAuthenticated()){
    console.log(auth.isAuthenticated())
    console.log("User is authenticated inside guard if")
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
