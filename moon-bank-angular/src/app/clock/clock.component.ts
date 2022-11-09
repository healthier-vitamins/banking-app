import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnInit {
  currentTime = new Date().toLocaleTimeString();
  // currentRxTime = new Date().toLocaleTimeString();
  // intervalId: any;
  // subscription?: Subscription;

  // private _time$: Observable<string> = timer(0, 1000).pipe(
  //   map((tick) => new Date().toLocaleTimeString()),
  //   shareReplay(1)
  // );

  // get currentRxTime() {
  //   return this._time$;
  // }

  currentDate = new Date().toLocaleDateString();
  calculateTime = new Date().getHours();

  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  currentDay = new Date().getDay();

  constructor(private ngZone: NgZone) {}

  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId);
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

  ngOnInit(): void {
    this.getCurrentTime();
    this.getCurrentDate();
    this.calculatedTime();
  }

  // getCurrentTime() {
  //   this.intervalId = setInterval(() => {
  //     this.currentTime = new Date().toLocaleTimeString();
  //   }, 1000);

  //   this.subscription = timer(0, 1000)
  //     .pipe(
  //       map(() => new Date().toLocaleTimeString()),
  //       share()
  //     )
  //     .subscribe((time) => {
  //       this.currentRxTime = time;
  //     });
  // }

  getCurrentTime() {
    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        this.ngZone.run(() => {
          this.currentTime = new Date().toLocaleTimeString();
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    });
  }

  getCurrentDate() {
    const interval = setInterval(() => {
      this.currentDate = new Date().toLocaleDateString();
    }, 21600000);

    return () => {
      clearInterval(interval);
    };
  }

  getCurrentDay() {
    return this.days[this.currentDay];
  }

  calculatedTime() {
    const interval = setInterval(() => {
      this.calculateTime = new Date().getHours();
    }, 21600000);

    return () => {
      clearInterval(interval);
    };
  }
}
