import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { LoginComponent } from './login/login.component';

import { RouterModule, Routes } from '@angular/router';

const route:Routes =[
  {path:'login', component : LoginComponent}
]


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(route)
  ],
  declarations: [LoginComponent]
})
export class CoreModule { }
