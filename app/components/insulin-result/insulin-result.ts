import { Component, Input, OnInit } from '@angular/core';
import {ItemService} from '../../providers/item-service/item-service';
import {Item} from '../../item';

@Component({
  selector: 'insulin-result', // Attribute selector
  template: `
    <div class="insulin-result">
      <span class="result"><ion-icon name="water" large></ion-icon> Dosis für Mahlzeit: {{ result | number:'.0-0' }}</span>   
    </div>
    `,
  styles: [`
      .insulin-result{
        font-weight: bold;
        font-size: large;
        text-align: center;
      }
    `]
})
export class InsulinResult implements OnInit {
  result: number;
  @Input() isQuick: boolean;

  constructor(private itemService: ItemService) {
    this.result = 0;
  }

  ngOnInit() {
    this.itemService.itemsChanged.subscribe(
      data => {
        console.log("RESULT RECALCULATE, Factor is …", this.itemService.getSelectedFactor())
        this.result = 0;
        if (!this.isQuick) {
          for (var i = 1; i < data.items.length; i++) {
            this.result += data.items[i].dose;
          }
        } else { this.result += data.items[0].dose; }
      });
  }
}


