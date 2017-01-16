import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { MyApp } from './app.component';

import { DisallowSpacesDirective } from '../components/disallow-spaces/disallow-spaces';
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

import { HymnalProvider } from '../providers/hymnal';
import { HymnProvider } from '../providers/hymn';
import { UserData } from '../providers/user-data';

import Parse from 'parse';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    DisallowSpacesDirective,
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
    HymnalProvider,
    HymnProvider,
    UserData
  ]
})
export class AppModule {
  private appId: string = ')+A8?.Q^Nawmh*Aa';
  private serverURL: string = 'https://tuymn-parse.herokuapp.com/parse';

  constructor() {
    Parse.initialize(this.appId);
    Parse.serverURL = this.serverURL;
  }

}
