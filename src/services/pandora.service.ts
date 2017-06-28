/**
 * Created by Javes on 5/6/2017.
 *
 *
**/
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../classes/environ.class';
import {IPandoraSong} from '../interfaces/pandora-song.interface';
@Injectable()
export class PandoraService {
  public userStations: Array<any>;
  public playQueue: Array<any>;
  public playIndex = -1;
  public currentStation: any;
  public currentSong: IPandoraSong;
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
      } else if (this.playIndex === this.playQueue.length - 1){
        return this.getPlaylist(this.currentStation.stationToken)
      } else {
        this.goNextSong();
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
        'allowFeedback': false,
        'songRating': 0,
        'audioUrlMap': {'mediumQuality': {'audioUrl': 'assets/test.mp3'}},
        'albumArtUrl': 'https://www.pandora.com/static/images/ShuffleStationArt.jpg'}
    } else {
      this.currentSong = this.playQueue[this.playIndex];
    }
    this.evaluateThumb();
    return this.currentSong;
  }

  evaluateThumb(){
    //'this.currentSong', this.currentSong);
    const thumbup = document.getElementById('thumbs-up');
    if (this.currentSong.songRating === 1){
      thumbup.classList.add('active');
    } else {
      if (thumbup){
        if (thumbup.classList.contains('active')){
          thumbup.classList.remove('active');
        }
      }
    }
  }

  changeStation(index){
    this.currentStation = this.userStations[index];
    return this.getPlaylist(this.currentStation.stationToken);
  }

  getStationList(){
    return this.http.get(environment.apiPath + '/pandora/user/getStationList').toPromise()
      .then((resp: any)=>{
        this.userStations = JSON.parse(resp._body).stations;
       //console.log('user/getStationList resp', this.userStations);
        if (!this.currentStation){
          this.changeStation(1);
        }
      }, this.errorHandler)
  }
  getPlaylist(stationToken){
    return this.http.get(environment.apiPath + '/pandora/station/getPlaylist/' + stationToken).toPromise()
      .then((resp: any)=>{
        this.playQueue = JSON.parse(resp._body).items;
        this.playIndex = -1;
        this.goNextSong();
        //console.log('station/getPlaylist resp', this.playQueue);
    }, this.errorHandler)
  }
  getStation(stationToken){
    return this.http.get(environment.apiPath + '/pandora/station/getStation/' + stationToken).toPromise()
      .then((resp: any)=>{
        this.currentStation = JSON.parse(resp._body);
      })
  }
  currentStationName(){
    return this.currentStation.stationName;
  }
  addFeedback(stationToken, trackToken, songIdentity, isPositive){
    let setFlag: number;
    if (isPositive) { setFlag = 1 } else { setFlag = 0 };
    if (this.currentSong.allowFeedback && this.currentStation.allowAddMusic){
      return this.http.post(environment.apiPath + '/pandora/station/addFeedback/' + stationToken + '/' + trackToken + '/' + songIdentity + '/' + setFlag.toString(), {}).toPromise()
      .then((resp: any)=>{
       //console.log('addFeedback resp', JSON.parse(resp._body));
        if (this.currentSong.songRating === 0){
            this.currentSong.songRating = 1;
        } else if (this.currentSong.songRating === 1){
          this.currentSong.songRating = 0;
        }
        this.evaluateThumb();
      });
    } else {
      return Promise.resolve();
    }
  }

  getFeaturedStations(idxmultiplier: number){
      if (this.userStations){
        return [this.userStations[1 * idxmultiplier], this.userStations[2 * idxmultiplier], this.userStations[3 * idxmultiplier]]
      } else {
        return [
          //dummy data until real data comes in
          {'stationId': '3608848574149979011',
          'artUrl': 'https://images-na.ssl-images-amazon.com/images/I/61WtzIi5L0L._SS500.jpg',
          'stationName': 'Tech N9ne Radio'},
          {'stationId': '3608848836142984067',
          'artUrl': 'https://images-na.ssl-images-amazon.com/images/I/51SVFPuNbUL._SS500.jpg',
          'stationName': 'Israel IZ'},
          {'stationId': '3608849274229648259',
          'artUrl': 'https://images-na.ssl-images-amazon.com/images/I/519FJqa%2BhTL._SS500.jpg',
          'stationName': "90's Hip Hop"},
          {'stationId': '3608848574149979011',
          'artUrl': 'https://images-na.ssl-images-amazon.com/images/I/61WtzIi5L0L._SS500.jpg',
          'stationName': 'Tech N9ne Radio'}];
      }
  }
  getRandomStations(quantity: number){
    let returnable = [];
    let indexes = [];
    while(indexes.length < quantity){
      let randomnumber = Math.ceil(Math.random() * (this.userStations.length - 1));
      if (indexes.indexOf(randomnumber + 1) === -1){
        indexes.push(randomnumber + 1);
      }
    }
    for(let idx in indexes){
      returnable.push(this.userStations[idx]);
    }
    return returnable;
  }

  errorHandler = (error:any) =>{
   //console.log('PANDORA ERROR - PROBABLY BLOCKED TEMPORARILY BY PANDORA');
    const tmp = document.createElement("DIV");
    tmp.innerHTML = error;
   //console.log('PANDORA ERROR MSG: ' + tmp.innerText || tmp.textContent || '');
  }
  goToSuggestedStation(id){
   //console.log('XXX goToSuggestedStation(id)', id);
   return Promise.all([
    this.getPlaylist(id),
    this.getStation(id)
    ]);
  }

}
