import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './modules/Products/components/products/products.component';
import { OrderComponent } from './modules/orders/components/order/order.component';
import { WishlistComponent } from './modules/Mywishlist/components/wishlist/wishlist.component';
import { ShoppingcartComponent } from './modules/shoppingcart/components/shoppingcart/shoppingcart.component';
import { PurchasesComponent } from './modules/Mypurchases/components/purchases/purchases.component';
import { LoginComponent } from './modules/authen/components/login/login.component';
import { ManageProductsComponent } from './modules/admin/components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './modules/admin/components/manage-orders/manage-orders.component';
import { OrderSuccessComponent } from './modules/shoppingcart/components/order-success/order-success.component';
import { CheckOutComponent } from './modules/shoppingcart/components/check-out/check-out.component';
import { AuthGuardService } from './modules/authen/services/auth-guard.service';
import { AdminService } from './modules/admin/services/admin.service';
import { ProductFormComponent } from './modules/admin/components/product-form/product-form.component';
import { ProductInfoComponent } from './modules/Products/components/product-info/product-info.component';
import { ProductComponent } from './modules/Products/components/product/product.component';
import { AddressComponent } from './modules/shoppingcart/components/address/address.component';
import { AddressSaveComponent } from './modules/Address/components/address-save/address-save.component';
import { SuccessComponent } from './modules/shoppingcart/components/success/success.component';


const routes: Routes = [
 {
    path:'',
    component:ProductsComponent
  },
  {
    path:'productinfo',
    component:ProductInfoComponent,
  },
  {
    path:'addproduct',
    component:ProductComponent,
    canActivate:[AuthGuardService, AdminService]
  },
  {
    path:'My Orders',
    component:OrderComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'My Wishlist',
    component:WishlistComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'shoppingcart',
    component:ShoppingcartComponent
  },
  {
    path:'My Purchases',
    component:PurchasesComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'manageproducts',
    component:ManageProductsComponent,
    canActivate:[AuthGuardService, AdminService]
  },
  {
    path:'productsform',
    component:ProductFormComponent,
    canActivate:[AuthGuardService, AdminService]
  },
  {
   path:'manageorders',
   component:ManageOrdersComponent,
   canActivate:[AuthGuardService, AdminService]
  },
  {
    path:'ordersuccess',
    component:OrderSuccessComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'address',
    component:AddressComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'addresssave',
    component:AddressSaveComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'success-orde/:id',
    component:SuccessComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'checkout',
    component:CheckOutComponent,
    canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
