import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';
import { CarService } from '../../services/car.service';
import { CheckOut } from '../../models/checkOut';
import { Car } from '../../models/car';
import { ValidationService } from '../../../shared/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-leave',
  templateUrl: './car-leave.component.html',
  styleUrls: ['./car-leave.component.css']
})
export class CarLeaveComponent implements OnInit {

  public stockArray:Stock[] = [];
  public stockObject={};
  public checkOut:CheckOut;
  public car:Car;
  public carArray:Car[] = [];
  public keyArr = [];
  public itemArray = [];
  public itemSold = [];
  


  constructor(
    private stockService:StockService,
    private carService:CarService,
    public validation:ValidationService,
    public router: Router
  ) { 
    this.checkOut = new CheckOut();
    this.car = new Car();
  }

  ngOnInit() {
    this.getAllStock();
    this.getAllCars();
  }

  getAllStock(){
    this.stockService.getStock().subscribe(
      res => {
        this.stockObject = this.stockService.makeStockObject(res);
        this.stockArray = this.stockService.formatStockArray(this.stockObject);
        console.log(this.stockObject);
        this.keyArr = Object.keys(this.stockObject);
      },
      err => console.log(err)
    );
  }

  getAllCars(){
    this.carService.getCar().subscribe(
      res => {
        this.carArray = this.validation.insertKeyInObject(res,'carRegNo');
      },
      err => console.log(err)
    );
  }

  findCar(key){
    let reg = key.trim();
    if(reg){
      this.car = this.carArray.find(car=> car.carRegNo == reg);
      this.car.checkOutDate = this.carService.formatDate();
      this.car.checkOut = true;
      this.checkOut.car =  this.car;
    } 
  }

  changeItem(key){
    this.itemArray = this.stockObject[key];
  }

  findStock(prop,key){
    let reg = key.trim();
    if(reg){
      let s = this.itemArray.find(item=> item.itemNo == reg);
      this.itemSold.push(s)
      let index = this.itemArray.findIndex(car=> car.carRegNo == reg);
      this.stockObject[prop].splice(index,1);
      console.log(this.stockObject); 
      this.calculateTotal();
      this.stockArray = this.stockService.formatStockArray(this.stockObject);
    } 
  }

  removeFromPrint(item,i){
    this.stockObject[item.category].push(item);
    this.checkOut.totalPrice -= parseInt(item.sellPrice); 
    this.itemSold.splice(i,1);
    this.stockArray = this.stockService.formatStockArray(this.stockObject);
  }

  serviceCharge(){
    this.calculateTotal();
  }

  calculateTotal(){
    this.checkOut.totalPrice = 0;
    for(let i of this.itemSold){
      this.checkOut.totalPrice += parseInt(i.sellPrice); 
    }
    this.checkOut.totalPrice += parseInt(this.checkOut.serviceCharge);
  }

  printCheckOut(){
    this.checkOut.itemSold = this.itemSold;
    this.carService.printCheckOut(this.checkOut);
    this.addIncome(this.checkOut);
    this.updateCar(this.checkOut.car);
    this.updateStock(this.checkOut.itemSold);
    this.router.navigate(['/car-list']);
  }

  updateCar(data){
    this.carService.updateCar(data,data.carRegNo)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  updateStock(data){
    for(let s of data){
      s.sold = true;
      this.stockService.updateStock(s,s.category,s.itemNo)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
  }
  
  addIncome(data){
    this.carService.addIncomeData(data).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
