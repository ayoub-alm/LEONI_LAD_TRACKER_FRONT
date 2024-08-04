import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SegmentModul } from "../models/segment.model";

@Injectable({
    providedIn:'root'
})

export class SegmentService{
    private apiUrl = 'http://localhost:5000';
    constructor(private http: HttpClient){}

    getAllSegment(): Observable<SegmentModul[]>{
        return this.http.get<SegmentModul[]>(`${this.apiUrl}/segments`)
    }
}