import { Injectable } from '@angular/core';
import { ToastController, AlertController, SqlStorage, Storage } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Item } from '../../item';
import { ItemService } from '../item-service/item-service';
import { Factor } from '../../factor';
import 'rxjs/add/observable/from';

@Injectable()
export class ItemSavedService {
  public database: Storage;
  savedFactors = Array<Factor>();
  savedItems = Array<Item>();
  isLoading: boolean;

  constructor(public itemService: ItemService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.savedFactors = [];
    this.database = new Storage(SqlStorage);
    this.initDatabase();
  }

  private initDatabase() {
    this.database.query(
      "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, weight INTEGER, breadUnits INTEGER);", []).then((data) => {
        console.log('TABLES CREATED: ', data);
      }, (error) => {
        console.error('Unable to execute sql', error);
      });
    this.database.query(
      "CREATE TABLE IF NOT EXISTS factors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER);", []).then((data) => {
        console.log('TABLE CREATED: ', data);
      }, (error) => {
        console.error('Unable to execute sql', error);
      });
  }

  refresh() {
    this.isLoading = true;
    this.savedItems = [];
    console.log('trying to refresh!')
    this.database.query("SELECT * FROM items;", []).then((data) => {
      console.log(data);
      if (data.res && data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let item = data.res.rows.item(i);
          this.savedItems.push(new Item(item.weight, item.breadUnits, item.name, item.id));
        }
      };
    }, (error) => {
      console.error('Unable to get items from database', error);
    });
    this.database.query("SELECT * FROM factors;", []).then((data) => {
      if (data && data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let factor = data.res.rows.factor(i);
          this.savedFactors.push(new Factor(factor.name, factor.value));
        }
      };
    }, (error) => {
      console.error('Unable to get factors from database', error);
    });
    this.isLoading = false;
  }

  getFactors() {
    return Observable.from(this.savedFactors);
  }

  private insertItem(item: Item) {
    let sql = "INSERT INTO items (name, weight, breadUnits) VALUES (?, ?, ?)";
    this.database.query(sql, [item.name, item.weight, item.breadUnits]).then((data) => {
      this.savedItems.push(item);
    }, (error) => {
      console.error('could not add item', error);
    })
    this.presentToast(item.name + ' gespeichert');
  }

  deleteItem(index: number) {
    let sql = "DELETE FROM items WHERE id = ?";
    this.database.query(sql, [this.savedItems[index].id]).then((data) => {
      this.savedItems.splice(index, 1);
    });
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  };

  saveItem(index: number) {
    let item = this.itemService.items[index];
    let alert = this.alertCtrl.create({
      title: 'Name für gespeicherten Eintrag',
      inputs: [
        {
          name: 'name',
          value: item.name || '',
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
              this.insertItem(this.itemService.items[index]);
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

