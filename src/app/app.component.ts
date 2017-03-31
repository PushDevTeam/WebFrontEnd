import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import {AzureService} from '../services/azure.service';
import {UserService, UserObj} from '../services/user.service';
import {StorageService} from '../services/storage.service';


import {Home} from "../pages/home/home";
import { Terms} from '../pages/terms/terms';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import {OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { StartPage } from '../pages/start/start';
import {VideoView} from '../pages/video-view/video-view';
import {FBService} from '../services/fb.service';
declare var WindowsAzure: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  //rootPage: any = Home;
  rootPage: any = Home;
  pages: Array<{ title: string, component: any, icon_name: string }>;

  constructor(public platform: Platform,
    private maindata: AzureService,
    private userService: UserService,
    private storage: Storage,
    private fbService: FBService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home, icon_name: 'home' },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.maindata.connectAzure(WindowsAzure.MobileServiceClient);

      this.userService.loadStoredUser().then((found) =>{
        if (found) {
          console.log('user found');
          this.rootPage = Home;
        } else {
          console.log('no user locally stored');
          this.rootPage = StartPage;
        }
      });


      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log("initializeApp");

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
    //send to Start
  }
}
