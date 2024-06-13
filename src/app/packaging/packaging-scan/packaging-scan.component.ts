import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {BehaviorSubject, map} from "rxjs";
import {tap} from "rxjs/operators";
import {PackagingBoxDto} from "../../dtos/packaging-box.dto";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import Chart from "chart.js/auto";
import {PackagingProcess} from "../../models/packaging.proccess.model";
import {PackagingProcessService} from "../../services/packaging-proccess.service";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {PackagingStep} from "../../models/packaging.step.model";
import {HarnessService} from "../../services/harness.service";
import {PackagingBoxService} from "../../services/packaging.box.service";
import {ProdHarnessService} from "../../services/prod-harness.service";

@Component({
  selector: 'app-packaging-scan',
  standalone: true,
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, AsyncPipe, NgForOf, DatePipe],
  templateUrl: './packaging-scan.component.html',
  styleUrls: ['./packaging-scan.component.css']
})
export class PackagingScanComponent implements OnInit, AfterViewInit {
  isEditable: boolean = true;
  packagingBox: BehaviorSubject<PackagingBoxDto> = new BehaviorSubject<PackagingBoxDto>({
    id: null,
    barcode: "", created_by: "1", harness_id: 0, quantity: 0, line_id: 1, status: "1",
  });
  currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  packagingForm: FormGroup;
  lastChangedControl: { name: string, value: any } | null = null;
  packagingProcess: BehaviorSubject<PackagingProcess> = new BehaviorSubject<PackagingProcess>({
    id: 1,
    family: 123,
    status: 1,
    name: "Sample Packaging Process",
    steps: []
  });
  currentTime: Date = new Date();
  private chart: Chart | undefined;
  packagingSteps: BehaviorSubject<PackagingStep[]> = new BehaviorSubject<PackagingStep[]> ([]);
  packagingStepsAll: BehaviorSubject<PackagingStep[]> = new BehaviorSubject<PackagingStep[]> ([]);
  loopsSteps:  BehaviorSubject<PackagingStep[]> = new BehaviorSubject<PackagingStep[]> ([]);
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('myPieChart') private pieChartRef!: ElementRef;
  currentBoxSize: string = "";
  activeStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isPackagingStepTerminate: boolean = false;
  delivredQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private formBuilder: FormBuilder,
              private packagingProcessService: PackagingProcessService,
              private packagingBoxService: PackagingBoxService,
              private prodHarnessService: ProdHarnessService,
              private harnessService: HarnessService) {
    this.packagingForm = this.formBuilder.group({});
  }

  /**
   *
   */
  ngOnInit(): void {
    this.packagingProcessService.getProcessById(19).pipe(
      tap((packagingProcess: PackagingProcess) => {
        console.log(packagingProcess);
        let packagingStepsAll  = packagingProcess.steps.sort((a, b) => a.order - b.order);
        let packagingSteps  = packagingProcess.steps.filter(step => step.name.includes('packaging')).sort((a, b) => a.order - b.order);
        let loopSteps  = packagingProcess.steps.filter(step => !step.name.includes('packaging')).sort((a, b) => a.order - b.order);
        this.loopsSteps.next(loopSteps);
        this.packagingProcess.next(packagingProcess)
        this.packagingSteps.next(packagingSteps);
        this.packagingStepsAll.next(packagingStepsAll);
        packagingProcess.steps.forEach(step => {
          const controlName = step.name;
          this.packagingForm.addControl(controlName, this.formBuilder.control({
            value: '',
            disabled: false
          }, [Validators.required, Validators.minLength(2)]));

          // Subscribe to valueChanges for each control
          this.packagingForm.get(controlName)?.valueChanges.subscribe(value => {
            this.lastChangedControl = { name: controlName, value: value };
            this.evaluateStepCondition(step);
          });
        });
      })
    ).subscribe();

    // this.activeStep.next(3);
    this.packagingForm.valueChanges.pipe(
      tap(value => {
        this.onFormValueChange(value);
      })
    ).subscribe();


    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  /**
   *
   */
  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  /**
   *
   * @param step
   /**
   * Evaluates the condition of a packaging step.
   * @param step - The current packaging step to evaluate.
   */
  evaluateStepCondition(step: PackagingStep): void {
    const formValue = this.packagingForm.getRawValue();

    if (this.checkCondition(step, formValue)) {
      const totalSteps = this.packagingStepsAll.getValue().length;
      const currentQuantity = this.delivredQuantity.getValue();
      const totalQuantity = this.packagingBox.getValue().quantity;
      if (step.order === totalSteps) {
        //#ToDO
        this.prodHarnessService.getByRef(formValue[step.name]).pipe(
          tap((p) => {
            alert(p.uuid)
          })
        ).subscribe()
        this.delivredQuantity.next(this.delivredQuantity.getValue()+1)
        // Go to last step
        if (this.delivredQuantity.getValue() == this.packagingBox.getValue().quantity){
           this.stepper.next();
           return;
        }else {
          // else return to first step of loop
          this.activeStep.next(this.loopsSteps.getValue()[0].order)
          this.focusCtrl(this.loopsSteps.getValue()[0].order );
        }
      }
      // in loops step
      else if (step.order > this.packagingSteps.getValue().length ) {

        this.isPackagingStepTerminate = true;
        alert(this.isPackagingStepTerminate)
          // if we past the packaging steps
        if (step.order === this.packagingSteps.getValue().length-2 ) {
              if(step.order == totalSteps)
                alert('last step pased')
        }
        else {
          const nextStep = this.stepper.selectedIndex+1;
          this.currentStep.next(nextStep);
          this.activeStep.next(nextStep);
          this.focusCtrl(nextStep );
        }
      }
      else {
        const nextStep = this.currentStep.getValue() + 1;
        this.currentStep.next(nextStep);
        this.activeStep.next(nextStep);
        this.focusCtrl(nextStep );
      }

     if (step.order === this.packagingSteps.getValue().length ){
        this.createPackage(this.packagingBox.getValue())
      }

    }
  }



  /**
   *
   * @param value
   */
  onFormValueChange(value: any): void {
    const data = value;
    const inputs = Object.keys(data).filter(key => data[key]);
    // console.log(this.lastChangedControl); // Log the last changed control here or perform other actions
  }

  /**
   *
   */
  initializeCharts(): void {
    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    // const labels = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
    this.chart = new Chart(ctx, {
      type: 'doughnut',  // Changed to doughnut for a more gauge-like appearance
      data: {
        labels: ['Delivered Quantity', 'Remaining Quantity'],
        datasets: [{
          label: 'Production Quantity',
          data: [
            this.packagingBox.getValue().quantity,10
            // this.packagingBox.getValue().quantity
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

    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    const labels = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Harness per hour',
          data: [20, 59, 60, 81, 56, 55, 40, 45],
          fill: false,
          borderColor: 'rgb(255, 165, 0)', // Orange color
          backgroundColor: 'rgb(0,128,255)', // Blue color for points
          tension: 0.1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: false,
            text: 'progress'
          }
        }
      }
    });
  }

  /**
   *
   * @param event
   */
  @HostListener('window:keydown.enter', ['$event'])
  nextStepEnter(event: KeyboardEvent): void {
    if (this.activeStep.getValue() === 0) {
      this.activeStep.next(this.stepper.selectedIndex+1)
      this.currentStep.next(1);
      this.focusCtrl(1)
    }
  }

  /**
   *
   * @param stepNumber
   */
  focusCtrl(stepNumber: number): void {
    setTimeout(() => {
      const CtrlInput = document.getElementById( `step${stepNumber}`) as HTMLInputElement;
      if (CtrlInput) {
        CtrlInput.focus();
      }else{
        alert('control not fond' + stepNumber)
      }
    }, 100);
  }

  /**
   *
   * @param step
   * @param formValue
   */
  checkCondition(step: PackagingStep, formValue: any): boolean {
    switch (step.name) {
      case 'packaging#Box barcode':
        if (formValue['packaging#Box barcode'] !== '' && formValue['packaging#Box barcode'].length > 5) {
          this.packagingBox.getValue().barcode = formValue['packaging#Box barcode'];
          return true;
        }
        break;
      case 'packaging#Box harness-reference':
        // Check if the harness reference exists in the list of harnesses
        this.harnessService.getAllHarnesses().pipe(
          map(values => {
            const harness = values.find(is => is.ref === formValue[step.name]);
            if (harness) {
              this.packagingBox.getValue().harness_id = harness.id;
              this.currentStep.next( this.currentStep.getValue()+1)
              this.activeStep.next(this.currentStep.getValue())
              this.focusCtrl(this.currentStep.getValue())
              return true;
            }
            return false;
          })
        ).subscribe();
        break;
      case 'packaging#Box quantity':
        if (formValue['packaging#Box quantity'] !== '') {
          this.packagingBox.getValue().quantity = formValue['packaging#Box quantity'];
          return true;
        }
        break;
      case 'packaging#Box size':
        if (formValue['packaging#Box size']) {
          console.log(step.pre_fix);
          if (step.pre_fix != "" ){
            // this.currentBoxSize = formValue.formValue['packaging#Box size'].slice(step.pre_fix.length);
            return true;
          }
          // this.activeStep.next(3);
          // this.stepper.next()
          return true;
        }
        break;
      case 'BOL 1#Counter':
        if (formValue['BOL 1#Counter'] !== '') {
          return true;
        }
        break;
      case 'BOL 1#Harness reference':
        if (formValue['BOL 1#Harness reference'] !== '') {
          return true;
        }
        break;
      case 'BOL 1#Box size':
        if (formValue['BOL 1#Box size'] !== '') {
          return true;
        }
        break;
      case 'PTA#Counter':
        if (formValue['PTA#Counter'] !== '') {
          return true;
        }
        break;
      case 'PTA#Harness reference':
        if (formValue['PTA#Harness reference'] !== '') {
          return true;
        }
        break;
      case 'BOL 2#Counter':
        if (formValue['BOL 2#Counter'] !== '') {
          return true;
        }
        break;
      case 'BOL 2#Harness reference':
        if (formValue['BOL 2#Harness reference'] !== '') {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  createPackage(packagingBoxDto: PackagingBoxDto): void{
    this.packagingBoxService.createPackagingBox(packagingBoxDto).pipe(
      tap(packagingBox => {
        this.packagingBox.getValue().id = packagingBox.id
      })
    ).subscribe()
  }
}
