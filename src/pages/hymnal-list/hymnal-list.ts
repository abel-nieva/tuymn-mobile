import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { HymnalProvider } from '../../providers/hymnal';

@Component({
  selector: 'page-hymnal-list',
  templateUrl: 'hymnal-list.html'
})
export class HymnalListPage {

  public hymnalList;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private hymnalProvider: HymnalProvider
    ) {}

  ionViewDidLoad() {
    this.hymnalProvider.getHymnals()
      .then((response: any) => {
        this.hymnalList = response;
      }, error => {
        console.log(error);
      });
  }

  dismiss(hymnal) {
    this.viewCtrl.dismiss(hymnal);
  }

}
