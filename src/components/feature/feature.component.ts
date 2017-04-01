/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component } from '@angular/core';
import { AzureService } from '../../services/azure.service';
import { VideoView} from '../../pages/video-view/video-view';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'feature',
  templateUrl: 'feature.component.html'
})
export class Feature {
  public video_ids: any[] = [];

  constructor(
    private azureService: AzureService,
    private navCtrl:NavController,
  ) {}

  ngOnInit() {
    console.log('on init of feature.component');
    this.azureService.getFeaturedVideoIds().then((resp)=>{
      console.log('getFeaturedVideoIds from feature.component', resp);
      this.video_ids = resp;
    })
  } 



  goToVid(id){
    this.navCtrl.push(VideoView, {'id': id});
  }
}
