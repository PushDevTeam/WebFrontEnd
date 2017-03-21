/**
 * Created by Javes on 3/19/2017.
 */

import {Component, Input} from '@angular/core';
import {VideoInfoService} from '../../services/video-info.service';
import {VideoImgService} from '../../services/video-img.service';
import {VideoInfoObj} from './video-info-obj';
@Component({
  selector: 'video-thumbnail',
  templateUrl: 'video-thumbnail.component.html',
  providers: [VideoInfoService, VideoImgService]
})


export class VideoThumbnail {
  @Input() public id: number;
  public metaData: VideoInfoObj;

  constructor(
    private infoService: VideoInfoService,
    private imgService: VideoImgService
  ){}

  ngOnInit(){
    /*
     passed a v_id which will reference a specific video
     should use a service VideoFetcher to call an api that returns
     a JSON containing thumbnail info

     might need seperate service for media
     */
     this.metaData = this.infoService.getVideoInfo(this.id);
  }
  goToVidView(v_id){
    alert("goToVidView("+v_id+")");
  }
}
