import { Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut,
  UserCredential
} from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { IUser } from '../Types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<IUser | null>(null)
  constructor(private auth: Auth,private router:Router) {
    
  }
  initialize(){
    onAuthStateChanged(this.auth, (user) => {
      console.log("auth state changed")
      if(user){
        this.authState.next({
          uid: user.uid,
          username: user.displayName!,
          email: user.email!,
          photoURL: user.photoURL!
        })
        if(this.router.url==="/login" || this.router.url==="/register")
          this.router.navigate(['/dashboard'])
      }
      else{
        this.authState.next(null)
        this.router.navigate(['/login'])
      }
    });
  }
  getEmail(): string {
    return this.authState.value!.email;
  }
  getCurrentUser(): BehaviorSubject<IUser | null>{
    return this.authState;
  }
  register(
    email: string,
    username: string,
    password: string
  ): Observable<IUser> {
    const promise = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((data) =>
      updateProfile(data.user, { displayName: username ,photoURL:"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png"}).then(() => {return {
        uid: data.user.uid,
        username: data.user.displayName!,
        email: data.user.email!,
        photoURL:data.user.photoURL!
      } as IUser;})
    );
    return from(promise);
  }
  isAuthenticated(): boolean {
    return this.authState.value !== null;
  }
  login(email: string, password: string): Observable<void|UserCredential> {
    const promise = signInWithEmailAndPassword(this.auth, email, password)
    ;
    return from(promise);
  }
  logout(): Observable<void> {
    const promise = signOut(this.auth).then(() => {});
    return from(promise);
  }
}
