import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainData } from '../services/azure.service';

import {Home} from "../pages/home/home";
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SignInPage } from '../pages/sign-in/sign-in';
// import { SignUpPage } from '../pages/sign-up/sign-up';
// import {OnBoardingPage } from '../pages/on-boarding/on-boarding';

declare var WindowsAzure: any;

@Component({
  templateUrl: 'app.html',
  providers: [MainData]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //  rootPage: any = Home;
  rootPage = SignInPage;
  //mainData: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private maindata: MainData) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home},
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];
    console.log(this.pages);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.maindata.connectAzure(WindowsAzure.MobileServiceClient);
      this.maindata.authenticateUser();
      
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
