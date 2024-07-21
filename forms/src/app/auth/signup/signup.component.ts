import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signup = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    passwords: new FormGroup({
      password: new FormControl<string>('', {
        validators: [Validators.minLength(6), Validators.required],
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.minLength(6), Validators.required],
      })
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    }),
    name: new FormGroup({
      firstname: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      lastname: new FormControl<string>('', {
        validators: [Validators.required],
      })
    }),
    address: new FormGroup({
      street: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      city: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      zipcode: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      phone: new FormControl<string>('', {
        validators: [Validators.required],
      })
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student'),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ], {
      validators: [highlander]
    }),
    terms: new FormControl<boolean>(false),
  });
  onSubmit() {
    if (this.signup.invalid) {
      console.log('FORM INVALID');
      console.log(this.signup);
      return;
    }
    console.log(
      this.signup.controls.email.value,
      this.signup.controls.passwords.controls.password.value,
      this.signup.controls.passwords.controls.confirmPassword.value
    );
    console.log(
      this.signup.controls.name.controls.firstname.value,
      this.signup.controls.name.controls.lastname.value
    );
    console.log(
      this.signup.controls.address.controls.street.value,
      this.signup.controls.address.controls.city.value
    );
    console.log(
      this.signup.controls.address.controls.zipcode.value,
      this.signup.controls.address.controls.phone.value
    );
    console.log(
      this.signup.controls.source.value
    );
    console.log(
      this.signup.controls.role.value,
      this.signup.controls.terms.value
    );
  }
}
function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@test.com') {
    return of({ emailNotUnique: true });
  }
  return of(null);
}
function equalValues(control1: string, control2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(control1)?.value;
    const val2 = control.get(control2)?.value;
    if (val1 !== val2) {
      return { valuesNotEqual: true };
    }
    return null;
  };
}
/**
 * there can only be one
 * @param control 
 * @returns the one
 */
function highlander(control: AbstractControl) {
  console.log(control.value);
  return null;
}
