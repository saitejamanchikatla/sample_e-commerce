import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from 'src/app/modules/Products/services/course.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  sub:Subscription;
  productsAccess:any[];
  categories:any[];
    Products:any[];
    order:any[];
    product:any[]=[];
    ProductsShoppingCart:any[];
    nbrShoppingProduct:number=0;
    user;
    orders:any[]=[];
  coursesAccess:any[]=[];
    userId:string;
  displayedColumns: string[] = ['categorie','title','price','weight'];
  constructor(private loginService:LoginService,private cartService:ShoppingCartService,
    private serviceCategorie:CategorieService,private serviceProducts:CourseService,
    private afAuth:AngularFireAuth,private route:Router) {this.afAuth.authState.subscribe(user=>{
      if(user) this.userId = user.uid;
    }) }

  ngOnInit() {
    this.sub=this.serviceCategorie.getAllCategories()
    .pipe(
      mergeMap(categories=>this.serviceProducts.getAllProducts().pipe(
        mergeMap(Products=>this.cartService.getListItemsShoppingCart().pipe(
          map(ProductsShopping=>[categories,Products,ProductsShopping])
        ))

      )
      )
    ).subscribe(([categories,Products,ProductsShopping])=>{
      this.categories=categories;
      this.Products=Products;
      this.ProductsShoppingCart=ProductsShopping;
      this.nbrShoppingProduct=(ProductsShopping as any[]).length;
    });
    this.loginService.getCurrentUserDb()
                     .pipe(
                       switchMap(userDb=>{
                        return this.cartService.getOrderIdByUserId(userDb.id).pipe(
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
                            console.log('coursesArray :',coursesArray);
                            return coursesArray;
                          })
                         )
                       })
                     ).subscribe(coursesOrders=>{

                     })

  }
  getProductsByCategorie(key)
  {
   return this.Products.filter(products=>products.categorie==key);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
