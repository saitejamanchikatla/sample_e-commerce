import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: LoginService, private router:Router) { }
  canActivate(route, state:RouterStateSnapshot)
  {
  return  this.auth.user$.pipe(
      map(user=>{
     if (user)  return true;

     this.router.navigate(['/Login'], {queryParams:{returnUrl:state.url}});
     return false;
   })
  )
  }
}
