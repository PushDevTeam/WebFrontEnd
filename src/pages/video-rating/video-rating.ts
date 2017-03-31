import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Home } from '../home/home';
import { VideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoInfoService } from '../../services/video-info.service';

/*
  Created by Nstopa
  3/29/2017

  Modal page to rate videos post-workout
*/

@Component({
  selector: 'page-video-rating',
  templateUrl: 'video-rating.html'
})
export class VideoRatingPage {
  public videoInfo : VideoInfoObj;
  private id: number;
  constructor(public videoInfoService: VideoInfoService,
              public navParams: NavParams,
              private viewCtrl: ViewController) {
              }


  ngOnInit() {
  this.id = this.navParams.get('id');
   this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
  }


onShare() {
    this.viewCtrl.dismiss();
}

onSubmit() {
  this.viewCtrl.dismiss();
}


onExit() {
  this.viewCtrl.dismiss();
}

}
