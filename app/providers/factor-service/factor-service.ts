import { Injectable, EventEmitter } from '@angular/core';
import {Factor} from '../../factor';
/*
  Generated class for the FactorService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FactorService {
  public factors: Factor[];
  public factorsChanged = new EventEmitter<Factor[]>();
  
  constructor(){
    this.factors = [new Factor('morgens', 24), new Factor('mittags', 34)];
  }

  addFactor(){
    var factor = new Factor('neu', 25);
    this.factors.push(factor);
  }


   

}

