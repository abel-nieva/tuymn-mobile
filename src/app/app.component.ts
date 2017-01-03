import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import { TabsPage } from '../pages/tabs/tabs';

import Parse from 'parse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  private currentUser: Parse.User;
  private rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.currentUser = Parse.User.current();

    if (this.currentUser) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = WelcomePage;
    }
  }

}
