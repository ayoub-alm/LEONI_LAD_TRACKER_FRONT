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
  getAllPackagingBoxes(): Observable<PackagingBoxModel[]> {
    return this.http.get<PackagingBoxModel[]>(`${this.baseURL}/packaging_boxes`).pipe(
      map(response => {
        // Map the response data to a different format if needed
        return response.map(item => {
          return new PackagingBoxModel(item)
        });
      })
    );
  }

  // Method to create a new packaging box
  createPackagingBox(packagingBoxData: PackagingBoxDto): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/packaging_box`, packagingBoxData);
  }

  // Method to update an existing packaging box
  updatePackagingBox(packagingBoxId: number, PackagingBoxModel: any): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/packaging_box/${packagingBoxId}`, PackagingBoxModel);
  }

  // Method to delete a packaging box
  deletePackagingBox(packagingBoxId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}/packaging_box/${packagingBoxId}`);
  }


  /**
   * this function allow us to get the get the opened package by  line id
   */

   getOpendPackageByLineId(lineId: number): Observable<PackagingBoxDto>{
    return this.http.get<PackagingBoxDto>(`${this.baseURL}/packaging_box/opening-package/${lineId}`);
   }
}
