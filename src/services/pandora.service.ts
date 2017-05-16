/**
 * Created by Javes on 5/6/2017.
 * 
 *
**/
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class PandoraService {
  public userStations: Array<any>;
  public playQueue: Array<any>;
  public playIndex = -1;
  public currentStation: any;
  public currentSong: any;
  constructor(private http: Http){
  }

  goNextSong(){
    this.playIndex += 1;
    if (this.playIndex === this.playQueue.length){
      this.playIndex = -1;
      this.getPlaylist(this.currentStation.stationToken);
    }
    this.currentSong = this.playQueue[this.playIndex];
    document.getElementById('audioDisplay').setAttribute('src', this.currentSong.audioUrlMap.mediumQuality.audioUrl);
  }
  changeStation(index){
    //this.playIndex = -1;
    this.currentStation = this.userStations[index];
    return this.getPlaylist(this.currentStation.stationToken);
  }
  getStationList(){
    return this.http.get('/api/pandora/user/getStationList')
      .subscribe((resp: any)=>{
        this.userStations = JSON.parse(resp._body).stations;
        console.log('user/getStationList resp', this.userStations);
        if (!this.currentStation){
          this.changeStation(0);
        }
      }, this.errorHandler)
  }
  getPlaylist(stationToken){
    return this.http.get('/api/pandora/station/getPlaylist/' + stationToken)
      .subscribe((resp: any)=>{
        this.playQueue = JSON.parse(resp._body).items;
        this.goNextSong();
        console.log('station/getPlaylist resp', this.playQueue);
    }, this.errorHandler)
  }
  addFeedback(stationToken, trackToken, isPositive){
    return this.http.post('/api/pandora/station/addFeedback/' + stationToken + '/' + trackToken + '/' + isPositive, {});
  }
  errorHandler = (error:any) =>{
    console.log('PANDORA ERROR - PROBABLY BLOCKED TEMPORARILY BY PANDORA');
    const tmp = document.createElement("DIV");
    tmp.innerHTML = error;
    console.log('PANDORA ERROR MSG: ' + tmp.innerText || tmp.textContent || '');
  }
}