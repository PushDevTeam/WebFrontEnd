
import {Injectable} from '@angular/core';
import {IVideoInfoObj} from '../components/video-thumbnail/video-info-obj';

import * as WindowsAzure from 'azure-mobile-apps-client';

import { Http, Response } from '@angular/http';
//declare var WindowsAzure: any;
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
        this._isloadingvideos = true;
        return this.http.get('/api/videos').toPromise().then((resp)=>{
            console.log('/api/videos resp', resp);
            this._videoinfos = resp.json();
            console.log('this._videoinfos', this._videoinfos);
            this._isdoneloadingvideos = true;
            this._isloadingvideos = false;
            this._isinitialized = true;
        })
    }
/*
    _initVideos = () => {
        let slider1 = "https://pushdaily.blob.core.windows.net/asset-26a078e2-1362-4a31-8fcf-e5cdb0fde7c6/Home_Slider_One.jpg?sv=2015-07-08&sr=c&si=1efcac16-cb10-47c7-92ff-e155c9bfb804&sig=NcJ9srvRcKBc0IDsY3fs7xU0oyas7tM4FobKksofLo4%3D&st=2017-04-03T07%3A53%3A07Z&se=2117-04-03T07%3A53%3A07Z"
        let slider2 = "https://pushdaily.blob.core.windows.net/asset-35c4c78e-e123-43bd-aff2-d04800a54fbc/Home_Slider_Two.jpg?sv=2015-07-08&sr=c&si=41dc0961-ff61-44e0-8658-0e5ae59bbab3&sig=2FBnOPPWGbZEYk7Lh3Or0Y4JGJrL33vhNpruLffetL0%3D&st=2017-04-03T07%3A52%3A52Z&se=2117-04-03T07%3A52%3A52Z"
        let slider3 = "https://pushdaily.blob.core.windows.net/asset-0b0c8d31-c327-4d52-a3d6-d5b372cfa963/Home_Slider_Three.jpg?sv=2015-07-08&sr=c&si=3620dbe6-5622-48da-99da-619b55fa8170&sig=kmG4CtBpmYGH5mARoe%2FDP4DoCQth6pApGWrivUF6puM%3D&st=2017-04-03T07%3A53%3A01Z&se=2117-04-03T07%3A53%3A01Z";
        let id1 = "0d65a51b-c042-4cc5-b932-afe844d6533a";
        let id2 = "160d73dd-f4ec-4efa-9e44-b576b3aeedee";
        let id3 = "2c676648-bf0e-48b6-b1a5-12dc7aedb54c";
        let itemstoupdate = [{'id': id1, 'thumbUrl': slider1}, {'id': id2, 'thumbUrl': slider2}, {'id': id3, 'thumbUrl': slider3}];
        for (let i=0; i < itemstoupdate.length; i++){
            //this.updateTableItem('FeaturedVideo', itemstoupdate[i]);
        }

    }*/

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
            console.log(resp);
            return resp;
        })
}
    getFeaturedVideoIds = (): Promise<Array<string>> => {
        //this._featuredvideoids = ['0d65a51b-c042-4cc5-b932-afe844d6533a','160d73dd-f4ec-4efa-9e44-b576b3aeedee','2c676648-bf0e-48b6-b1a5-12dc7aedb54c'];
        return Promise.resolve(this.featuredvideoids);
    }

    loadVideos = () => {
        return this.getVideos();/*
        if (!this.isdoneloadingvideos && !this.isloadingvideos) {
            //return this._loadVideos();
            return this.getVideos();
        }
        else {

            return Promise.resolve(this.videoinfos);
            //return this.videoinfos;
            //return new Promise(()=>{return this.videoinfos});
        }*/
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
