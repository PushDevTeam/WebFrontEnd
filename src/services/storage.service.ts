
import {Injectable} from '@angular/core';


@Injectable()
export class StorageService {


  constructor(){

  }

  public set(keyword:string, value:any){
    window.localStorage.setItem(keyword, JSON.stringify(value));
  }


  public get(keyword:string) {
    return JSON.parse(window.localStorage.getItem(keyword));
  }
}
