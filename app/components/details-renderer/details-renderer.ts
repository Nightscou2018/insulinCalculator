import { Component, Input } from '@angular/core';
import { ItemService } from '../../providers/item-service/item-service';
import { Item } from '../../item';

/*
  Generated class for the DetailsRenderer component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'details-renderer',
  templateUrl: 'build/components/details-renderer/details-renderer.html',
  styles: [`
    .divider-icon {
      margin-right: .7rem;
    }
  `]
})
export class DetailsRenderer {
  @Input() item:Item;
  @Input() isQuick: boolean;

  constructor(public itemService: ItemService){
    
  }
}
