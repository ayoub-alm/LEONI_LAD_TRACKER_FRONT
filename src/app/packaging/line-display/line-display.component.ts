import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import Chart from 'chart.js/auto';
import { MatCardModule } from "@angular/material/card";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HourlyEfficiency, LineDashboardService } from '../../services/line.dashboard';
import { MatDialog } from '@angular/material/dialog';
import { LineDisplayDialogComponent } from '../line-display-dialog/line-display-dialog.component';
import { CountHourLineDto, CountBoxPerHourLineDto, HourProduitsDTO, refQuantityDto, BoxCount } from '../../dtos/Line.dashboard.dto';
import { StorageService } from '../../services/storage.service';
import { SegmentService } from '../../services/segment.service';
import { ProductionLineService } from '../../services/production.line.service';
import { BehaviorSubject } from 'rxjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);


@Component({
  selector: 'app-line-display',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCardModule, ReactiveFormsModule,
    RouterOutlet, CommonModule
  ],
  templateUrl: './line-display.component.html',
  styleUrl: './line-display.component.css'
})
export class LineDisplayComponent implements OnInit, OnDestroy {
  totalQuantity: number = 0;
  countPackages: number = 0;
  efficiency: number = 0;
  countFxPerHour: CountHourLineDto[] = [];
  countOfPackagePerHour: CountBoxPerHourLineDto[] = [];
  hourProduits: HourProduitsDTO = new HourProduitsDTO(0, 0, 0, 0);
  filterForm: FormGroup = this.formBuilder.group({
    from: [this.formatDate(new Date()), Validators.required],
    to: [this.formatDate(new Date()), Validators.required]
  });
  countFxPerRef: refQuantityDto[] = [];
  currentTime: Date = new Date();
  InProgress: number = 0;
  intervalId: any;
  line: BehaviorSubject<string> = new BehaviorSubject<string>("")
  project: BehaviorSubject<string> = new BehaviorSubject<string>("")
  efficiencyPerHour: BehaviorSubject<HourlyEfficiency[]> = new BehaviorSubject<HourlyEfficiency[]>([]);
  constructor(
    private formBuilder: FormBuilder,
    private lineDashboardService: LineDashboardService,
    public dialog: MatDialog,
    public storageService: StorageService,
    public router: Router,
    private SegemntService: SegmentService,
    private productionLineService: ProductionLineService
  ) { }

  ngOnInit() {
    this.setDefaultDates()
    this.getInitData();
    this.initHourlyQuantityChart()
    this.initEffecenyPerHoureChart()
    setInterval(() => {
      this.reloadCurrentPage();
      // this.updateHourlyQuantityChart()
    }, 3000); // 3 seconds


    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);



  }

  reloadCurrentPage() {
    this.router.navigateByUrl('/packaging/report', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]).then(() => {
        // Set the page to 
        this.initHourlyQuantityChart()
        this.countFxPerHour
        this.updateCharts()
        this.requestFullscreen();
      });
    });
  }

  // Request fullscreen mode
  requestFullscreen() {
    const element = document.documentElement; // Get the full page element
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.requestFullscreen) { // Firefox
      element.requestFullscreen();
    } else if (element.requestFullscreen) { // Chrome, Safari and Opera
      element.requestFullscreen();
    } else if (element.requestFullscreen) { // IE/Edge
      element.requestFullscreen();
    }
  }

  // Clear the interval when the component is destroyed
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setDefaultDates() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let fromDate: Date;
    let toDate: Date;

    if (currentHour >= 22 || currentHour < 6) {
      // Shift C
      fromDate = new Date(currentDate);
      fromDate.setHours(22, 0, 0, 0);
      toDate = new Date(currentDate);
      if (currentHour < 6) {
        fromDate.setDate(fromDate.getDate() - 1); // Previous day 22:00
      } else {
        toDate.setDate(toDate.getDate() + 1); // Next day 06:00
      }
      toDate.setHours(6, 0, 0, 0);
    } else if (currentHour >= 6 && currentHour < 14) {
      // Shift A
      fromDate = new Date(currentDate);
      fromDate.setHours(6, 0, 0, 0);
      toDate = new Date(currentDate);
      toDate.setHours(14, 0, 0, 0);
    } else {
      // Shift B
      fromDate = new Date(currentDate);
      fromDate.setHours(14, 0, 0, 0);
      toDate = new Date(currentDate);
      toDate.setHours(22, 0, 0, 0);
    }

    this.filterForm.patchValue({
      from: this.formatDate(fromDate),
      to: this.formatDate(toDate),
      // shift: this.getCurrentShift(currentHour)
    });
  }



  formatDate(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * 
   */
  getInitData(): void {
    const filters = {
      from: this.formatDate(this.filterForm.get('from')?.value),
      to: this.formatDate(this.filterForm.get('to')?.value),
      temps_game: this.storageService.getItem('line_disply_rangeTime'),
      vsm:this.storageService.getItem('availible_operators')
    }

    this.lineDashboardService.getTotalQuantity(filters).subscribe(
      (data: any) => {
        this.totalQuantity = data.total_quantity;
        // Update other data and charts as needed
        this.updateCharts();
      },
      (error) => {
        console.error('Error fetching total quantity:', error);
      }
    );

    this.lineDashboardService.getBoxCount(filters).subscribe(
      (data: BoxCount) => {
        this.countPackages = data.box_count;
        // Update other data and charts as needed
        this.updateCharts();
      },
      (error) => {
        console.error('Error fetching total quantity:', error);
      }
    );


    this.lineDashboardService.getCountOfPackageByHour(filters).subscribe(
      (data: any) => {
        this.countOfPackagePerHour = data;
        // Update other data and charts as needed
        this.updateCharts();
      },
      (error) => {
        console.error('Error fetching total quantity:', error);
      }
    );

    this.lineDashboardService.getHourProduitsDTO(filters).subscribe(
      (data: any) => {
        this.hourProduits = data;
        // Update other data and charts as needed
        this.updateCharts();
      },
      (error) => {
        console.error('Error fetching total quantity:', error);
      }
    )


    this.lineDashboardService.getQuantityByHour(filters).subscribe(
      (data: any) => {
        this.countFxPerHour = data
        this.updateCharts();
      }
      ,
      (error) => {
        console.error('Error fetching hourly quantity:', error);
      }
    );

    this.lineDashboardService.getCountByCodeFournisseur(filters).subscribe(
      (data: any) => {
        this.countFxPerRef = data
        this.updateCharts();
      }
      ,
      (error) => {
        console.error('Error fetching hourly quantity:', error);
      }
    )

    this.lineDashboardService.getInProgressQantity(filters).subscribe(
      (data: any) => {
        this.InProgress = data.total_quantity
        this.updateCharts();
      }
      ,
      (error) => {
        console.error(':', error);
      }
    )
    this.lineDashboardService.getEfficiencyByHour(filters).subscribe(
      (data: any) => {
        this.efficiencyPerHour.next(data)
        this.updateCharts();
      }
      ,
      (error) => {
        console.error(':', error);
      }
    )

    setTimeout(() => {
      this.onFilter();
    }, 5000)
  }

  onFilter() {
    this.getInitData();
    this.updateCharts();
  }

  updateCharts() {
    // Implement chart updates here using Chart.js
    this.updateHourlyQuantityChart()
    this.updateEffecenyPerHoureChart()
    // Other chart updates
  }
  /**
   * this function provid us to calculate efficiency
   * @returns 
   */
  calculateEfficiency(): number {
    // Implement efficiency calculation logic based on totalQuantity and any other relevant data
    const rangeTime = this.storageService.getItem("line_disply_rangeTime")
    const operators = this.storageService.getItem("line_disply_operatores")
    let start = new Date(this.formatDate(this.filterForm.get('from')?.value))
    let to = new Date()
    let postedHours = 0;
    let hours = 0;
    do {
      hours++
      postedHours++
      start.setHours(start.getHours() + 1)
    } while (hours < 8)
    // if(this.storageService.getItem('line_disply_efficiency') === 1){
    //   return ((this.totalQuantity * rangeTime)/(operators * hours)) * 100;
    // }else{
    return ((this.totalQuantity) / (this.storageService.getItem('line_disply_target'))) * 100;
    // }
  }


  initHourlyQuantityChart(): void {
    const ctx = document.getElementById('hourlyQuantityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Hourly Quantity',
          data: [10, 20, 30, 40], // Sample data
          borderColor: '#ff7514',
          backgroundColor: '#ff7514',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            display: true,
            position: 'center'
          },
          // Adding label plugin here
          datalabels: {
            display: true,
            align: 'center',
            color: 'oklch(0.28 0.1 255.67)',
            font: {
              size:16,
              weight: 'bold'
            },
            formatter: function (value:any) {
              return value; // Return value to show inside the chart
            }
          }
        }
      },
      plugins: [ChartDataLabels] // Registering the Chart.js DataLabels plugin
    });
  }

  updateHourlyQuantityChart(): void {
    let postedHours: CountHourLineDto[] = []
    let start = new Date(this.formatDate(this.filterForm.get('from')?.value))
    let to = new Date(this.formatDate(this.filterForm.get('to')?.value))
    let hourCout = 0;
    let target = this.storageService.getItem("line_disply_target");
    const targetPerHour = target / 8
    do {

      let hourInApiHours = this.countFxPerHour.find(hour => hour.hour == start.getHours())
      if (hourInApiHours) {
        postedHours.push(new CountHourLineDto(hourInApiHours.total_quantity, start.getHours()))
      } else {
        console.log("not found");
        postedHours.push(new CountHourLineDto(0, start.getHours()))
      }
      start.setHours(start.getHours() + 1)
      hourCout++;
    } while (hourCout < 8)

    this.countFxPerHour = postedHours
   
    const chart = Chart.getChart('hourlyQuantityChart') as Chart;
    chart.data.labels = this.countFxPerHour.map((item: any, index) => item.hour + 'h -> ' + (item.hour + 1) + 'h');
    // chart.data.datasets[0].data = this.countFxPerHour.map((item: any) => item.total_quantity);
    chart.data.datasets = [{
      label: 'Quantity',
      data: this.countFxPerHour.map((item: any) => item.total_quantity),
      borderColor: '#ff7614a4',
      backgroundColor: '#ff7614a4',
      order: 2
  }, {
      label: 'Target',
      data: [...this.countFxPerHour.map((item: any) => targetPerHour),20],
      type: 'line',
       borderColor: 'rgba( 25, 135, 84, 1 )',
          backgroundColor: 'rgba( 25, 135, 84, 1 )',
      // this dataset is drawn on top
      order: 1
  }],
  // labels: ['January', 'February', 'March', 'April']


    chart.update();

  }


  openDialog(): void {
    this.dialog.open(LineDisplayDialogComponent, {
      width: '50%',
      data: { /* pass any data here if needed */ }
    });
  }

  getEcartColorAndArrow(): { colorClass: string, arrow: string } {
    const ecart = this.calculateExpected() - this.totalQuantity;
    if (ecart > 0) {
      return { colorClass: 'text-danger fw-bold', arrow: '↓' };
    } else if (ecart < 0) {
      return { colorClass: 'text-success fw-bold', arrow: '↑' };
    } else {
      return { colorClass: '', arrow: '' }; // Default or no change needed
    }
  }


  initEffecenyPerHoureChart(): void {
    const ctx = document.getElementById('effeciencyChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Efficiency Per Hour"], // Provide your labels
        datasets: [{
          data: [], // Provide your data
          borderWidth: 6,
          fill: false,
          borderColor: 'oklch(0.28 0.1 255.67)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          // Adding label plugin here
          datalabels: {
            display: true,
            align: 'top',
            color: '#ff7514',
            font: {
              size:16,
              weight: 'bold'
            },
            formatter: function (value:any) {
              return value.toFixed(2); // Format the value to 2 decimal places
            }
          }
        }
      },
      plugins: [ChartDataLabels] // Registering the Chart.js DataLabels plugin
    });
  }
  
  /**
   * 
   */
  updateEffecenyPerHoureChart(): void {
    const ctx = document.getElementById('effeciencyChart') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.data.labels = this.efficiencyPerHour.getValue().map(item => item.hour + 'h -> ' + (item.hour + 1) + 'h');
      chart.data.datasets[0].data = [...this.efficiencyPerHour.getValue().map(item => item.efficiency),200];
      chart.data.datasets[0].label ="Efficiency"
      chart.update();
    }
  }
  /**
   * print the report 
   */
  printReport(): void {
    window.print()
  }
  /**
   * 
   * @returns target in line 
   */
  getOpbjectif(): number {
    // const rangeTime = this.storageService.getItem("rangeTime")
    // const operators = this.storageService.getItem("operatores") 
    const gole = this.storageService.getItem("line_disply_target") ? this.storageService.getItem("line_disply_target") : 0;
    // let objectif = (operators * this.hourProduits.posted_hours) / rangeTime
    return parseInt(gole)
  }
  /**
   * 
   * @returns expected of to delever 
   */
  calculateExpected() {
    let start = new Date(this.formatDate(this.filterForm.get('from')?.value))
    let to = new Date()
    let hourCoutn = 0;
    do {
      let hourInApiHours = this.countFxPerHour.find(hour => hour.hour == start.getHours())
      hourCoutn++
      start.setHours(start.getHours() + 1)
    } while (start < to)

    return ((this.storageService.getItem('line_disply_target') / 8) * hourCoutn);
  }

  getDeliveredClass() {
    //  return this.totalQuantity >= this.calculateExpected() ? ' text-success': 'text-danger';
    return this.totalQuantity >= this.calculateExpected() ? ' success-glass' : 'success-glass';
  }

  getFormattedDifference(): string {
    const difference = this.totalQuantity - this.calculateExpected();
    const formattedDifference = difference.toFixed(0); // Ensure one decimal place
    return difference > 0 ? `${formattedDifference}` : `${formattedDifference}`;
  }
}


