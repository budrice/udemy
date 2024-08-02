import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
    selector: 'app-tickets',
    standalone: true,
    templateUrl: './tickets.component.html',
    styleUrl: './tickets.component.css',
    host: {
        id: 'tickets'
    },
    imports: [NewTicketComponent, TicketComponent]
})
export class TicketsComponent {
    tickets: Ticket[] = [];
    onAdd(data: {title: string, request: string}) {
        const ticket: Ticket = {
            id: 't' + Math.floor(this.tickets.length + 1),
            title: data.title,
            request: data.request,
            status: 'open'     
        }
        this.tickets.unshift(ticket);
        console.log(ticket);
    }
    onClose(id: string) {
        this.tickets = this.tickets.map((ticket) => {
            if (ticket.id === id) {
                console.log('closed');
                return { ...ticket, status: 'closed' };
            }
            return ticket;
        });
    }
}
