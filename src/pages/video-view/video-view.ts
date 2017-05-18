import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { VideoInfoService } from '../../services/video-info.service';
import { IVideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoRatingPage } from '../video-rating/video-rating';
import { PandoraService } from '../../services/pandora.service';
@Component({
  selector: 'video-view',
  templateUrl: 'video-view.html',

})
export class VideoView {
  public videoInfo: IVideoInfoObj = <IVideoInfoObj>{};
  private id: string;
  private d: any;
  private set_array =
  [
    { 'title': 'Related Workouts' },
    { 'id': null, 'title': 'My Workouts' },
    { 'title': 'Other Category' },
  ];
  private audioElement : HTMLAudioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
  constructor(
    public videoInfoService: VideoInfoService,
    public navParams: NavParams,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private pandoraService: PandoraService,
  ) { }
  ngOnInit() {
    this.d = new Date();
    this.id = this.navParams.get('id');
    this.videoInfoService.fetchVideoData().then(() => {
      this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
    });
    //this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
  this.audioElement.addEventListener('pause', () => this.pauseAV());

  }

  onVideoEnd() {
    const modal = this.modalCtrl.create(VideoRatingPage, { 'id': this.id });
    modal.present();
  }

  playAV() {

    this.audioElement.play();
    let vid = <HTMLVideoElement> document.getElementById('video-player');
    vid.play();
    document.getElementById("playButton").innerHTML = "pause";
  }
  pauseAV(){
   //#console.log("pauseAV");
    this.audioElement.pause();
    let vid = <HTMLVideoElement> document.getElementById('video-player');
    vid.pause();
    document.getElementById("playButton").innerHTML="play_arrow";
  }


}
