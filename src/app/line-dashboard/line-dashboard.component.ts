import { Component, OnInit} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import Chart from 'chart.js/auto';
import {MatCardModule} from "@angular/material/card";
import {Router, RouterOutlet} from "@angular/router";
import { BoxCount, CountDto, CountHourDto } from '../dtos/box.count';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LineDashboardService } from '../services/line.dashboard';
import { CountBoxPerHourLineDto, CountHourLineDto, HourProduitsDTO, refQuantityDto } from '../dtos/Line.dashboard.dto';
import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponent } from '../data-dialog/data-dialog.component';
import { StorageService } from '../services/storage.service';
import { BehaviorSubject, tap } from 'rxjs';
@Component({
  selector: 'app-line-dashboard',
  standalone: true,
   imports: [
    BaseChartDirective,
    MatCardModule,ReactiveFormsModule,
    RouterOutlet, CommonModule
  ],
  templateUrl: './line-dashboard.component.html',
  styleUrl: './line-dashboard.component.css'
})
export class LineDashboardComponent implements OnInit {
  totalQuantity: number = 0;
  countPackages: number = 0;
  efficiency: number = 0;
  countFxPerHour: CountHourLineDto[] =[];
  countOfPackagePerHour: CountBoxPerHourLineDto[] = [];
  hourProduits:HourProduitsDTO = new HourProduitsDTO(0,0,0,0);
  filterForm: FormGroup = this.formBuilder.group({
    from: [this.formatDate(new Date()), Validators.required],
    to: [this.formatDate(new Date()), Validators.required]
  });
  countFxPerRef: refQuantityDto[] = [];
  quantityByDay: BehaviorSubject<any> = new BehaviorSubject<any>([])
  quantityByMonth: BehaviorSubject<any> = new BehaviorSubject<any>([])

  constructor(
    private formBuilder: FormBuilder,
    private lineDashboardService: LineDashboardService,
    public dialog: MatDialog,
    public storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setDefaultDates()
    this.getInitData();
    this.initHourlyQuantityChart()
    this.initQuantityPerRefChart()
    this.initQuantityByDayChart()
    this.initQuantityByMonthChart()
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
  
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  getInitData(): void {
    const filters =  {
      from: this.formatDate(this.filterForm.get('from')?.value),
      to: this.formatDate(this.filterForm.get('to')?.value),
      temps_game: this.storageService.getItem('line_dashboard_rangeTime'),
      vsm:this.storageService.getItem('line_dashboard_operatores')
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
      (data:any) => {
        this.countOfPackagePerHour = data;
        // Update other data and charts as needed
        this.updateCharts();
      },
      (error) => {
        console.error('Error fetching total quantity:', error);
      }
    );

    this.lineDashboardService.getHourProduitsDTO(filters).subscribe(
      (data:any) => {
        this.hourProduits = data;
        this.efficiency = data.efficiency
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

    this.lineDashboardService.getQuantitybyDay(filters).subscribe(
        (data: any) => {
          this.quantityByDay.next(data)
          this.updateCharts()
        }
          ,
        (error) => {
          console.error('Error fetching hourly quantity:', error);
        }
      )

      this.lineDashboardService.getQuantitybyMonth(filters).subscribe(
        (data: any) => {
          this.quantityByMonth.next(data)
          this.updateCharts()
        }
          ,
        (error) => {
          console.error('Error fetching hourly quantity:', error);
        }
      )
  }

  onFilter() {
    this.getInitData();
    this.updateCharts();
  }

  updateCharts() {
    // Implement chart updates here using Chart.js
    this.updateHourlyQuantityChart()
    this.updateQuantityPerRefChart()
    this.updateQuantityByDayChart()
    this.updateQuantityByMonthChart()
    // Other chart updates
  }

  get calculateEfficiency(): number {
    // Implement efficiency calculation logic based on totalQuantity and any other relevant data
    const rangeTime = this.storageService.getItem("Line_dashboard_rangeTime")
    const operators = this.storageService.getItem("line_dashboard_operatores") 
    // this.efficiency = (this.totalQuantity * rangeTime) / (operators * this.hourProduits.posted_hours) * 100;
    console.log(this.efficiency);
    return this.efficiency
    
  }

  
  initHourlyQuantityChart(): void {
    const ctx = document.getElementById('hourlyQuantityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Hourly Quantity',
          data: [], // Provide your data array
        
          borderColor: '#ff761496',
          backgroundColor: '#ff761496',
          borderWidth:3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top'
          }
        }
      }
    });
  }

  updateHourlyQuantityChart(): void {
    let postedHours: CountHourLineDto[] = []
    let start = new Date(this.formatDate(this.filterForm.get('from')?.value))
    let to = new Date(this.formatDate(this.filterForm.get('to')?.value))
    do {
      let hourInApiHours =  this.countFxPerHour.find(hour => hour.hour == start.getHours())
      if(hourInApiHours) {
          if(!(postedHours.find(hour => hour.hour == hourInApiHours.hour )))
        postedHours.push(new CountHourLineDto(hourInApiHours.total_quantity,start.getHours()))
      }else{
        console.log("not found");
        postedHours.push(new CountHourLineDto(0,start.getHours()))
      }
      start.setHours(start.getHours()+ 1)  
    } while ( start < to)

    this.countFxPerHour = postedHours

    const chart = Chart.getChart('hourlyQuantityChart') as Chart;
    chart.data.labels = this.countFxPerHour.map((item: any,index ) => item.hour + 'h -> ' + (item.hour + 1)+'h');
    chart.data.datasets[0].data = this.countFxPerHour.map((item: any) => item.total_quantity);
    chart.update();
  }


  openDialog(): void {
    this.dialog.open(DataDialogComponent, {
      width: '50%',
      data: { /* pass any data here if needed */ }
    });
  }

  getEcartColorAndArrow(): { colorClass: string, arrow: string } {
    const ecart = this.hourProduits.posted_hours - this.hourProduits.productive_hours;
    if (ecart > 0) {
      return { colorClass: 'text-danger', arrow: '↓' };
    } else if (ecart < 0) {
      return { colorClass: 'text-success', arrow: '↑' };
    } else {
      return { colorClass: '', arrow: '' }; // Default or no change needed
    }
  }


  initQuantityPerRefChart(): void {
    const ctx = document.getElementById('quantityPerRefChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // or 'pie'
      data: {
        labels: [], // Provide your labels
        datasets: [{
          data: [], // Provide your data
          backgroundColor: [
            '#0064c8b5'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Quantity per Reference'
          }
        }
      }
    });
  }


  initQuantityByDayChart(): void {
    const ctx = document.getElementById('quantityByDay') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Daily Quantity',
          data: [], // Provide your data array
        
          borderColor: '#ff761496',
          backgroundColor: '#ff761496',
          borderWidth:3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top'
          }
        }
      }
    });
  }

  updateQuantityByDayChart(): void {
    const ctx = document.getElementById('quantityByDay') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.data.labels = this.quantityByDay.getValue().map((item: any) => item.date);
      chart.data.datasets[0].data = this.quantityByDay.getValue().map((item: any) => item.total_quantity);
      chart.update();
    }
  }


  initQuantityByMonthChart(): void {
    const ctx = document.getElementById('quantityByMonth') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Daily Quantity',
          data: [], // Provide your data array
        
          borderColor: '#1dbfd7b8',
          backgroundColor: '#1dbfd7b8',
          borderWidth:3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top'
          }
        }
      }
    });
  }

  updateQuantityByMonthChart(): void {
    const ctx = document.getElementById('quantityByMonth') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.data.labels = this.quantityByMonth.getValue().map((item: any) => item.month);
      chart.data.datasets[0].data = this.quantityByMonth.getValue().map((item: any) => item.total_quantity);
      chart.update();
    }
  }

  updateQuantityPerRefChart(): void {
    const ctx = document.getElementById('quantityPerRefChart') as HTMLCanvasElement;
    const chart = Chart.getChart(ctx);
    if (chart) {
      chart.data.labels = this.countFxPerRef.map(item => item.Code_fournisseur);
      chart.data.datasets[0].data = this.countFxPerRef.map(item => item.total_quantity);
      chart.update();
    }
  }
  printReport(): void{
    window.print()
  }

  naviagteToHome(){
    this.router.navigateByUrl('/');
  }
}

  
