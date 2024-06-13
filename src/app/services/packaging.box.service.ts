import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {PackagingBoxModel} from "../models/packaging-box.model";
import {PackagingBoxDto} from "../dtos/packaging-box.dto";

@Injectable({
  providedIn: 'root'
})
export class PackagingBoxService {
  private baseURL = 'http://localhost:5000'; // Base URL of the Flask server

  constructor(private http: HttpClient) { }

  // Method to get all packaging boxes
  getAllPackagingBoxes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/packaging_boxes`).pipe(
      map(response => {
        // Map the response data to a different format if needed
        return response.map(item => {
          return {
            id: item.id,
            ref: item.ref,
            quantity: item.quantity,
            harnessId: item.harness_id, // Rename the property if needed
            status: item.status,
            createdBy: item.created_by, // Rename the property if needed
            barcode: item.barcode
          };
        });
      })
    );
  }

  // Method to create a new packaging box
  createPackagingBox(packagingBoxData: PackagingBoxDto): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/packaging_box`, packagingBoxData);
  }

  // Method to update an existing packaging box
  updatePackagingBox(packagingBoxId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/packaging_box/${packagingBoxId}`, updatedData);
  }

  // Method to delete a packaging box
  deletePackagingBox(packagingBoxId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/packaging_box/${packagingBoxId}`);
  }

}
