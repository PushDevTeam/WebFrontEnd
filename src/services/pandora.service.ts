/**
 * Created by Javes on 5/6/2017.
 * 
 *
**/
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../classes/environ.class';

@Injectable()
export class PandoraService {
  public userStations: Array<any>;
  public playQueue: Array<any>;
  public playIndex = -1;
  public currentStation: any;
  public currentSong: any;
  public stationChange: boolean = false;

  constructor(private http: Http){
  }

  getNextSong():Promise<any>{
    if (this.currentStation === undefined){
      return this.getStationList().then(()=>{
        return this.getPlaylist(this.currentStation.stationToken)
      })
    } else {
      if (this.playQueue === undefined){
        return this.getPlaylist(this.currentStation.stationToken)
      } else if (this.playIndex === this.playQueue.length){
        return this.getPlaylist(this.currentStation.stationToken)
      } else {
        return new Promise((resolve, reject)=>{
          return resolve()
        })
      }
    }
  }

  goNextSong(){
    this.playIndex += 1;
    if (!this.playQueue){
      this.currentSong = {
        'artistName': 'Some Artist', 
        'songName': 'Some Song Name', 
        'audioUrlMap': {'mediumQuality': 'assets/test.mp3'}, 
        'albumArtUrl': 'https://www.pandora.com/static/images/ShuffleStationArt.jpg'}
    } else {
      this.currentSong = this.playQueue[this.playIndex];
    }
    return this.currentSong;
  }
  changeStation(index){
    this.currentStation = this.userStations[index];
    return this.getPlaylist(this.currentStation.stationToken);
  }
  getStationList(){
    return this.http.get(environment.apiPath + '/pandora/user/getStationList').toPromise()
      .then((resp: any)=>{
        this.userStations = JSON.parse(resp._body).stations;
        console.log('user/getStationList resp', this.userStations);
        if (!this.currentStation){
          this.changeStation(0);
        }
      }, this.errorHandler)
  }
  getPlaylist(stationToken){
    return this.http.get(environment.apiPath + '/pandora/station/getPlaylist/' + stationToken).toPromise()
      .then((resp: any)=>{
        this.playQueue = JSON.parse(resp._body).items;
        this.playIndex = -1;
        this.goNextSong();
        console.log('station/getPlaylist resp', this.playQueue);
    }, this.errorHandler)
  }
  addFeedback(stationToken, trackToken, isPositive){
    console.log('addFeedback running');
    return this.http.post(environment.apiPath + '/pandora/station/addFeedback/' + stationToken + '/' + trackToken + '/' + isPositive, {}).toPromise();
  }

  getFeaturedStations(){
    return [
      {'stationId': '3608848574149979011', 'imgUrl': 'https://images-na.ssl-images-amazon.com/images/I/61WtzIi5L0L._SS500.jpg', 'stationName': 'Tech N9ne Radio'}, 
      {'stationId': '3608848836142984067', 'imgUrl': 'https://images-na.ssl-images-amazon.com/images/I/51SVFPuNbUL._SS500.jpg', 'stationName': 'Israel IZ'}, 
      {'stationId': '3608849274229648259', 'imgUrl': 'https://images-na.ssl-images-amazon.com/images/I/519FJqa%2BhTL._SS500.jpg', 'stationName': "90's Hip Hop"}];
  }
  errorHandler = (error:any) =>{
    console.log('PANDORA ERROR - PROBABLY BLOCKED TEMPORARILY BY PANDORA');
    const tmp = document.createElement("DIV");
    tmp.innerHTML = error;
    console.log('PANDORA ERROR MSG: ' + tmp.innerText || tmp.textContent || '');
  }
  goToSuggestedStation(id){
    console.log('XXX goToSuggestedStation(id)', id);
    this.getPlaylist(id);
  }

}