import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class CarService {

  private path:string = 'cars';
  
    constructor(
      private http:HttpService
    ) { }
  
    getCar(){
      return this.http.get(this.path);
    }
  
    addCar(data){
      return this.http.add(data,this.path);
    }
  
    updateCar(data,key){
      let url = this.path + '/' + key;
      return this.http.update(data,url);
    }
  
    archiveCar(key){
      let url = this.path + '/' + key;
      return this.http.archive(url);
    }

    addIncomeData(data){
      let url = 'income';
      return this.http.add(data,url);
    }

    formatCarArray(res){
      let cars = [];
      for(let c in res){
        if(res[c].checkOut==false){
          res[c]['carRegNo'] = c;
          cars.push(res[c]);
        }
      }
      return cars;
    }

    formatDate(){
      let a = new Date();
      return a.getFullYear()+'-'+
            ((a.getMonth()+1)>9?(a.getMonth()+1):'0'+(a.getMonth()+1))+'-'+
            (a.getDate()>9?a.getDate():'0'+a.getDate());
    }


    printCheckOut(data){
      let html = `
      <div style="margin:10px 15px">
        <h4><b>Total Price: </b> ${data.totalPrice}</h4>
        <h4><b>Service Chagre: </b> ${data.serviceCharge}</h4>
      </div>
      <div style="margin:0px 20px ">
          <h4>Car Info</h4>
            <ul class="list-group">
              <li class="list-group-item"><b>Car Reg No: </b>${data.car.carRegNo}</li>
              <li class="list-group-item"><b>Customer Reg No: </b>${data.car.customer.regNo}</li>
              <li class="list-group-item"><b>Customer Name: 
              </b>${data.car.customer.firstName} ${data.car.customer.lastName}</li>
              <li class="list-group-item"><b>Brand: </b>${data.car.brand} (${data.car.model})</li>
              <li class="list-group-item"><b>Entry Date: </b>${data.car.entryDate}</li>
              <li class="list-group-item"><b>Checkout Date: </b>${data.checkOutDate}</li>
            </ul>
      </div>
      <div class="row" style="margin:10px 15px">
        <div class="col">
          <h4> Items </h4>
          <ul class="list-group">
            <li class="list-group-item">
              <div class="row">
                <p class="col-4"><b>Category</b></p>
                <p class="col-4"><b>Item No</b></p>
                <p class="col-4"><b>Price</b></p>
              </div>
              ${this.itemsHtml(data.itemSold)}
            </li>
          </ul>
        </div>
      </div>
      
      `;
      this.createHtml(html);
    }

    private itemsHtml(data){
      let html = '';
      for(let i of data){
        html += `
        <div class="row">
          <p class="col-4">${i.category}</p>
          <p class="col-4">${i.itemNo}</p>
          <p class="col-4">${i.sellPrice}</p>
        </div>
        `
      }
      return html;
    }

    private createHtml(html){
      let w = window.open();
      w.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Invoice</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      </head>
      <body style="margin:15px;">
      <div class="container">
        <div class="card" style="margin-top:80px;">
          <div class="card-body"
      `);
      w.document.write(html);
      w.document.write(`
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
      `);
      w.document.close();
      w.onload=()=>{ // necessary if the div contain images
        w.focus(); // necessary for IE >= 10
        w.print();
        w.close();
      };
    }

    

}
