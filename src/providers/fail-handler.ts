import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class FailHandler {

  constructor(
    private alertCtrl: AlertController,
    private transalteService: TranslateService
  ) {}

  // ---
  // PUBLIC METHODS.
  // ---

  handle(error) {
    switch (error.code) {
      case 100:
        this.connectionFailed();
        break;
    
      default:
        break;
    }
  }

  // ---
  // PRIVATE METHODS.
  // ---

  connectionFailed() {
    this.transalteService.get('button.login')
      .catch(data => {
        return data;
      });
    // let alert = this.alertCtrl.create({
    //   title: 'No hay conexión',
    //   message: data,//'Lo sentimos, en este momento Tuymn no puede conectarse con el servidor. Por favor, revisa la conexión a Internet e inténtalo de nuevo más tarde.',
    //   buttons: [
    //     {
    //       text: 'Ignorar',
    //       handler: () => {

    //       }
    //     },
    //     {
    //       text: 'Reintentar',
    //       handler: () => {

    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

}
