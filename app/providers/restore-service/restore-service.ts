import { Injectable } from '@angular/core';
import {Item} from '../../item';

/*
  Generated class for the RestoreService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RestoreService<Item> {
  originalItem: Item;
  currentItem: Item;

  setItem(item:Item){
    this.originalItem = this.clone(item);
    this.currentItem = item;
  }
  
  getItem(): Item{
    return this.currentItem;
  }

  restoreItem(): Item{
    for(let prop in this.currentItem){
      this.currentItem[prop] = this.originalItem[prop];
    }
    return this.currentItem;
  }

  clone(item: Item) {
    /*let cloned = new Item();
    cloned.name = item['name'];
    cloned.breadUnits = item['breadUnits'];
    cloned.weight = item['weight'];
    cloned.dose = item['dose'];
    cloned.factor = item['factor'];
    return cloned;*/
    console.log(Object.assign({}, item));
    return Object.assign({}, item);
  }
    


}

