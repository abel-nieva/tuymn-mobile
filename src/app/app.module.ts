import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MyApp } from './app.component';

import { UniqueEmailDirective } from '../components/unique-email/unique-email';
import { UniqueUsernameDirective } from '../components/unique-username/unique-username';

import { HymnalSheetComponent } from '../components/hymnal-sheet/hymnal-sheet';
import { InputErrorComponent } from '../components/input-error/input-error';

import { HomePage } from '../pages/home/home';
import { HymnalListPage } from '../pages/hymnal-list/hymnal-list';
import { HymnListPage } from '../pages/hymn-list/hymn-list';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ReaderPage } from '../pages/reader/reader';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import { FailHandler } from '../providers/fail-handler';
import { HymnalData } from '../providers/hymnal-data';
import { HymnData } from '../providers/hymn-data';
import { UserData } from '../providers/user-data';

import Parse from 'parse';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    UniqueEmailDirective,
    UniqueUsernameDirective,
    HymnalSheetComponent,
    InputErrorComponent,
    HomePage,
    HymnalListPage,
    HymnListPage,
    LoginPage,
    ProfilePage,
    ReaderPage,
    SignupPage,
    TabsPage,
    WelcomePage
  ],
  imports: [
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HymnalListPage,
    HymnListPage,
    LoginPage,
    ProfilePage,
    ReaderPage,
    SignupPage,
    TabsPage,
    WelcomePage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    FailHandler,
    HymnalData,
    HymnData,
    UserData
  ]
})
export class AppModule {

  private APP_ID: string = 'QF8buyf4MSwhouHy45Oql5nuukJTdSvu8jv6oZiI';
  private JAVASCRIPT_KEY: string = 'DsIrvyqae5NvIjcu7x43ZpXybONdYSaw4BixXTpe';
  private SERVER_URL: string = 'https://parseapi.back4app.com';

  constructor() {
    Parse.initialize(this.APP_ID, this.JAVASCRIPT_KEY);
    Parse.serverURL = this.SERVER_URL;
  }

}
