import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Home} from "../pages/home/home";
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {SideScroller} from "../components/side-scroller/side-scroller.component";
import {VideoThumbnail} from "../components/video-thumbnail/video-thumbnail.component";
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import {OnBoardingPage } from '../pages/on-boarding/on-boarding';

import {MainData} from '../services/azure.service';

import { AuthService } from '../services/auth';
import {OnboardingService} from '../services/onboarding-info';
//TODO: import video-img and video-info services

@NgModule({
  declarations: [

    MyApp,
    Home,
    Page1,
    Page2,
    SideScroller,
    VideoThumbnail,
    SignInPage,
    SignUpPage,
    OnBoardingPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Page1,
    Page2,
    SignInPage,
    SignUpPage,
    OnBoardingPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  MainData,
  AuthService,
  OnboardingService

  ]
})
export class AppModule {}
