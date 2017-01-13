import { Component, Input } from '@angular/core';

@Component({
  selector: 'hymnal-sheet',
  templateUrl: 'hymnal-sheet.html'
})
export class HymnalSheetComponent {

  @Input() hymn;
  @Input() hymnal;

  constructor() {}

}
