import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { UserData } from '../../providers/user-data';

import { Observable } from 'rxjs/Rx';

@Directive({
  selector: '[unique-username][formControlName], [unique-username][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUsernameDirective),
      multi: true
    }
  ]
})
export class UniqueUsernameDirective implements Validator {

  constructor(
    private userData: UserData
  ) {}

  validate(control: AbstractControl): Observable<{[key: string]: any}> {
    return this.validateUniqueUsername(control.value).debounceTime(500).distinctUntilChanged().first();
  }

  private validateUniqueUsername(username) {
    return new Observable(observer => {
      this.userData.getByUsername(username)
        .then(result => {
          if (result) {
            observer.next({
              uniqueUsername: true
            });
          } else {
            observer.next(null);
          }
        });
    });
  }

}
