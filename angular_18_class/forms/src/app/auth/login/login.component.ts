import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroy = inject(DestroyRef);
  login = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required,
        mustContainQuestionMark,
      ],
    }),
  });

  emailCtrl = this.login.controls.email;
  passwCtrl = this.login.controls.password;

  get emailNotProper() {
    return this.emailCtrl.errors?.hasOwnProperty('email');
  }
  get emailIsUnique() {
    return this.emailCtrl.errors?.hasOwnProperty('emailNotUnique');
  }
  get passIsMinLength() {
    return this.passwCtrl.errors?.hasOwnProperty('minlength');
  }
  get passHasQuestionMark() {
    return this.passwCtrl.errors?.hasOwnProperty('doesNotContainQuestionMark');
  }

  ngOnInit(): void {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if(savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.login.patchValue(loadedForm);
    }
    const sub = this.login.valueChanges.pipe(
      debounceTime(1500)
  ).subscribe({
      next: (val) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: val.email })
        );
      },
    });
    this.destroy.onDestroy(() => sub.unsubscribe());
  }

  onSubmit() {
    console.log(this.emailCtrl.value, this.passwCtrl.value);
  }
}

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true };
}
function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@test.com') {
    return of({ emailNotUnique: true });
  }
  return of(null);
}
