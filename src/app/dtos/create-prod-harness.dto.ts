import { v4 as uuid4 } from 'uuid';


export class CreateProdHarnessDTO {
   uuid: string  ;
   box_number: string | null;
   rangeTime: number | null;
   productionJobId: number = 0;

  constructor(uuid:string,productionJobId: number, box_number: string | null = null, rangeTime: number | null = null) {
    this.uuid = uuid;
    this.productionJobId = productionJobId;
    this.box_number = box_number;
    this.rangeTime = rangeTime;
  }
}

