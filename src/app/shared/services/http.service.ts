import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpService {
  private baseUrl = 'https://garagesystem-952f1.firebaseio.com/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  add(data,urlPart){
    let url = this.baseUrl + urlPart + '.json';
    return this.http.post(url,data,this.httpOptions).map(response => response);
  }

  update(data,urlPart){
    let url = this.baseUrl + urlPart + '.json';
    return this.http.put(url,data,this.httpOptions).map(response => response);
  }

  get(urlPart){
    let url = this.baseUrl + urlPart + '.json';
    return this.http.get(url,this.httpOptions).map(response => response);
  }

  archive(urlPart){
    let url = this.baseUrl + urlPart + '.json';
    return this.http.delete(url,this.httpOptions).map(response => response);
  }

}
