import { Component, Input } from '@angular/core';
import { Customer } from '../../../pages/models/customer';
import { ValidationService } from '../../services/validation.service';


@Component({
  selector: 'cutomer-form',
  templateUrl: './cutomer-form.component.html',
  styleUrls: ['./cutomer-form.component.css']
})
export class CutomerFormComponent {

  @Input('customer') customer:Customer;

  constructor(
    public validation: ValidationService
  ) { }


}
