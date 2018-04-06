import { Component, OnInit ,Input, EventEmitter, Output} from '@angular/core';
import { Car } from '../../../pages/models/car';
import { Customer } from '../../../pages/models/customer';

@Component({
  selector: 'car-form',
  templateUrl: './car-for.component.html',
  styleUrls: ['./car-for.component.css']
})
export class CarForComponent implements OnInit {

  @Input('car') car:Car;
  @Input('cusReg') cusReg:string;
  @Input('customerArray') customerArray:Customer[];
  @Output('changeCustomer') change:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeCustomer(cus){
    this.change.emit(cus);
  }

}
