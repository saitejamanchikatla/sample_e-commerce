import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from 'src/app/modules/Products/services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  categories:any[];
  Products:any[];
  ProductsShoppingCart:any[];
  sub:Subscription;
  nbrShoppingProduct:number=0;
 productsShopping:any[];
  displayedColumns: string[] = ['urlImage','title','weight','price','actions'];
  constructor(private db:AngularFireDatabase,
    private serviceCategorie:CategorieService, 
    private serviceProducts:CourseService,
    private cartService:ShoppingCartService,
    private route:Router) { }

  ngOnInit() {
    this.cartService.getListItemsShoppingCartMapProduct()
                    .subscribe(products=>
                      this.productsShopping=products);this.sub=this.serviceCategorie.getAllCategories()
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


}

getProductsByCategorie(key)
{
return this.Products.filter(products=>products.categorie==key);
}
 getTotal()
 {
   let total:number=0;
   if(!this.productsShopping) return total;
   this.productsShopping.forEach(course=>{
     total=total+course.price
   })
   return total;
 }
 Delete(row){
   this.cartService.deleteProductShoppingCart(row.key);
   
  }
  
ngOnDestroy(): void{
  this.sub.unsubscribe();
}
onNext()
{
 this.route.navigate(['/addresssave']);
}
}
