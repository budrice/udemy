import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";

@Component({
    selector: 'app-tickets',
    standalone: true,
    templateUrl: './tickets.component.html',
    styleUrl: './tickets.component.css',
    imports: [NewTicketComponent],
    host: {
        id: 'tickets'
    }
})
export class TicketsComponent {

}
