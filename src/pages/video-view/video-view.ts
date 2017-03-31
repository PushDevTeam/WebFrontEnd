import { Component } from '@angular/core';
import { NavController,  NavParams, ModalController } from 'ionic-angular';
import { VideoService } from '../../services/video.service';
import { VideoInfoService } from '../../services/video-info.service';
import { VideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoRatingPage } from '../video-rating/video-rating';

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
    private modalCtrl: ModalController
  ) {
    console.log('video view constructor');
    console.log('navParams id ='+this.navParams.get('id'));
    this.id = this.navParams.get('id');

  }
  ngOnInit(){
    this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
  }

onVideoEnd() {
  const modal = this.modalCtrl.create(VideoRatingPage);
  modal.present();
}

}
