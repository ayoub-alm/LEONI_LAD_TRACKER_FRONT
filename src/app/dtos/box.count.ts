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