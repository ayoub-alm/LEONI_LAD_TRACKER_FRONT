import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { PackagingBoxModel } from '../../models/packaging-box.model';
import { ProductionHarnessModel } from '../../models/production.harness.model';
import { PackagingBoxService } from '../../services/packaging.box.service';
import { ProdHarnessService } from '../../services/prod-harness.service';
import { catchError, of, tap } from 'rxjs';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Dialog } from '@angular/cdk/dialog';
import { AddNewUserDialogComponent } from '../add-new-user-dialog/add-new-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-packaging-data',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatLabel,
    MatIcon,
    CommonModule,
    MatPaginatorModule,
    MatMenuModule,MatTabsModule
  ],
  templateUrl: './packaging-data.component.html',
  styleUrls: ['./packaging-data.component.css'],
})
export class PackagingDataComponent implements AfterViewInit {
[x: string]: any;
  displayedColumns: string[] = [
    'select',
    'barcode',
    'to_be_delivered_quantity',
    'delivered_quantity',
    'harness_ref',
    'line_name',
    'Progress',
    'action'
  ];

  harnessesDisplayedColumns: string[] = [
    'select',
    'uuid',
    'box_number',
    'status',
    'date',
    'action',
  ];

  userDisplayedColumns: string[] =[
    'select',
    'fullName',
    'matriculate',
    'role',
    'action'
  ]
  packagingDataSource = new MatTableDataSource<PackagingBoxModel>([]);
  harnessesDataSource = new MatTableDataSource<ProductionHarnessModel>([]);
  userDataSource = new MatTableDataSource<UserModel>([]);

  selection = new SelectionModel<PackagingBoxModel>(true, []);
  harnessSelection = new SelectionModel<ProductionHarnessModel>(true, []);

  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;

  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;

  @ViewChild('paginator3') paginator3!: MatPaginator;
  @ViewChild('sort3') sort3!: MatSort;


  constructor(
    private packagesService: PackagingBoxService,
    private prodHarnessesService: ProdHarnessService,
    private userService: UserService,
    private snakBar: MatSnackBar,
    private dialogRef: MatDialog
  ) {
        this.packagesService.getAllPackagingBoxes().pipe(
          tap((packages) => {
            this.packagingDataSource.data = packages;
            this.packagingDataSource.paginator = this.paginator1;
            this.packagingDataSource.sort = this.sort1;
          })
        ).subscribe();
        
        this.prodHarnessesService.getAllProdHarnesses().pipe(
          tap((harnesses) => {
            this.harnessesDataSource.data = harnesses;
            this.harnessesDataSource.paginator = this.paginator2;
            this.harnessesDataSource.sort = this.sort2;
          })
        ).subscribe();

        this.userService.getAllUsers().pipe(
          tap((users) =>{
            this.userDataSource.data = users;
            this.userDataSource.paginator = this.paginator3;
            this.userDataSource.sort = this.sort3;
          })
        ).subscribe()
      }

  ngAfterViewInit() {
    // Initialize the first table features
    if (this.packagingDataSource) {
      this.packagingDataSource.paginator = this.paginator1;
      this.packagingDataSource.sort = this.sort1;
    }
  
    // Initialize the second table features
    if (this.harnessesDataSource) {
      this.harnessesDataSource.paginator = this.paginator2;
      this.harnessesDataSource.sort = this.sort2;
    }
    if (this.userDataSource) {
      this.userDataSource.paginator = this.paginator3;
      this.userDataSource.sort = this.sort3;
    }
  }
  

  initializePackagingTableFeatures() {
    if (this.packagingDataSource) {
      this.packagingDataSource.paginator = this.paginator1;
      this.packagingDataSource.sort = this.sort1;
    }
  }

  initializeHarnessesTableFeatures() {
    if (this.harnessesDataSource) {
      this.harnessesDataSource.paginator = this.paginator2;
      this.harnessesDataSource.sort = this.sort2;
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.packagingDataSource.filter = filterValue.trim().toLowerCase();

    if (this.packagingDataSource.paginator) {
      this.packagingDataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.harnessesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.harnessesDataSource.paginator) {
      this.harnessesDataSource.paginator.firstPage();
    }
  }

  toggleSelection(row: PackagingBoxModel) {
    this.selection.toggle(row);
  }

  toggleHarnessSelection(row: ProductionHarnessModel) {
    this.harnessSelection.toggle(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.packagingDataSource.data.length;
    return numSelected === numRows;
  }

  isAllHarnessesSelected() {
    const numSelected = this.harnessSelection.selected.length;
    const numRows = this.harnessesDataSource.data.length;
    return numSelected === numRows;
  }

  isIndeterminate() {
    const numSelected = this.selection.selected.length;
    const numRows = this.packagingDataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  isHarnessesIndeterminate() {
    const numSelected = this.harnessSelection.selected.length;
    const numRows = this.harnessesDataSource.data.length;
    return numSelected > 0 && numSelected < numRows;
  }

  selectAll() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.packagingDataSource.data.forEach((row) =>
          this.selection.select(row)
        );
  }

  selectAllHarnesses() {
    this.isAllHarnessesSelected()
      ? this.harnessSelection.clear()
      : this.harnessesDataSource.data.forEach((row) =>
          this.harnessSelection.select(row)
        );
  }

  edit(row: PackagingBoxModel) {
    // Implement your edit logic here
    console.log('Edit row', row);
  }

  deletePackage(row: PackagingBoxModel) {
    this.packagesService.deletePackagingBox(row.id).pipe(
      tap(value => {
        this.snakBar.open(`${row.barcode} is deleted with success`, "OK", {duration:2000})
        const filtredData = this.packagingDataSource.data.filter(data => data.id != row.id)
        this.packagingDataSource.data =  filtredData
      })
    ).subscribe()
  
  }

  editHarness(row: ProductionHarnessModel) {
    // Implement your edit logic here
    console.log('Edit harness', row);
  }

  deleteHarness(row: ProductionHarnessModel) {
    this.prodHarnessesService.deleteHarness(row).pipe(
      tap((respense) => {
        const filtredData = this.harnessesDataSource.data.filter(data => data.id != row.id)
        this.harnessesDataSource.data =  filtredData
         this.snakBar.open(respense.message,"Close",{duration:300})
        }),
      catchError(error => {
        this.snakBar.open(error.error,"Close",{duration:300})
        return of(null); 
      })
    ).subscribe()
    console.log('Delete harness', row);
  }

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

  onTabChange(event: MatTabChangeEvent) {
    const index = event.index;
    console.log('Selected tab index:', index);
    // Handle tab change logic here
    switch (index) {
      case 0:
        this.initializePackagingTableFeatures()
        break;
      case 1:
        this.initializeHarnessesTableFeatures()
        break;
      case 2:
        // Code to handle "Users" tab
        console.log('Users tab selected');
        break;
    }
  }

  addUser(){
    this.dialogRef.open(AddNewUserDialogComponent, {
      width: '50%',
      data: { /* pass any data here if needed */ }
    });
  }

  deleteUser(row: UserModel){
    const index = this.userDataSource.data.indexOf(row);
    this.userService.deleteUser(row.id).subscribe(date => {
      if (index >= 0) {
        this.userDataSource.data.splice(index, 1);  // Remove from data array
        this.userDataSource = new MatTableDataSource(this.userDataSource.data);  // Reassign dataSource to refresh table
        this.snakBar.open('user '+ row.username +' deleted',"OK",{duration:2000})
      }
    })
  }
}
