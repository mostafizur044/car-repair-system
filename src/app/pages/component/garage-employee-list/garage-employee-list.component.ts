import { Component, OnInit } from '@angular/core';
import {NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { ValidationService } from '../../../shared/services/validation.service';
import { Extra } from '../../models/extraModel';
import { EmployeeService } from '../../services/employee-service.service';
import { Pagination } from '../../models/pagination';




@Component({
  selector: 'app-garage-employee-list',
  templateUrl: './garage-employee-list.component.html',
  styleUrls: ['./garage-employee-list.component.css'],
  providers:[ NgbModal]
})
export class GarageEmployeeListComponent implements OnInit {
  public employee:Employee;
  private modalReference: NgbModalRef;
  public extra:Extra;
  public employeeArray:Employee[] = [];
  public filterEmpArray:Employee[] = [];
  public pagi:Pagination;
  public prop:string = '';
  public reverse:boolean = false; 

  constructor(
    private modalService:NgbModal,
    public validation:ValidationService,
    private empService:EmployeeService
  ) { 
    this.employee = new Employee();
    this.extra = new Extra();
    this.pagi = new Pagination();
  }

  ngOnInit() {
    this.getEmployee();
  }

  // get Employee
  getEmployee(){
    this.empService.getEmployee().subscribe(
      res => {
        this.employeeArray = this.validation.insertKeyInObject(res);
        this.filterEmpArray = this.employeeArray;
        console.log(res,this.employeeArray);
        this.pagi.totalItem = this.employeeArray.length;
      },
      err => console.log(err)
    );
  }

  trackByEmp(index,employee){
    return employee? employee.id:undefined;
  }
  // pagination

  pageChange(page){
    this.pagi.page = page;
  }

  // init add
  initAdd(content) {
    this.employee = new Employee();
    this.extra.edit = false;

    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // submit employee
  submitEmployee(){
    this.employee.id = this.createEmployeeId();
    console.log(this.employee);
    // http call
    this.empService.addEmployee(this.employee).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    // close modal
    this.modalReference.close();
  }

  createEmployeeId(){
    return Math.floor((Math.random() * 1000) + 1);
  }

  // edit Employee
  initEdit(content,data){
    this.employee = new Employee();
    this.extra.edit = true;
    console.log(data);
    this.employee = data;

    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // update Employee
  updateEmployee(){
    console.log(this.employee);
    // http call
    this.empService.updateEmployee(this.employee,this.employee['key']).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    // close modal
    this.modalReference.close();
  }

  // init delete
  initArchive(content,data){
    this.extra.index = this.filterEmpArray.indexOf(data);
    console.log(this.extra.index);
    this.employee = data;
// open modal
    this.modalReference =  this.modalService.open(content);
  }

  // submit archive
  archiveEmployee(){
    console.log(this.employee);
    this.removeFromArray();
    // http call
    this.empService.archiveEmployee(this.employee['key']).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    // close modal
    this.modalReference.close()
  }

  removeFromArray(){
    this.filterEmpArray.splice(this.extra.index,1);
    this.employeeArray.splice(this.extra.index,1);
  }

  // sorting
  sortTable(data,propName,date?:boolean){
    this.prop = propName;
    this.reverse = !this.reverse;
    this.validation.sortArray(data,this.prop,this.reverse,date);
  }

}
