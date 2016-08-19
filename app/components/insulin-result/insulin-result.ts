import { Component, Input, OnInit } from '@angular/core';
import {ItemService} from '../../providers/item-service/item-service';
import {Item} from '../../item';

@Component({
  selector: 'insulin-result', // Attribute selector
  template: "<h2>Insulindosis gesamt: {{ result | number:'.0-0' }}</h2>",
})
export class InsulinResult implements OnInit {
  result: number;

  constructor(private itemService: ItemService) {
    this.result = 0;
  }

  ngOnInit() {
    this.itemService.itemsChanged.subscribe(
      data => {
        this.result = 0;
        for (let item of data.items) {
          console.log('event emitted with', data.items);
          this.result += item.dose;
        }
      });
  }
}

