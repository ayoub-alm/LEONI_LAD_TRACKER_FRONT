import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {BehaviorSubject} from "rxjs";
import {ProjectModel} from "../../models/project.model";
import {CommonModule} from "@angular/common";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-admin-project',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './admin-project.component.html',
  styleUrl: './admin-project.component.css'
})
export class AdminProjectComponent implements OnInit{
  projects: BehaviorSubject<ProjectModel[]> =  new BehaviorSubject<ProjectModel[]>([]);
  constructor(private projectService: ProjectService) {
  }

  /**
   *
   */
  ngOnInit(): void {
    // get all project from back-end and assign it to projects variable
    this.projectService.getAll().subscribe(projects => {
     this.projects.next(projects)
    })
  }

}
