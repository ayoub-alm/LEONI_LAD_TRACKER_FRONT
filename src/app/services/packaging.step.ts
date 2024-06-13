import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PackagingStepDTO} from "../dtos/create.packaging.step.dto";


@Injectable({
  providedIn: 'root'
})
export class PackagingStepService {
  private apiUrl = 'http://localhost:5000/steps'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getPackagingSteps(): Observable<PackagingStepDTO[]> {
    return this.http.get<PackagingStepDTO[]>(this.apiUrl);
  }

  getPackagingStep(id: number): Observable<PackagingStepDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PackagingStepDTO>(url);
  }

  addPackagingStep(packagingStep: PackagingStepDTO): Observable<PackagingStepDTO> {
    return this.http.post<PackagingStepDTO>(this.apiUrl, packagingStep, this.httpOptions);
  }

  updatePackagingStep(packagingStep: PackagingStepDTO): Observable<any> {
    const url = `${this.apiUrl}/${packagingStep.packagingProcessId}`;
    return this.http.put(url, packagingStep, this.httpOptions);
  }

  deletePackagingStep(id: number): Observable<PackagingStepDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<PackagingStepDTO>(url, this.httpOptions);
  }

  // New method to send an array of PackagingStepDTO instances
  bulkCreatePackagingStep(packagingSteps: PackagingStepDTO[]): Observable<PackagingStepDTO[]> {
    return this.http.post<PackagingStepDTO[]>(`${this.apiUrl}/bulk`, packagingSteps, this.httpOptions);
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
