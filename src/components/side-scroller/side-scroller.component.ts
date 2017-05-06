/**
 * Created by Javes on 3/19/2017.
 */
import {Component, Input} from '@angular/core';
import {VideoInfoService} from '../../services/video-info.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'side-scroller',
  templateUrl: 'side-scroller.component.html',

})

export class SideScroller {
  @Input() set_label: string;
  public v_ids: string[];



 constructor(private videoInfoService: VideoInfoService,
   private userService: UserService) {

     this.videoInfoService.getAllVideoIds().then( (res) => {
       this.v_ids = res;
     });
 }




 vIdsPromise() {
   return this.videoInfoService.getAllVideoIds();
 }

 goToCategoryView(){
   alert("goToCategoryView: "+ this.set_label);
 }
}
