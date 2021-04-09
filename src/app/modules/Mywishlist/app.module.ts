import { NgModule } from '@angular/core';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[WishlistComponent],
    imports:[
        MaterialModule,
        CommonModule
    ],
    exports:[WishlistComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleMywishlist {}