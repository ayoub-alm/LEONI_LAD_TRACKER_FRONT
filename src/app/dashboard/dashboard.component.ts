import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {MatCardModule} from "@angular/material/card";
import {BehaviorSubject, Observable, concat, concatMap, take, tap} from "rxjs";
import {RouterOutlet} from "@angular/router";
import { DashboardService } from '../services/dashboard.service';
import { ProjectService } from '../services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectModel } from '../models/project.model';
import { SegmentService } from '../services/segment.service';
import { SegmntModel } from '../models/segmentModel';
import { ProductionLineService } from '../services/production.line.service';
import { ProductionLineModel } from '../models/production.line.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SumByRefApiResponse, TotalCountApiResponse } from '../dtos/global.dashboard.dto';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-charts',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCardModule,ReactiveFormsModule,
    RouterOutlet, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit{
  projects:BehaviorSubject<ProjectModel[]> = new BehaviorSubject<ProjectModel[]>([])
  allSegements: SegmntModel[]= [];
  segments: BehaviorSubject<SegmntModel[]> = new BehaviorSubject<SegmntModel[]>([])
  productionLines: BehaviorSubject<ProductionLineModel[]> =  new BehaviorSubject<ProductionLineModel[]>([])
  allProductionLine: ProductionLineModel[] = [];
  totalQuantity: BehaviorSubject<TotalCountApiResponse[]> = new BehaviorSubject<TotalCountApiResponse[]>([])
  sumByRefApiResponse: BehaviorSubject<SumByRefApiResponse[]> = new BehaviorSubject< SumByRefApiResponse[]>([])
  filterForm: FormGroup =  this.formBuilder.group({
    project:["",Validators.required],
    line:[""],
    segment:[""],
    from: [this.formatDate(new Date()), Validators.required],
    to: [this.formatDate(new Date()), Validators.required]
  });
  totalBysegmentData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private dashboardService: DashboardService, private projectService: ProjectService, private segmentService: SegmentService,
    private productionLineService: ProductionLineService,   private formBuilder: FormBuilder,
  ) {  }
/**
 * 
 */
  ngOnInit() {
    this.setDefaultDates()
    this.getInitData()
    this.TotalQuantityChart()
    this.initQuantityByRefChart()
    this.initTotalQuantityBySegmentChart()
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
      project:"",
      line:"",
      segment:"",
      from: this.formatDate(fromDate),
      to: this.formatDate(toDate),
      // shift: this.getCurrentShift(currentHour)
    });
  }



  /**
   * this function allows to init charts
   */
  getInitData():void {
    let filters =  {
      project: this.filterForm.get('project')?.value,
      segment: this.filterForm.get('segment')?.value,
      line: this.filterForm.get('line')?.value,
      from: this.formatDate(this.filterForm.get('from')?.value),
      to: this.formatDate(this.filterForm.get('to')?.value),
    }

    this.projectService.getAllProjects().pipe(
      tap((projects) =>{
        this.projects.next(projects)
      })
    ).subscribe()

    this.segmentService.getAllSegments().pipe(
      tap((segements) => {
        this.allSegements = segements;
        this.segments.next(segements)
      })
    ).subscribe()

    this.productionLineService.getAllLines().pipe(
      tap((productionLines) =>{
        this.allProductionLine = productionLines;
        this.productionLines.next(productionLines)
      })
    ).subscribe()
    // list to change in project select box 
    this.filterForm.get('project')?.valueChanges.subscribe(value => {
      let filtredSegments = this.allSegements;
      this.segments.next(filtredSegments.filter(sgm => { return  sgm.project_id == value}))
      let filtredLines = this.allProductionLine;
      this.productionLines.next(filtredLines.filter(line => { return  line.segment.project_id == value}))
    })
    // listen to changes in segement 
    this.filterForm.get('segment')?.valueChanges.subscribe(value => {
      let filtredLines = this.allProductionLine;
      this.productionLines.next(filtredLines.filter(line => { return  line.segment.id == value}))
    })
    

  }

  onFilter() {
    // this.getInitData();
    this.getDataWithFilter()
    this.updateTotalQuantityChart()
    this.updateQuantityByRefChart()
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


  getDataWithFilter():void{
    let filters =  {
      project: this.filterForm.get('project')?.value,
      segment: this.filterForm.get('segment')?.value,
      line: this.filterForm.get('line')?.value,
      from: this.formatDate(this.filterForm.get('from')?.value),
      to: this.formatDate(this.filterForm.get('to')?.value),
    }
    // get total quantity data 
    this.dashboardService.getTotalQuantity(filters).pipe(tap((data) => {

      this.totalQuantity.next(data)
      this.updateCharts()
    })).subscribe()
    // get quantity per reference data 
    this.dashboardService.getCountByCodeFournisseur(filters).pipe(
      tap((data) => {
        this.sumByRefApiResponse.next(data)
        this.updateCharts()
      })).subscribe();
    
  }

  updateCharts(){
    this.updateQuantityByRefChart()
    this.updateTotalQuantityChart()
    this.updateTotalQuantityBySegmentChart()
  }

  TotalQuantityChart(): void {
    const ctx = document.getElementById('hourlyQuantityChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Hourly Quantity',
          data: [], // Provide your data array
        
          borderColor: '#00b3ff95',
          backgroundColor: ['#00b3ff95'], 
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

  initTotalQuantityBySegmentChart(): void {
    const ctx2 = document.getElementById('totalQuantityBySegmentChart') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'totla Quantity per segement ',
          data: [], // Provide your data array
          borderColor: '#ff7614c2',
          backgroundColor: '#ff7614c2',
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

  initQuantityByRefChart(): void {
    const ctx = document.getElementById('quantityByRefChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [], // Provide your labels
        datasets: [{
          label: 'Quantity byRef',
          data: [], // Provide your data array
          borderColor: '#ff7614c2',
          backgroundColor: '#ff7614c2',
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


  updateTotalQuantityChart(): void {
    const chart = Chart.getChart('hourlyQuantityChart') as Chart;
    chart.data.labels = this.totalQuantity.getValue().map((total: TotalCountApiResponse,index ) => total.line.segment.name +' / '+ total.line.name );
    chart.data.datasets[0].data = this.totalQuantity.getValue().map((total: TotalCountApiResponse,index ) => total.total_quantity );
    chart.update();
  }
updateTotalQuantityBySegmentChart(): void {
    const chart = Chart.getChart('totalQuantityBySegmentChart') as Chart;
    let data: any = [];

    // Iterate through each lineData
    this.totalQuantity.getValue().forEach((lineData) => {
        const segmentName = lineData.line.segment.name;
        const segmentId = lineData.line.segment.id;

        // Check if the segment is already in the data array
        if (!data.some((value: any) => value.segment === segmentName)) {
            let count = 0;

            // Filter and accumulate the total_quantity for the current segment
            this.totalQuantity.getValue()
                .filter(value => value.line.segment.id === segmentId)
                .forEach(value => count += value.total_quantity);

            // Push the result into the data array
            data.push({ "segment": segmentName, "count": count });
        }
    });
    this.totalBysegmentData.next(data)
    // Update the chart labels and data
    chart.data.labels = data.map((total: any) => total.segment);
    chart.data.datasets[0].data = data.map((total: any) => total.count);
    chart.update();
}

  updateQuantityByRefChart(): void {
    const chart = Chart.getChart('quantityByRefChart') as Chart;
    chart.data.labels = this.sumByRefApiResponse.getValue().map((total: SumByRefApiResponse,index ) => total.Code_fournisseur );
    chart.data.datasets[0].data = this.sumByRefApiResponse.getValue().map((total: SumByRefApiResponse,index ) => total.total_quantity );
    chart.update();
  }

}
  