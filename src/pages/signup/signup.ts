import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private email: string;
  private password: string;

  constructor(
    public viewCtrl: ViewController,
    private auth: AngularFireAuth
  ) {}

  dismiss() {
    this.viewCtrl.dismiss();
  }

  signup() {
    console.log(this.email, this.password);
  }

}
