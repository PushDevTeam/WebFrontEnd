import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import { VideoService } from '../../services/video.service';
import { VideoInfoService } from '../../services/video-info.service';
import { VideoInfoObj } from '../../components/video-thumbnail/video-info-obj';

@Component({
    selector: 'video-view',
    templateUrl: 'video-view.html',

})
export class VideoView {
  public videoInfo : VideoInfoObj;
  private id: number;
  constructor(
    public videoInfoService: VideoInfoService,
    public navParams: NavParams,
    public navCtrl: NavController,
  ){
    console.log('video view constructor');
    console.log('navParams id ='+this.navParams.get('id'));
    this.videoInfo = this.videoInfoService.getVideoInfo(this.navParams.get('id'));

  }
  ngOnInit(){

  }

}
