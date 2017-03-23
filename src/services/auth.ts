import {Injectable} from '@angular/core';
import {MainData} from './azure.service';


@Injectable()
export class AuthService {
  constructor(private maindata: MainData){

  }

  signUp(email: String, password: string) {

  }

  signIn(email: String, password: string) {

  }

  logout() {

  }

  getActiveUser() {

  }

  facebookAuth = () => {
    return this.maindata.client.login('facebook');
  }

  googleAuth = () => {
    //not configured on back end yet
    return this.maindata.client.login('google');
  }
}
