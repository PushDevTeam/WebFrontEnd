/* Framework imports */
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
// import {StatusBar, Splashscreen} from 'ionic-native';

/* Root */
import {MyApp} from './app.component';
/* Pages */
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {Home} from "../pages/home/home";
import {OnBoardingPage} from '../pages/on-boarding/on-boarding';
import {SignInPage} from '../pages/sign-in/sign-in';
import {StartPage} from '../pages/start/start';
import {Terms} from '../pages/terms/terms';
import {VideoRatingPage} from '../pages/video-rating/video-rating';
import {VideoView} from '../pages/video-view/video-view';

/* Components */
import {BottomBar} from '../components/bottombar/bottombar.component';
import {Feature} from '../components/feature/feature.component';
import {Headliner} from '../components/headliner/headliner.component';
import {SideScroller} from "../components/side-scroller/side-scroller.component";
import {TopBar} from '../components/topbar/topbar.component';
import {VideoThumbnail} from "../components/video-thumbnail/video-thumbnail.component";
import {DropDown} from '../components/dropdown/dropdown';


/* Services */
import {AuthService} from '../services/auth';
import {AzureService} from '../services/azure.service';
import {CustomAuthService} from '../services/customauth.service';
import {FBService} from '../services/fb.service';
import {PandoraService} from '../services/pandora.service';
import {StorageService} from '../services/storage.service';
import {UserService} from '../services/user.service';
import {VideoInfoService} from '../services/video-info.service';

/* JS library services*/
import {FacebookService} from 'ng2-facebook-sdk';



@NgModule({
  declarations: [
    // root
    MyApp,
    // pages
    ContactUsPage,
    ForgotPasswordPage,
    Home,
    OnBoardingPage,

    SignInPage,
    StartPage,
    Terms,
    VideoRatingPage,
    VideoView,
    // components
    BottomBar,
    Headliner,
    Feature,
    SideScroller,
    VideoThumbnail,
    TopBar,
    DropDown,

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
    Terms,
    ContactUsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AzureService,
    CustomAuthService,
    FBService,
    PandoraService,
    StorageService,
    UserService,
    VideoInfoService,
    FacebookService,
  ]
})
export class AppModule {
}
