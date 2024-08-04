export class TotalQuantity{
    total_quantity:number;

    constructor(total_quantity:number){
        this.total_quantity = total_quantity
    }
}


export class BoxCount{
    box_count:number;

    constructor(box_count:number){
        this.box_count = box_count
    }
}

export class CountHourLineDto{
    total_quantity:number;
    hour:number;
   constructor(total_quantity:number, hour:number){
       this.total_quantity = total_quantity;
       this.hour = hour;
   }
}

export class CountBoxPerHourLineDto{
    box_count:number;
    hour:string;
   constructor(total_quantity:number, hour:string){
       this.box_count = total_quantity;
       this.hour = hour;
   }
}

export class HourProduitsDTO {
    posted_hours: number;
    productive_hours: number;
    total_quantity: number;
    expected:number

    constructor(posted_hours: number, productive_hours: number, total_quantity: number,expected:number) {
        this.posted_hours = posted_hours;
        this.productive_hours = productive_hours;
        this.total_quantity = total_quantity;
        this.expected = expected
    }
}

export class refQuantityDto {
    code_fournisseur: string;
    total_quantity: number;

    constructor(code: string, quantity: number) {
        this.code_fournisseur = code;
        this.total_quantity = quantity;
    }
}


export interface BoxCount {
    Code_fournisseur: string;
    box_count: number;
}
export class CountDto{
    total_quantity:number;

    constructor(count:number){
        this.total_quantity = count;
    }
}


export class CountHourDto{
    count:number;
    hour:string;
   constructor(count:number, hour:string){
       this.count = count;
       this.hour = hour;
   }
}