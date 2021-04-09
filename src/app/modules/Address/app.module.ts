import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { AddressSaveComponent } from './components/address-save/address-save.component';
import { AppModuleShoppingCart } from '../shoppingcart/app.module';
import { AddressComponent } from '../shoppingcart/components/address/address.component';


@NgModule({
    declarations:[AddressSaveComponent],
    imports:[
      MaterialModule,
      CommonModule,
      AppModuleShoppingCart
    ],
    exports:[AddressSaveComponent],
    entryComponents:[AddressComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleAddress {}