import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController, Content } from 'ionic-angular';

import { HymnListPage } from '../hymn-list/hymn-list';
import { HymnalListPage } from '../hymnal-list/hymnal-list';

import { HymnalData } from '../../providers/hymnal-data';
import { HymnData } from '../../providers/hymn-data';

@Component({
  selector: 'page-reader',
  templateUrl: 'reader.html'
})
export class ReaderPage {
  @ViewChild(Content) content: Content;

  public readerHymnal: any = {};
  private readerHymnalObj: any;
  public readerHymn: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private hymnalData: HymnalData,
    private hymnData: HymnData
  ) {}

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });

    loading.present();
    this.hymnalData.getFirst()
      .then((response: any) => {
        this.readerHymnalObj = response;
        this.readerHymnal = response.toJSON();
        this.hymnData.getFirst(response)
          .then((response: any) => {
            loading.dismiss();
            this.readerHymn = this.hymnData.parse(response.toJSON());
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
      readerHymnal: this.readerHymnalObj,
      readerHymn: this.readerHymn
    });

    hymnListModal.onDidDismiss(hymn => {
      if (!!hymn && hymn.objectId != this.readerHymn.objectId) {
        this.readerHymn = this.hymnData.parse(hymn);
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
        this.hymnData.getFirst(this.readerHymnalObj)
          .then((response: any) => {
            this.readerHymn = this.hymnData.parse(response.toJSON());
          }, error => {
            console.log(error);
          });
      }
    });
    hymnalListModal.present();
  }

  nextHymn() {
    this.getHymnByNumber(this.readerHymn.number + 1);
  }

  previousHymn() {
    this.getHymnByNumber(this.readerHymn.number - 1);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  private getHymnByNumber(number): void {
    this.hymnData.getHymnByNumber(number)
      .then((result: any) => {
        this.readerHymn = this.hymnData.parse(result.toJSON());
        this.scrollToTop();
      }, error => {
        console.log(error);
      });
  }

}
