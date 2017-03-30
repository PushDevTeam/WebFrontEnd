import {Injectable} from '@angular/core';
import {FacebookService, FacebookInitParams, FacebookLoginResponse} from 'ng2-facebook-sdk';

/**
 * ACG 3/29/17
 * 
 * Used for client side interaction with the Facebook API
 * **/
@Injectable()
export class FBService {
    private _appid: string = '1286594241432490';
    private _apiversion: string = 'v2.8'

    constructor(private fb: FacebookService){

        let initparams: FacebookInitParams = {  appId: this.appid,
                                                status: true, 
                                                cookie: true, 
                                                xfbml: true,
                                                version: this._apiversion };
        this.fb.init(initparams);
    }

    userLogin = () => {
        console.log('running facebook userLogin');
        return this.fb.login().then(
            (response: FacebookLoginResponse) => console.log(response),
            (error: any) => console.error(error)
        );
    }

    getUserFriends = () => {
        return this.fb.api('/me/friends').then((response)=>{console.log('getUserFriends response', response)})
    }

    getUserInfo = () => {
        return this.fb.api('/me', 'get', {fields: 'name,id,picture,email,gender,age_range,birthday,third_party_id'}).then((response)=>{console.log('FBService.getUserInfo response', response); return response;})
    }

    get appid() {return this._appid};
}