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
    private _client: any;
    private _azurepath: string = 'https://pushdaily-api.azurewebsites.net';
    private _featuredvideoids: Array<string> = [];
    private _videourl: any;
    private _videothumburl: any;
    private _videobase: any;
    private _videotag: any;


    constructor(){

      this.connectAzure(WindowsAzure.MobileServiceClient);
      //this._initData();
    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
        this._isinitialized = true;
        //console.log('connected azure client', this.client);
    }

    _initData = () => {
        //video_id - 
        //core basics: 3da38c6a-feed-4c42-9d83-c31f501fbca5
        //starting strength: 60805857-5031-47a3-b531-410b7504431e
        //bodyweight intermediate: 9ea0466a-aef1-4618-9a33-f9ed60fa626b
        //nv now hiit: ae2f89d0-8436-45e1-9f59-97189dbdaea5
        //fall 2015 hiit: f6b4929b-c615-4151-a58a-573e30df8bf2

        //thumbnail urls -
        //starting strength: https://pushdaily.blob.core.windows.net/asset-d009e52e-1fad-4197-93d1-805476797019/PUSH_Video_Thumb_StartingStrengthLvl1.jpg?sv=2015-07-08&sr=c&si=9eacaf72-574f-49a9-8a62-8ca4a9c6a09c&sig=gnnPh6bO6rqBBwFuxzOL2mNIin6BDwvIl4aPMSP2Xt4%3D&st=2017-04-02T00%3A04%3A23Z&se=2117-04-02T00%3A04%3A23Z
        //hiit: https://pushdaily.blob.core.windows.net/asset-0f658369-5c90-4cf4-a791-4bd94187a578/PUSH_Video_Thumb_HIIT.jpg?sv=2015-07-08&sr=c&si=054fecc4-2010-42d7-980f-eadbffa049ea&sig=1yy8ciGoGzQ2Wy1iYjJCVbxTqC5u%2FhYsYBZU%2B5WSZbU%3D&st=2017-04-02T00%3A09%3A49Z&se=2117-04-02T00%3A09%3A49Z
        //core basics: https://pushdaily.blob.core.windows.net/asset-826a9f47-5913-4a4a-b183-35b6934c4249/PUSH_Video_Thumb_CoreBasics.jpg?sv=2015-07-08&sr=c&si=2e4520b0-cf85-4f8b-9611-bcc44633ef25&sig=YwJxfg%2BoY9heGj%2BYTUq7x%2BxIjMJItH6Ui3NjkJ6Xf3o%3D&st=2017-04-02T00%3A10%3A22Z&se=2117-04-02T00%3A10%3A22Z
        //bodyweight intermediate: https://pushdaily.blob.core.windows.net/asset-bcc5a587-0e9b-49a8-bff8-063b73162db7/PUSH_Video_Thumb_Bodyweight_Intermediate.jpg?sv=2015-07-08&sr=c&si=2b6f1121-d3ca-44c0-b2fa-822e20401135&sig=iYOimzLIotCtUFHjfFe6Z0M%2FqjxcMw%2BLQUqO5YuUBo4%3D&st=2017-04-02T00%3A10%3A45Z&se=2117-04-02T00%3A10%3A45Z
        


        let guid1 = "3da38c6a-feed-4c42-9d83-c31f501fbca5";
        let guid2 = "60805857-5031-47a3-b531-410b7504431e";
        let guid3 = "9ea0466a-aef1-4618-9a33-f9ed60fa626b";
        let guid4 = "ae2f89d0-8436-45e1-9f59-97189dbdaea5";
        let guid5 = "f6b4929b-c615-4151-a58a-573e30df8bf2";

        let thumburl1 = "https://pushdaily.blob.core.windows.net/asset-0f658369-5c90-4cf4-a791-4bd94187a578/PUSH_Video_Thumb_HIIT.jpg?sv=2015-07-08&sr=c&si=054fecc4-2010-42d7-980f-eadbffa049ea&sig=1yy8ciGoGzQ2Wy1iYjJCVbxTqC5u%2FhYsYBZU%2B5WSZbU%3D&st=2017-04-02T00%3A09%3A49Z&se=2117-04-02T00%3A09%3A49Z";
        let thumburl2 = thumburl1;
        let thumburl3 = "https://pushdaily.blob.core.windows.net/asset-d009e52e-1fad-4197-93d1-805476797019/PUSH_Video_Thumb_StartingStrengthLvl1.jpg?sv=2015-07-08&sr=c&si=9eacaf72-574f-49a9-8a62-8ca4a9c6a09c&sig=gnnPh6bO6rqBBwFuxzOL2mNIin6BDwvIl4aPMSP2Xt4%3D&st=2017-04-02T00%3A04%3A23Z&se=2117-04-02T00%3A04%3A23Z";
        let thumburl4 = "https://pushdaily.blob.core.windows.net/asset-bcc5a587-0e9b-49a8-bff8-063b73162db7/PUSH_Video_Thumb_Bodyweight_Intermediate.jpg?sv=2015-07-08&sr=c&si=2b6f1121-d3ca-44c0-b2fa-822e20401135&sig=iYOimzLIotCtUFHjfFe6Z0M%2FqjxcMw%2BLQUqO5YuUBo4%3D&st=2017-04-02T00%3A10%3A45Z&se=2117-04-02T00%3A10%3A45Z";
        let thumburl5 = thumburl1;

        let url11 = "https://pushdaily.blob.core.windows.net/asset-bef5963b-10f7-492d-a191-78e4aa0b7121/Fall 2015 HIIT Workout_"
        let url12 = ".mp4?sv=2015-07-08&sr=c&si=90de2574-b4da-4878-ae28-3f8d24fd8948&sig=R41OTKvoQ0hZta%2FogzmoCwKOjUtNW4XoB%2FW5L%2F%2FiZLE%3D&st=2017-04-01T20%3A10%3A13Z&se=2117-04-01T20%3A10%3A13Z";
        let url21 = "https://pushdaily.blob.core.windows.net/asset-2f6b4354-3949-4ce3-984b-a9206c486b61/NV NOW HIIT Workout Short Edit (_"
        let url22 = ".mp4?sv=2015-07-08&sr=c&si=f0a35ee1-cbc1-4d80-82e6-a6b7f44f0e8c&sig=%2Bu8UeEWP4NbpZAq%2BtYvlTob4hTIJSZ6kdynTGIu451M%3D&st=2017-04-01T20%3A10%3A37Z&se=2117-04-01T20%3A10%3A37Z";
        let url31 = "https://pushdaily.blob.core.windows.net/asset-472513ba-485f-466b-a1a7-c2cc1f9e4d85/Starting Strength - Level 1_"
        let url32 = ".mp4?sv=2015-07-08&sr=c&si=057a484d-2d56-4eae-bb01-d5a187f164fb&sig=futKCVtW2l9Vor8npTvjPbfTDzeXtXQF6Uq2oqrdo70%3D&st=2017-03-31T07%3A11%3A36Z&se=2117-03-31T07%3A11%3A36Z";
        let url41 = "https://pushdaily.blob.core.windows.net/asset-0f770764-7c73-412b-bbe0-82d70648f35b/Bodyweight Intermediate_"
        let url42 = ".mp4?sv=2015-07-08&sr=c&si=1216329a-6b52-4cc4-bb56-8c4c7af7648f&sig=oJNLGWf1AYaYowD3SzcC8mPjR1svBNN1oBSOWbUfQV4%3D&st=2017-03-31T01%3A15%3A12Z&se=2117-03-31T01%3A15%3A12Z";
        let url51 = "https://pushdaily.blob.core.windows.net/asset-a3ea0269-10ce-4298-8003-75a23d6db2f2/What is STREET VYBE_"
        let url52 = "640x360_1000.mp4?sv=2015-07-08&sr=c&si=56bc448b-2760-49fc-8a25-4a7de3a738d8&sig=2Vock0i4uKpULpP6h1NUhEF2KGZiysYHQ9tPK54Akqo%3D&st=2017-04-01T20%3A43%3A38Z&se=2117-04-01T20%3A43%3A38Z";

        let toupdate = [{'video_id': guid1, 'thumb_url': thumburl1},
                        {'video_id': guid2, 'thumb_url': thumburl2},
                        {'video_id': guid3, 'thumb_url': thumburl3},
                        {'video_id': guid4, 'thumb_url': thumburl4},
                        {'video_id': guid5, 'thumb_url': thumburl5}];

        for (let i = 0; i < toupdate.length; i++){
            let updater = toupdate[i];
            //this.setNewTableItem('VideoThumbUrl', updater);
        }
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

    loadVideos = (): Promise<Array<IVideoInfoObj>> => {
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
    get isinitialized() {return this._isinitialized};
}
