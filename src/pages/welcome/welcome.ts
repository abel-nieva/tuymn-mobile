import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

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

  presentSignup() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

}
