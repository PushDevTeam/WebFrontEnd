import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import {Home} from "../pages/home/home";
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {SideScroller} from "../components/side-scroller/side-scroller.component";
import {VideoThumbnail} from "../components/video-thumbnail/video-thumbnail.component";
import { SignInPage } from '../pages/sign-in/sign-in';
import { StartPage } from '../pages/start/start';
import {OnBoardingPage } from '../pages/on-boarding/on-boarding';
import {VideoView} from '../pages/video-view/video-view';


import {AzureService} from '../services/azure.service';

import { AuthService } from '../services/auth';
import {OnboardingService} from '../services/onboarding-info';
import {VideoInfoService} from '../services/video-info.service';
import {VideoImgService} from '../services/video-img.service';
import {VideoSetService} from '../services/video-set.service';
import {VideoService} from '../services/video.service';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {FBService} from '../services/fb.service';

import {FacebookService} from 'ng2-facebook-sdk';


@NgModule({
  declarations: [

    MyApp,
    Home,
    Page1,
    Page2,
    SideScroller,
    VideoThumbnail,
    SignInPage,
    OnBoardingPage,
    StartPage,
    VideoView,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Page1,
    Page2,
    SignInPage,
    OnBoardingPage,
    StartPage,
    VideoView,
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  AzureService,
  AuthService,
  OnboardingService,
  VideoInfoService,
  VideoImgService,
  VideoSetService,
  VideoService,
  UserService,
  StorageService,
  FBService,
  FacebookService



  ]
})
export class AppModule {}
