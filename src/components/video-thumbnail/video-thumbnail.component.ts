/**
 * Created by Javes on 3/19/2017.
 */

import {Component, Input, OnInit} from '@angular/core';
import {VideoInfoService} from '../../services/video-info.service';
import {VideoImgService} from '../../services/video-img.service';
import {IVideoInfoObj, VideoInfoObj} from './video-info-obj';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController,  NavParams } from 'ionic-angular';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'video-thumbnail',
  templateUrl: 'video-thumbnail.component.html',
  providers: [VideoInfoService, VideoImgService]
})

export class VideoThumbnail {
  @Input() public id: string;
  public metaData: IVideoInfoObj = <IVideoInfoObj>{};

  constructor(
    private userService: UserService,
    private infoService: VideoInfoService,
    private imgService: VideoImgService,
    public navCtrl: NavController,
    public navParams: NavParams,

  ) {


    this.infoService.getAllVideos().then((res)=> {
      console.log('getAllVIdeos',res);
      this.metaData = res.find( (v_info_obj) => {return v_info_obj.id == this.id});
      console.log('metadata',this.metaData);
    });
  }

  ngOnInit(){
    /*
     passed a v_id which will reference a specific video
     should use a service VideoFetcher to call an api that returns
     a JSON containing thumbnail info

     might need seperate service for media
     */
  }

  getVideoInfo(){
    //this.metaData = this.infoService.getVideoInfo(this.id);
  }


  goToVidView(){

    // TODO add params such as uhhhhh what video to watch

    this.navCtrl.push(VideoView, {'id': this.id});

  }
}
