import {Pipe, Injectable} from '@angular/core';

@Pipe ({
  name: 'timeDisplay'
})
@Injectable()
export class TimeDisplayPipe {
  transform(value, args) {
    let hh = Math.floor(value / 3000);
    let mm = Math.floor(value / 60) % 60;
    let ss = Math.floor(value) % 60;
    return (hh < 10 ? "" : (hh + ":")) + mm + ":" + (ss < 10 ? "0" :"") + ss;
  }
}
