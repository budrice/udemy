import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  private http = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching available places...'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching your favorite places...'
    ).pipe(
      tap({
        next: (places) => this.userPlaces.set(places),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const previousPlaces = this.userPlaces();
    if (!previousPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...previousPlaces, place]);
      return this.http
      .put('http://localhost:3000/user-places', { id: place.id })
      .pipe(
        catchError((error) => {
          console.log('ERROR CAUGHT: ', error);
          this.userPlaces.set(previousPlaces);
          this.errorService.showError('Failed to store place.');
          return throwError(() => new Error('Failed to store place.'));
        })
      );
    } else {
      return new Observable(observer => observer.error('Duplicate found.'));
    }

    
  }

  removeUserPlace(place: Place) {
    const previousPlaces = this.userPlaces();
    this.userPlaces.update((places) =>
      places.filter((item) => item.id !== place.id)
    );
    return this.http
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          console.log('ERROR CAUGHT: ', error);
          this.userPlaces.set(previousPlaces);
          this.errorService.showError('Failed to delete place.');
          return throwError(() => new Error('Failed to delete place.'));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.http.get<{ places: Place[] }>(url).pipe(
      map((results: { places: Place[] }) => results.places),
      catchError((error: Error) => {
        console.log('ERROR CAUGHT: ', error);
        this.errorService.showError('Failed to fetch place.');
        return throwError(() => new Error());
      })
    );
  }
}
