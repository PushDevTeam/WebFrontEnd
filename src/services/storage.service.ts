
import {Injectable} from '@angular/core';


@Injectable()
export class StorageService {


  constructor(){

  }

  public setItem (keyword:string, value:any){
    window.localStorage.setItem(keyword, JSON.stringify(value));
  }


  public getItem (keyword:string) {
    return JSON.parse(window.localStorage.getItem(keyword));
  }
}
