import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Address } from '../../models/address.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { mergeMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address:Address;
  regiForm:FormGroup;
  user;
  dateCreated:number;
  userId:string;
  addres:any[];
  sub:Subscription;
  constructor(private loginService:LoginService,
    private route:Router,private fb:FormBuilder,
    private db:AngularFireDatabase,private afAuth:AngularFireAuth,
     private cartService:ShoppingCartService,
     public  dialogRef:MatDialogRef<AddressComponent>,
     @Inject(MAT_DIALOG_DATA) public idAddress) {
      this.afAuth.authState.subscribe(user=>{
        if(user) this.userId = user.uid;
      })
    } 
  
  ngOnInit() {
    if(!this.idAddress){
      this.cartService.getAllAddress()
      .subscribe(address=>{
        this.addres=address;
        this.initalizeProduct(null);
       });
    }
    else{
      this.cartService.getAllAddress()
                          .pipe()
                           .subscribe(([addres])=>{
                               this.address = addres as Address;
                               this.initalizeProduct(addres); 
                             })
    }
    this.loginService.getCurrentUserDb()
                     .subscribe(user=>this.user=user);
  }
  initalizeProduct(address){
    this.regiForm = this.fb.group({  
      'Name':[address?address.name:null,Validators.required],
      'Phone' : [ address?address.phone:null,Validators.required],  
      'City' : [address?address.city:null, Validators.required],
      'Pin' : [ address?address.pin:null,Validators.required],    
      'Near' : [ address?address.near:null,Validators.required]
    });
  }
 async onSubmit(form){
    if(this.regiForm.valid)
    {
      let address:Address={
       id:this.idAddress?this.idAddress.id:'',
       name:form.Name,
       phone:form.Phone,
       city:form.City,
       pin:form.Pin,
       near:form.Near,
       userId:this.user.id,
       dateCreated:new Date().getTime()
      }
      if(!this.idAddress){
        this.cartService.AddAddress(address).then(()=>{
          this.dialogRef.close();
          this.route.navigate(['/ordersuccess']);
        });
       }
      else{
        this.cartService.UpdateAddress(address).then(()=>{
          this.dialogRef.close();
          this.route.navigate(['/ordersuccess']);
        });
      }
 }
}
  }
