import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import { NgForm } from "@angular/forms";

class UserObj{
  public id:number;
  public username:string;
  public password:string;
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

    this.initialize();
  }

  initialize(){
    //mock initialize
    this.loadStoredUser().then((user_v) => {
      this.user = JSON.parse(user_v);
      if(this.user === undefined){
        console.log("initialize user w mock data");
        var tmp = new UserObj();
        tmp.id = 0;
        tmp.username = "eddie_lacy27";
        tmp.password = "password1";
        this.storageService.set('user',JSON.stringify(tmp));
        //this.loadStoredUser();
      }
    });



    console.log("user service finished init");
    //console.log(this.user);
  }


  public getUsername(){return this.user.username;}

  private loadStoredUser(){
    return this.storageService.get('user');
  }
  public storeUser(user:UserObj){
    return this.storageService.set('user',JSON.stringify(user));
  }
  public createUser(form:NgForm){
    var save_user = new UserObj();
    save_user.id = 0;
    save_user.username = form.value.email;
    save_user.password = form.value.password;

    this.storeUser(save_user);
    this.user = save_user;
  }
}
