import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ItemService } from '../../providers/item-service/item-service';
import { ItemSavedService } from '../../providers/item-saved-service/item-saved-service';
import { Item } from '../../item';
import { Factor } from '../../factor';
import { DetailsRenderer } from '../../components/details-renderer/details-renderer';
import { InsulinResult } from '../../components/insulin-result/insulin-result';
import { Tenth } from '../../pipes/tenth';

/*
  Generated class for the QuickCalculatorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/quick-calculator/quick-calculator.html',
  directives: [InsulinResult, DetailsRenderer],
  pipes: [Tenth],
})
export class QuickCalculatorPage {
  public index;
  
  constructor(public navCtrl: NavController, public itemService: ItemService, public itemSavedService: ItemSavedService) { 
  }

  resetNewItem(){
    this.itemService.resetNewItem();
  }

  saveItem(index: number){
    this.itemSavedService.saveItem(this.itemService.items[0]);
  }

  factorChanged(index: number){
    this.itemService.setSelectedFactor(index);
  }

}
