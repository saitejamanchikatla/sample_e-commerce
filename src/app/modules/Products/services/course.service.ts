import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database'
import { MatGridTileHeaderCssMatStyler } from '@angular/material';
import {map} from 'rxjs/operators'
import { Product } from '../models/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db:AngularFireDatabase) { }
  getAllProducts(){
   return this.db.list('/Products')
           .snapshotChanges()
           .pipe(
             map(changes=>
              changes.map(c=>(
                {
                  key: c.payload.key, ...c.payload.val()
                }
              )))
           )
  }
  AddProduct(product:Product){
       return this.db.list('/Products/').push({
         title:product.title,
         description:product.description,
         categorie:product.categorie,
         weight:product.weight,
         price:product.price,
         urlImage:product.urlImage   
       })
  }
  getProductbyId(uid:string){
    return this.db.object('/Products/'+uid)
           .snapshotChanges()
           .pipe(
             map(product=>{
               let obj:any=product.payload.val();
               let productTemp:Product={
                 id:product.key,
                 categorie:obj.categorie,
                 description:obj.description,
                 price:obj.price,
                 weight:obj.weight,
                 title:obj.title,
                 urlImage:obj.urlImage
               }
               return productTemp
             })
           )
  }
  
  updateProduct(product:Product)
  {
    return this.db.object('/Products/'+product.id).update({
     title:product.title,
     description:product.description,
     categorie:product.categorie,
     weight:product.weight,
     price:product.price,
     urlImage:product.urlImage
    }
    )
  }
  deleteProduct(id:string){
    return this.db.object('/Products/'+id).remove();
  }
}
