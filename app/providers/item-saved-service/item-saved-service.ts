import { Injectable } from '@angular/core';
import { ToastController, SqlStorage, Storage } from 'ionic-angular';
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

  constructor(public itemService: ItemService, public toastCtrl: ToastController) {
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
  }

  getFactors() {
    return Observable.from(this.savedFactors);
  }

  saveItem(item: Item) {
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
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

