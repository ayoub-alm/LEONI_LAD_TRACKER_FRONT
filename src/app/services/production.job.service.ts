import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {ProductionLineModel} from "../models/production.line.model";
import {ProductionJob} from "../models/production-job.model";

@Injectable({
  providedIn: 'root'
})
export class ProductionJobService{

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }


  getAllProductionJob(): Observable<ProductionJob[]> {
    return this.http.get<ProductionJob[]>(`${this.apiUrl}/production-jobs`).pipe(
      tap(productionJobs => {
        productionJobs.map(pr => new ProductionJob(pr))
      })
    )
  }

  getAwaitingProductionJobForLine(lineId:number): Observable<ProductionJob[]> {
    return this.http.get<ProductionJob[]>(`${this.apiUrl}/production-jobs/line/awaiting/${lineId}`).pipe(
      tap(productionJobs => {
        productionJobs.map(pr => new ProductionJob(pr))
      })
    )
  }

  /**
   *
   * @param harness_id
   * @param quantity
   * @param production_line_id
   * @param project_id
   */
  create(harness_id:number, quantity: number, production_line_id: number, project_id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/production-jobs`, { harness_id, quantity, production_line_id,   })
  }
}
