import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ProjectModel} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})

export class ProjectService{
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }


  getAll(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.apiUrl}/projects`).pipe(
      tap(projects => projects.map(
        project => {
          return new ProjectModel(project.id,project.name,project.ref)
        }
      ))
    )
  }

}
