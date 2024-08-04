import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  getHarnessPerHourData() {
    return {
      labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
      datasets: [
        {
          label: 'Harness per Hour',
          data: [5, 10, 15, 20, 25, 30],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  getProgressData() {
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Progress',
          data: [25, 50, 75, 50],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1
        }
      ]
    };
  }

  getEfficiencyData() {
    return {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'Efficiency',
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  }
}
