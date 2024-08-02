import { Component } from '@angular/core';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css',
  host: {
    id: 'traffic'
  }
})
export class TrafficComponent {
  dummyTrafficData = [
    {
      id: 'd1',
      value: 27,
    },
    {
      id: 'd2',
      value: 16,
    },
    {
      id: 'd3',
      value: 31,
    },
    {
      id: 'd4',
      value: 24,
    },
    {
      id: 'd5',
      value: 12,
    },
    {
      id: 'd6',
      value: 28,
    },
    {
      id: 'd47',
      value: 20,
    },
  ];
  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
}
