import { v4 as uuid4 } from 'uuid';


export class CreateProdHarnessDTO {
   uuid: string  ;
   box_number: string | null;
   rangeTime: number | null;
   production_job_id: number | null;
   status: number = 0
   packaging_box_id: number;

  constructor(uuid:string,production_job_id: number | null, box_number: string | null = null, rangeTime: number | null = null, packaging_box_id: number, status: number) {
    this.uuid = uuid;
    this.production_job_id = production_job_id;
    this.box_number = box_number;
    this.rangeTime = rangeTime;
    this.packaging_box_id = packaging_box_id
    this.status = status
  }
}

