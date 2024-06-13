import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {HarnessModel} from "../models/harness.model";

@Injectable({
  providedIn:'root'
})
export class HarnessService{

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  /**
   *
   */
  getAllHarnesses(): Observable<HarnessModel[]> {
    return this.http.get<HarnessModel[]>(`${this.apiUrl}/harness`).pipe(
      tap(harnesses => {
        harnesses.map(harness => new HarnessModel(harness))
      })
    )
  }

  getHarnessById(): Observable<[]> {
    return this.http.get<[]>(`${this.apiUrl}/harness`)
  }


  getHarnessByProjectId(project_id: number): Observable<HarnessModel[]> {
    return this.http.get<HarnessModel[]>(`${this.apiUrl}/harness/project/${project_id}`).pipe(
        tap(harnesses => {
          harnesses.map(harness => new HarnessModel(harness))
        })
    )
  }


  getHarnessByFamily(family: string): Observable<HarnessModel[]> {
    return this.http.get<HarnessModel[]>(`${this.apiUrl}/harness/family/${family}`).pipe(
      tap(harnesses => {
        harnesses.map(harness => new HarnessModel(harness))
      })
    )
  }

  getFamilies():  Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/harness/family`)
  }
}
