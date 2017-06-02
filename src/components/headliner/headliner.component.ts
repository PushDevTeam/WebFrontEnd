/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AzureService } from '../../services/azure.service';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController } from 'ionic-angular';
import { VideoInfoObj } from '../video-thumbnail/video-info-obj';
import { VideoInfoService } from '../../services/video-info.service';
import { PandoraService } from '../../services/pandora.service';
@Component({
  selector: 'headliner',
  templateUrl: 'headliner.component.html'
})
export class Headliner {
  @ViewChild(Slides) slides: Slides;
  public video_ids: any[] = [];
  public video_info_arr: VideoInfoObj[] = [];
  private activeIndex: number = 0;

  constructor(
    private azureService: AzureService,
    private navCtrl: NavController,
    private videoInfoService: VideoInfoService,
    private pandoraService: PandoraService
  ) {

    console.log('on init of headliner.component');

  }

  ngOnInit() {
    this.video_ids = [];
      this.videoInfoService.fetchVideoData().then((resp) => {
        for (let k in this.azureService.videoinfos){
          if (this.azureService.videoinfos[k].isfeatured){
            this.video_info_arr.push(this.azureService.videoinfos[k]);
            this.video_ids.push(this.azureService.videoinfos[k].id)
          }
        }
      });
  }
  ngAfterViewInit(){
    this.slides.lockSwipes(true);
  }
  slideLeft(){

    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    this.activeIndex = this.slides.getActiveIndex();
  }
  slideRight(){

    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    this.activeIndex = this.slides.getActiveIndex();
  }
  goToVid(id) {
    //alert();
    this.navCtrl.push(VideoView, { 'id': id });
  }

 pageToSlide(index) {
   this.slides.lockSwipes(false);
   this.slides.slideTo(index);
   this.slides.lockSwipes(true);
   this.activeIndex = index;
 }

}
