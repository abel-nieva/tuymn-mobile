import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { HymnProvider } from '../../providers/hymn';

@Component({
  selector: 'page-hymn-list',
  templateUrl: 'hymn-list.html'
})
export class HymnListPage {

  public hymnList;
  public readerHymn;
  private readerHymnal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private hymnProvider: HymnProvider
  ) {
    this.readerHymn = this.navParams.get('readerHymn');
    this.readerHymnal = this.navParams.get('readerHymnal');
  }

  ionViewDidLoad() {
    this.hymnProvider.getHymnsByHymnal(this.readerHymnal)
      .then((results: any) => {
        this.hymnList = results;
      }, error => {
        console.log(error);
      });
  }

  dismiss(hymn) {
    if (hymn) {
      hymn = hymn.toJSON();
    }
    this.viewCtrl.dismiss(hymn);
  }

  getItems() {
    
  }

}
