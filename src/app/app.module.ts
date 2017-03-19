import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Home} from "../pages/home/home";
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {SideScroller} from "../components/side-scroller/side-scroller.component";
import {VideoThumbnail} from "../components/video-thumbnail/video-thumbnail.component";


@NgModule({
  declarations: [

    MyApp,
    Home,
    Page1,
    Page2,
    SideScroller,
    VideoThumbnail

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Page1,
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
