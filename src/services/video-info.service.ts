/**
 * Created by Javes on 3/19/2017.
 */
/*
Data service for fetching video information
 */
 import { Injectable } from '@angular/core';
import {VideoInfoObj} from '../components/video-thumbnail/video-info-obj';



 @Injectable()
 export class VideoInfoService {
   private mock: VideoInfoObj[] = [

     {id:0, title:"GET BUFF", other_stuff: "n stuff"},
     {id:1, title:"COOL VID", other_stuff: "n stuff"},
     {id:2, title:"KICKBOXING IS TIGHT", other_stuff: "n stuff"},
     {id:3, title:"DANCE UR ASS OFF", other_stuff: "n stuff"},
     {id:4, title:"CRUNCHIFY UR ABS", other_stuff: "n stuff"},
     {id:5, title:"ANOTHER COOL ONE", other_stuff: "n stuff"},
     {id:6, title:"LETS SWEAT", other_stuff: "n stuff"},
     {id:7, title:"CARDO TIME", other_stuff: "n stuff"},
     {id:8, title:"LEAN & MEAN", other_stuff: "n stuff"},
     {id:9, title:"YEAH WORK OUTS", other_stuff: "n stuff"},
   ];




   getVideoInfo(id): VideoInfoObj{
     return this.mock[id];
   }
 }
