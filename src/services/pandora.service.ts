/**
 * Created by Javes on 5/6/2017.
 * 
 *
**/
import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
//import * as Anesidora from 'anesidora';

@Injectable()
export class PandoraService {
  pandora: any;
  public playingUrl: any = '';
  constructor(private http: Http){

    //this.pandora = new Anesidora("ante@thepushapp.com", "ant3@thepushapp");
    //this.pandora.ENDPOINT = '/pandora'
    //this.pandoraStart();
  }
  pandoraStart(){
    this.http.get('/api/pandora/login')
    .subscribe((resp: any)=>{
      console.log('pandoraStart resp', resp);
      this.playingUrl = resp._body;
    })
  }
  getStations(){
    this.http.get('/api/pandora/stations')
    .subscribe((resp: any)=>{
      console.log('getstations resp', resp);
    })
  }
    /*

    pandoraInit(){
      console.log('pandoraInit()');
      const partnerInfo = {
                "username": "android",
                "password": "AC7IBG09A3DTSYM4R41UJWL07VLN8JI7",
                "deviceModel": "android-generic",
                "decryptPassword": "R=U!LH$O2B#",
                "encryptPassword": "6#26FRL$ZWD",
                "version": "5"
            };
      
      
    }
  pandoraStart(){
    console.log("pandoraStart()");
    this.pandora.login(function(err) {
      if (err) throw err;
      this.pandora.request("user.getStationList", function(err, stationList) {
        if (err) throw err;
        var station = stationList.stations[0];
        this.pandora.request("station.getPlaylist", {
          "stationToken": station.stationToken,
          "additionalAudioUrl": "HTTP_128_MP3"
        }, function(err, playlist) {
          if (err) throw err;
          var track = playlist.items[0];
          console.log("Playing '" + track.songName + "' by " + track.artistName);
          console.log(track.additionalAudioUrl);
        });
      });
    });
  }*/

}