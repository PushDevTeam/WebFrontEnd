/**
 * Created by Javes on 3/19/2017.
 */
import {Component, Input, ViewChild} from '@angular/core';
import {Slides} from 'ionic-angular';
import {VideoInfoService} from '../../services/video-info.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'side-scroller',
  templateUrl: 'side-scroller.component.html',

})

export class SideScroller {
  @ViewChild(Slides) slides: Slides;
  @Input() set_id: string;
  public v_ids: string[];



  constructor(private videoInfoService: VideoInfoService,
    private userService: UserService) {
      // TODO fetch a set of ids
    this.videoInfoService.getAllVideoIds().then((res) => {
      this.v_ids = res;
    });
  }

  ngAfterViewInit(){
    this.slides.lockSwipes(true);

  }


  vIdsPromise() {
    return this.videoInfoService.getAllVideoIds();
  }

  goToCategoryView() {
    alert("goToCategoryView: " + this.set_id);
  }
  slideLeft(){
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }
  slideRight(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

}
