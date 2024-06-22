import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  host: {
    id: 'status'
  }
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  statusArray : ('online' | 'offline' | 'unknown')[] = ['unknown', 'online', 'offline'];
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.cycleStatus();
  }

  cycleStatus() {
    let i = 0;
    const interval = setInterval(() => {
      if (i === 3) { i = 0; }
      this.currentStatus.set(this.statusArray[i]);
      i++;
    }, 15000);
    this.destroyRef.onDestroy(() => {
      clearTimeout(interval);
    });
  }

}
