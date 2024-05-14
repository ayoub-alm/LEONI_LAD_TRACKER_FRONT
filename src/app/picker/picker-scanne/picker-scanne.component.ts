import {Component, Host, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {ProductionJobService} from "../../services/production.job.service";
import {BehaviorSubject, debounceTime, delay, tap} from "rxjs";
import {ProductionJob} from "../../models/production-job.model";
import {CommonModule, DatePipe, DOCUMENT, NgFor} from "@angular/common";
import {PickerService} from "../../services/picker.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from "@angular/material/button";
import {Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateProdHarnessDTO} from "../../dtos/create-prod-harness.dto"
import {ProdHarnessService} from "../../services/prod-harness.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-picker-scanne',
  standalone: true,
  imports: [NgFor,CommonModule,MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './picker-scanne.component.html',
  styleUrl: './picker-scanne.component.css'
})
export class PickerScanneComponent implements OnInit{

  elem: any;
  currentTime: Date = new Date();
  currentStep: number = 0;
  productionJobs: BehaviorSubject<ProductionJob[]> = new BehaviorSubject<ProductionJob[]>([]);
  currentJob: BehaviorSubject<ProductionJob> = new BehaviorSubject<ProductionJob>(new ProductionJob({}));
  generatedQrCode: BehaviorSubject<string> = new BehaviorSubject<string>('')
  prodHarness!: CreateProdHarnessDTO ;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isEditable = false;
  @ViewChild(MatStepper) stepper!: MatStepper;
  noWorkAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
              private productionJobService: ProductionJobService,
              private prodHarnessService: ProdHarnessService,
              private pickerService: PickerService,
              private formBuilder: FormBuilder,
              private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getCurrentData();
    // listen to changes of input value in first step
    this.firstFormGroup.valueChanges.pipe(debounceTime(2000)).subscribe( value => {
      if (value.firstCtrl ==  this.currentJob.getValue().harness.fuse_box){
        this.printLabel()
        alert(this.generatedQrCode.getValue())
        // this.prodHarness.productionJobId = this.currentJob.getValue().id;
        // this.prodHarness.box_number = this.currentJob.getValue().harness.fuse_box;
        this.nextStep()
        this.focusCtrl(2);
      }else {
        if (value.firstCtrl != null){
          this.snackBar.open("Please scan correct Code bare","ok",
            {duration:1000,verticalPosition:"top", politeness:"assertive"}
          )
          this.firstFormGroup.reset()
        }
      }
    })
    // listen to changes in scan label step
    this.secondFormGroup.valueChanges.pipe(debounceTime(2000)).subscribe(value => {
      // if the value correct create a new production job and navigate to next step
      this.prodHarness = new CreateProdHarnessDTO(this.generatedQrCode.getValue() ,this.currentJob.getValue().id);
        if ( value.secondCtrl === this.generatedQrCode.getValue()){
          this.prodHarnessService.createProdHarness(this.prodHarness).subscribe((success) => {
            if (success){
              setTimeout(()=> {
                this.getCurrentData()
                this.stepper.reset();
              },2000)
              this.nextStep()
              this.currentStep = 1000;
            }
          })
          // if the value are not correct
        }else {
          if (value.secondCtrl != null ){
            this.snackBar.open("pleas scan the QR code ", "ok",{duration:20000})
            this.secondFormGroup.reset()
          }
        }
    })

    // update the date and  time
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  /**
   * this function allows us to go to the next step
   */
  nextStep(last:boolean = false): void {
    if (!last){
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
  @HostListener('window:keydown.enter',['$event'])
  nextStepEnter(event: KeyboardEvent): void {
    if(this.currentStep === 1000) {
      this.stepper.reset();
      this.currentStep = 0;
      this.getCurrentData();
    }else {
       this.nextStep()
       this.focusCtrl(this.currentStep++)
    }
    this.getCurrentData();
  }

  /**
   * this function allows us to focus in Input when we navigate enter steps
   * @param stepNumber
   */
  focusCtrl(stepNumber: number) {
    setTimeout(()=>{
      const secondCtrlInput = document.getElementById(stepNumber+'CtrlInput');
      if (secondCtrlInput) {
        secondCtrlInput.focus();
      }
    },100)
  }

  getCurrentData(): void{
    // get awaiting production job
    this.productionJobService.getAwaitingProductionJobForLine(1).subscribe(value => this.productionJobs.next(value))
    // get the current production job
    this.pickerService.getCurrentJob(1).subscribe(
      success => {
         this.currentJob.next(success)
    },
        error => {
        this.noWorkAvailable.next(true);
        })
  }

  printLabel():void{
    this.generatedQrCode.next(<string>this.datePipe.transform(new Date(), 'yyyyMMddHHmmss'));
  }
}
