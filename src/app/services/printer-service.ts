import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { PrintersDto, SetDefaultPrinterRequest, SetDefaultPrinterResponse } from "../dtos/settings.dto";

@Injectable({
    providedIn:'root'
})

export class PrintingService{
    baseUrl = 'http://localhost:3000'

    constructor(private http: HttpClient){}

    getAllPrinters(): Observable<string[]>{
        return this.http.get<PrintersDto>(`${this.baseUrl}/printers`).pipe(
            map(data => data.printers)
        )
    }
    /**
     * Set default printer  by name
     * @param printerName string 
     * @returns 
     */
    setDefaultPrinter(printerName: SetDefaultPrinterRequest): Observable<SetDefaultPrinterResponse>{
        return this.http.post<SetDefaultPrinterResponse>(`${this.baseUrl}/set-default-printer`, printerName)
    }
    /**
     * Print lable by givven barcode 
     * @param barCode string
     * @returns 
     */
    printLable(barCode: string): Observable<SetDefaultPrinterResponse>{
        return this.http.post<SetDefaultPrinterResponse>(`${this.baseUrl}/printLable`, barCode)
    }

}