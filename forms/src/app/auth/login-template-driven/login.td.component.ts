import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-td',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.td.component.html',
  styleUrl: './login.td.component.css',
})
export class LoginTDComponent {
  private loginForm = viewChild.required<NgForm>('login');
  private destroy = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedForm = JSON.parse(savedForm);
        const email = loadedForm.email;
        setTimeout(() => this.loginForm().controls['email'].setValue(email), 1);
      }
      const sub = this.loginForm()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (val) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: val.email })
            ),
        });
      this.destroy.onDestroy(() => sub?.unsubscribe());
    });
  }

  onSubmit(login: NgForm) {
    if (login.form.invalid) {
      console.log('INVALID');
      return;
    }
    const email = login.form.value.email;
    const password = login.form.value.password;
    console.log(email, password);
    login.form.reset();
  }
}
