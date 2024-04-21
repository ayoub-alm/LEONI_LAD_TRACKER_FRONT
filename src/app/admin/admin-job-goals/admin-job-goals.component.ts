import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminObjectiveDialogComponent} from "../admin-objective-dialog/admin-objective-dialog.component";

@Component({
  selector: 'app-admin-job-goals',
  standalone: true,
  imports: [],
  templateUrl: './admin-job-goals.component.html',
  styleUrl: './admin-job-goals.component.css'
})
export class AdminJobGoalsComponent {
  constructor(private dialogRef: MatDialog) {
  }
  addNewGoals() {
    const dialogRef = this.dialogRef.open(AdminObjectiveDialogComponent, {
      width: '60%',
      data: {'test' : 10} // Pass selected product as data to the dialog
    });
  }
}
