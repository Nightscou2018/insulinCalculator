import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { InsulinCalculatorPage } from './pages/insulin-calculator/insulin-calculator';
import { QuickCalculatorPage } from './pages/quick-calculator/quick-calculator';
import { EditFactorsPage } from './pages/edit-factors/edit-factors';
import { SavedItemsPage } from './pages/saved-items/saved-items';
import { ItemService } from './providers/item-service/item-service';
import { ItemSavedService } from './providers/item-saved-service/item-saved-service';
import { FactorService  } from './providers/factor-service/factor-service';


@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = InsulinCalculatorPage;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.pages = [
      { title: 'Insulin Rechner', component: InsulinCalculatorPage, icon: 'calculator' },
      { title: 'Schnell', component: QuickCalculatorPage, icon: 'flash' },
      { title: 'Faktoren bearbeiten', component: EditFactorsPage, icon: 'options' },
      { title: 'gespeicherte Elemente', component: SavedItemsPage, icon: 'pizza' },

    ];


  };

  onPageChange(page){
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [ItemService, ItemSavedService, FactorService]);
