import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {ProductionHarnessModel} from "../../models/production.harness.model";
import {ProdHarnessService} from "../../services/prod-harness.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {ProjectModel} from "../../models/project.model";

@Component({
  selector: 'app-production-harness',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatMenu, MatMenuItem, MatPaginator, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatMenuTrigger],
  templateUrl: './production-harness.component.html',
  styleUrl: './production-harness.component.css'
})
export class ProductionHarnessComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['#','id' , 'production_job',
      'line' , 'status' ,'box_number', 'date'];
  dataSource = new MatTableDataSource<ProductionHarnessModel, MatPaginator>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productionHarnesses: BehaviorSubject<ProductionHarnessModel[]> = new BehaviorSubject<ProductionHarnessModel[]>([]);

  constructor(private productionHarnessService: ProdHarnessService) {
  }

  ngOnInit() {
    this.productionHarnessService.getAllProdHarnesses().subscribe( value => {
        this.productionHarnesses.next(value)
      this.dataSource.data = value
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly alert = alert;

  /**
   * this function transform the status numbers to string status
   * @param status
   */
  getStatus(status: number): string {

    switch (status){
      case 1:
        return "picked"

    case 2:
      return "fulfilled"

    case -1:
        return "rejected"

    }
    return "";
  }

  getStatusClass(status: number): string {


    switch (status){
      case 0:
        return "btn btn-info btn-sm text-white rounded-5"
      case 1:
        return "btn btn-info btn-sm text-white rounded-5"

      case 2:
        return "btn btn-success btn-sm text-white rounded-5"

      case -1:
        return "btn btn-danger btn-sm text-white rounded-5 "

    }
    return "";
  }
}
