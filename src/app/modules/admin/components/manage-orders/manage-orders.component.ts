import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { StatusComponent } from 'src/app/modules/shoppingcart/components/status/status.component';
import { MatDialog } from '@angular/material';
import { orders } from 'src/app/modules/shoppingcart/models/orders.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { Router } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { CourseService } from 'src/app/modules/Products/services/course.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  order:any;
  userId:string;
  product:any;
  od:any;
  user;
  productsOrder:any[];
  address:any;
  displayedColumns: string[] = ['userId','paid','total'];

 
  constructor(private cartService:ShoppingCartService,
    private serviceDialog:MatDialog,private loginService:LoginService, 
    private route:Router,private productService:CourseService,
    private afAuth:AngularFireAuth) {
      this.afAuth.authState.subscribe(user=>{
        if(user) this.userId = user.uid;
      })
     }
  ngOnInit() {
   this.cartService.getAllOrders()
                   .subscribe(order=>{this.order=order;console.log(order);});
  
  }
  Edit(row)
  {
    this.serviceDialog.open(StatusComponent,{
      width:'650px',
      height:'500px', data:{id:row.key}
    })
  }
}
