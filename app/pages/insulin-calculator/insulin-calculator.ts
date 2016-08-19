import {Component, OnInit, EventEmitter} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {CreateItemPage} from '../create/create';
import {Item} from '../../item';
import {ItemDetailsPage} from '../item-details/item-details';
import {Factor} from '../../factor';
import {ItemService} from '../../providers/item-service/item-service';
import {ItemSavedService} from '../../providers/item-saved-service/item-saved-service';
import {InsulinResult} from '../../components/insulin-result/insulin-result';
import { FactorService } from '../../providers/factor-service/factor-service';

@Component({
  templateUrl: 'build/pages/insulin-calculator/insulin-calculator.html',
  directives: [InsulinResult],
})
export class InsulinCalculator implements OnInit {
  public selectedFactor;
  public currentFactor: number;
  
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public itemService: ItemService,
              public factorService: FactorService) {
    this.selectedFactor = 'morgens';
  }

  ngOnInit(){
  }

  openPage(target){ 
    this.navCtrl.push(target);
  }

  addItem(){
    let addItemModal = this.modalCtrl.create(CreateItemPage);
    addItemModal.onDidDismiss(item => {
      if(item)
        this.itemService.addToItems(item);
    })
    addItemModal.present();
  }

  deleteItem(index:number){
      this.itemService.removeItem(index);
  }

  itemDetails(item){
    this.navCtrl.push(ItemDetailsPage, {item: item});
  }

  chooseFactor($event, index:number){
    this.itemService.setSelectedFactor(index);
  }
}
