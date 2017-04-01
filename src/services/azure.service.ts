import {Injectable} from '@angular/core';
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

    constructor(){

      this.connectAzure(WindowsAzure.MobileServiceClient);
    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
        this._isinitialized = true;
        //console.log('connected azure client', this.client);
    }

    _initData = () => {
        //core basics: 3da38c6a-feed-4c42-9d83-c31f501fbca5
        //starting strength: 60805857-5031-47a3-b531-410b7504431e
        //bodyweight intermediate: 9ea0466a-aef1-4618-9a33-f9ed60fa626b
        //nv now hiit: ae2f89d0-8436-45e1-9f59-97189dbdaea5
        //fall 2015 hiit: f6b4929b-c615-4151-a58a-573e30df8bf2
        let guid1 = "3da38c6a-feed-4c42-9d83-c31f501fbca5";
        let guid2 = "60805857-5031-47a3-b531-410b7504431e";
        let guid3 = "9ea0466a-aef1-4618-9a33-f9ed60fa626b";
        let guid4 = "ae2f89d0-8436-45e1-9f59-97189dbdaea5";
        let guid5 = "f6b4929b-c615-4151-a58a-573e30df8bf2";

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

        let toupdate = [{'url1': url11, 'url2':url12, 'video_id': guid1, 'resolution': '640x360_1000'},
                        {'url1': url21, 'url2':url22, 'video_id': guid2, 'resolution': '640x360_1000'},
                        {'url1': url31, 'url2':url32, 'video_id': guid3, 'resolution': '640x360_1000'},
                        {'url1': url41, 'url2':url42, 'video_id': guid4, 'resolution': '640x360_1000'},
                        {'url1': url51, 'url2':url52, 'video_id': guid5, 'resolution': '640x360_1000'}];

        for (let i = 0; i < toupdate.length; i++){
            let updater = toupdate[i];
        //    this.setNewTableItem('VideoUrl', updater);
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

    getVideos = (): Promise<Array<any>> => {
        return this.queryTable('Video').then((videoresp)=>{
            let videosobj = {};
            for (let i = 0; i < videoresp.length; i++){
                videosobj[videoresp[i].id] = videoresp[i];
            }
            let returnable = [];
            return this.getVideoUrls().then((urlresp)=>{
                for (let i = 0; i < videoresp.length; i++){
                    videosobj[urlresp[i].video_id][urlresp[i].resolution + '_url'] = urlresp[i];
                    returnable.push(videosobj[urlresp[i].video_id]);
                }
                console.log('Videos \n', returnable);
                return returnable;
                 
            })
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
