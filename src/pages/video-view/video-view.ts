import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { VideoInfoService } from '../../services/video-info.service';
import { IVideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoRatingPage } from '../video-rating/video-rating';
import { PandoraService } from '../../services/pandora.service';
import { PandoraPlaybackService } from '../../services/pandora-playback.service';
import { VideoPlaybackService } from '../../services/video-playback.service';
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
  private safari: boolean = false;
  private audioElement : HTMLAudioElement = <HTMLAudioElement> document.getElementById("audioDisplay");
  constructor(
    public videoInfoService: VideoInfoService,
    public navParams: NavParams,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private pandoraService: PandoraService,
    private pandoraPlaybackService: PandoraPlaybackService,
    private videoPlaybackService: VideoPlaybackService,
  ) { }
  ngOnInit() {
    this.videoPlaybackService.initializePlayer();
    this.d = new Date();
    this.id = this.navParams.get('id');
    this.videoInfoService.fetchVideoData().then(() => {
      this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
    });
    this.pandoraPlaybackService.audioElement.addEventListener('pause', (e) => this.pauseAV(e));
    this.videoPlaybackService.videoElement.addEventListener('pause', (e) => this.pauseAV(e));
    this.videoPlaybackService.playVideo();
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0)
      {
        this.safari = true;
      }

  }

  onVideoEnd() {
    //const modal = this.modalCtrl.create(VideoRatingPage, { 'id': this.id });
    //modal.present();
    this.audioElement.play();
  }

  playAV() {
    if (this.audioElement.paused) {
      this.audioElement.play();
    }
    if (this.videoPlaybackService.videoElement.paused) {
      this.videoPlaybackService.videoElement.play();
    }
    document.getElementById("playButton").innerHTML = "pause";
  }
  pauseAV(e){
    if (!e) {
      return;
    }
    if (e.target.nodeName === 'VIDEO') {
      if (e.target.currentTime === e.target.duration) {
        return;
      } else {
        if (!this.audioElement.paused){
          this.audioElement.pause();
        }
      }
    } else {
      if (!this.videoPlaybackService.videoElement.paused) {
        this.videoPlaybackService.pauseVideo();
      }
    }
    /*
    console.log("pauseAV", e);
    this.audioElement.pause();
    let vid = <HTMLVideoElement> document.getElementById('video-player');
    vid.pause();
    */
    document.getElementById("playButton").innerHTML="play_arrow";
  }


}
