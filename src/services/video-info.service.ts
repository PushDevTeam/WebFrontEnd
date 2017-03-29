/**
 * Created by Javes on 3/19/2017.
 */
/*
Data service for fetching video information
 */
 import { Injectable } from '@angular/core';
import {VideoInfoObj} from '../components/video-thumbnail/video-info-obj';

const MOCK_URL = 'https://pushdaily.blob.core.windows.net/asset-a3ea0269-10ce-4298-8003-75a23d6db2f2/What%20is%20STREET%20VYBE_640x360_650.mp4';

 @Injectable()
 export class VideoInfoService {

   private mock: VideoInfoObj[] = [
     {id:0, videoUrl: MOCK_URL, title:"GET BUFF", other_stuff: "n stuff"},
     {id:1, videoUrl: MOCK_URL, title:"COOL VID", other_stuff: "n stuff"},
     {id:2, videoUrl: MOCK_URL, title:"KICKBOXIN IS TIGHT", other_stuff: "n stuff"},
     {id:3, videoUrl: MOCK_URL, title:"DANCE UR ASS OFF", other_stuff: "n stuff"},
     {id:4, videoUrl: MOCK_URL, title:"CRUNCHIFY UR ABS", other_stuff: "n stuff"},
     {id:5, videoUrl: MOCK_URL, title:"ANOTHER COOL ONE", other_stuff: "n stuff"},
     {id:6, videoUrl: MOCK_URL, title:"LETS SWEAT", other_stuff: "n stuff"},
     {id:7, videoUrl: MOCK_URL, title:"CARDO TIME", other_stuff: "n stuff"},
     {id:8, videoUrl: MOCK_URL, title:"LEAN & MEAN", other_stuff: "n stuff"},
     {id:9, videoUrl: MOCK_URL, title:"YEAH WORK OUTS", other_stuff: "n stuff"},
   ];


   getVideoInfo(id): VideoInfoObj{
     return this.mock[id];
   }
 }
