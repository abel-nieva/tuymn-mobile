import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class FailHandler {

  private CONNECTION_FAILED: number = 100;

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
        this.connectionFailed();
        break;
  
      default:
        break;
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private connectionFailed() {
    this.transalteService.get([
      'alert.connection-failed.title',
      'alert.connection-failed.message',
      'button.accept'
    ])
      .subscribe(translates => {
          this.alertCtrl
            .create({
              title: translates['alert.connection-failed.title'],
              message: translates['alert.connection-failed.message'],
              buttons: [
                {
                  text: translates['button.accept'],
                }
              ]
            })
            .present();
      });
  }

}
