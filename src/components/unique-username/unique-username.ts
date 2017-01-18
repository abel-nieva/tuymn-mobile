import { Directive, forwardRef } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { FailHandler } from '../../providers/fail-handler';
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
    private failHandler: FailHandler,
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
        .then(result => {
          if (result) {
            observer.next({
              uniqueUsername: true
            });
          } else {
            observer.next(null);
          }
        })
        .catch(this.failHandler.handle);
    });
  }

}
