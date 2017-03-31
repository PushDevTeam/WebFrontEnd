
import {Injectable} from '@angular/core';


@Injectable()
export class StorageService {


  constructor(){

  }

  public set(keyName:string, value:any){
    window.localStorage.setItem(keyName, JSON.stringify(value));
  }
  public get(keyName:string) {
    return JSON.parse(window.localStorage.getItem(keyName));
  }
  public remove(keyName:string) {
    window.localStorage.removeItem(keyName);
  }
}
