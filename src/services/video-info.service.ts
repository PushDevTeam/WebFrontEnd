/**
 * Created by Javes on 3/19/2017.
 */
/*
Data service for fetching video information
 */
 import { Injectable } from '@angular/core';
import {VideoInfoObj, IVideoInfoObj} from '../components/video-thumbnail/video-info-obj';
import {AzureService} from './azure.service';
const MOCK_URL = 'https://pushdaily.blob.core.windows.net/asset-a3ea0269-10ce-4298-8003-75a23d6db2f2/What%20is%20STREET%20VYBE_640x360_650.mp4';
const MOCK_THUMB_URL = 'https://pushdaily.blob.core.windows.net/asset-d009e52e-1fad-4197-93d1-805476797019/PUSH_Video_Thumb_StartingStrengthLvl1.jpg?sv=2015-07-08&sr=c&si=9eacaf72-574f-49a9-8a62-8ca4a9c6a09c&sig=gnnPh6bO6rqBBwFuxzOL2mNIin6BDwvIl4aPMSP2Xt4%3D&st=2017-04-02T00%3A04%3A23Z&se=2117-04-02T00%3A04%3A23Z';
 @Injectable()
 export class VideoInfoService {
   private _videosbyid: any = {};
   constructor(private azureService: AzureService){

    }
   private mock: IVideoInfoObj[] = [
     {id:'0', videoUrl: MOCK_URL, title:"SLIM DOWN FAST", trainer: 'Eddie Lacy' , duration: '32:30', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'1', videoUrl: MOCK_URL, title:"COOL VID", trainer: 'Jillian Michaels', duration: '32:31', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'black'},
     {id:'2', videoUrl: MOCK_URL, title:"LOSE 15 lbs in 30 Minutes", trainer: 'Tony Horton', duration: '32:32', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'3', videoUrl: MOCK_URL, title:"DANCE UR ASS OFF", trainer: 'Sean T', duration: '32:33', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'4', videoUrl: MOCK_URL, title:"CRUNCHIFY UR ABS", trainer: 'The Rock', duration: '32:34', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'5', videoUrl: MOCK_URL, title:"TURN LEFT TODAY", trainer: 'Zoolander', duration: '32:35', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'6', videoUrl: MOCK_URL, title:"LETS SWEAT", trainer: 'Sweaty Trainer', duration: '32:36', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'7', videoUrl: MOCK_URL, title:"CARDO TIME", trainer: 'Lance Armstrong', duration: '32:37', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
     {id:'8', videoUrl: MOCK_URL, title:"LEAN & MEAN", trainer: 'Trainer #42', duration: '32:38', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL,infoTextColor: 'white'},
     {id:'9', videoUrl: MOCK_URL, title:"YEAH WORK OUTS", trainer: 'Trainer McTrainer', duration: '32:39', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8'], description: 'mock_desc', thumbUrl: MOCK_THUMB_URL, infoTextColor: 'white'},
   ];

   fetchVideoData = (): Promise<any> =>{
     return this.azureService.loadVideos().then((resp)=>{
       for (let i=0; i < this.azureService.videoinfos.length; i++){
         this._videosbyid[this.azureService.videoinfos[i].id] = this.azureService.videoinfos[i];
       }
       return this._videosbyid;
    });
   }

   getAllVideoIds = (): Promise<Array<string>> => {
    //#console.log('videokeys', Object.keys(this._videosbyid));
    //#console.log('all videos by id', this._videosbyid);
     return this.fetchVideoData().then(()=>{
      let returnable = [];
      Object.keys(this._videosbyid).map((value)=>{returnable.push(value)});
      return returnable;
    })
   }

   getAllVideos = (): Promise<Array<IVideoInfoObj>> => {
    return this.fetchVideoData().then(()=>{
      let vids = [];
      Object.keys(this._videosbyid).map((value)=>{vids.push(this._videosbyid[value])});
      return vids;
    })
   }

   getVideoInfo(id): VideoInfoObj{
     //use something like this instead when you're using the real video data
     return this._videosbyid[id];
     //return this.mock[id];
   }
 }
