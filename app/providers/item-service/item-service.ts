import { Injectable, EventEmitter } from '@angular/core';
import {Item} from '../../item';
import {Factor} from '../../factor';
import {ItemDetailsPage} from '../../pages/item-details/item-details';

@Injectable()
export class ItemService {
  public items: Array<Item>;
  public factors: Array<Factor>;
  public selectedFactorIndex = 0;
  public itemsChanged = new EventEmitter<{ items: Item[], factor: number }>();

  constructor() {
    this.items = [new Item(0,0)];
    this.factors = [new Factor('morgens', 24), new Factor('mittags', 34)];
  }

  getNewItem(weight: number, breadUnits: number, name?: string) {
    this.items[0] = new Item(weight, breadUnits, name);
    this.onChange();
    return this.items[0];
  }
  
  addNewItem(item){
    this.items.push(item);
    this.items[0] = new Item(0,0)
    this.recalculateItems();
  }

 /* addToItems(){
    this.items.unshift(new Item(0,0));
    this.recalculateItems();
    this.itemsChanged.emit({ items: this.items, factor: this.factors[this.selectedFactorIndex].value });
  }*/

  /*genderateItem(name: string, weight: number): void {
    let item: Item = new Item();
    item.name = name;
    item.weight = weight;
    item.onChange(true, false);
    this.items.push(item);
    this.onChange();
  }*/

  alterItem(oldItem: Item, newItem: Item) {
    this.items.splice(this.items.indexOf(oldItem), 1, newItem);
    this.onChange();
  }

  setSelectedFactor(index: number) {
    this.selectedFactorIndex = index;
    this.recalculateItems()
  }

  addFactor() {
    var factor = new Factor('neu', 25);
    this.factors.push(factor);
  }

  changeFactorName(index: number, name: string) {
    this.factors[index].name = name;
    this.recalculateItems();
  }

  getSelectedFactor(){
    return this.factors[this.selectedFactorIndex];
  }

  recalculateItems() {
    for (var item of this.items) {
      item.dose = this.factors[this.selectedFactorIndex].value / 10 * item.breadUnits;
    }
    this.onChange();
  }

  private onChange() {
    this.itemsChanged.emit({ items: this.items, factor: this.factors[this.selectedFactorIndex].value });
    console.log('change emitted!');
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.onChange();
  }

  alterItemWeight(item: Item, amount: number) {
    item.alterWeight(amount);
    this.onChange();
  }

  alterItemBreadUnits(item: Item, amount: number) {
    item.alterBreadUnits(amount);
    this.onChange();
  }

  resetNewItem() {
    this.items[0] = new Item(0,0);
    this.onChange();
  }

  setItemName(index: number, name: string){
    this.items[index].name = name;
  }

  resetItemList(){
    this.items = [new Item(0,0)];
    this.onChange();
  }
}

