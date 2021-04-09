import { NgModule } from '@angular/core';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[PurchasesComponent],
    imports:[
      MaterialModule,
      CommonModule
    ],
    exports:[PurchasesComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleMypurchases {}