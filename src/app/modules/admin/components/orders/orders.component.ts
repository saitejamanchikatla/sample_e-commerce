import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
productsOrder:any[];
coursesAccess:any[];
order:any;

  constructor(private cartService:ShoppingCartService,private loginService:LoginService) { }

  ngOnInit() {

    this.loginService.getCurrentUserDb()
                     .pipe(
                       switchMap(userDb=>{
                        return this.cartService.getOrder().pipe(
                          switchMap(items=>{
                            let coursesArray:any[]=[];
                            items.forEach(idOrder=>{
                                      this.cartService.getCoursesByIdOrder(idOrder)
                                                        .pipe(
                                                          map(coursesOrders=>{
                                                            return coursesOrders
                                                          })
                                                        ).subscribe((coursesOrders:any[])=>{
                                                          coursesOrders.forEach(course=>{
                                                            coursesArray.push(course);
                                                          })
                                                        })
                            })
                            this.coursesAccess=coursesArray;
                            console.log('coursesArra :',coursesArray);
                            return coursesArray;
                          })
                         )
                       })
                     ).subscribe(coursesOrders=>{

                     })
  
  }
}
