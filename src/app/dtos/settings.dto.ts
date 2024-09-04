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


export class GetDefaultPrinterResponse{
    defaultPrinter:string;

    constructor(defaultPrinter:string){
        this.defaultPrinter = defaultPrinter;
    }
}

export class PrintLabelRequest {
    qr_content: string;
    label_content:string;

    constructor(qr_content: string, label_content: string){
        this.qr_content = qr_content;
        this.label_content = label_content;
    }
}
 
  