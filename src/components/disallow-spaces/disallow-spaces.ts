import { Directive, Renderer } from '@angular/core';

@Directive({
  selector: 'input[disallow-spaces]',
  host: {
    '(keyup)': 'onKeyup($event)'
  }
})
export class DisallowSpacesDirective {

  constructor (
    private renderer: Renderer,
  ) {}

  onKeyup(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value.replace(/ /g, '');
    this.renderer.setElementProperty(<HTMLInputElement>event.target, 'value', value);
  }

}
