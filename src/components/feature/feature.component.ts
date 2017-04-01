/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component } from '@angular/core';
import { AzureService } from '../../services/azure.service';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'feature',
  templateUrl: 'feature.component.html'
})
export class Feature {
  public video_ids: any[];

  constructor(
    private azureService: AzureService
  ) {}

  ngOnInit() {
    console.log('on init of feature.component', this);
    console.log(this.azureService);
    if (this.azureService.isinitialized){
      this.azureService.getFeaturedVideoIds().then((resp)=>{
        console.log('getFeaturedVideoIds from feature.component', resp);
      })
    } else {
      console.log('tried to get azure data before azure was initialized');
    } 
  }
}
