import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CreateItemPage } from '../create/create';
import { Item } from '../../item';
import { ItemDetailsPage } from '../item-details/item-details';
import { Factor } from '../../factor';
import { ItemService } from '../../providers/item-service/item-service';
import { ItemSavedService } from '../../providers/item-saved-service/item-saved-service';
import { InsulinResult } from '../../components/insulin-result/insulin-result';
import { DetailsRenderer } from '../../components/details-renderer/details-renderer';
import { Tenth } from '../../pipes/tenth';

@Component({
  templateUrl: 'build/pages/insulin-calculator/insulin-calculator.html',
  directives: [InsulinResult, DetailsRenderer],
  pipes: [Tenth],
})
export class InsulinCalculatorPage implements OnInit {
  public selectedFactor = 0;
  public selectedText;
  public currentFactor: number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public itemService: ItemService,
    public itemSaveService: ItemSavedService,
    public modalCtrl: ModalController
    ) { }

  ngOnInit(){
    //this.selectedFactor = this.itemService.selectedFactorIndex;
  }

  factorChanged(index: number){
    console.log("Factor changed to " + this.itemService.factors[index].value);
    this.itemService.setSelectedFactor(index);
  }

  ionViewLoaded(){
    this.factorChanged(this.itemService.selectedFactorIndex);
    this.selectedFactor = this.itemService.selectedFactorIndex;
    console.log("ENTERED PAGE", this.selectedFactor, this.itemService)
  }

  openPage(target) {
    this.navCtrl.push(target);
  }

  addNewItem() {
    let modal = this.modalCtrl.create(CreateItemPage);
    modal.onDidDismiss(item => {
      if (item) {
        this.itemService.addNewItem(item);
      }
    });
    modal.present();
  }

  resetNewItem() {
    this.itemService.resetNewItem();
  }

  deleteItem(index: number) {
    this.itemService.removeItem(index);
  }

  resetList(){
    this.itemService.resetItemList();
  }

  itemDetails(item) {
    this.navCtrl.push(ItemDetailsPage, { item: item });
  }

  saveItem(index: number) {
    this.itemSaveService.saveItem(index);
  }
}
