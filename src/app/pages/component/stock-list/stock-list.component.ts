import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stock';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Extra } from '../../models/extraModel';
import { Pagination } from '../../models/pagination';
import { ValidationService } from '../../../shared/services/validation.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stock:Stock;
  private modalReference: NgbModalRef;
  public extra:Extra;
  public pagi:Pagination;
  public prop:string = '';
  public reverse:boolean = false; 
  public stockArray:Stock[] = [];
  public filterStockArray:Stock[] = [];

  constructor(
    private modalService:NgbModal,
    public validation:ValidationService,
    private stockService: StockService
  ) {
    this.stock = new Stock();
    this.extra = new Extra();
    this.pagi = new Pagination();
   }

  ngOnInit() {
    window.resizeTo(0,0);
    this.getAllStock();
  }

  // get Stock
  getAllStock(){
    this.stockService.getStock().subscribe(
      res => {
        this.stockArray = this.stockService.formatStockData(res,'itemNo');
        this.filterStockArray = this.stockArray;
        console.log(res,this.stockArray);
        this.pagi.totalItem = this.stockArray.length;
      },
      err => console.log(err)
    );
  }

  trackByStock(index,Stock){
    return Stock? Stock.id:undefined;
  }
  // pagination

  pageChange(page){
    this.pagi.page = page;
  }

  // init add
  initAdd(content){
    this.alertStatus('',0);
    this.extra.edit = false;
    this.stock = new Stock();
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // submit form
  submitStock(){
    this.stock.id =  this.createId();
    console.log(this.stock);
    this.stockService.addStock(this.stock,this.stock.category).subscribe(
      res => {
        this.alertStatus('Item Added',200);
        console.log(res);
        this.addNewStockToArray(res);
        // close modal
        this.modalReference.close();
      },
      err => {
        this.alertStatus('something wrong',404);
        console.log(err);
      }
    );
  }

  addNewStockToArray(res){
    this.stock.itemNo = res['name'];
    this.filterStockArray.splice(0,0,this.stock);
  }

  createId(){
    return Math.floor(Math.random()*1000) + 1;
  }

  // init edit

  initEdit(content,data){
    this.alertStatus('',0);
    this.extra.edit = true;
    this.stock = new Stock();

    this.stock = data;
    // open modal
    this.modalReference =  this.modalService.open(content);
  }

  // update data
  updateStock(){
    console.log(this.stock);
    // http call
    this.stockService.updateStock(this.stock,this.stock.category,this.stock.itemNo).subscribe(
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
    this.extra.index = this.filterStockArray.indexOf(data);
    console.log(this.extra.index);
    this.stock = data;
// open modal
    this.modalReference =  this.modalService.open(content);
  }

  archiveStock(){
    console.log(this.stock);
    this.removeFromArray();
    // http call
    this.stockService.archiveStock(this.stock.category,this.stock.itemNo).subscribe(
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
    this.filterStockArray.splice(this.extra.index,1);
    this.stockArray.splice(this.extra.index,1);
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
