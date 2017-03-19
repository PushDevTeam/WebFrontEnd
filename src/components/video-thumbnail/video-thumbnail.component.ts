/**
 * Created by Javes on 3/19/2017.
 */

import {Component} from '@angular/core';

@Component({
  selector: 'video-thumbnail',
  templateUrl: 'video-thumbnail.component.html'
})

export class VideoThumbnail {



  constructor(v_id){
    /*
     passed a v_id which will reference a specific video
     should use a service VideoFetcher to call an api that returns
     a JSON containing thumbnail info

     might need seperate service for media
     */
  }
}
