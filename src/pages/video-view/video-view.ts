import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
@Component({
    selector: 'video-view',
    templateUrl: 'video-view.html',

})
export class VideoView {
  public vid_url: string;

  constructor(
    public vidService: VideoService,
  ){


  }
  ngOnInit(){
    this.vid_url = this.vidService.getVideoUrl();
  }

}
