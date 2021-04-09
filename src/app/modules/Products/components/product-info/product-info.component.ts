import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategorieService } from 'src/app/modules/commun/services/categorie.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/cours.model';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  categories:any[];
  Products:any[];
  idProducts;
  course:any;
  sub:Subscription;
  ProductsShoppingCart:any[];
  nbrShoppingProduct:number=0;
  constructor(private serviceCategorie:CategorieService, private serviceProducts:CourseService,
    private route:ActivatedRoute,private cartService:ShoppingCartService,public  dialogRef:MatDialogRef<ProductInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public idProduct) {
   }

   ngOnInit() {
   
  this.sub=this.serviceCategorie.getAllCategories()
                           .pipe(
                             mergeMap(categories=>this.serviceProducts.getProductbyId(this.idProduct.id).pipe(
                               map(course=>{
                                 return ([categories,course])
                               })
                             ))).subscribe(([categories,course])=>{
                               this.categories=categories as any[];
                               this.course=course;
                             });
    }
    
close(){
  this.dialogRef.close();
}
ngOnDestroy(): void{
  this.sub.unsubscribe();
}
}
