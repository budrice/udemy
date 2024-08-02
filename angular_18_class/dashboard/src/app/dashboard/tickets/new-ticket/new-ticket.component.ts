import { Component, model, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  host: {
    id: 'new-ticket',
  },
})
export class NewTicketComponent {
  // private form = viewChild.required<HTMLFormElement>('newTicketForm');
  add = output<{ title: string; request: string }>();
  title = signal<string>('');
  request = signal<string>('');

  onSubmit() {
    this.add.emit({ title: this.title(), request: this.request() });
    // this.form()['nativeElement'].reset();
    this.title.set('');
    this.request.set('');
  }
}
