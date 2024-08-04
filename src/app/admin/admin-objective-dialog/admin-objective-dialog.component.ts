import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {ProjectService} from "../../services/project.service";
import {BehaviorSubject, filter, tap} from "rxjs";
import {CommonModule, NgFor} from "@angular/common";
import {ProjectModel} from "../../models/project.model";
import {ProductionLineService} from "../../services/production.line.service";
import {ProductionLineModel} from "../../models/production.line.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {HarnessService} from "../../services/harness.service";
import {ProductionJobService} from "../../services/production.job.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router, RouterModule} from "@angular/router";
import {HarnessModel} from "../../models/harness.model";


@Component({
  selector: 'app-admin-objective-dialog',
  standalone: true,
  imports: [MatIcon, MatIconModule,CommonModule,ReactiveFormsModule,MatSnackBarModule,RouterModule,
    MatDialogActions, MatCheckbox, MatButton, NgFor],
  templateUrl: './admin-objective-dialog.component.html',
  styleUrl: './admin-objective-dialog.component.css'
})
export class AdminObjectiveDialogComponent implements OnInit{
  projects: BehaviorSubject<ProjectModel[]> = new BehaviorSubject<any>([]);
  productionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([]);
  harnesses:BehaviorSubject<HarnessModel[]> = new BehaviorSubject<HarnessModel[]>([]);
  familys:BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  jobForm =  this.formBuilder.group({
    productionLine: ['',Validators.required],
    project: ['',Validators.required],
    quantity: ['' ,Validators.required],
    harness: ['',Validators.required],
    family: ['',Validators.required]
  })



  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private projectService: ProjectService,
              private harnessService: HarnessService,
              private productionJobService: ProductionJobService,
              private productionLineService: ProductionLineService,
              private formBuilder: FormBuilder,
              private snakeBar: MatSnackBar,
              private router: Router)
  {  }

  ngOnInit(): void {
    // Subscribe to value changes of 'project' form control
    this.jobForm.get('project')?.valueChanges.subscribe(project_id => {
      // Ensure project_id is not null before parsing it
      if (project_id !== null) {
        // filter the production line and show it
        this.productionLineService.getAll().pipe(
          tap(value => {
            this.productionLines.next(value.filter(line => line.project_id.toString() == project_id ))
          })).subscribe();
        // Filter the harnesses array based on the selected project ID
        this.harnessService.getHarnessByProjectId(parseInt(project_id))
          .subscribe(harnesses => {
            this.harnesses.next(harnesses)
            this.familys.next(harnesses.map(harness => harness.family))
          })
      }
    });

    this.jobForm.get('family')?.valueChanges.subscribe(family => {
      if (family){
        this.harnessService.getHarnessByFamily(family)
          .subscribe(harnesses => {
              this.harnesses.next(harnesses)
          })
      }
    })


    this.projectService.getAll().pipe(
      tap(value => this.projects.next(value))
    ).subscribe();


    // this.harnessService.getAllHarnesses().pipe(tap(value => this.harnesses.next(value))).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OnSubmit() {
    if (this.jobForm.invalid) {
      this.snakeBar.open("Check fields and retry", "OK", {
        duration: 5000,
        verticalPosition: "bottom",
        horizontalPosition: "center",
        panelClass: "danger-snackBar"
      });
      return;
    }
    this.productionJobService.create(parseInt(<string>this.jobForm.getRawValue().harness),
      parseInt(<string>this.jobForm.getRawValue().quantity),
      parseInt(<string> this.jobForm.getRawValue().productionLine),
      parseInt(<string>this.jobForm.getRawValue().project)).subscribe(value => {
      this.snakeBar.open('created with success', "Ok",{
          duration: 3000
      })
      this.dialogRef.close();
      this.productionJobService.getAllProductionJob().pipe(tap(value1 => {
      this.redirectTo('admin/job-goals')
      })).subscribe()

    })
  }

  /**
   *
   * @param uri
   */
  redirectTo(uri: string) {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }
}
