import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
import {FBService} from './fb.service';

@Injectable()
export class AuthService {
  constructor(private azureService: AzureService, private fbService: FBService){

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
    
    return this.fbService.userLogin();
  }

}
