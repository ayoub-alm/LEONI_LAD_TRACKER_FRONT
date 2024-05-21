import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AdminObjectiveDialogComponent } from "../admin-objective-dialog/admin-objective-dialog.component";
import { ProductionJobService } from "../../services/production.job.service";
import { BehaviorSubject, tap } from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { ProductionJob } from "../../models/production-job.model";
import {CommonModule, NgFor} from "@angular/common";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-admin-job-goals',
  standalone: true,
  imports: [NgFor, CommonModule, MatCheckboxModule, FormsModule, MatMenuTrigger,MatSnackBarModule,MatTableModule,
    MatSortModule, MatPaginatorModule,MatButtonModule,MatChipsModule,
    MatMenuModule,MatIconModule, MatMenuModule],
  templateUrl: './admin-job-goals.component.html',
  styleUrls: ['./admin-job-goals.component.css']
})
export class AdminJobGoalsComponent implements OnInit, AfterViewInit {
  jobGoals: BehaviorSubject<ProductionJob[]> = new BehaviorSubject<ProductionJob[]>([]);
  checkedJob: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  dataSource!: MatTableDataSource<ProductionJob>;
  displayedColumns: string[] = ['checkbox', 'ref', 'project', 'family', 'production_line', 'status', 'demanded_quantity', 'delivered_quantity'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;

  constructor(private dialogRef: MatDialog,
              private productionJobService: ProductionJobService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productionJobService.getAllProductionJob().pipe(
      tap(value => {
        this.jobGoals.next(value);
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addNewGoals() {
    const dialogRef = this.dialogRef.open(AdminObjectiveDialogComponent, {
      width: '60%',
      data: { 'test': 10 } // Pass selected product as data to the dialog
    });
  }

  Uncheck(id: number, $event: MatCheckboxChange): void {
    if (this.checkedJob.getValue() === id) {
      this.checkedJob.next(0);
    } else {
      this.checkedJob.next(id);
    }
    $event.checked = !$event.checked;
  }

  OnDelete() {
    if (this.checkedJob.getValue() != 0) {
      console.log(this.checkedJob.getValue());
    } else {
      this.snackBar.open('Please select a production job first ', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: "bottom",
      });
    }
  }

  printTable() {
    alert("print")
    // let printContents = this.tableToPrint.nativeElement.outerHTML;
    // let originalContents = document.body.innerHTML;
    //
    // document.body.innerHTML = printContents;
    window.print();
    // document.body.innerHTML = originalContents;
  }
}
