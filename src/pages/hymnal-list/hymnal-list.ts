import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { HymnalData } from '../../providers/hymnal-data';

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
    private hymnalData: HymnalData
    ) {}

  ionViewDidLoad() {
    this.hymnalData.getHymnals()
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
