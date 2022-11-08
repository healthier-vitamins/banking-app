import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  currentTime = new Date().toLocaleTimeString();
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

  constructor() {}

  ngOnInit(): void {
    this.getCurrentTime();
    this.getCurrentDate();
    this.calculatedTime();
  }

  getCurrentTime() {
    const interval = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
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
