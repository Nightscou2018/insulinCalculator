import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Tenth pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'tenth'
})
@Injectable()
export class Tenth {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number, args: any[]) {
    value = value / 10;
    return value;
  }
}
