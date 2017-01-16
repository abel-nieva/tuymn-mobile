import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public logInForm: FormGroup;
  public username: FormControl;
  public password: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController
  ) {
    this.buildFormControls();
    this.logInForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  public dismissPage() {
    this.viewCtrl.dismiss();
  }

  public onSubmit() {
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    loading.present();

    this.userData.logIn(
      this.logInForm.value.username,
      this.logInForm.value.password
    )
      .then(user => {
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }

  private buildFormControls() {
    this.username = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])
    );
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
    );
  }

}
