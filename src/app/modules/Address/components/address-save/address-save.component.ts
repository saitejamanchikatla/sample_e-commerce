import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddressComponent } from 'src/app/modules/shoppingcart/components/address/address.component';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { Address } from 'src/app/modules/shoppingcart/models/address.model';
import { Router, RouterLinkWithHref } from '@angular/router';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-address-save',
  templateUrl: './address-save.component.html',
  styleUrls: ['./address-save.component.css']
})
export class AddressSaveComponent implements OnInit {
  addres:any;
  address:Address;
  user;
  idd:any;
  addressid:any;
  userId:string;
  displayedColumns: string[] = ['name','phone', 'city', 'pin', 'near','actions','address'];
  constructor( private serviceDialog:MatDialog,private loginService:LoginService, 
    private route:Router,private cartService:ShoppingCartService,private afAuth:AngularFireAuth) {
      this.afAuth.authState.subscribe(user=>{
        if(user) this.userId = user.uid;
      })
     }

  ngOnInit() {
    this.loginService.getCurrentUserDb()
                     .subscribe(user=>this.user=user);
    this.loginService.getCurrentUserDb()
                     .pipe(
                       mergeMap(userDb=>this.cartService.getAllAddress().pipe(
                         map(address=>{return ([userDb,address])})))

                     )
                     .subscribe(([userDb,address])=>{
                      this.user=userDb; 
                      this.address=address as Address;
                     });

}                                
  
  AddAddress(){
    this.serviceDialog.open(AddressComponent,{
      width:'650px',
      height:'500px'
    })
  }
  Edit(row)
  {
    this.serviceDialog.open(AddressComponent,{
      width:'650px',
      height:'500px',data:{id:row.key}
    })
  }
  Delete(row)
  {
    if(window.confirm('Are sure you want to delete this Address ?')) this.cartService.deleteAddress(row.key);
  }
async OnAdd()
  {
    let ad={
      address:this.address
    }
    this.cartService.createAddress(ad).then(()=>{
      this.route.navigate(['/ordersuccess']);
    });
   //Clear the shopping Cart

   //let resultPayment =this.paymentService.payment(orderResult.key,this.getTotal());
   //if(resultPayment)
   //{
     //Update the order with paid=true
   //}
  // else
  // {
     //Update the order with paid=false 
  // }


  }
}
