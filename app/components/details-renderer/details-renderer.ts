import { Component, Input } from '@angular/core';
import { Item } from '../../item';

/*
  Generated class for the DetailsRenderer component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'details-renderer',
  templateUrl: 'build/components/details-renderer/details-renderer.html'
})
export class DetailsRenderer {
  @Input() item:Item;
}
