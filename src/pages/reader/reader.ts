import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';

import { AlertComponent } from '../../components/alert/alert';

import { HymnListPage } from '../hymn-list/hymn-list';
import { HymnalListPage } from '../hymnal-list/hymnal-list';

import { HymnalProvider } from '../../providers/hymnal';
import { HymnProvider } from '../../providers/hymn';

@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})
export class ReaderPage {

  public readerHymnal: any = {};
  private readerHymnalObj: any;
  public readerHymn: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private hymnalProvider: HymnalProvider,
    private hymnProvider: HymnProvider
  ) {}

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    loading.present();
    this.hymnalProvider.getFirst()
      .then((response: any) => {
        this.readerHymnalObj = response;
        this.readerHymnal = response.toJSON();
        this.hymnProvider.getFirst(response)
          .then((response: any) => {
            loading.dismiss();
            this.readerHymn = this.hymnProvider.parse(response.toJSON());
          }, error => {
            loading.dismiss();
            console.log(error);
          });
      }, error => {
        loading.dismiss();
        console.log(error);
      });
  }

  presentHymnList() {
    let hymnListModal = this.modalCtrl.create(HymnListPage, {
      readerHymnal: this.readerHymnalObj
    });

    hymnListModal.onDidDismiss(hymn => {
      if (!!hymn && hymn.objectId != this.readerHymn.objectId) {
        this.readerHymn = this.hymnProvider.parse(hymn);
      }
    });
    hymnListModal.present();
  }

  presentHymnalList() {
    let hymnalListModal = this.modalCtrl.create(HymnalListPage);

    hymnalListModal.onDidDismiss(hymnal => {
      if (!!hymnal && hymnal.id != this.readerHymnal.objectId) {
        this.readerHymnalObj = hymnal;
        this.readerHymnal = hymnal.toJSON();
        this.hymnProvider.getFirst(this.readerHymnalObj)
          .then((response: any) => {
            this.readerHymn = this.hymnProvider.parse(response.toJSON());
          }, error => {
            console.log(error);
          });
      }
    });
    hymnalListModal.present();
  }

}
