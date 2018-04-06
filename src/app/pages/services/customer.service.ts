import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';

@Injectable()
export class CustomerService {

  private path:string = 'customer';
  
    constructor(
      private http:HttpService
    ) { }
  
    getCustomer(){
      return this.http.get(this.path);
    }
  
    addCustomer(data){
      return this.http.add(data,this.path);
    }
  
    updateCustomer(data,key){
      let url = this.path+ '/' + key;
      return this.http.update(data,url);
    }
  
    archiveCustomer(key){
      let url = this.path+ '/' + key;
      return this.http.archive(url);
    }

    joinDate(){
      let a = new Date();
      return a.getFullYear()+'-'+
            ((a.getMonth()+1)>9?(a.getMonth()+1):'0'+(a.getMonth()+1))+'-'+
            (a.getDate()>9?a.getDate():'0'+a.getDate());
    }

    

}
