import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal<number>(0);
  interval = signal<number>(0);
  doubleInterval = computed(() => this.intervalSignal() * 3);
  clicksCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: -1 });
  seamlessIntervals = computed(() => this.intervalSignal() + 1);

  customInterval$ = new Observable((sub) => {
    let i = 0;
    const loop = setInterval(() => {
      if (i > 3) {
        console.log('CLEARING');
        clearInterval(loop);
        sub.complete();
        return;
      }
      console.log('emitting new value...');
      sub.next({ message: 'NEW VALUE' });
      i++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log(`Clicked count is ${this.clickCount()}.`);
    //   console.log(`Interval count is ${this.interval()}, the computed value is ${this.doubleInterval()}.`);
    // });
    // toObservable(this.clickCount).subscribe({
    //   next: (val: number) => console.log(val)
    // });
  }

  ngOnInit(): void {

    const subscription = this.customInterval$.subscribe({
      next: val => console.log(val),
      complete: () => console.log('COMPLETED')
    })

    // const subscription = this.clicksCount$.subscribe({
    //   next: (val: number) => console.log(val),
    // });
    // const subscription = setInterval(() => {
    //   this.interval.update(prevInterval => prevInterval + 1);
    // }, 5000);
    // const subscription = interval(5000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      // clearInterval(subscription);
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
