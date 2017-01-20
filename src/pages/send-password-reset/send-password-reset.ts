import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { FailHandler } from '../../providers/fail-handler';
import { ResetEmailSentPage } from '../reset-email-sent/reset-email-sent';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'send-password-reset',
  templateUrl: 'send-password-reset.html'
})
export class SendPasswordResetPage {

  private emailRegex: RegExp;
  public email: FormControl;
  public sendPasswordResetForm: FormGroup;

  constructor(
    private failHandler: FailHandler,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public viewCtrl: ViewController
  ) {
    this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex)
      ])
    );
    this.sendPasswordResetForm = this.formBuilder.group({
      email: this.email
    });
  }

  // ---
  // PUBLIC METHODS.
  // ---

  public onSubmit() {
    let loading = this.loadingCtrl.create({showBackdrop: false});

    loading.present();
    this.userData.requestPasswordReset(this.sendPasswordResetForm.value.email)
      .then(() => {
        loading.dismiss();
        this.pushResetEmailSent();
      })
      .catch(error => {
        loading.dismiss();
        this.failHandler.handle(error);
      });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private pushResetEmailSent() {
    this.navCtrl.push(ResetEmailSentPage, {email: this.sendPasswordResetForm.value.email});
  }

}
