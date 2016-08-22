import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import {ItemService} from '../../providers/item-service/item-service';
import {Item} from '../../item';
import { ItemSavedService } from '../../providers/item-saved-service/item-saved-service';


@Component({
  templateUrl: 'build/pages/saved-items/saved-items.html',
})
export class SavedItemsPage {
  constructor(private navCtrl: NavController, public itemService: ItemService, public itemSaveService: ItemSavedService, public toastCtrl: ToastController) { }

  ionViewWillEnter(){
    this.itemSaveService.refresh();
  }

  adoptItem(item: Item){
    this.itemService.items.push(item);
    this.itemSaveService.presentToast('Bestandteil zum Rechner hinzugefügt')
  }

}
