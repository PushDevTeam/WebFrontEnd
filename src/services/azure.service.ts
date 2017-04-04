
import {Injectable} from '@angular/core';
import {IVideoInfoObj, VideoInfoObj} from '../components/video-thumbnail/video-info-obj';

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
    private _featuredvideoids: Array<string> = [];
    private _videourl: any;
    private _videothumburl: any;
    private _videobase: any;
    private _videotag: any;
    private _videofeatured: any;



    constructor(public http: Http){
        
      this.connectAzure(WindowsAzure.MobileServiceClient);
      //this.testApi();
    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
        this._isinitialized = true;
        //this.testApi();
        //this._initVideos();
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
    testApi = () => {
        //this.client//
        //let TestAPI = this.http.get("https://pushdaily-api.azurewebsites.net/api/TestAPI").map((res:Response) => {res.json(); console.log('res.json()', res.json())});
        //console.log('TestAPI \n \n', TestAPI);

    }

    updateTableItem = (tablename: string, updateitem: any): Promise<any> => {
        let table = this.client.getTable(tablename);
        return table.update(updateitem).done((updateditem)=> {console.log('update item success \n tablename: ' + tablename + ' \n', updateitem);}, this.failure);
    }
    setNewTableItem = (tablename: string, newitem: any): Promise<any> => {
        let table = this.client.getTable(tablename);
        return table.insert(newitem).done((insertedItem) => {console.log('setter success \n tablename: ' + tablename, insertedItem);}, this.failure);
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
    getVideoUrls = (): Promise<Array<any>> => {
        return this.queryTable('VideoUrl').then((resp)=>{
            let returnable: Array<any> = [];
            for (let i = 0; i < resp.length; i++){
                let item = resp[i];
                let newitem = {};
                newitem['video_id'] = item['video_id'];
                newitem['resolution'] = item['resolution'];
                newitem['url'] = item['url1'] + item['resolution'] + item['url2'];
                returnable.push(newitem);
            }
            return returnable;
        })
    }

    getVideoThumbUrls = (): Promise<Array<any>> => {
        return this.queryTable('VideoThumbUrl').then((resp)=>{
            let returnable: Array<any> = [];
            for (let i = 0; i < resp.length; i++){
                let item = resp[i];
                let newitem = {};
                newitem['video_id'] = item['video_id'];
                newitem['thumb_url'] = item['thumb_url'];
                returnable.push(newitem);
            }
            return returnable;
        })
    }

    getFeaturedVideoIds = (): Promise<Array<string>> => {
        return this.queryTable('FeaturedVideo').then((resp)=>{
            console.log('FeaturedVideo all items \n', resp);
            let returnable: Array<string> = [];
            for (let i = 0; i < resp.length; i++){
                let item = resp[i];
                returnable.push(item.video_id);
            }
            //this._featuredvideoids = returnable;
            return returnable;
        })
    }

    loadVideos = () => {
        if (!this.isdoneloadingvideos) {
            this._isloadingvideos = true;
            return this._loadVideos();
        }
        else {
            
            return Promise.resolve(this.videoinfos);
            //return this.videoinfos;
            //return new Promise(()=>{return this.videoinfos});
        }
    }
    
    getFeaturedVideoThumb = (video_id: string) => {
        if (this._videofeatured.hasOwnProperty(video_id)){ return this._videofeatured[video_id].thumbUrl} else {return ''}
    }

    _loadVideos = (): Promise<Array<IVideoInfoObj>> => {
        let pvideo = this.queryTable('Video').then((videoresp)=>{
            let videobase = {};
            for (let i = 0; i < videoresp.length; i++){
                videobase[videoresp[i].id] = videoresp[i];
            }
            this._videobase = videobase;
            return videobase;
        });
        
        let pvideourl: Promise<any> = this.getVideoUrls().then((urlresp)=>{
            let videourl = {};
            for (let i = 0; i < urlresp.length; i++){
                videourl[urlresp[i].video_id] = urlresp[i];
            }
            this._videourl = videourl;
            return videourl;
        });

        let pvideothumburl: Promise<any> = this.getVideoThumbUrls().then((thumbresp)=>{
            let thumbsobj = {};
            for (let i = 0; i < thumbresp.length; i++){
                thumbsobj[thumbresp[i].video_id] = thumbresp[i];
            }
            this._videothumburl = thumbsobj;
            return thumbsobj;
        });

        let pvideotags: Promise<any> = this.getVideoUrlSuffixs().then((tagresp)=>{
            let videotagsobj = {};
            for (let i = 0; i < tagresp.length; i++){
                let id = tagresp[i].entity_id
                if (videotagsobj.hasOwnProperty(id)){
                    videotagsobj[id].push(tagresp[i].tag);
                } else {
                    videotagsobj[id] = [tagresp[i].tag];
                }
            }
            this._videotag = videotagsobj;
            return videotagsobj;
        });

        let pvideofeatured: Promise<any> = this.getVideoFeatured().then((featuredresp)=>{
            let videofeaturedobj = {};
            for (let i = 0; i < featuredresp.length; i++){
                let id = featuredresp[i].video_id;
                videofeaturedobj[id] = featuredresp[i];
            }
            this._videofeatured = videofeaturedobj;
            return videofeaturedobj;
        });
        return Promise.all([pvideo, pvideourl, pvideothumburl, pvideotags, pvideofeatured]).then(()=>{
            let returnable: Array<IVideoInfoObj> = [];
            let vbase = this._videobase;
            for (let video_id in vbase){
                let thisvideo = vbase[video_id];
                let featuredthumbnail = this.getFeaturedVideoThumb(video_id);
                let vobj: IVideoInfoObj = {
                    id: video_id,
                    videoUrl: this._videourl[video_id].url,
                    thumbUrl: this._videothumburl[video_id].thumb_url,
                    title: thisvideo.title,
                    trainer: thisvideo.trainer_id || 'DEFAULT TRAINER',
                    duration : thisvideo.duration || '*20:00',
                    difficulty: thisvideo.difficulty || 'Medium',
                    tags: this._videotag[video_id] || ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
                    description: thisvideo.description,
                    isfeatured: this._videofeatured.hasOwnProperty(video_id),
                    featureThumbUrl: featuredthumbnail
                }
                returnable.push(vobj);
            }
            this._videoinfos = returnable;
            this._isdoneloadingvideos = true;
            this._isloadingvideos = false;
            return returnable;
        })

    }
    getVideoFeatured = (): Promise<Array<any>> => {
        return this.queryTable('FeaturedVideo').then((resp)=>{
            return resp;
        })
    }
    getVideoUrlSuffixs = (): Promise<Array<any>> => {
        return this.queryTable('VideoUrlSuffix').then((resp)=>{
            return resp;
        })
    }

    getVideoTags = (): Promise<Array<any>> => {
        return this.queryTable('EntityTag').then((resp)=>{
            let returnable: Array<string> = [];
            for (let i=0; i < resp.length; i++){
                let item = resp[i];
                if (item.entity_type === 'video'){
                    returnable.push(item);
                }
            }
            return returnable;
        })
    }

    queryTable = (tablename: string) => {
        let table = this.client.getTable(tablename);
        return this.queryData(table);
    }


    failure(failinfo){ console.log('data operation failed', failinfo)};
    queryData = (table: any) => {
        /**
         * Process the results that are received by a call to table.read()
         *
         * @param {Object} results the results as a pseudo-array
         * @param {int} results.length the length of the results array
         * @param {Object} results[] the individual results
         */
        
            function success(results) {
                //var numItemsRead = results.length;
                let resp = [];
                for (var i = 0 ; i < results.length ; i++) {
                    var row = results[i];
                    resp.push(row);
                    // console.log('row', row)
                    // Each row is an object - the properties are the columns
                }
                return resp;
            }

            function failure(error) {
                return this.failure(error);
                //throw new Error('Error loading data: ');
            }

            return table.read().then(success, failure);
                }

    get client(){ return this._client };
    get azurepath() {return this._azurepath};
    get featuredvideoids() {return this._featuredvideoids};
    get videoinfos() {return this._videoinfos};

    get isinitialized() {return this._isinitialized};
    get isdoneloadingvideos() { return this._isdoneloadingvideos };
    get isloadingvideos() {return this._isloadingvideos };
}   
