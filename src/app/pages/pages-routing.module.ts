import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CustomerAddComponent } from './component/customer-add/customer-add.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { StockAddComponent } from './component/stock-add/stock-add.component';
import { CarEntranceComponent } from './component/car-entrance/car-entrance.component';
import { StockListComponent } from './component/stock-list/stock-list.component';
import { CarListComponent } from './component/car-list/car-list.component';
import { CarLeaveComponent } from './component/car-leave/car-leave.component';
import { GarageEmployeeListComponent } from './component/garage-employee-list/garage-employee-list.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';


const route:Routes =[
  {path: '' , component:PagesComponent,
    children : [
      {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuardService]},
      {path: 'add-customer', component:CustomerAddComponent, canActivate:[AuthGuardService]},
      {path: 'customer-list', component:CustomerListComponent, canActivate:[AuthGuardService]},
      {path: 'add-stock', component:StockAddComponent, canActivate:[AuthGuardService]},
      {path: 'stock-list', component:StockListComponent, canActivate:[AuthGuardService]},
      {path: 'car-entrance', component:CarEntranceComponent, canActivate:[AuthGuardService]},
      {path: 'car-list', component:CarListComponent, canActivate:[AuthGuardService]},
      {path: 'car-leave', component:CarLeaveComponent, canActivate:[AuthGuardService]},
      {path: 'employee', component:GarageEmployeeListComponent, canActivate:[AuthGuardService]},
      {path: '', redirectTo:'/dashboard', pathMatch:'full'}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
