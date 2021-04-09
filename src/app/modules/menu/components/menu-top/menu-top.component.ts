import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-top',
  templateUrl: './menu-top.component.html',
  styleUrls: ['./menu-top.component.css']
})
export class MenuTopComponent implements OnInit {
  user:any;
  nbrShoppingProduct:number=0;
  constructor(private auth:LoginService, private cartService:ShoppingCartService,private route:Router) {   
  }
  ngOnInit() {
    this.auth.getCurrentUser()
    .pipe(
      switchMap(user=>{
      if(!user) return 'e'; 
        return this.auth.getCurrentUserDb();
      }),
      mergeMap(userDb=>this.cartService.getListItemsShoppingCart().pipe(
        map(ProductsShopping=>{
          return [userDb,ProductsShopping]
        })
      ))
    )
    .subscribe(([userDb,ProductsShopping])=>{
      this.nbrShoppingProduct=(ProductsShopping as any).length;
      if(userDb!='e') 
      {
        this.user=userDb
      }
      else
      this.user=null;
    },
      erreur=>console.log)
}
  logout()
  {
   this.auth.logout();
  }
  recapShopping(){
    if(this.nbrShoppingProduct<=0) return;
    this.route.navigate(['/shoppingcart']);
  }
}
