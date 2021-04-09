import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireAction, AngularFireDatabaseModule} from '@angular/fire/database';
import {take,map} from 'rxjs/operators'
import { Address } from '../models/address.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { orders } from '../models/orders.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  userId:string;
  constructor(private db:AngularFireDatabase,private afAuth:AngularFireAuth) { 
    this.afAuth.authState.subscribe(user=>{
        if(user) this.userId = user.uid;
      })
  }

  async addToCart(course)
  {
    let cartId=localStorage.getItem('cartId');
    if(!cartId)
    {
     let cart= await this.db.list('/shoppingCart').push({
        dateCreated:new Date().getTime()
      });
      localStorage.setItem('cartId',cart.key)
      this.AddCourseCart(cart.key,course)
    }
    else
    {
      this.AddCourseCart(localStorage.getItem('cartId'),course);
    }
  }
  AddCourseCart(idCart,courseAdd)
  {
    this.db.object('/shoppingCart/'+idCart+'/items/'+courseAdd.key)
             .snapshotChanges()
             .pipe(
               take(1)
             ).subscribe(
              courseCart=>{
                 if(!courseCart.key)
                 {
                   this.db.list('/shoppingCart/'+idCart+'/items/').set(courseAdd.key,{course:courseAdd})
                 }
               }
             )

  }

  getListItemsShoppingCart()
  {
    let cartId=localStorage.getItem('cartId');
   return this.db.list('/shoppingCart/'+cartId+'/items/')
            .snapshotChanges()
            .pipe(

              map(courses =>
                      courses.map(c => (
                           { 
                            
                             key: c.payload.key, ...c.payload.val() 
                           }
                           ))
            ))

   
  }


  getListItemsShoppingCartMapProduct()
  {
    let cartId=localStorage.getItem('cartId');
   return this.db.list('/shoppingCart/'+cartId+'/items/')
            .snapshotChanges()
            .pipe(

              map(courses =>
                      courses.map(c => (
                           { 
                            
                             key: c.payload.key, ...(c.payload.val() as any).course
                           }
                           ))
            ))

   
  }
  AddAddress(address:Address)
  {
   return this.db.list('/Address/').push({
     name:address.name,
     phone:address.phone,
     city:address.city,
     pin:address.pin,
     near:address.near,
     userId:address.userId,
     dateCreated:address.dateCreated
   });
  }
  UpdateAddress(address:Address)
  {
    return this.db.object(`Address/${this.userId}/${address.id}`).update({
      name:address.name,
      phone:address.phone,
      city:address.city,
      pin:address.pin,
      near:address.near
    })
  }
  createAddress(ad)
  {
   return this.db.list('/ad/').push(ad);
  }
  DeleteAddress(id:string)
  {
    return this.db.object(`ad/${this.userId}/${id}`).remove(); 
  }
  deleteAddress(id:string){
    return this.db.object(`Address/${this.userId}/${id}`).remove();
  }
  continue(id:string){
    return this.db.list(`Address/${this.userId}/${id}`);
  }
  deleteProductShoppingCart(id:string)
  {
    let cartId=localStorage.getItem('cartId');
    return this.db.object('/shoppingCart/'+cartId+'/items/'+id).remove();
  }
  getAllAddress(){
    if(!this.userId) return;
    return this.db.list(`Address/${this.userId}`)
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

   createOrder(order)
   {
    return this.db.list('/orders/').push(order);
   }
   UpdateOrder(orders:orders){
     return this.db.object(`/orders/${orders.id}`).update(orders);
   }
   getAllOrders() {
    return this.db.list(`/orders/`).snapshotChanges()
    .pipe(
      map(changes=>
       changes.map(orders=>(
         {
           key: orders.payload.key, ...orders.payload.val()
         }
       )))
    )

  }
   clearShpoppingCart()
   {
     let cartId=localStorage.getItem('cartId');
     this.db.object('/shoppingCart/'+cartId+'/items/').remove();
   }
   getAllad(){
    if(!this.userId) return;
    return this.db.list('/Address/')
            .snapshotChanges()
            .pipe(
              map(changes=>
              
               changes.map(ad=>(
                 {
                   key: ad.payload.key, ...ad.payload.val()
                 }
               )))
            )
   }
   getOrderIdByUserId(userId)
  {
    return this.db.list('/orders/',ref=>ref.orderByChild('userId').equalTo(userId))
                                  .snapshotChanges()
                                  .pipe(
                                    map(idOrders=>{
                                    return  idOrders.map(ids=>{
                                               return ids.key
                                      })
                                    })
                                  )
  }
  getOrder()
  {
    return this.db.list('/orders/')
                                  .snapshotChanges()
                                  .pipe(
                                    map(idOrders=>{
                                    return  idOrders.map(ids=>{
                                               return ids.key
                                      })
                                    })
                                  )
  }
  getCoursesByIdOrder(idProduct)
  {
    return this.db.object('/orders/'+idProduct+'/items/')
                 .snapshotChanges()
                 .pipe(
                   map(courses=>{
                     return courses.payload.val()}
                   ))
                 
  }
}
