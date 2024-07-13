import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  userPlaces = this.placesService.loadedUserPlaces;
  error = signal('');

  ngOnInit(): void {
    this.loading.set(true);
    const sub = this.placesService.loadUserPlaces()
      .subscribe({
        complete: () => this.loading.set(false),
        error: (err) => this.error.set(err.message),
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSelectPlace(place: Place) {
    const sub = this.placesService.removeUserPlace(place)
      .subscribe({
        next: (result) => console.log(result),
        error: (err) => console.log(err),
        complete: () => console.log('removed place'),
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
