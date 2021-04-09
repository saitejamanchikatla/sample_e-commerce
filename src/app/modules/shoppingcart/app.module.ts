import { NgModule } from '@angular/core';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddressComponent } from './components/address/address.component';
import { SuccessComponent } from './components/success/success.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
    declarations:[ShoppingcartComponent, CheckOutComponent, OrderSuccessComponent, AddressComponent, SuccessComponent, StatusComponent],
    imports:[
     MaterialModule,
     CommonModule,
     FlexLayoutModule,
     ReactiveFormsModule,
     FormsModule
    ],
    entryComponents:[],
    providers:[ShoppingCartService],
    bootstrap:[]
})
export class AppModuleShoppingCart {}