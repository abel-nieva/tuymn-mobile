import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

import Parse from 'parse';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    SignupPage,
    TabsPage,
    HomePage,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    SignupPage,
    TabsPage,
    HomePage,
    ProfilePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  private appId: string = ')+A8?.Q^Nawmh*Aa';
  private serverURL: string = 'https://tuymn-parse.herokuapp.com/parse';

  constructor() {
    Parse.initialize(this.appId);
    Parse.serverURL = this.serverURL;
  }

}
