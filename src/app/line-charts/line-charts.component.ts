import {Component, OnInit} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import Chart from 'chart.js/auto';
import {MatCardModule} from "@angular/material/card";
import {BehaviorSubject} from "rxjs";
import {ProductionJob} from "../models/production-job.model";
import {PickerService} from "../services/picker.service";
import {RouterOutlet} from "@angular/router";
@Component({
  selector: 'app-line-charts',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCardModule,
    RouterOutlet
  ],
  templateUrl: './line-charts.component.html',
  styleUrl: './line-charts.component.css'
})

export class LineChartsComponent implements OnInit {
constructor(private pickerService: PickerService) {
}
  currentJob: BehaviorSubject<ProductionJob> = new BehaviorSubject<ProductionJob>(new ProductionJob({}));
  ngOnInit() {
    this.initializeCharts();
    this.getCurrentData();
  }

  initializeCharts() {
    // Harness per hour chart
    const ctx1 = document.getElementById('harnessPerHourChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['6 AM', '7 AM', '8 AM', '9 PM', '10 PM', '11 PM','12 PM','13 PM', '14 PM'],
        datasets: [{
          label: 'Harness per Hour',
          data: [30, 37, 27, 30, 25, 30,50, 30],
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

    // Progress chart
    const ctx2 = document.getElementById('progressChart') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3','Week 4'],
        datasets: [{
          label: 'Progress',
          data: [30, 50, 75,56],
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

    // Efficiency chart
    const ctx3 = document.getElementById('efficiencyChart') as HTMLCanvasElement;
    new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Part 1', 'Part 2', 'Part 3', 'April', 'May'],
        datasets: [{
          label: 'Errors',
          data: [10, 15, 10, 60, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
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


  getCurrentData(): void {



    // Get the current production job
    this.pickerService.getCurrentJob(3).subscribe(
        (success: ProductionJob) => {
        this.currentJob.next(success);
       // Update the chart whenever the current job is fetched
      }
    );
  }
}
