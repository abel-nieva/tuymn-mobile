import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';

export const firebaseConfig = {
  apiKey: "AIzaSyDZu_cCm45CcQkjsb_QLNY9tk49R5jH3F8",
  authDomain: "tuymn-865fc.firebaseapp.com",
  databaseURL: "https://tuymn-865fc.firebaseio.com",
  storageBucket: "tuymn-865fc.appspot.com",
  messagingSenderId: "745519708545"
};

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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
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
export class AppModule {}
