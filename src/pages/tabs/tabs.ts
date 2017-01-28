import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ReaderPage } from '../reader/reader';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1: any = ReaderPage;
  tab2: any = HomePage;
  tab3: any = ProfilePage;

  constructor() {}

}
