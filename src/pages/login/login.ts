import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FailHandler } from '../../providers/fail-handler';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public logInForm: FormGroup;
  public username: FormControl;
  public password: FormControl;

  constructor(
    private failHandler: FailHandler,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController
  ) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.logInForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  // ---
  // PUBLIC METHODS.
  // ---

  public onSubmit() {
    let loading = this.loadingCtrl.create({showBackdrop: false});

    loading.present();
    this.userData.logIn(
      this.logInForm.value.username,
      this.logInForm.value.password
    )
      .then(user => {
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(error => {
        loading.dismiss();
        this.failHandler.handle(error);
      });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
