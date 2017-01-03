import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import Parse from 'parse';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private email: string;
  private password: string;

  constructor(
    public viewCtrl: ViewController
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  signup() {
  }

}
