import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { Car } from '../../models/car';
import { Extra } from '../../models/extraModel';
import { CustomerService } from '../../services/customer.service';
import { CarService } from '../../services/car.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public customerArray:Customer[] = [];
  public car:Car;
  public cusReg:string = '';
  private modalReference: NgbModalRef;
  public extra:Extra;
  public pagi:Pagination;
  public prop:string = '';
  public reverse:boolean = false; 
  public carArray:Car[] = [];
  public filterCarArray:Car[] = [];

  constructor(
    private customerService:CustomerService,
    private modalService:NgbModal,
    private carService:CarService,
    public validation:ValidationService
  ) { 
    this.car = new Car();
    this.extra = new Extra();
    this.pagi = new Pagination();
  }

  ngOnInit() {
    window.resizeTo(0,0);
    this.getAllCustomer();
    this.getAllCar();
  }

  // getCar

  getAllCar(){
    this.carService.getCar().subscribe(
      res =>{
        this.carArray = this.carService.formatCarArray(res);
        this.filterCarArray = this.carArray;
        console.log(this.carArray);
      },
      err => console.log(err)
    );
  }

  trackByCar(index,car){
    return car? car.id:undefined;
  }

  // pagination

  pageChange(page){
    this.pagi.page = page;
  }

  // get Customer
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

  // init add car
  initAdd(content){
    this.alertStatus('',0);
    this.extra.edit = false;
    this.car = new Car();
    this.cusReg ='';
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // submit car
  submitCar(){
    this.car.id = Math.floor(Math.random()*1000)+1;
    this.car.entryDate = this.customerService.joinDate();
    console.log(this.car);
    this.carService.addCar(this.car).subscribe(
      res =>{
        this.alertStatus('Car Added',200);
        this.addNewCarToArray(res);
        console.log(res);
        // close modal
        this.modalReference.close();
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  addNewCarToArray(res){
    this.car.carRegNo = res['name'];
    this.filterCarArray.splice(0,0,this.car);
  }

  // init edit

  initEdit(content,data){
    this.alertStatus('',0);
    this.extra.edit = true;
    this.car = new Car();
    this.car = data;
    this.cusReg = data.customer.regNo;
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // update data
  updateCar(){
    console.log(this.car);
    // http call
    this.carService.updateCar(this.car,this.car.carRegNo).subscribe(
      res =>{
        this.alertStatus('Item Updated',200);
        console.log(res);
        // close modal
        this.modalReference.close();
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  // init archive
  initArchive(content,data){
    this.alertStatus('',0);
    this.extra.index = this.filterCarArray.indexOf(data);
    console.log(this.extra.index);
    this.car = data;
// open modal
    this.modalReference =  this.modalService.open(content);
  }

  archiveCar(){
    console.log(this.car);
    this.removeFromArray();
    // http call
    this.carService.archiveCar(this.car.carRegNo).subscribe(
      res =>{
        this.alertStatus('item Deleted',200);
        console.log(res);
        // close modal
        this.modalReference.close();
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  private removeFromArray(){
    this.filterCarArray.splice(this.extra.index,1);
    // this.carArray.splice(this.extra.index,1);
  }

  private alertStatus(status,code){
    this.extra.code = code;
    this.extra.status = status;
  }

  // sorting
  sortTable(data,propName,date?:boolean){
    this.prop = propName;
    this.reverse = !this.reverse;
    this.validation.sortArray(data,this.prop,this.reverse,date);
  }

}
