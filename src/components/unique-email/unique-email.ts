import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { UserData } from '../../providers/user-data';

import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[unique-email][formControlName], [unique-email][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailDirective),
      multi: true
    }
  ]
})
export class UniqueEmailDirective implements Validator {

  constructor(
    private userData: UserData
  ) {}

  validate(control: AbstractControl): Observable<{[key: string]: any}> {
    return this.validateUniqueEmail(control.value).debounceTime(500).distinctUntilChanged().first();
  }

  private validateUniqueEmail(email) {
    return new Observable(observer => {
      this.userData.getByEmail(email)
        .then(result => {
          if (result) {
            observer.next({
              uniqueEmail: true
            });
          } else {
            observer.next(null);
          }
        });
    });
  }

}
