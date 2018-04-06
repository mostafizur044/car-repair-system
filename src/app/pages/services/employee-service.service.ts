import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()
export class EmployeeService {
  private path:string = 'employee';

  constructor(
    private http:HttpService
  ) { }

  getEmployee(){
    return this.http.get(this.path);
  }

  addEmployee(data){
    return this.http.add(data,this.path);
  }

  updateEmployee(data,key){
    let url = this.path+ '/' + key;
    return this.http.update(data,url);
  }

  archiveEmployee(key){
    let url = this.path+ '/' + key;
    return this.http.archive(url);
  }


}
