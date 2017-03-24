
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  private store: Storage;

  constructor(storage: Storage){
    this.store = storage;
  }

  public set(keyword:string, value:any){
    return this.store.set(keyword, value);
  }

  public get(keyword:string) {

    return this.store.get(keyword);
  }
}
