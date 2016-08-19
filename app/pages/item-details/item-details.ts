import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Item} from '../../item';
import {RestoreService} from '../../providers/restore-service/restore-service';
import {ItemService} from '../../providers/item-service/item-service';
import { DetailsRenderer } from '../../components/details-renderer/details-renderer';
/*
  Generated class for the ItemDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/item-details/item-details.html',
  providers: [RestoreService],
  directives: [DetailsRenderer],
})
export class ItemDetailsPage implements OnInit{
  public item: Item;

  constructor(private navCtrl: NavController, private navParams:NavParams, private restoreService:RestoreService<Item>, public itemService: ItemService) {
  }

  ngOnInit(){
    
    this.restoreService.setItem(this.navParams.get('item'));
    this.item = this.restoreService.getItem();
    /*this.item.name = modelItem.name;
    this.item.breadUnits = modelItem.breadUnits;*/
  }
  
  saveItem(){
    this.itemService.alterItem(this.navParams.get('item'), this.restoreService.currentItem);
    this.navCtrl.pop();
  }

  cancelEdit(){
    this.item = this.restoreService.restoreItem();
    this.navCtrl.pop();
  }


}
