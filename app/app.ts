import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {InsulinCalculator} from './pages/insulin-calculator/insulin-calculator';
import {EditFactorsPage} from './pages/edit-factors/edit-factors';
import {SavedItemsPage} from './pages/saved-items/saved-items';
import {ItemService} from './providers/item-service/item-service';
import {ItemSavedService} from './providers/item-saved-service/item-saved-service';
import { FactorService } from './providers/factor-service/factor-service';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InsulinCalculator;
  pages: Array<{title: string, component:any}>;

  constructor(public platform: Platform, public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      {title: 'Insulin Rechner', component: InsulinCalculator},
      {title: 'Faktoren bearbeiten', component: EditFactorsPage},
      {title: 'gespeicherte Elemente', component: SavedItemsPage},

    ]
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }
}

ionicBootstrap(MyApp, [ItemService, ItemSavedService, FactorService]);
