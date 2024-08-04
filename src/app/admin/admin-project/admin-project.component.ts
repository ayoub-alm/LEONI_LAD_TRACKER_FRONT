import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {BehaviorSubject} from "rxjs";
import {ProjectModel} from "../../models/project.model";
import {CommonModule} from "@angular/common";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatTableModule,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatHeaderCellDef
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-admin-project',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatPaginator, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './admin-project.component.html',
  styleUrl: './admin-project.component.css'
})
export class AdminProjectComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['#','id', 'name' , 'N_line', 'ref'];
  dataSource = new MatTableDataSource<ProjectModel, MatPaginator>([]);
  projects: BehaviorSubject<ProjectModel[]> =  new BehaviorSubject<ProjectModel[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private projectService: ProjectService) {
  }

  /**
   *
   */
  ngOnInit(): void {
    // get all project from back-end and assign it to projects variable
    this.projectService.getAll().subscribe(projects => {
     this.projects.next(projects)
      this.dataSource.data = projects;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly parseInt = parseInt;
  protected readonly alert = alert;
}
