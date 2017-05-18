import { Component, ViewChild } from '@angular/core';
import {Content, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import {AzureService} from '../services/azure.service';
import {UserService, UserObj} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {PandoraService} from '../services/pandora.service';

import {Home} from "../pages/home/home";
import { Terms} from '../pages/terms/terms';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import {OnBoardingPage } from '../pages/on-boarding/on-boarding';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import { StartPage } from '../pages/start/start';
import {VideoView} from '../pages/video-view/video-view';
import {VideoRatingPage} from '../pages/video-rating/video-rating';


import {FBService} from '../services/fb.service';

//import * as WindowsAzure from 'azure-mobile-apps-client';
declare var MobileAccessibility: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Content) content: Content;
  //rootPage: any = Home;
  rootPage: any = Home;
  pages: Array<{ title: string, component: any, icon_name: string }>;

  constructor(public platform: Platform,
    private azureService: AzureService,
    private userService: UserService,
    private storage: Storage,
    private fbService: FBService,
    private pandoraService: PandoraService

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home, icon_name: 'Home' },
      { title: 'Contact Us', component: ContactUsPage, icon_name: 'Email'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //TODO uncomment this if building for mobile
      //MobileAccessibility.usePreferredTextZoom(false);
        if (this.userService.loadStoredUser()) {
          //console.log('user found');
          this.nav.setRoot(Home);
        } else {
          //console.log('no user locally stored');
          //this.nav.setRoot(StartPage);
          this.nav.setRoot(Home);
        }

        StatusBar.styleDefault();
        Splashscreen.hide();
        //console.log("initializeApp");

      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  signOutUser(){
    //clear UserObj
    // clear storage
    this.userService.clearUser();
    //send to Start
    this.nav.setRoot(StartPage);
  }
}
