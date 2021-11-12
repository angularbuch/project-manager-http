import {Component, Input, OnInit, Optional} from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from '@angular/forms';

@Component({
  selector: 'show-error',
  template: `
    <div *ngIf="errorMessages" class="alert alert-danger">
      <div *ngFor="let errorMessage of errorMessages">
        {{errorMessage}}
      </div>
    </div>`
})
export class ShowErrorComponent implements OnInit {

  @Input('path') path = '';
  @Input('text') displayName = '';

  private form!: FormGroup;

  constructor(@Optional() private ngForm: NgForm,
              @Optional() private formGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.form = this.ngForm ? this.ngForm.form : this.formGroup.form;
  }

  get errorMessages(): string[] | null {

    const control = this.form.get(this.path);
    const messages = [];
    if (!control || !(control.touched) || !control.errors) {
      return null;
    }
    for (const code in control.errors) {
      if (control.errors.hasOwnProperty(code)) {
        const error = control.errors[code];
        let message = '';
        switch (code) {
          case 'required':
            message = `${this.displayName} ist ein Pflichtfeld`;
            break;
          case 'minlength':
            message = `${this.displayName} muss mindestens ${error.requiredLength} Zeichen enthalten`;
            break;
          case 'maxlength':
            message = `${this.displayName} darf maximal ${error.requiredLength} Zeichen enthalten`;
            break;
          case 'invalidEMail':
            message = `Bitte geben Sie eine gültige E-Mail-Adresse an`;
            break;
          case 'userNotFound':
            message = `Der eingetragene Benutzer existiert nicht.`;
            break;
          default:
            message = `${name} ist nicht valide`;
        }
        messages.push(message);
      }
    }
    return messages;
  }
}
