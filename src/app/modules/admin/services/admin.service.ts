import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../authen/services/login.service';
import { UserService } from '../../users/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {

  constructor(private auth:LoginService, private userService:UserService, private route:Router, private db:AngularFireDatabase) { }
  canActivate():Observable<boolean>
  {
    return this.auth.getCurrentUserDb() 
               .pipe(
                 map(user=>{
                   if(!user) return false;
                   if(user.isAdmin) return true;
                     this.route.navigate(['/Login']);
                     return false;
                 })
               )          
  }
}
