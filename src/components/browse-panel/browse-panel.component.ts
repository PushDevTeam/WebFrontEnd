import {Component} from '@angular/core';
import {VideoThumbnail} from '../video-thumbnail/video-thumbnail.component';
import {VideoInfoService} from '../../services/video-info.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'browse-panel',
  templateUrl: 'browse-panel.component.html',

})

export class BrowsePanel {



 constructor(private videoInfoService: VideoInfoService,
   private userService: UserService) {

 }

}
