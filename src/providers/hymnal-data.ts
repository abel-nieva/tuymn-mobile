import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class HymnalData {

  constructor() {}

  getHymnals() {
    let hymnal = Parse.Object.extend('Hymnal');
    let hymnalQuery = new Parse.Query(hymnal);

    return hymnalQuery.find();
  }

  getFirst() {
    let hymnal = Parse.Object.extend('Hymnal');
    let hymnalQuery = new Parse.Query(hymnal);

    return hymnalQuery.first();
  }

}
