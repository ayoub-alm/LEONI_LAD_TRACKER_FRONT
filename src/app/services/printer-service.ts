import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { GetDefaultPrinterResponse, PrintersDto, PrintLabelRequest, SetDefaultPrinterRequest, SetDefaultPrinterResponse } from "../dtos/settings.dto";

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

    getDefaultPrinter(): Observable<GetDefaultPrinterResponse>{
        return this.http.get<GetDefaultPrinterResponse>(`${this.baseUrl}/get-default-printer`)
    }
    /**
     * Print lable by given barcode 
     * @param barCode string
     * @returns 
     */
    printLable(barCode: PrintLabelRequest): Observable<SetDefaultPrinterResponse>{
        return this.http.post<SetDefaultPrinterResponse>(`${this.baseUrl}/print-label`, barCode)
    }

}