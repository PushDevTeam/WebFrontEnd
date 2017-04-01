/**
 * Created by Javes on 3/19/2017.
 */
/**
 * Created by Javes on 3/19/2017.
 */
import { Component } from '@angular/core';
import { AzureService } from '../../services/azure.service';


@Component({
  selector: 'feature',
  templateUrl: 'feature.component.html'
})
export class Feature {
  public video_ids: any[];

  constructor(
    private azureService: AzureService
  ) {

  }

  ngOnInit() {
    this.azureService.getFeaturedVideoIds()
      .then((resp) => {
        console.log('feature component: ', resp);
      }, (resp) => {
        console.log('feature component the second time: ', resp);
      });
  }
}
