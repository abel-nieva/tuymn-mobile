import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1: any = HomePage;
  tab2: any;
  tab3: any = ProfilePage;
  tab4: any;

  constructor() {}

}
