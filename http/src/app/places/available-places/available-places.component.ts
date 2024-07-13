import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  availablePlaces = signal<Place[] | undefined>(undefined);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loading.set(true);
    const sub = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: result => this.availablePlaces.set(result),
        complete: () => this.loading.set(false),
        error: err => this.error.set(err.message),
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSelectPlace(place: Place) {
    const sub = this.placesService.addPlaceToUserPlaces(place)
    .subscribe({
      next: result => console.log(result),
      error: err => console.log('Error:', err),
      complete: () => console.log('uploaded place')
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

}
