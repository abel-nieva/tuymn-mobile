import { Component, OnInit } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TranslateService } from 'ng2-translate';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';

import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  public rootPage: any;

  constructor(
    private config: Config,
    private platform: Platform,
    private transalteService: TranslateService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('es');
    this.translateService.use('es');

    this.configApp();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    if (Parse.User.current()) {
      this.rootPage = TabsPage;
      return;
    }
    this.rootPage = WelcomePage;
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private configApp() {
    this.transalteService.get([
      'button.back'
    ])
      .subscribe(translates => {
          this.config.set('backButtonText', translates['button.back'])
      });
  }

}
