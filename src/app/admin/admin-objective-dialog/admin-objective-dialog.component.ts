import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {ProjectService} from "../../services/project.service";
import {BehaviorSubject, tap} from "rxjs";
import {CommonModule, NgFor} from "@angular/common";
import {ProjectModel} from "../../models/project.model";
import {ProductionLineService} from "../../services/production.line.service";
import {ProductionLineModel} from "../../models/production.line.model";


@Component({
  selector: 'app-admin-objective-dialog',
  standalone: true,
  imports: [MatIcon, MatIconModule,CommonModule,
    MatDialogActions, MatCheckbox, MatButton, NgFor],
  templateUrl: './admin-objective-dialog.component.html',
  styleUrl: './admin-objective-dialog.component.css'
})
export class AdminObjectiveDialogComponent implements OnInit{
  projects: BehaviorSubject<ProjectModel[]> = new BehaviorSubject<any>([]);
  productionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([]);
  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private projectService: ProjectService,
              private productionLineService: ProductionLineService)
  {}

  ngOnInit(): void {
    this.projectService.getAll().pipe(tap(value => this.projects.next(value))).subscribe();
    this.productionLineService.getAll().pipe(tap(value => this.productionLines.next(value))).subscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
