import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material-ui.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    declarations:[MenuTopComponent],
    imports:[
         MaterialModule,
         AppRoutingModule,
         CommonModule,
         BrowserModule
    ],
    exports:[MenuTopComponent],
    providers:[],
    bootstrap:[]
})
export class AppModuleMenu {}