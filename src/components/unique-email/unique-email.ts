import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { UserData } from '../../providers/user-data';

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

  // ---
  // PUBLIC METHODS.
  // ---

  public validate(control: AbstractControl): Observable<{[key: string]: any}> {
    return this.validateUniqueEmail(control.value).debounceTime(500).distinctUntilChanged().first();
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private validateUniqueEmail(email) {
    return new Observable(observer => {
      this.userData.getByEmail(email)
        .then(user => {
          if (user) {
            observer.next({uniqueEmail: true});
            return;
          }
          observer.next(null);
        })
        .catch(error => {
          observer.next(null);
        });
    });
  }

}
