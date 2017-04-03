import {Injectable} from '@angular/core';
import {IVideoInfoObj, VideoInfoObj} from '../components/video-thumbnail/video-info-obj';

declare var WindowsAzure: any;
/**
 * ACG 3/29/17
 * 
 * Used for client side interaction with the Facebook API
 * **/
Injectable()
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



    constructor(){

      this.connectAzure(WindowsAzure.MobileServiceClient);
    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
        this._isinitialized = true;
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
                newitem['url'] = item['url1'] + item['url2'];
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

        return Promise.all([pvideo, pvideourl, pvideothumburl, pvideotags]).then(()=>{
            let returnable: Array<IVideoInfoObj> = [];
            let vbase = this._videobase;
            for (let video_id in vbase){
                let thisvideo = vbase[video_id];
                let vobj: IVideoInfoObj = {
                    id: video_id,
                    videoUrl: this._videourl[video_id].url,
                    thumbUrl: this._videothumburl[video_id].thumb_url,
                    title: thisvideo.title,
                    trainer: thisvideo.trainer_id || 'DEFAULT TRAINER',
                    duration : thisvideo.duration || '*20:00',
                    difficulty: thisvideo.difficulty || 'Medium',
                    tags: this._videotag[video_id] || ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7'],
                    description: thisvideo.description
                }
                returnable.push(vobj);
            }
            this._videoinfos = returnable;
            this._isdoneloadingvideos = true;
            this._isloadingvideos = false;
            return returnable;
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
