import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public modalCtrl: ModalController
  ) {}

  presentSignup() {
    let modal = this.modalCtrl.create(SignupPage);
    modal.present();
  }

}
