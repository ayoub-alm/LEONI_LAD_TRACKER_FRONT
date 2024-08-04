import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductionLineService} from "../../services/production.line.service";
import {BehaviorSubject} from "rxjs";
import {ProductionLineModel} from "../../models/production.line.model";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
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
import {PackagingBoxModel} from "../../models/packaging-box.model";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-production-lines',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatPaginator, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './production-lines.component.html',
  styleUrl: './production-lines.component.css'
})
export class ProductionLinesComponent implements OnInit, AfterViewInit{
    displayedColumns: string[] = ['id', 'name', 'project','number_of_operators'];
    dataSource = new MatTableDataSource<ProductionLineModel, MatPaginator>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    productionLines: BehaviorSubject<ProductionLineModel[]> = new BehaviorSubject<ProductionLineModel[]>([])
    constructor(private productionLineService: ProductionLineService) {
    }

    ngOnInit() {
      this.productionLineService.getAll().subscribe(
        (productionLines) => {
          this.productionLines.next(productionLines)
          this.dataSource.data = productionLines
        }
      )
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly alert = alert;
}
