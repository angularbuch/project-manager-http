import {Directive, forwardRef} from '@angular/core';
import {
  FormControl,
  AbstractControl,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS
} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function asyncIfNotBacklogThenAssignee(control: AbstractControl): Promise<any> {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ifNotBacklogThanAssignee(control));
    }, 500);
  });
  return promise;
}

export function ifNotBacklogThanAssignee(formGroup: AbstractControl): {[key: string]: any} | null {
  const nameControl = formGroup.get('assignee.name');
  const stateControl = formGroup.get('state');
  if (!nameControl || !stateControl) {
    return null;
  }
  if (stateControl.value !== 'BACKLOG' &&
    (!nameControl.value || nameControl.value === '')) {
    return {'assigneeRequired': true};
  }
  return null;
}

@Directive({
  selector: '[pjmIfNotBacklogThanAssignee]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IfNotBacklogThanAssigneeValidatorDirective, multi: true
    }]
})
export class IfNotBacklogThanAssigneeValidatorDirective {

  public validate(formGroup: AbstractControl): {[key: string]: any} | null {
    const nameControl = formGroup.get('assignee.name');
    const stateControl = formGroup.get('state');
    if (!nameControl || !stateControl) {
      return null;
    }
    if (stateControl.value !== 'BACKLOG' &&
      (!nameControl.value || nameControl.value === '')) {
      return {'assigneeRequired': true};
    }
    return null;
  }
}

@Directive({
  selector: '[pjmEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useClass: EmailValidatorDirective,
    multi: true
  }]
})
export class EmailValidatorDirective {
  validate(control: AbstractControl): {[key: string]: any} | null {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!control.value || control.value === '' || re.test(control.value)) {
      return null;
    } else {
      return {'invalidEMail': true};
    }
  }
}

export function emailValidator(control: AbstractControl): {[key: string]: any} | null {
  return new EmailValidatorDirective().validate(control);
}

export function emailValidator2(control: AbstractControl): {[key: string]: any} | null {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (!control.value || control.value === '' || re.test(control.value)) {
    return null;
  } else {
    return {'invalidEMail': true};
  }
}


export const APPLICATION_VALIDATORS = [IfNotBacklogThanAssigneeValidatorDirective,
  EmailValidatorDirective];
