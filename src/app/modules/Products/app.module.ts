import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[ProductsComponent, ProductInfoComponent, ProductComponent],
    imports:[
          MaterialModule,
          CommonModule,
          FlexLayoutModule,
          FormsModule,
          ReactiveFormsModule
    ],
    entryComponents:[ProductInfoComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleProducts {}