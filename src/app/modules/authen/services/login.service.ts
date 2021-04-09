import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase'; 
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth, private route:ActivatedRoute, private serviceUser: UserService) {
    this.user$=afAuth.authState;
  }
  login()
  {
   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   localStorage.setItem('returnUrl',returnUrl);
   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout()
  {
    this.afAuth.auth.signOut();
  }
  getCurrentUser()
  {
    return this.afAuth.authState;
  }
  getCurrentUserDb()
   {
     return this.afAuth.authState
                      .pipe(
                       switchMap(user=>{
                         try
                         {
                          return   this.serviceUser.getUserByuid(user.uid)
                         }
                         catch(error)
                         {
                           console.log(error);
                           
                         }
                       }),
                       map(user=>{
                         return user;
                       })
                      )
   }
}
