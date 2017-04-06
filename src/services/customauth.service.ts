import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
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

    constructor(private azureService: AzureService){}

    userLogin = (username: string, password: string) => {
        let encrypttosend = SimpleCrypt({password: cryptpw, salt: cryptosalt}).encrypt(password);
        return this.azureService.client.invokeApi('Auth', {method: 'POST', body: {username: username, password: password}})
        .then(this.authSuccess, this.authError);
    }

    userSignUp = (username: string, password: string) => {
        let self = this;
        let encrypttosend = SimpleCrypt({password: cryptpw, salt: cryptosalt}).encrypt(password);
        return this.azureService.client.invokeApi('Auth', {method: 'PUT', body: {username: username, password: password}})
        .then(self.authSuccess, self.authError);
    }
    authSuccess = (resp) => {
            console.log('custom auth response \n', resp);
            console.log('windowsAzure.client \n', this.azureService.client);
        resp.status;
        resp.statusText;
        resp.result.token;

    }
    authError = (error) => {
        console.log('authError \n', error);
    }
}
