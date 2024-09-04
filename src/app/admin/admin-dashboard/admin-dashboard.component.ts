  import {Component, OnInit} from '@angular/core';

  import Chart from 'chart.js/auto';
  import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import { LineDisplayComponent } from "../../packaging/line-display/line-display.component"; // Import Chart.js


  @Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    LineDisplayComponent
],
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
            borderWidth: 1,
            borderColor: '#002857',
            backgroundColor: '#00b2ff'
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
            borderColor: 'rgb(255, 165, 0)', // Orange color
            backgroundColor: 'rgb(255, 165, 0)', // Orange color for points
            // borderColor: 'rgb(75, 192, 192)',
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
      const ctx3 = document.getElementById('myChart3') as HTMLCanvasElement;
      new Chart(ctx3, {
        type: 'pie',
        data: {
          labels: ['Line1', 'Line2', 'Line3', 'Line4', 'Line5', 'Line6'],
          datasets: [{
            label: 'N° Harness',
            data: [12, 19, 3, 3],
            borderWidth: 2,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(201, 203, 207)',
            ],
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
      const ctx4 = document.getElementById('myChart4') as HTMLCanvasElement;
      const data = {
        labels: [
          'Red',
          'Green',
          'Yellow',
          'Grey',
          'Blue'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ]
        }]
      };
      new Chart(ctx4, {
          type: 'polarArea',
          data: data,
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
