import { NgModule } from '@angular/core';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { AdminService } from './services/admin.service';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AppModuleProducts } from '../Products/app.module';
import { ProductComponent } from '../Products/components/product/product.component';
import { StatusComponent } from '../shoppingcart/components/status/status.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
    declarations:[ManageProductsComponent,ManageOrdersComponent, ProductFormComponent, OrdersComponent],
    imports:[
        MaterialModule,
        CommonModule,
        AppModuleProducts
    ],
    exports:[ManageProductsComponent,ManageOrdersComponent],
    entryComponents:[ProductComponent,StatusComponent],
    providers:[AdminService],
    bootstrap:[]
})
export class AppModuleAdmin {}