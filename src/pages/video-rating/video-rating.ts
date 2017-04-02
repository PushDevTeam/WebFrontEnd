import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Home } from '../home/home';
import { VideoInfoObj } from '../../components/video-thumbnail/video-info-obj';
import { VideoInfoService } from '../../services/video-info.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators } from "@angular/forms";

import { AzureService } from '../../services/azure.service';

/*
  Created by Nstopa
  3/29/2017

  Modal page to rate videos post-workout
*/

@Component({
  selector: 'page-video-rating',
  templateUrl: 'video-rating.html'
})
export class VideoRatingPage {
  public videoInfo : VideoInfoObj;
  private id: number;
  private stars: any[];
  private rating: number;
  private commentForm: FormGroup;
  constructor(public videoInfoService: VideoInfoService,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private azureService: AzureService) {

                this.commentForm = formBuilder.group({
                  comment: ['',
                Validators.compose([
                  Validators.maxLength(140)
                ])]
                });
              }


  ngOnInit() {
  this.stars = ['1', '2', '3', '4', '5'];
  this.id = this.navParams.get('id');
  this.rating = 0;
   this.videoInfo = this.videoInfoService.getVideoInfo(this.id);
  }


setRating(index: number) {
  this.rating = index;
}

onShare() {
    this.viewCtrl.dismiss();
}

onSubmit() {
  this.viewCtrl.dismiss();
  this.azureService.postVideoFeedback(String(this.id), String(this.rating),
                      this.commentForm.controls['comment'].value);
}


onExit() {
  this.viewCtrl.dismiss();
}

}
