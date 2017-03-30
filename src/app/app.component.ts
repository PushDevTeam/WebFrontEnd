import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import {AzureService} from '../services/azure.service';
import {UserService, UserObj} from '../services/user.service';
import {StorageService} from '../services/storage.service';


import {Home} from "../pages/home/home";
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
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
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    private maindata: AzureService,
    private userService: UserService,
    private storage: Storage,
    private fbService: FBService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 },
      { title: 'Start', component: StartPage }

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.maindata.connectAzure(WindowsAzure.MobileServiceClient);
      this.fbService.userLogin().then((response)=>{
        this.fbService.getUserFriends();
        this.fbService.getUserInfo();
        this.maindata.testDataGetter();
      })

      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log("initializeApp");
      //
      /*
      var user = new UserObj();
      user.email = "rodgers@gbp.win";
      user.username = "rodgers12";
      user.password = "password";
      user.id = 0;
      this.userService.storeUser(user).then((success) => {
        console.log(success);
        this.userService.loadStoredUser().then((found) => {
          if (found) {
            console.log("user found");
            // actually Authorizing page that begins Auth process
            this.rootPage = Home;
          } else {
            console.log("no user locally stored");
            this.rootPage = StartPage
          }
        });
      });*/
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
