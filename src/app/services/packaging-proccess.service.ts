import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {PackagingProcess} from "../models/packaging.proccess.model";


@Injectable({
  providedIn: 'root'
})
export class PackagingProcessService {
  private baseURL = 'http://localhost:5000';  // Replace 'http://your-api-url' with your actual API URL

  constructor(private http: HttpClient) { }

  /**
   * create package process
   * @param family
   * @param status
   * @param name
   */
  createProcess(segementId: string, status: number, name: string): Observable<PackagingProcess> {
    return this.http.post<PackagingProcess>(`${this.baseURL}/packaging-process`, {segmentId: segementId, status: status, name: name}).pipe();
  }

  getProcessById(processId: number): Observable<PackagingProcess> {
    return this.http.get<PackagingProcess>(`${this.baseURL}/packaging-process/${processId}`);
  }

  updateProcess(processId: number, familyId?: number, status?: number, name?: string): Observable<PackagingProcess> {
    const updateData: any = {};
    if (familyId !== undefined) {
      updateData.familyId = familyId;
    }
    if (status !== undefined) {
      updateData.status = status;
    }
    if (name !== undefined) {
      updateData.name = name;
    }
    return this.http.put<PackagingProcess>(`${this.baseURL}/packaging-process/${processId}`, updateData);
  }

  deleteProcess(processId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/packaging-process/${processId}`);
  }

  getAllProcesses(): Observable<PackagingProcess[]> {
    return this.http.get<PackagingProcess[]>(`${this.baseURL}/packaging-process`);
  }

  getProcessBySegmentId(segmentId: number): Observable<PackagingProcess>{
    return this.http.get<PackagingProcess>(`${this.baseURL}/packaging-process/segment/${segmentId}`);
  }
}
