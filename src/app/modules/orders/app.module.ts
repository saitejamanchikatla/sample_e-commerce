import { NgModule } from '@angular/core';
import { OrderComponent } from './components/order/order.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModuleProducts } from '../Products/app.module';
import { AppModuleShoppingCart } from '../shoppingcart/app.module';
import { AppModuleAuth } from '../authen/app.module';
import { AppModuleAddress } from '../Address/app.module';
@NgModule({
    declarations:[OrderComponent],
    imports:[
       MaterialModule,
       CommonModule,
       FlexLayoutModule,
       FormsModule,
       ReactiveFormsModule,
       AppModuleProducts,
       AppModuleShoppingCart,
       AppModuleAuth,
       AppModuleAddress
    ],
    exports:[OrderComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleOrders {}