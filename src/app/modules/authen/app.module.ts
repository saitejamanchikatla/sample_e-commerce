import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from 'src/app/material-ui.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
    declarations:[LoginComponent],
    imports:[
        MaterialModule,
        CommonModule,
        BrowserModule
    ],
    exports:[LoginComponent],
    providers:[LoginService,AuthGuardService],
    bootstrap:[]
})
export class AppModuleAuth {}