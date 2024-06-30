import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  host: {
    class: 'wrapper-item'
  }
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  detailVisible = signal(false);
  close = output();

  onToggleDetails() {
    // this.detailVisible.set(!this.detailVisible());
    this.detailVisible.update((wasVisible) => !wasVisible);
  }

  closeTicket() {
    this.onToggleDetails();
    this.close.emit();
  }

}
