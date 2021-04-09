import { Component } from '@angular/core';
import { LoginService } from './modules/authen/services/login.service';
import { Router } from '@angular/router';
import { UserService } from './modules/users/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userService:UserService,private auth:LoginService, router:Router){
    auth.user$.subscribe(user=>{
      if (user) {
         userService.save(user);
         let returnUrl = localStorage.getItem('returnUrl');
         router.navigateByUrl(returnUrl);
      }
      else{
        router.navigate(['/'])
      }
    });
  }
}
