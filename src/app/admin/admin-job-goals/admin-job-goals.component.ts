import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminObjectiveDialogComponent} from "../admin-objective-dialog/admin-objective-dialog.component";
import {ProductionJobService} from "../../services/production.job.service";
import {BehaviorSubject, tap} from "rxjs";
import {CommonModule, NgFor} from "@angular/common";
import {ProductionJob} from "../../models/production-job.model";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-job-goals',
  standalone: true,
  imports: [NgFor, CommonModule, MatCheckboxModule, FormsModule, MatMenuTrigger,MatSnackBarModule,
    MatMenuModule,MatIconModule, MatMenuModule],
  templateUrl: './admin-job-goals.component.html',
  styleUrl: './admin-job-goals.component.css'
})
export class AdminJobGoalsComponent  implements OnInit{
  jobGoals: BehaviorSubject<ProductionJob[]> =  new BehaviorSubject<ProductionJob[]>([])
  checkedJob: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  checked: boolean = false;
  @ViewChild(MatMenuTrigger) menu?: MatMenuTrigger;


  constructor(private dialogRef: MatDialog,
              private productionJobService: ProductionJobService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productionJobService.getAllProductionJob().pipe(
      tap(value => {
        this.jobGoals.next(value)
      })
    ).subscribe();

  }
  addNewGoals() {
    const dialogRef = this.dialogRef.open(AdminObjectiveDialogComponent, {
      width: '60%',
      data: {'test' : 10} // Pass selected product as data to the dialog
    });
  }
  openMenu(event: MouseEvent) {
    console.log('opend')
    event.preventDefault(); // Prevent default context menu

    if (this.menu instanceof MatMenuTrigger)
      this.menu.openMenu(); // Open the menu with adjusted position
    } // Open the menu if menuTrigger is defined

  /**
   *
   * @param id
   * @constructor
   */
  Uncheck(id: number, $event: MatCheckboxChange): void {
    if (this.checkedJob.getValue() === id ) {
      this.checkedJob.next(0);
    } else {
      this.checkedJob.next(id);
      this.checked = true;
    }

    $event.checked = !$event.checked
  }

  OnDelete() {
    if (this.checkedJob.getValue() != 0){
      console.log(this.checkedJob.getValue())
    }else {
      this.snackBar.open('Please select a production job first ', 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center', // Position horizontally
        verticalPosition: "bottom", // Position vertically
      });
    }
  }
}
