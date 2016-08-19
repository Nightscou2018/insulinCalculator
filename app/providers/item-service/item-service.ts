import { Injectable, EventEmitter } from '@angular/core';
import {Item} from '../../item';
import {Factor} from '../../factor';
import {ItemDetailsPage} from '../../pages/item-details/item-details';

@Injectable()
export class ItemService {
  public items: Array<Item>;
  public factors: Array<Factor>;
  public selectedFactor: number;
  public itemsChanged = new EventEmitter<{items: Item[], factor: number}>();

  constructor() {
    this.items = Array<Item>();
    this.factors = [new Factor('morgens', 24), new Factor('mittags', 34)];
    this.selectedFactor = this.factors[0].value;
  }

  addToItems(item:Item): void{
    this.items.push(item);
    this.itemsChanged.emit({items: this.items, factor: this.selectedFactor});
  }
  genderateItem(name: string, weight: number): void{
    let item: Item = new Item();
    item.name = name;
    item.weight = weight;
    item.onChange(true, false);
    this.items.push(item);
    this.onChange();
  }
  alterItem(oldItem:Item, newItem:Item){
    this.items.splice(this.items.indexOf(oldItem), 1, newItem);
    this.onChange();
  }

  setSelectedFactor(index: number){
    console.log(index);
    this.selectedFactor = this.factors[index].value / 10;
    this.recalculateItems()
  }

  addFactor(){
    var factor = new Factor('neu', 25);
    this.factors.push(factor);
  }

  changeFactorName(index:number, name:string){
    this.factors[index].name = name;
    this.recalculateItems();
  }

  recalculateItems(){
    for(var item of this.items){
      item.dose = this.selectedFactor * item.breadUnits;
    }
    this.onChange();
  }

  onChange(){
    this.itemsChanged.emit({items: this.items, factor: this.selectedFactor});
  }

  removeItem(index){
    this.items.splice(index, 1);
  }
}

