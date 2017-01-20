import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class FailHandler {

  private CONNECTION_FAILED: number = 100;
  private USER_INVALID_LOGIN_PARAMS: number = 101;
  private USERNAME_TAKEN: number = 202;
  private USER_EMAIL_TAKEN: number = 203;
  private USER_WITH_EMAIL_NOT_FOUND: number = 205;

  constructor(
    private alertCtrl: AlertController,
    private transalteService: TranslateService
  ) {}

  // ---
  // PUBLIC METHODS.
  // ---

  public handle(error) {
    switch (error.code) {
      case this.CONNECTION_FAILED:
        this.presentAlert('alert.connection-failed.message');
        break;
      case this.USER_INVALID_LOGIN_PARAMS:
        this.presentAlert('alert.user-invalid-login-params.message');
        break;
      case this.USERNAME_TAKEN:
        this.presentAlert('alert.username-taken.message');
        break;
      case this.USER_EMAIL_TAKEN:
        this.presentAlert('alert.user-email-taken.message');
        break;
      case this.USER_WITH_EMAIL_NOT_FOUND:
        this.presentAlert('alert.user-with-email-not-found.message');
        break;
      default:
        this.presentAlert('alert.default.message');
        break;
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private presentAlert(message: string) {
    this.transalteService.get(['alert.title', message, 'button.accept'])
      .subscribe(translates => {
          this.alertCtrl
            .create({
              title: translates['alert.title'],
              message: translates[message],
              buttons: [{text: translates['button.accept']}]
            })
            .present();
      });
  }

}
