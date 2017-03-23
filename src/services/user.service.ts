import {Injectable} from '@angular/core';



@Injectable()
export class UserService {
  private counter : number = 0;
  constructor() {

  }


  count(){
    console.log(++this.counter);
  }
}
