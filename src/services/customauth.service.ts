import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
import {IUserObj, UserService} from './user.service';

import * as SimpleCrypt from 'simplecrypt';

//do not change these values or all passwords in database will be lost
//encryption layer for data transfer
let cryptpw = "269c8e93-047c-4064-a89f-fbce1e38511f";
let cryptosalt = "32e33f92-332e-4e22-bc21-94cecbd8b4c5";

/**
 * ACG 4/2/17
 * 
 * Used for client side interaction with the PUSH custom authentication API
 * **/
@Injectable()
export class CustomAuthService {
    private _user: IUserObj;

    constructor(private azureService: AzureService, private userService: UserService){}

    userLogin = (userobj: IUserObj) => {
        this._user = userobj;
        return this.azureService.client.invokeApi('Auth', {method: 'POST', body: {username: userobj.email, password: userobj.password, type: userobj.authtype}})
        .then(this.authSuccess, this.authError);
    }

    userSignUp = (userobj: IUserObj) => {
        this._user = userobj;
        return this.azureService.client.invokeApi('Auth', {method: 'PUT', body: {username: userobj.email, password: userobj.password, type: userobj.authtype}})
        .then(this.authSuccess, this.authError);
    }
    authSuccess = (resp) => {
        this.userService.storeUser(resp);
        //console.log('custom auth response \n', resp);
       //#console.log('\n resp.status \n', resp.status, '\n resp.statusText \n', resp.statusText, '\n resp.result.token \n', resp.result.token);
        
        //resp.status;
        //resp.statusText;
        //resp.result.token;

    }
    authError = (error: Error) => {
       //#console.log('authError \n');
       //#console.log('error.name \n', error.name, '\n error.message \n', error.message, '\n error.stack \n', error.stack);
    }
}
