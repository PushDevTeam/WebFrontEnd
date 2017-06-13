/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AzureService } from '../../services/azure.service';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController } from 'ionic-angular';
import { VideoInfoObj } from '../video-thumbnail/video-info-obj';
import { VideoInfoService } from '../../services/video-info.service';
import { PandoraService } from '../../services/pandora.service';
import { PandoraPlaybackService } from '../../services/pandora-playback.service';
@Component({
  selector: 'headliner',
  templateUrl: 'headliner.component.html'
})
export class Headliner implements OnChanges, OnInit {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('slideset') slidesetDOM: Slides;
  public video_ids: any[] = [];
  public video_info_arr: VideoInfoObj[] = [];
  public changeprop: string;
  public sizeSettings: any = {};

  constructor(
    private azureService: AzureService,
    private navCtrl: NavController,
    private videoInfoService: VideoInfoService,
    private pandoraService: PandoraService,
    private pandoraPlaybackService: PandoraPlaybackService
  ) {

   //#console.log('on init of headliner.component');

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
  onStationSelection(stationid: string) {
    this.pandoraService.goToSuggestedStation(stationid)
      .then(()=>{
        this.pandoraPlaybackService.nextSong();
      });
  }
  ngOnChanges(change: SimpleChanges) {
    console.log('ngOnChanges change', change);
    console.log('slideset div', this.slidesetDOM);
  }
  ngAfterViewInit(){
    this.slides.lockSwipes(true);
    this.resetSize();

  }

  ngAfterViewChecked() {
    if (this.slidesetDOM.container) {
      let sameheight = this.slidesetDOM.container.clientHeight === this.sizeSettings.clientHeight;
      let samewidth = this.slidesetDOM.container.clientWidth === this.sizeSettings.clientWidth;
      if (!(sameheight && samewidth)){
        this.resetSize();
      }
    }
  }

  resetSize() {
    if (this.slidesetDOM.container) {
      this.sizeSettings['clientHeight'] = this.slidesetDOM.container.clientHeight;
      this.sizeSettings['clientWidth'] = this.slidesetDOM.container.clientWidth;
      this.slides.update();
    }
  }
  slideLeft(){
    this.changeprop = 'left';
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
  slideRight(){
    this.changeprop = 'right';
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  goToVid(id) {
    //alert();
    this.navCtrl.push(VideoView, { 'id': id });
  }
}
