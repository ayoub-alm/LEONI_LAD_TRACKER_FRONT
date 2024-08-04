import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HarnessService} from "../../services/harness.service";
import {BehaviorSubject} from "rxjs";
import {HarnessModel} from "../../models/harness.model";
import {CommonModule} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {ProjectModel} from "../../models/project.model";

@Component({
  selector: 'app-admin-harness',
  standalone: true,
  imports: [CommonModule, MatCell, MatCellDef, MatCheckbox, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatMenu, MatMenuItem, MatPaginator, MatRow, MatRowDef, MatTable, MatMenuTrigger, MatHeaderCellDef],
  templateUrl: './admin-harness.component.html',
  styleUrl: './admin-harness.component.css'
})
export class AdminHarnessComponent implements OnInit, AfterViewInit{
  harnesses: BehaviorSubject<HarnessModel[]> = new BehaviorSubject<HarnessModel[]>([])
  displayedColumns: string[] = ['#','id', 'ref' , 'fuse_box', 'family','range_time', 'project'];
  dataSource = new MatTableDataSource<HarnessModel, MatPaginator>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private harnessServices: HarnessService) {
  }

  ngOnInit() {
    this.harnessServices.getAllHarnesses().subscribe(harnesses => {
      this.harnesses.next(harnesses)
      this.dataSource.data = harnesses;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  protected readonly alert = alert;
}
