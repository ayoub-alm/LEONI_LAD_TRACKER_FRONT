import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotalQuantity } from '../dtos/Line.dashboard.dto';

@Injectable({
  providedIn: 'root'
})
export class LineDashboardService {

  private baseUrl = 'http://localhost:5000/api/line-dashboard';  // Update this to your server's address

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTotalQuantity(filters: any): Observable<TotalQuantity> {
    return this.http.post<TotalQuantity>(`${this.baseUrl}/total-quantity`, filters, this.httpOptions);
  }

  getBoxCount(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/box-count`, filters, this.httpOptions);
  }

  getAverageQuantity(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/average-quantity`, filters, this.httpOptions);
  }

  getCountByCodeFournisseur(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/sum-by-code-fournisseur`, filters, this.httpOptions);
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

  getInProgressQantity(filters: any): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/in-progress-quantity`, filters, this.httpOptions);
  }

  getQuantitybyMonth(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quantity-by-month`, filters, this.httpOptions);
  }

  getQuantitybyDay(filters: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quantity-by-date`, filters, this.httpOptions);
  }

  getEfficiencyByHour(filters: any):Observable<HourlyEfficiency[]>{
    return this.http.post<HourlyEfficiency[]>(`${this.baseUrl}/efficiency-by-hour`, filters, this.httpOptions);
  }
}


export interface HourlyEfficiency {
  hour: number;                 // The hour of the day (e.g., 0 for midnight, 23 for 11 PM)
  total_quantity: number;       // Total quantity produced in that hour
  range_time: number;           // The range time associated with the production process for that hour
  productive_hours: number;     // The productive hours calculated for that hour
  efficiency: number;           // The calculated efficiency for that hour
}