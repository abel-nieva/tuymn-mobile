import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ViewController, LoadingController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import Parse from 'parse';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {
  public signupForm: any;
  private emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
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
