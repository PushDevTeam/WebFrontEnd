/**
 * Created by Javes on 3/19/2017.
 */
/*
Data service for fetching video information
 */
 import { Injectable } from '@angular/core';



 @Injectable()
 export class VideoSetService {

   constructor(){

   }

   getSetIds(label): number[]{
     return [8,1,2,3,4,0,6,7,5,9];
   }
 }
