import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import {WindowsAzure} from 'cordova-plugin-ms-azure-mobile-apps';
declare var WindowsAzure: any;
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
