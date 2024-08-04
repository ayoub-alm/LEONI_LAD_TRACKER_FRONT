import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ProductionJobService } from "../../services/production.job.service";
import {BehaviorSubject, debounceTime, finalize} from "rxjs";
import { ProductionJob } from "../../models/production-job.model";
import { CommonModule, DatePipe, NgFor } from "@angular/common";
import {Line, PickerService} from "../../services/picker.service";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CreateProdHarnessDTO } from "../../dtos/create-prod-harness.dto"
import { ProdHarnessService } from "../../services/prod-harness.service";
import Chart from "chart.js/auto";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-picker-scanne',
  standalone: true,
  imports: [
    NgFor, CommonModule, MatButtonModule,
    MatStepperModule, FormsModule,
    ReactiveFormsModule, MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './picker-scanne.component.html',
  styleUrls: ['./picker-scanne.component.css']
})
export class PickerScanneComponent implements OnInit, AfterViewInit {

  elem: any;
  currentTime: Date = new Date();
  currentStep: number = 0;
  productionJobs: BehaviorSubject<ProductionJob[]> = new BehaviorSubject<ProductionJob[]>([]);
  currentJob: BehaviorSubject<ProductionJob> = new BehaviorSubject<ProductionJob>(new ProductionJob({}));
  generatedQrCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  prodHarness!: CreateProdHarnessDTO;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('gaugeChart') private gaugeChartRef!: ElementRef;
  noWorkAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private chart: Chart | undefined;
   productionLine: BehaviorSubject<Line> = new BehaviorSubject({
     lineId: 0
   });

  constructor(
    private productionJobService: ProductionJobService,
    private prodHarnessService: ProdHarnessService,
    private pickerService: PickerService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.pickerService.getCurrentLineFromLocalServer().pipe(
      tap(value => {
        this.productionLine.next(value)
      })
    ).subscribe(finalize => {
      this.getCurrentData()
    })




    // Listen to changes of input value in first step
    this.firstFormGroup.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      if (value.firstCtrl === this.currentJob.getValue().harness.fuse_box) {
        this.printLabel();
        alert(this.generatedQrCode.getValue());
        this.nextStep();
        this.focusCtrl(2);
      } else {
        if (value.firstCtrl != null) {
          this.snackBar.open("Please scan correct Barcode", "ok", {
            duration: 1000, verticalPosition: "top", politeness: "assertive", panelClass: 'snackbar-danger'
          });
          this.firstFormGroup.reset();
        }
      }
    });

    // Listen to changes in scan label step
    this.secondFormGroup.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      // If the value is correct create a new production harness and navigate to next step
      // this.prodHarness = new CreateProdHarnessDTO(this.generatedQrCode.getValue(), this.currentJob.getValue().id);
      if (value.secondCtrl === this.generatedQrCode.getValue()) {
        this.prodHarnessService.createProdHarness(this.prodHarness).subscribe((success) => {
          if (success) {
            setTimeout(() => {
              this.getCurrentData();
              this.stepper.reset();
              this.currentStep = 0;
            }, 2000);
            this.nextStep();
            this.currentStep = 1000;
          }
        });
        // If the value is not correct
      } else {
        if (value.secondCtrl != null) {
          this.snackBar.open("Please scan the QR code", "ok", { duration: 20000 });
          this.secondFormGroup.reset();
          this.updateGaugeChart();
        }
      }
    });

    // Update the date and time
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  /**
   * This function allows us to go to the next step
   */
  nextStep(last: boolean = false): void {
    if (!last) {
      if (this.stepper) {
        this.stepper.next();
        this.currentStep++;
      }
    }
  }

  /**
   * Listen to Enter Click
   * @param event
   */
  @HostListener('window:keydown.enter', ['$event'])
  nextStepEnter(event: KeyboardEvent): void {
    if (this.currentStep === 0) {
      if (this.currentJob.getValue().harness.fuse_box == null) {
        this.printLabel();
        alert(this.generatedQrCode.getValue());
        this.nextStep();
        this.focusCtrl(2);
      } else {
        this.nextStep();
        this.focusCtrl(this.currentStep++);
      }
      this.getCurrentData();
    }
  }

  /**
   * This function allows us to focus on Input when we navigate through steps
   * @param stepNumber
   */
  focusCtrl(stepNumber: number): void {
    setTimeout(() => {
      const secondCtrlInput = document.getElementById(stepNumber + 'CtrlInput');
      if (secondCtrlInput) {
        secondCtrlInput.focus();
      }
    }, 100);
  }

  getCurrentData(): void {
    this.pickerService.getCurrentLineFromLocalServer().pipe().subscribe()
    // Get awaiting production job
    this.productionJobService.getAwaitingProductionJobForLine(this.productionLine.getValue().lineId).subscribe(value => this.productionJobs.next(value));
    // Get the current production job
    this.pickerService.getCurrentJob(this.productionLine.getValue().lineId).subscribe(
      success => {
        this.currentJob.next(success);
        this.updateGaugeChart();  // Update the chart whenever the current job is fetched
      },
      error => {
        this.noWorkAvailable.next(true);
      }
    );
  }

  printLabel(): void {
    this.generatedQrCode.next(<string>this.datePipe.transform(new Date(), 'yyyyMMddHHmmss'));
  }

  initializeCharts(): void {
    const ctx = this.gaugeChartRef.nativeElement.getContext('2d') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'doughnut',  // Changed to doughnut for a more gauge-like appearance
      data: {
        labels: ['Delivered Quantity', 'Remaining Quantity'],
        datasets: [{
          label: 'Production Quantity',
          data: [
            this.currentJob.getValue().delivered_quantity,
            this.currentJob.getValue().demanded_quantity - this.currentJob.getValue().delivered_quantity
          ],
          backgroundColor: [
            'rgba(54,162,235,0.75)',
            'rgba(255,117,20,0.73)',
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                return label + ': ' + context.raw + ' units';
              }
            }
          }
        }
      }
    });
  }

  updateGaugeChart(): void {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.currentJob.getValue().delivered_quantity,
        this.currentJob.getValue().demanded_quantity - this.currentJob.getValue().delivered_quantity
      ];
      this.chart.update();
    }
  }
}
