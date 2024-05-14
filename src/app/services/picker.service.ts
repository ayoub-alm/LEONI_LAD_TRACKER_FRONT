import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ProjectModel} from "../models/project.model";
import {ProductionJob} from "../models/production-job.model";

@Injectable({providedIn:'root'})

export class PickerService{
  private apiUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) { }


  getCurrentJob(lineId: number): Observable<ProductionJob> {
    return this.http.get<ProductionJob>(`${this.apiUrl}/production-jobs/line/${lineId}`).pipe(
      tap(value => {new ProductionJob(value)})
    )
  }
}
