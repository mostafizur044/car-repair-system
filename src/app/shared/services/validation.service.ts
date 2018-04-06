import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  checkNumber(num){
    if(isNaN(num)) return true;
    return false;
  }

  insertKeyInObject(res,prop?:string){
    let p = prop? prop:'key';
    let arr = [];
    for(let key in res){
      res[key][p] = key;
      arr.push(res[key]);
    }
    return arr;
  }

  // sorting methods

  private sortingstring(data,prop,asc){
    data.sort((a,b)=>{
      let numA = a[prop].toLowerCase(), numB = b[prop].toLowerCase();
      if(asc){
        if(numA<numB) return -1
        if(numA>numB) return 1
        return 0
      } else {
        if(numA>numB) return -1
        if(numA<numB) return 1
        return 0
      }
    });
  }

  private sortNumber(data,prop,asc){
    if(asc) data.sort((a,b)=> a[prop]-b[prop]);
    else data.sort((a,b)=> b[prop]-a[prop]);
  }

  private sortDate(data,prop,asc){
    data.sort((a,b)=>{
      let dateA = new Date(a[prop]).getTime();
      let dateB = new Date(b[prop]).getTime();

      if(asc) return dateA-dateB;
      else return dateB-dateA;

    });
  }

  sortArray(data,prop,asc,date?:boolean){
    if(date) this.sortDate(data,prop,asc)
    else {
      if(isNaN(data[0][prop])) this.sortingstring(data,prop,asc)
      else this.sortNumber(data,prop,asc)
    } 
  }

}
