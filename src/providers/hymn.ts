import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class HymnProvider {

  constructor() {}

  parse(hymn) {
    hymn.strophes = hymn.strophes.reduce(function (accumulator, value, index, array) {
      accumulator.push(array[index].split('\n'));
      return accumulator;
    }, []);
    hymn.chorus = hymn.chorus.reduce(function (accumulator, value, index, array) {
      accumulator.push(array[index].split('\n'));
      return accumulator;
    }, []);

    return hymn;
  }

  getHymnsByHymnal(hymnal) {
    let hymn = Parse.Object.extend('Hymn');
    let hymnQuery = new Parse.Query(hymn);

    hymnQuery.equalTo('hymnal', hymnal);

    return hymnQuery.find();
  }

  getFirst(hymnal) {
    let hymn = Parse.Object.extend('Hymn');
    let hymnQuery = new Parse.Query(hymn);

    hymnQuery.equalTo('hymnal', hymnal);

    return hymnQuery.first();
  }

  getHymnByNumber(number) {
    let hymn = Parse.Object.extend('Hymn');
    let hymnQuery = new Parse.Query(hymn);

    hymnQuery.equalTo('number', number);
    hymnQuery.toJSON();

    return hymnQuery.first();
  }

}
