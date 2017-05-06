/**
 * Created by Javes on 3/19/2017.
 */

import {Component, Input, OnInit} from '@angular/core';
import {VideoInfoService} from '../../services/video-info.service';

import {IVideoInfoObj} from './video-info-obj';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController,  NavParams } from 'ionic-angular';



@Component({
  selector: 'video-thumbnail',
  templateUrl: 'video-thumbnail.component.html',
  providers: [VideoInfoService]
})

export class VideoThumbnail {
  @Input() public id: string;
  public metaData: IVideoInfoObj = <IVideoInfoObj>{};

  constructor(
    private infoService: VideoInfoService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {


    this.infoService.fetchVideoData().then(()=> {
      this.metaData = this.infoService.getVideoInfo(this.id);
    });
  }
  onInit(){

  }

  goToVidView(){

    // TODO add params such as uhhhhh what video to watch

    this.navCtrl.push(VideoView, {'id': this.id});

  }
}
