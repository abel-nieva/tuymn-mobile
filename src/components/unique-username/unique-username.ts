import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { UserData } from '../../providers/user-data';

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

  // ---
  // PUBLIC METHODS.
  // ---

  public validate(control: AbstractControl): Observable<{[key: string]: any}> {
    return this.validateUniqueUsername(control.value).debounceTime(500).distinctUntilChanged().first();
  }

  // ---
  // PRIVATE METHODS.
  // ---

  private validateUniqueUsername(username) {
    return new Observable(observer => {
      this.userData.getByUsername(username)
        .then(user => {
          if (user) {
            observer.next({uniqueUsername: true});
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
