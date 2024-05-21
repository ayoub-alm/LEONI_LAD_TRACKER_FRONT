  import {Component, OnInit} from '@angular/core';

  import Chart from 'chart.js/auto'; // Import Chart.js


  @Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css'
  })
  export class AdminDashboardComponent implements OnInit{

    ngOnInit() {
      // Chart.js initialization
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Line1', 'Line2', 'Line3', 'Line4', 'Line5', 'Line6'],
          datasets: [{
            label: 'N° Harness',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 3
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });


      // Chart.js initialization
      const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'  ];
      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Harness per month',
            data: [20, 59, 60, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }



  }
