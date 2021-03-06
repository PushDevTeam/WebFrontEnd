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
import { PandoraService } from '../../services/pandora.service';
import { PandoraPlaybackService } from '../../services/pandora-playback.service';
@Component({
  selector: 'feature',
  templateUrl: 'feature.component.html'
})
export class Feature {
  @ViewChild(Slides) slides: Slides;
  public video_ids: any[] = [];
  public video_info_arr: VideoInfoObj[] = [];

  constructor(
    private azureService: AzureService,
    private navCtrl: NavController,
    private videoInfoService: VideoInfoService,
    private pandoraService: PandoraService,
    private pandoraPlaybackService: PandoraPlaybackService,
  ) {}

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
  goToVid(id) {
    this.navCtrl.push(VideoView, { 'id': id });
  }
}
