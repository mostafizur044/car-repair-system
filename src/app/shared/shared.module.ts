import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from './services/validation.service';
import { HttpService } from './services/http.service';
import { CutomerFormComponent } from './component/cutomer-form/cutomer-form.component';
import { StockFormComponent } from './component/stock-form/stock-form.component';
import { CarForComponent } from './component/car-for/car-for.component';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  declarations: [AlertComponent, CutomerFormComponent, StockFormComponent, CarForComponent],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AlertComponent,
    CutomerFormComponent,
    StockFormComponent,
    CarForComponent
  ],
  providers:[ValidationService, HttpService, AuthGuardService]
})
export class SharedModule { }
