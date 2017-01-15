import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: 'input-error.html'
})
export class InputErrorComponent {

  @Input() errorMessage: string;

  constructor() {}

}
