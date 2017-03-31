import {Injectable} from '@angular/core';
/**
 * ACG 3/29/17
 * 
 * Used for client side interaction with the Facebook API
 * **/

Injectable()
export class AzureService {
    
    private _client: any;
    private _azurepath: string = 'https://pushdaily-api.azurewebsites.net';

    constructor(){

    }

    connectAzure = (azure: any) => {
        this._client = new azure(this._azurepath);
        console.log('connected azure client', this.client);
        this.getVideos().then((resp)=>{
            console.log('resp', resp)
        })
    }

    setNewTableItem = (tablename: string, newitem: any) => {
        let table = this.client.getTable(tablename);
        return table.insert(newitem).done((insertedItem) => {console.log('setter success \n tablename: ' + tablename, insertedItem);}, this.failure);
    }

    postVideoFeedback = (video_id: string, rating: string, comment: string = '') => {
        let post = {'rating': rating, 'video_id': video_id, 'freeform_comment': comment};
        return this.setNewTableItem('VideoFeedback', post);
    }

    getFeaturedVideoIds = (): Array<string> => {
        return this.queryTable('FeaturedVideo').then((resp)=>{
            let returnable: Array<string> = [];
            for (let i = 0; i < resp.length; i++){
                let item = resp[i];
                returnable.push(item.video_id);
            }
            return returnable;
        })
    }

    getVideos = () => {
        return this.queryTable('Video').then((resp)=>{
            return resp;
        })
    }

    getVideoUrlSuffixs = () => {
        return this.queryTable('VideoUrlSuffix').then((resp)=>{
            return resp;
        })
    }

    getVideoUrls = () => {
        return this.queryTable('VideoUrl').then((resp)=>{
            return resp;
        })
    }

    getVideoTags = () => {
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
}
