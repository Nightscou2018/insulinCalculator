import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ItemService} from '../../providers/item-service/item-service';
import {Item} from '../../item';
import { ItemSavedService } from '../../providers/item-saved-service/item-saved-service';


@Component({
  templateUrl: 'build/pages/saved-items/saved-items.html',
})
export class SavedItemsPage {
  constructor(private navCtrl: NavController, public itemService: ItemService, public itemSaveService: ItemSavedService) { }

  ionViewWillEnter(){
    this.itemSaveService.refresh();
  }

}
