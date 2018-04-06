import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stock';
import { StockService } from '../../services/stock.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { Extra } from '../../models/extraModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  public stock:Stock;
  public extra:Extra;

  constructor(
    private stockService:StockService,
    public validation:ValidationService,
    private router:Router
  ) { 
    this.stock = new Stock();
    this.extra = new Extra();
  }

  ngOnInit() {
  }

  submitStock(){
    this.stock.id = Math.floor(Math.random()*1000)+1;
    console.log(this.stock);
    this.stockService.addStock(this.stock,this.stock.category).subscribe(
      res =>{
        this.alertStatus('Item Added',200);
        console.log(res);
        this.router.navigate(['/stock-list']);
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
