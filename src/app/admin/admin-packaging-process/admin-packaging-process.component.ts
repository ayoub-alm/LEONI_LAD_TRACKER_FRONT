import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterModule} from "@angular/router";
import {PackagingProcessService} from "../../services/packaging-proccess.service";
import {PackagingProcess} from "../../models/packaging.proccess.model";
import {BehaviorSubject, tap} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-admin-packaging-process',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgForOf, MatCheckbox, MatButton, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatPaginator, MatRow, MatRowDef, MatTable, MatSort, MatHeaderCellDef],
  templateUrl: './admin-packaging-process.component.html',
  styleUrl: './admin-packaging-process.component.css'
})
export class AdminPackagingProcessComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'project','segment', 'status', 'steps'];
  dataSource!:  MatTableDataSource<PackagingProcess>;
  // dataSource: BehaviorSubject<PackagingProcess[]> = new BehaviorSubject<PackagingProcess[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;
  constructor(private packagingProcessService: PackagingProcessService) {
  }

  ngOnInit() {
    this.packagingProcessService.getAllProcesses().pipe(
      tap((response: PackagingProcess[] )=> {
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator;
      })
    ).subscribe()
  }
}
