import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateProdHarnessDTO} from "../dtos/create-prod-harness.dto";
import {Observable, tap} from "rxjs";
import {ProductionJob} from "../models/production-job.model";
import {ProductionHarnessModel} from "../models/production.harness.model";

@Injectable({
  providedIn:'root'
})

export class ProdHarnessService{

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  /**
   * this function allows us to create a production harness
   * @param prodHarness
   */
  createProdHarness(prodHarness: CreateProdHarnessDTO): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/prod-harness`, prodHarness).pipe(
      tap(value => value)
    )
  }

  getAllProdHarnesses():Observable<ProductionHarnessModel[]>{
    return this.http.get<ProductionHarnessModel[]>(`${this.apiUrl}/prod-harness` ).pipe(
      tap(prodHarnesses =>{
        return prodHarnesses.map(prodHarness => new ProductionHarnessModel(prodHarness.id,prodHarness.uuid,
          prodHarness.range_time,prodHarness.production_job))
      })
    )

  }
}
