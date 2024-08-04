import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000';
  token: string = "";

  constructor(private http: HttpClient) { }


  login(matriculate: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { matriculate, password })
  }
}
