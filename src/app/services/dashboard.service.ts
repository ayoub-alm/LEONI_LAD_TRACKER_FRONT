import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { routes } from "../app.routes";
import { BoxCount, CountDto, CountHourDto } from "../dtos/box.count";
import { TotalQuantity } from "../dtos/Line.dashboard.dto";
import { SumByRefApiResponse, TotalCountApiResponse } from "../dtos/global.dashboard.dto";
@Injectable({
    providedIn:'root'
})
export class DashboardService{
    constructor(private http: HttpClient){}
    private baseUrl = "http://localhost:3000/api/global-dashboard"



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  getTotalQuantity(filters: any): Observable<TotalCountApiResponse[]> {
    return this.http.post<TotalCountApiResponse[]>(`${this.baseUrl}/total-quantity`, filters, this.httpOptions);
  }

  getBoxCount(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/box-count`, filters, this.httpOptions);
  }

  getAverageQuantity(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/average-quantity`, filters, this.httpOptions);
  }

  getCountByCodeFournisseur(filters: any): Observable< SumByRefApiResponse[]> {
    return this.http.post< SumByRefApiResponse[]>(`${this.baseUrl}/sum-by-code-fournisseur`, filters, this.httpOptions);
  }

  getCountOfPackageByHour(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/count-by-hour`, filters, this.httpOptions);
  }

  getCountByOperator(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/count-by-operator`, filters, this.httpOptions);
  }

  getHourlyQuantity(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/hourly-quantity`, filters, this.httpOptions);
  }

  getQuantityByHour(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quantity-by-hour`, filters, this.httpOptions);
  }


  getHourProduitsDTO(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/productive-hours`, filters, this.httpOptions);
  }

  getCurrentQuantity(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/total-quantity-current`, filters, this.httpOptions);
  }
    
}