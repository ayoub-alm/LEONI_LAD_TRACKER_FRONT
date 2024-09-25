import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:5000';
  token: string = "";

  constructor(private http: HttpClient, private localStorage: StorageService) { }


  login(matriculate: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { matriculate, password })
  }

  get currentUserRole(): string{
    let role = this.localStorage.getItem('user').role
    return role;
  }


  get CurrentUserMatriculate(): string{
    return this.localStorage.getItem('user').matriculate.toString()
  }

  getCurrentUserId(): number{
    return this.localStorage.getItem('user').id
  }
}
