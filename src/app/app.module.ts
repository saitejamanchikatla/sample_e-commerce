import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-ui.module';
import { AppModuleAdmin } from './modules/admin/app.module';
import { AppModuleAuth } from './modules/authen/app.module';
import { AppModuleCommun } from './modules/commun/app.module';
import { AppModuleMenu } from './modules/menu/app.module';
import { AppModuleMypurchases } from './modules/Mypurchases/app.module';
import { AppModuleMywishlist } from './modules/Mywishlist/app.module';
import { AppModuleOrders } from './modules/orders/app.module';
import { AppModulePayment } from './modules/payment/app.module';
import { AppModuleProducts } from './modules/Products/app.module';
import { AppModuleShoppingCart } from './modules/shoppingcart/app.module';
import { AppModuleUsers } from './modules/users/app.module';
import { CommonModule } from '@angular/common';
import { LoginService } from './modules/authen/services/login.service';
import { AuthGuardService } from './modules/authen/services/auth-guard.service';
import { UserService } from './modules/users/services/user.service';
import { AdminService } from './modules/admin/services/admin.service';
import { ShoppingCartService } from './modules/shoppingcart/services/shopping-cart.service';
import { AppModuleAddress } from './modules/Address/app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppModuleAdmin,
    AppModuleAuth,
    AppModuleCommun,
    AppModuleMenu,
    AppModuleMypurchases,
    AppModuleMywishlist,
    AppModuleOrders,
    AppModulePayment,
    AppModuleAddress,
    AppModuleProducts,
    AppModuleShoppingCart,
    AppModuleUsers
  ],
  providers: [LoginService,AuthGuardService,UserService,AdminService,ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
