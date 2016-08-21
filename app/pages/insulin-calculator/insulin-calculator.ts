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
  public selectedFactor;
  public selectedText;
  public currentFactor: number;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public itemService: ItemService,
    public itemSaveService: ItemSavedService,
    public modalCtrl: ModalController
    ) {
  }

  ngOnInit(){
    this.selectedFactor = 0;

  }

  factorChanged(index: number){
    console.log("Factor changed to " + this.itemService.factors[index].value);
    this.itemService.setSelectedFactor(index);
  }

  ionViewWillEnter(){
    this.factorChanged(this.itemService.selectedFactorIndex);
    this.selectedFactor = this.itemService.selectedFactorIndex;
  }

  openPage(target) {
    this.navCtrl.push(target);
  }

  addNewItem() {
    let modal = this.modalCtrl.create(CreateItemPage);
    modal.onDidDismiss(item => {
      if (item) {
        this.itemService.items[0] = item;
        this.itemService.addToItems();
      }
    });
    modal.present();
  }

  addItem() {
    this.itemService.addToItems();
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
    let alert = this.alertCtrl.create({
      title: 'Name für gespeicherten Eintrag',
      inputs: [
        {
          name: 'name',
          placeholder: 'z.B. Pizza'
        }
      ],
      buttons: [
        {
          text: 'Zurück',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            if (data.name.length > 0) {
              data.name + '';
              this.itemService.setItemName(index, data.name);
              this.itemSaveService.saveItem(this.itemService.items[index]);
            } else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
}
