import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
import {FBService} from './fb.service';
import {UserObj, UserService} from './user.service';

@Injectable()
export class AuthService {
  constructor(private azureService: AzureService, private fbService: FBService, private userService: UserService){

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

      return this.fbService.userLogin().then((response)=>{
        this.fbService.getUserInfo().then((response)=>{
          console.log('response', response)
          let user = new UserObj();
          user.email = response.email;
          //user.username = response.name;
          user.password = '';
          user.id = response.third_party_id;
          user.profileimgurl = response.picture.data.url;
          user.gender = response.gender;
          this.userService.storeUser(user).then((success)=>{
            console.log(success);
          })
        })


      })
  }

}
