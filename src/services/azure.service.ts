
import {Injectable} from '@angular/core';
import {IVideoInfoObj} from '../components/video-thumbnail/video-info-obj';

import * as WindowsAzure from 'azure-mobile-apps-client';

import { Http, Response } from '@angular/http';
import {environment} from '../classes/environ.class';
/**
 * ACG 3/29/17
 *
 * Used for client side interaction with the Azure API
 * **/
@Injectable()
export class AzureService {

    private _isinitialized = false;
    private _isloadingvideos = false;
    private _isdoneloadingvideos = false;

    private _videoinfos: Array<IVideoInfoObj>;
    private _client: any;
    private _azurepath: string = 'https://pushdaily-api.azurewebsites.net';
    private _featuredvideoids: Array<string> = ['0d65a51b-c042-4cc5-b932-afe844d6533a','160d73dd-f4ec-4efa-9e44-b576b3aeedee','2c676648-bf0e-48b6-b1a5-12dc7aedb54c'];
    private _videourl: any;
    private _videothumburl: any;
    private _videobase: any;
    private _videotag: any;
    private _videofeatured: any;



    constructor(public http: Http){
    }

    getVideos = (): Promise<any> => {
        if (this._isloadingvideos){
            
        }
        this._isloadingvideos = true;
        return this.http.get(environment.apiPath + '/videos').toPromise().then((resp)=>{
            this._videoinfos = resp.json();
            //console.log('this._videoinfos', this._videoinfos);
            this._isdoneloadingvideos = true;
            this._isloadingvideos = false;
            this._isinitialized = true;
        }, (reason:any)=>{
           //#console.log('error getting videos', reason);
            this._isdoneloadingvideos = true;
            this._isloadingvideos = false;
            this._isinitialized = false;
        })
    }
    
    updateTableItem = (tablename: string, updateitem: any): Promise<any> => {
        let table = this.client.getTable(tablename);
        return table.update(updateitem).done((updateditem)=> {console.log('update item success \n tablename: ' + tablename + ' \n', updateitem);});
    }
    setNewTableItem = (tablename: string, newitem: any): Promise<any> => {
        let table = this.client.getTable(tablename);
        return table.insert(newitem).done((insertedItem) => {console.log('setter success \n tablename: ' + tablename, insertedItem);});
    }

    postVideoFeedback = (video_id: string, rating: string, comment: string = '') => {
        let post = {'rating': rating, 'video_id': video_id, 'freeform_comment': comment};
        return this.setNewTableItem('VideoFeedback', post);
    }

    getAllVideoFeedback = () => {
        return this.queryTable('VideoFeedback').then((resp)=>{
            //console.log(resp);
            return resp;
        })
}
    getFeaturedVideoIds = (): Promise<Array<string>> => {
       return Promise.resolve(this.featuredvideoids);
    }

    loadVideos = () => {
        return this.getVideos();
    }
    queryTable(string: string){
        return Promise.resolve();
    }
    get client(){ return this._client };
    get azurepath() {return this._azurepath};
    get featuredvideoids() {return this._featuredvideoids};
    get videoinfos() {return this._videoinfos};

    get isinitialized() {return this._isinitialized};
    get isdoneloadingvideos() { return this._isdoneloadingvideos };
    get isloadingvideos() {return this._isloadingvideos };
}
