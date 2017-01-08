import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { HymnProvider } from '../../providers/hymn';

@Component({
  selector: 'page-hymn-list',
  templateUrl: 'hymn-list.html'
})
export class HymnListPage {

  public hymnList;
  private readerHymnal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private hymnProvider: HymnProvider
  ) {
    this.readerHymnal = this.navParams.get('readerHymnal');
  }

  ionViewDidLoad() {
    this.hymnProvider.getHymnsByHymnal(this.readerHymnal)
      .then((results: any) => {
        this.hymnList = this.hymnProvider.parseHymns(results);
      }, error => {
        console.log(error);
      });
  }

  dismiss(hymn) {
    let data = {
      hymn: hymn
    };
    this.viewCtrl.dismiss(data);
  }

  getItems() {
    
  }

}
