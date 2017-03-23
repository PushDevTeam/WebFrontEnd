/**
 * Created by Javes on 3/19/2017.
 */
import {Component, Input} from '@angular/core';
import {VideoThumbnail} from '../video-thumbnail/video-thumbnail.component';
import {VideoSetService} from '../../services/video-set.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'side-scroller',
  templateUrl: 'side-scroller.component.html',
  providers: [VideoSetService]
})

export class SideScroller {
  @Input() set_label: string;
  public v_ids: number[];



 constructor(private setService: VideoSetService,
   private userService: UserService) {


 }

 ngOnInit(){
   this.getVideoCollection();
 }


 getVideoCollection(){
   this.v_ids = this.setService.getSetIds(this.set_label);
 }

 goToCategoryView(){
   alert("goToCategoryView: "+ this.set_label);
 }
}
