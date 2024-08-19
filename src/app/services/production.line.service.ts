import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {ProductionLineModel} from "../models/production.line.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ProductionLineService{
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }


  getAll(): Observable<ProductionLineModel[]> {
    return this.http.get<ProductionLineModel[]>(`${this.apiUrl}/production-lines`).pipe(
      tap(productionLines => {
        productionLines.map(productionLine => new ProductionLineModel(productionLine.id,productionLine.name,
          productionLine.project_id,productionLine.project,productionLine.number_of_operators, productionLine.segment_id))
      })
    )
  }
}
