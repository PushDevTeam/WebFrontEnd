import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
import {FBService} from './fb.service';
import {UserObj, IUserObj, UserService} from './user.service';
import {CustomAuthService} from './customauth.service';

@Injectable()
export class AuthService {
  constructor(private azureService: AzureService, 
              private fbService: FBService, 
              private customAuthService: CustomAuthService,
              private userService: UserService){

  }

  signUp(email: string, password: string) {

  }

  signIn(email: string, password: string) {

  }

  logout() {

  }

  getActiveUser() {

  }

  customAuthSignUp = (userobj: IUserObj) => {
    return this.customAuthService.userSignUp(userobj.email, userobj.password).then((response)=>{
      console.log('new user from user object \n AuthService.customAuthSignUp \n ', response, '\n', userobj);
      this.userService.storeUser(userobj);
    })
  }

  customAuthLogin = (userobj: IUserObj) => {
    return this.customAuthService.userLogin(userobj.email, userobj.password).then((response)=>{
      console.log("custom auth response after logging in \n AuthService.customAuthLogin \n ", response, '\n', userobj);
      this.userService.storeUser(userobj);
    }, (error)=>{console.log('error in customAuthLogin of customAuthService.userLogin() \n', error, '\n', userobj )});
  }

  fbAuthSignUp = (userobj: IUserObj) => {
    return this.facebookAuth(userobj);
  }


  facebookAuth = (userobj: IUserObj) => {
      return this.fbService.userLogin().then((response)=>{
        return this.fbService.getUserInfo().then((response)=>{
          console.log('response', response)
          userobj.email = response.email;
          userobj.name = response.name;
          userobj.password = 'facebook';
          userobj.profileimgurl = response.picture.data.url;
          userobj.gender = response.gender;
          this.userService.storeUser(userobj);
        })


      })
  }

}
