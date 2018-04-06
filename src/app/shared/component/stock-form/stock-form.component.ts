import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../../../pages/models/stock';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  @Input('stock') stock:Stock;

  constructor(
    public validation:ValidationService
  ) { }

  ngOnInit() {
  }

}
