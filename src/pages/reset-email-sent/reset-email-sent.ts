import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-reset-email-sent',
  templateUrl: 'reset-email-sent.html'
})
export class ResetEmailSentPage {

  public params: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.params = {
      email: this.navParams.get('email')
    };
  }

  // ---
  // PUBLIC METHODS.
  // ---

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
