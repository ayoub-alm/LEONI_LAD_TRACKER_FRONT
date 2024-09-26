import {Component, OnInit, ViewChild} from '@angular/core';
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
import {UserService} from "../../services/user.service";
import {tap} from "rxjs/operators";

import {UserModel} from "../../models/user.model";
import {HarnessModel} from "../../models/harness.model";
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from '../../packaging/add-new-user-dialog/add-new-user-dialog.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatCheckbox,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatMenuTrigger
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit{

  dataSource = new MatTableDataSource<UserModel, MatPaginator>([]);
  displayedColumns: string[] = ['#', 'name', 'matriculate', 'role'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private userService: UserService,private dialg: MatDialog) {
  }
  ngOnInit() {
    this.userService.getAllUsers().pipe(
      tap(value => this.dataSource.data = value)
    ).subscribe()
  }


  addUser(){
    this.dialg.open(AddNewUserDialogComponent,{
      width:'50%'
    })
  }
  protected readonly alert = alert;
}
