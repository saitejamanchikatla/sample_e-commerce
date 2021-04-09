import { Component, OnInit, Inject } from '@angular/core';
import { orders } from '../../models/orders.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/modules/authen/services/login.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  order:orders;
  regiForm:FormGroup;
  user;
  orde:any[]=[];
  sub:Subscription;
  constructor(private loginService:LoginService,
    private route:Router,private fb:FormBuilder,
    private db:AngularFireDatabase,
     private cartService:ShoppingCartService,
     public  dialogRef:MatDialogRef<StatusComponent>,
     @Inject(MAT_DIALOG_DATA) public idOrder) {
     
    } 
  
  ngOnInit() {
    this.loginService.getCurrentUserDb()
                     .subscribe(user=>this.user=user);
  }
  initalizeProduct(orde){
    this.regiForm = this.fb.group({      
      'Status' : [ orde?orde.status:null,Validators.required]
    });
  }
 onSubmit(form){
    if(this.regiForm.valid)
    {
      let orders:orders={
       id:this.idOrder?this.idOrder.id:'',
       status:form.Status
      }
      this.cartService.UpdateOrder(orders).then(()=>{
        this.dialogRef.close();
      });
 }
}
  }
