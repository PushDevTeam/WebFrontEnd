import { Component } from '@angular/core';
import { NavController,  NavParams, ModalController } from 'ionic-angular';
import { VideoService } from '../../services/video.service';
import { VideoInfoService } from '../../services/video-info.service';
import { IVideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoRatingPage } from '../video-rating/video-rating';

@Component({
    selector: 'video-view',
    templateUrl: 'video-view.html',

})
export class VideoView {
  public videoInfo : IVideoInfoObj = <IVideoInfoObj>{};
  private id: string;

  constructor(
    public videoInfoService: VideoInfoService,
    public navParams: NavParams,
    public navCtrl: NavController,
    private modalCtrl: ModalController
  ) {

    this.id = this.navParams.get('id');

    this.videoInfoService.getAllVideos().then((res)=> {
      this.videoInfo = res.find( (v_info_obj) => {return v_info_obj.id == this.id});
      console.log('video-view videoInfo',this.videoInfo);
    });
  }
  ngOnInit(){
    //this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
  }

onVideoEnd() {
  const modal = this.modalCtrl.create(VideoRatingPage, {'id': this.id});
  modal.present();
}

}
