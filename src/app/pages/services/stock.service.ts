import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class StockService {

  private path:string = 'stock';
  
    constructor(
      private http:HttpService
    ) { }
  
    getStock(){
      return this.http.get(this.path);
    }
  
    addStock(data,p){
      let url = this.path +'/'+ p;
      return this.http.add(data,url);
    }
  
    updateStock(data,p,key){
      let url = this.path +'/'+ p + '/' + key;
      return this.http.update(data,url);
    }
  
    archiveStock(p,key){
      let url = this.path +'/'+ p + '/' + key;
      return this.http.archive(url);
    }

    formatStockData(data,prop){
      let arr = []
      for(let k of Object.values(data)){
        for(let key in k){
          if(k[key].sold==false){
            k[key][prop] = key;
            arr.push(k[key]);
          }
        }
      }
      return arr;
    }

    formatStockArray(data){
      let stocks = [];
      for(let k in data){
        let obj = {};
        obj['category'] = k;
        obj['items'] = [];
        for(let i of  Object.values(data[k])){
          if(i.sold==false) obj['items'].push(i);
        }
        stocks.push(obj);
      }
      return stocks;
    }

    makeStockObject(data){
      let stock = {};
      for(let k in data){
        stock[k]= [];
        for(let a in data[k]){
          data[k][a]['itemNo'] = a;
          stock[k].push(data[k][a]);
        }
      }
      return stock;
    }



}


