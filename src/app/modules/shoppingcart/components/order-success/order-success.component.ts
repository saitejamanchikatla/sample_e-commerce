import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Address } from '../../models/address.model';
import { LoginService } from 'src/app/modules/authen/services/login.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  address:Address;
  productsOrder:any[];
  ad:any[];
  title:any[];
  user;
  displayedColumns: string[] = ['title','weight','price'];
  constructor(private loginService:LoginService,private cartService:ShoppingCartService,private router:Router,private DialogRef:MatDialog) { }

  ngOnInit() {
    this.cartService.getListItemsShoppingCartMapProduct()
    .subscribe(products=>
      this.productsOrder=products);
    this.cartService.getAllad()
                    .subscribe(ad=>this.ad=ad);
      this.loginService.getCurrentUserDb()
                       .subscribe(user=>this.user=user);
  }
  getTotal()
  {
    let total:number=0;
    if(!this.productsOrder) return total;
    this.productsOrder.forEach(course=>{
      total=total+course.price
    })
    return total;
  }
  async OnPay()
  {
    //Create the order
    let order={
      dateCreated:new Date().getTime(),
      userId:this.user.id,
      items:this.productsOrder,
      total:this.getTotal(),
      paid:true,
      status:'ontheway'
    }
   let orderResult:any= await this.cartService.createOrder(order);
    this.cartService.clearShpoppingCart();
    this.router.navigate(['/success-orde',orderResult.key]);
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
