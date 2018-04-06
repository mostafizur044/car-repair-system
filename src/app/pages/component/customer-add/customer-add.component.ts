import { Component, AfterViewInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Extra } from '../../models/extraModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements AfterViewInit {

  public customer:Customer;
  public extra:Extra;

  constructor(
    private customerService: CustomerService,
    private router:Router
  ) {
    this.customer = new Customer();
    this.extra = new Extra();
   }

  ngAfterViewInit() {
    window.resizeTo(0,0);
  }

  submitCustomer(){
    this.customer.joinDate = this.customerService.joinDate();
    this.customer.id =  this.createId();
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      res => {
        this.extra.code = 200;
        this.extra.status = 'Customer Successfully Added'
        console.log(res);
        this.router.navigate(['/customer-list']);
      },
      err => {
        this.extra.code = 404;
        this.extra.status = 'Something went wrong'
        console.log(err);
      }
    );
  }

  createId(){
    return Math.floor(Math.random()*1000) + 1;
  }

}
