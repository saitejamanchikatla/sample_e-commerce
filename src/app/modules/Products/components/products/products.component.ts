import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {Subscriber, Subscription} from 'rxjs';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from '../../services/course.service';
import { mergeMap, map } from 'rxjs/operators';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../../models/cours.model';
import { shoppingcart } from 'src/app/modules/shoppingcart/models/shoppingcart.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductInfoComponent } from '../product-info/product-info.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  categories:any[];
    Products:any[];
    ProductsShoppingCart:any[];
    sub:Subscription;
    nbrShoppingProduct:number=0;
  constructor( private serviceDialog:MatDialog,private db:AngularFireDatabase,private serviceCategorie:CategorieService, private serviceProducts:CourseService,
    private route:Router, private cartService:ShoppingCartService) { }
  
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


  }

getProductsByCategorie(key)
{
 return this.Products.filter(products=>products.categorie==key);
}
ngOnDestroy(): void{
  this.sub.unsubscribe();
}
addToCart(course){
  this.cartService.addToCart(course);
}
existProductInShoppingCart(key){
  return this.ProductsShoppingCart.find((course:any)=>course.key==key);
}
deleteToCart(course){
  this.cartService.deleteProductShoppingCart(course.key);
}
product(course){
  this.serviceDialog.open(ProductInfoComponent,{
    width:'800px',
    height:'500px',data:{id:course.key}
  })
}
}