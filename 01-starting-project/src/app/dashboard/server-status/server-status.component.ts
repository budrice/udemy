import { Component, DestroyRef, inject, OnInit } from '@angular/core';

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
  currentStatus : 'online' | 'offline' | 'unknown' = 'offline';
  statusArray : ('online' | 'offline' | 'unknown')[] = ['unknown', 'online', 'offline'];
  // private interval?: ReturnType<typeof setInterval>;
  private destroyRef = inject(DestroyRef)

  ngOnInit(): void {
    this.cycleStatus();
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }

  cycleStatus() {
    let i = 0;
    const interval = setInterval(() => {
      if (i === 3) { i = 0; }
      this.currentStatus = this.statusArray[i];
      i++;
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearTimeout(interval);
    });
  }

}
