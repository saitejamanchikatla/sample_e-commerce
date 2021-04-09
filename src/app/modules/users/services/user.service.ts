import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }
  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email: user.email
    });
  }
  getUserByuid(uid:string)
  {
  return  this.db.object('/users/'+uid)
               .snapshotChanges()
               .pipe(
                  map(user=>{
                    let objectUser:any=user.payload.val();
                    objectUser.id=user.payload.key;
                    return objectUser
                  })
               )
  }
}
