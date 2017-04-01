import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar, Splashscreen } from 'ionic-native';


import { MyApp } from './app.component';
import { Feature} from '../components/feature/feature.component';
import {Home} from "../pages/home/home";
import { Terms } from '../pages/terms/terms';
import {SideScroller} from "../components/side-scroller/side-scroller.component";
import {VideoThumbnail} from "../components/video-thumbnail/video-thumbnail.component";
import { SignInPage } from '../pages/sign-in/sign-in';
import { StartPage } from '../pages/start/start';
import {OnBoardingPage } from '../pages/on-boarding/on-boarding';
import {VideoView} from '../pages/video-view/video-view';
import {VideoRatingPage} from '../pages/video-rating/video-rating';
import { ForgotPasswordPage} from '../pages/forgot-password/forgot-password';

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
    SideScroller,
    VideoThumbnail,
    SignInPage,
    OnBoardingPage,
    StartPage,
    VideoView,
    Feature,
    VideoRatingPage,
    Terms,
    ForgotPasswordPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // TODO revise this
    MyApp,
    Home,
    SignInPage,
    OnBoardingPage,
    StartPage,
    VideoView,
    ForgotPasswordPage,
    VideoRatingPage,
    Terms
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
  FacebookService,

  ]
})
export class AppModule {}
