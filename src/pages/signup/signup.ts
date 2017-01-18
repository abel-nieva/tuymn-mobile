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
  private usernameRegex: RegExp;
  public email: FormControl;
  public password: FormControl;
  public signupForm: FormGroup;
  public username: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private userData: UserData,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;
    this.buildFormControls();
    this.signupForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      username: this.username
    });
  }

  // ---
  // PUBLIC METHODS.
  // ---

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

  // ---
  // PRIVATE METHODS.
  // ---

  private buildFormControls() {
    this.username = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern(this.usernameRegex)
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
