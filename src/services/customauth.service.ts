import {Injectable} from '@angular/core';
import {AzureService} from './azure.service';
/**
 * ACG 4/2/17
 * 
 * Used for client side interaction with the push daily custom authentication API
 * **/
@Injectable()
export class CustomAuthService {

    constructor(private azureService: AzureService){}

    userLogin = (username: string, password: string) => {
        console.log('running custom auth userLogin');
        return this.azureService.client.invokeApi('Auth', {method: 'POST', body: {username: username, password: password}})
        .then((resp)=>{
            console.log('custom auth login response! \n', resp);
            console.log('windowsAzure.client \n', this.azureService.client);
            
            this.azureService.client.login('JKW', {'access_token': resp.result.token}).then((azureresponse)=>{
                console.log('azure authentication with custom auth \n', azureresponse);
            });
            
        });
    }

    userSignUp = (username: string, password: string) => {
        console.log('running custom auth user sign up');
        return this.azureService.client.invokeApi('Auth', {method: 'PUT', body: {username: username, password: password}})
        .then((resp)=>{
            console.log('custom auth sign up response \n', resp);
            
            this.azureService.client.login('JKW', {'access_token': resp.result.token}).then((azureresponse)=>{
                console.log('azure login with custom auth response \n', azureresponse);
            });
            
        });
    }
}
