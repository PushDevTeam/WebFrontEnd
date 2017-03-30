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
     {id:0, videoUrl: MOCK_URL, title:"SLIM DOWN FAST", trainer: 'Eddie Lacy' , duration: '32:30', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:1, videoUrl: MOCK_URL, title:"COOL VID", trainer: 'Jillian Michaels', duration: '32:31', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:2, videoUrl: MOCK_URL, title:"LOSE 15 lbs in 30 Minutes", trainer: 'Tony Horton', duration: '32:32', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:3, videoUrl: MOCK_URL, title:"DANCE UR ASS OFF", trainer: 'Sean T', duration: '32:33', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:4, videoUrl: MOCK_URL, title:"CRUNCHIFY UR ABS", trainer: 'The Rock', duration: '32:34', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:5, videoUrl: MOCK_URL, title:"TURN LEFT TODAY", trainer: 'Zoolander', duration: '32:35', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:6, videoUrl: MOCK_URL, title:"LETS SWEAT", trainer: 'Sweaty Trainer', duration: '32:36', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:7, videoUrl: MOCK_URL, title:"CARDO TIME", trainer: 'Lance Armstrong', duration: '32:37', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:8, videoUrl: MOCK_URL, title:"LEAN & MEAN", trainer: 'Trainer #42', duration: '32:38', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
     {id:9, videoUrl: MOCK_URL, title:"YEAH WORK OUTS", trainer: 'Trainer McTrainer', duration: '32:39', difficulty: 'Medium', tags: ['Tag1', 'Tag2', 'Tag3','Tag4','Tag5','Tag6','Tag7','Tag8']},
   ];


   getVideoInfo(id): VideoInfoObj{
     return this.mock[id];
   }
 }
