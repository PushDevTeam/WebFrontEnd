import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import { NgForm } from "@angular/forms";

class UserObj{
  public id:number;
  public username:string;
  public password:string;
  public email: string;
}
/*
root module should be the ONLY provider of this service
in order to keep it a singleton

so don't add this to any providers[] arrays of components
*/
@Injectable()
export class UserService {
  private user: UserObj;

  constructor(
    private storageService: StorageService,
  ) {

  }

  public loadStoredUser(): Promise<boolean>{

    return this.getStoredUser().then((user_v) => {
      this.user = JSON.parse(user_v);
      console.log(this.user);
      if(this.user === null){
        return false
      }
      return true;
    }, err => {
      return false;
    });
  }


  public getUsername(){return this.user.username;}
  public getEmail(){return this.user.email;}

  public getStoredUser(){
    return this.storageService.get('user');
  }
  
  public storeUser(user:UserObj){
    return this.storageService.set('user',JSON.stringify(user));
  }
  public createUser(form:NgForm){
    var save_user = new UserObj();
    save_user.id = 0;
    save_user.email = form.value.email;
    save_user.password = form.value.password;
    save_user.username = "mock_username";

    this.storeUser(save_user);
    this.user = save_user;
  }
}
