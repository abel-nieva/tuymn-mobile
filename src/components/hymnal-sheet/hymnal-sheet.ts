import { Component, Input } from '@angular/core';

@Component({
  selector: 'hymnal-sheet',
  templateUrl: 'hymnal-sheet.html'
})
export class HymnalSheetComponent {

  @Input() hymn;
  public verseNumber: number = 1;

  constructor() {}

  popArray() {
    this.hymn.chorus.pop();
  }

}
