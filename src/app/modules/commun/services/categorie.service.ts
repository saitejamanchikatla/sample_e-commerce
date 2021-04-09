import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private db:AngularFireDatabase) { }
  getAllCategories()
  {
   return this.db.list('categories')
           .snapshotChanges()
           .pipe(
            map(change=>change.map(c=>({
              key:c.payload.key, ...c.payload.val()
            }))
          ))
  }
  getAllAddress()
  {
   return this.db.list('address')
           .snapshotChanges()
           .pipe(
            map(change=>change.map(c=>({
              key:c.payload.key, ...c.payload.val()
            }))
          ))
  }
}