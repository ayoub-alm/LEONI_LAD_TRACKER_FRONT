import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {BehaviorSubject, debounceTime, tap} from "rxjs";
import {PackagingBoxDto} from "../../dtos/packaging-box.dto";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-packaging-scan',
  standalone: true,
  imports: [MatStepperModule, FormsModule, ReactiveFormsModule , ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './packaging-scan.component.html',
  styleUrl: './packaging-scan.component.css'
})
export class PackagingScanComponent implements OnInit, AfterViewInit{
  isEditable: boolean = false;
  packagingBox: BehaviorSubject<PackagingBoxDto> = new BehaviorSubject<PackagingBoxDto>({
    barcode: "", created_by: "", harness_id: 0, quantity: 0, ref: "", status: "",
  });
  currentStep: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  @ViewChild(MatStepper) stepper!: MatStepper;
  packagingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.packagingForm = this.formBuilder.group({
      harnessReference:["", Validators.required],
      boxReference:["",Validators.required],
      boxQuantity:["",Validators.required]
    })
  }

  ngOnInit():void {
      this.currentStep.next(this.currentStep.getValue() + 1);
      this.packagingForm.valueChanges.pipe(
        debounceTime(2000),
        tap(value => {
          if (this.currentStep.getValue() === 1  ) {
            this.stepper.next();
            this.currentStep.next(this.currentStep.getValue() +1)
            this.focusCtrl(this.currentStep.getValue() )
          return;
          }
        if (this.currentStep.getValue() === 2 ){
          alert("2")
            this.packagingBox.getValue().barcode = value.boxReference;
            this.stepper.next()
            this.currentStep.next(this.currentStep.getValue() +1)
            this.focusCtrl(this.currentStep.getValue() )
          return;
          }
          else if (this.currentStep.getValue() === 3 && value.boxQuantity){
          alert("3")
            this.packagingBox.getValue().quantity = parseInt(value.boxQuantity);
            this.stepper.next()
            this.currentStep.next(this.currentStep.getValue() +1)
            this.focusCtrl(this.currentStep.getValue() )
          return;
          }
          else {
            alert('not gof')
          }
        })
        ).subscribe()
  }

  ngAfterViewInit(): void {
    this.focusCtrl(1)
  }

  @HostListener('window:keydown.enter',['$event'])
  nextStepEnter(event: KeyboardEvent): void {
    this.stepper.next();
    this.focusCtrl(1);
  }

  /**
   * this function allows us to focus in Input when we navigate enter steps
   * @param stepNumber
   */
  focusCtrl(stepNumber: number) {
    setTimeout(()=>{
      const CtrlInput = document.getElementById(stepNumber+'CtrlInput');
      if (CtrlInput) {
        CtrlInput.focus();
      }
    },100)
  }


}
