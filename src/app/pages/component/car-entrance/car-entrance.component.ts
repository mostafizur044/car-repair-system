import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { Car } from '../../models/car';
import { Extra } from '../../models/extraModel';
import { CustomerService } from '../../services/customer.service';
import { CarService } from '../../services/car.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-entrance',
  templateUrl: './car-entrance.component.html',
  styleUrls: ['./car-entrance.component.css']
})
export class CarEntranceComponent implements OnInit {

  public customerArray:Customer[] = [];
  public car:Car;
  public extra:Extra;
  public cusReg:string = '';

  constructor(
    private customerService:CustomerService,
    private carService:CarService,
    public validation:ValidationService,
    private router:Router
  ) { 
    this.car = new Car();
    this.extra = new Extra();
  }

  ngOnInit() {
    window.resizeTo(0,0);
    this.getAllCustomer();
  }
  
  getAllCustomer(){
    this.customerService.getCustomer().subscribe(
      res =>{
        this.customerArray = this.validation.insertKeyInObject(res,'regNo');
      },
      err => console.log(err)
    );
  }

  changeCustomer(cus){
    this.car.customer = this.customerArray.find(c=> c.regNo==cus);
  }

  submitCar(){
    this.car.id = Math.floor(Math.random()*1000)+1;
    this.car.entryDate = this.customerService.joinDate();
    console.log(this.car);
    this.carService.addCar(this.car).subscribe(
      res =>{
        this.alertStatus('Car Added',200);
        console.log(res);
        this.router.navigate(['/car-list']);
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  private alertStatus(status,code){
    this.extra.code = code;
    this.extra.status = status;
  }

}
