import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Extra } from '../../models/extraModel';
import { Pagination } from '../../models/pagination';
import { ValidationService } from '../../../shared/services/validation.service';
import {NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public customer:Customer;
  private modalReference: NgbModalRef;
  public extra:Extra;
  public pagi:Pagination;
  public prop:string = '';
  public reverse:boolean = false; 
  public customerArray:Customer[] = [];
  public filterCustomerArray:Customer[] = [];

  constructor(
    private modalService:NgbModal,
    public validation:ValidationService,
    private customerService: CustomerService
  ) {
    this.customer = new Customer();
    this.extra = new Extra();
    this.pagi = new Pagination();
   }

  ngOnInit() {
    window.resizeTo(0,0);
    this.getAllCustomer();
  }

  // get customer
  getAllCustomer(){
    this.customerService.getCustomer().subscribe(
      res => {
        this.customerArray = this.validation.insertKeyInObject(res,'regNo');
        this.filterCustomerArray = this.customerArray;
        console.log(res,this.customerArray);
        this.pagi.totalItem = this.customerArray.length;
      },
      err => console.log(err)
    );
  }

  trackByCustomer(index,customer){
    return customer? customer.id:undefined;
  }
  // pagination

  pageChange(page){
    this.pagi.page = page;
  }

  // init add
  initAdd(content){
    this.alertStatus('',0);
    this.extra.edit = false;
    this.customer = new Customer();
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // submit form
  submitCustomer(){
    this.customer.joinDate = this.customerService.joinDate();
    this.customer.id =  this.createId();
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      res => {
        this.alertStatus('Customer Added',200);
        console.log(res);
        this.addNewCustomerToArray(res);
        // close modal
        this.modalReference.close();
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  addNewCustomerToArray(res){
    this.customer.regNo = res['name'];
    this.filterCustomerArray.splice(0,0,this.customer);
  }

  createId(){
    return Math.floor(Math.random()*1000) + 1;
  }

  // init edit

  initEdit(content,data){
    this.alertStatus('',0);
    this.extra.edit = true;
    this.customer = new Customer();

    this.customer = data;
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // update data
  updateCustomer(){
    console.log(this.customer);
    // http call
    this.customerService.updateCustomer(this.customer,this.customer['regNo']).subscribe(
      res =>{
        this.alertStatus('Customer Updated',200);
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
    this.extra.index = this.filterCustomerArray.indexOf(data);
    console.log(this.extra.index);
    this.customer = data;
// open modal
    this.modalReference =  this.modalService.open(content);
  }

  archiveCustomer(){
    console.log(this.customer);
    this.removeFromArray();
    // http call
    this.customerService.archiveCustomer(this.customer['regNo']).subscribe(
      res =>{
        this.alertStatus('Customer Deleted',200);
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
    this.filterCustomerArray.splice(this.extra.index,1);
    this.customerArray.splice(this.extra.index,1);
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
