import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { DisallowSpacesDirective } from '../components/disallow-spaces/disallow-spaces';
import { HymnalSheetComponent } from '../components/hymnal-sheet/hymnal-sheet';

import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ReaderPage } from '../pages/reader/reader';
import { HymnListPage } from '../pages/hymn-list/hymn-list';
import { HymnalListPage } from '../pages/hymnal-list/hymnal-list';
import { ProfilePage } from '../pages/profile/profile';

import { HymnalProvider } from '../providers/hymnal';
import { HymnProvider } from '../providers/hymn';

import Parse from 'parse';

@NgModule({
  declarations: [
    MyApp,
    DisallowSpacesDirective,
    HymnalSheetComponent,
    WelcomePage,
    SignupPage,
    TabsPage,
    HomePage,
    ReaderPage,
    HymnListPage,
    HymnalListPage,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HymnalSheetComponent,
    WelcomePage,
    SignupPage,
    TabsPage,
    HomePage,
    ReaderPage,
    HymnListPage,
    HymnalListPage,
    ProfilePage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    HymnalProvider,
    HymnProvider
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
