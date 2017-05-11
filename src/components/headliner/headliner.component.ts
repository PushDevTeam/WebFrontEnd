/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AzureService } from '../../services/azure.service';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController } from 'ionic-angular';
import { VideoInfoObj } from '../video-thumbnail/video-info-obj';
import { VideoInfoService } from '../../services/video-info.service';
@Component({
  selector: 'headliner',
  templateUrl: 'headliner.component.html'
})
export class Headliner {
  @ViewChild(Slides) slides: Slides;
  public video_ids: any[] = [];
  public video_info_arr: VideoInfoObj[] = [];

  constructor(
    private azureService: AzureService,
    private navCtrl: NavController,
    private videoInfoService: VideoInfoService,
  ) {

    console.log('on init of headliner.component');
    this.videoInfoService.fetchVideoData().then(() => {
      this.azureService.getFeaturedVideoIds().then((resp) => {
        this.video_ids = resp;
        this.video_ids.forEach((id) => {
          this.video_info_arr.push(this.videoInfoService.getVideoInfo(id));
        });
        console.log('video_info_arr',this.video_info_arr);
      });
    });


  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.slides.lockSwipes(true);

  }
  slideLeft(){

    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
  slideRight(){

    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  goToVid(id) {
    this.navCtrl.push(VideoView, { 'id': id });
  }
}
