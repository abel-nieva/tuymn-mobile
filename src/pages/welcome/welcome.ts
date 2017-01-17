import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  // ---
  // PUBLIC METHODS.
  // ---

  public presentLogin() {
    this.modalCtrl.create(LoginPage).present();
  }

  public presentSignup() {
    this.modalCtrl.create(SignupPage).present();
  }

}
