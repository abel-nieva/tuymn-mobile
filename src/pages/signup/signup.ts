import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, ViewController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private emailRegex: RegExp;
  public signupForm: FormGroup;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private userData: UserData
  ) {
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.buildFormControls();
    this.signupForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  public onSubmit() {
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    loading.present();

    this.userData.signUp(
      this.signupForm.value.username,
      this.signupForm.value.password,
      this.signupForm.value.email
    )
      .then(data => {
        this.navCtrl.setRoot(TabsPage);
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  private buildFormControls() {
    this.username = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])
    );
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
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
