import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "./user";
import * as firebase from "firebase/app";


@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;
  }

  getUser(){
    return this.angularFireAuth.auth.currentUser;
  }

  createUser(user: User){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  signOutFirebase() {
    return this.angularFireAuth.auth.signOut();
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
