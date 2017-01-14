import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import Parse from 'parse';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private emailRegex: RegExp;
  public signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
  ) {
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRegex)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ]
    });
  }

  onSubmit() {
    let loading = this.loadingCtrl.create();
    loading.present();

    let user = new Parse.User();
    user.set('username', this.signupForm.value.username);
    user.set('password', this.signupForm.value.password);
    user.set('email', this.signupForm.value.email);

    user.signUp(null)
      .then(user => {
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      }, error => {
        alert('Error: ' + error.code + ' ' + error.message);
        loading.dismiss();
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
