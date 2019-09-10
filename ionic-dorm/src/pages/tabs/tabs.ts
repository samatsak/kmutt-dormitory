import { Component } from '@angular/core';

import { FavPage } from '../favorite/favorite';
import { HomePage } from '../home/home';
//import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavPage;

  constructor() {

  }

}
