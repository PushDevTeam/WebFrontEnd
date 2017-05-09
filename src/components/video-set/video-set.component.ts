import {Component, ViewChild, Input} from '@angular/core';
import { SideScroller} from '../side-scroller/side-scroller.component';


@Component({
  selector: 'video-set',
  templateUrl:'video-set.component.html',
})
export class VideoSet {
  @ViewChild(SideScroller) sidescroller: SideScroller;
  @Input() set_info: string[];

  constructor(){

  }

}
