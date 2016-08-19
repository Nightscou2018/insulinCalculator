import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../../item';
import {Factor} from '../../factor';
import 'rxjs/add/observable/from';

@Injectable()
export class ItemSavedService {
  factors = Array<Factor>();
  savedItems = Array<Item>();

  constructor() {
    this.factors = []; 
  }

  getFactors(){
    return Observable.from(this.factors);
  }

}

