import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  loading = signal(false);
  error = signal('');
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loading.set(true);
    let sub = this.http.get<{ places: Place[] }>('http://localhost:3000/places')
    .pipe(
      map(val => val.places),
      catchError((error, obsevable) => throwError(() => new Error('Something went wrong...')))
    )
    .subscribe({
      next: result => this.places.set(result),
      error: (err: Error) => { 
        console.log(`ERROR: ${err.message}`);
        this.error.set(err.message);
      },
      complete: () => this.loading.set(false)
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());

  }
  

}
