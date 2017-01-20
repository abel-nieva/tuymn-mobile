import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  public signUpPage: any;
  public loginPage: any;

  constructor(
    public navCtrl: NavController
  ) {
    this.signUpPage = SignupPage;
    this.loginPage = LoginPage;
  }

}
