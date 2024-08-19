export class PrintersDto {
    printers: string[] = [];
  
    constructor(data: { printers: string[] }) {
      this.printers = data.printers;
    }
  }

export class SetDefaultPrinterResponse {
    message: string;
    success: boolean;

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }
}

export class SetDefaultPrinterRequest{
    printerName: string;

    constructor(printerName: string){
        this.printerName = printerName
    }
}
 
  