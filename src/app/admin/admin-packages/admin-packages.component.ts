import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {PackagingBoxModel} from "../../models/packaging-box.model";
import {PackagingProcessService} from "../../services/packaging-proccess.service";
import {PackagingBoxService} from "../../services/packaging.box.service";
import {tap} from "rxjs/operators"; // Only import MatPaginator once

@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports:[MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule],
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.css']
})

export class AdminPackagesComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'barcode', 'quantity', 'line', 'nHarness', 'Progress'];
  dataSource = new MatTableDataSource<PackagingBoxModel, MatPaginator>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Ensure that paginator is initialized
  constructor(private boxService: PackagingBoxService) {}
  ngOnInit(): void {
    this.boxService.getAllPackagingBoxes().pipe(
      tap((value:PackagingBoxModel[]) => {
        this.dataSource.data = value
      })
    ).subscribe()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter($event: KeyboardEvent) {
    alert('sort')
  }


  protected readonly parseInt = parseInt;

  getPercentageColor(data: number): string {
    if (data < 35) {
      return 'text-danger fw-bolder';
    } else if (data >= 35 && data < 70) {
      return 'text-warning fw-bolder';
    } else if (data >= 70) {
      return 'text-success  fw-bold';
    } else {
      return 'text-secondary fw-bolder';
    }
  }
}

