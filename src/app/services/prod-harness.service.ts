import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CreateProdHarnessDTO} from "../dtos/create-prod-harness.dto";
import {Observable, tap} from "rxjs";
import {ProductionHarnessModel} from "../models/production.harness.model";
import {HarnessModel} from "../models/harness.model";

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
  createProdHarness(prodHarness: CreateProdHarnessDTO): Observable<{response:boolean}> {
    return this.http.post<any>(`${this.apiUrl}/prod-harness`, prodHarness).pipe(
      tap(value => {value})
    )
  }

  getAllProdHarnesses():Observable<ProductionHarnessModel[]>{
    return this.http.get<ProductionHarnessModel[]>(`${this.apiUrl}/prod-harness` ).pipe(
      tap(prodHarnesses =>{
        return prodHarnesses.map(prodHarness =>
          new ProductionHarnessModel(prodHarness.id,prodHarness.uuid,
          prodHarness.range_time,prodHarness.production_job,prodHarness.box_number,prodHarness.production_job_id,
            prodHarness.status,prodHarness.packaging_box_id, prodHarness.created_at))
      })
    )
  }

  getByRef(ref: string): Observable<ProductionHarnessModel>{
     return this.http.get<ProductionHarnessModel>(`${this.apiUrl}/prod-harness/uuid/${ref}`).pipe(
      tap((prodHarness: ProductionHarnessModel) => {
        return  new ProductionHarnessModel(prodHarness.id,prodHarness.uuid,
          prodHarness.range_time,prodHarness.production_job,prodHarness.box_number,prodHarness.production_job_id,
          prodHarness.status,prodHarness.packaging_box_id,prodHarness.created_at)
      })
    );
  }

  updateHarness(harness: ProductionHarnessModel): Observable<ProductionHarnessModel>{
    return this.http.put<ProductionHarnessModel>(`${this.apiUrl}/prod-harness/${harness.id}` , harness).pipe(
      tap((prodHarness: ProductionHarnessModel) => {
        return prodHarness;
      })
    )
  }


  deleteHarness(harness: ProductionHarnessModel): Observable<any>{
    return this.http.delete(`${this.apiUrl}/prod-harness/${harness.id}` )
  }
}
