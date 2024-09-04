import {ProductionJob} from "./production-job.model";

export class ProductionHarnessModel{
  id: number;
  uuid: string;
  range_time: string;
  production_job_id: number;
  production_job: ProductionJob;
  box_number: string;
  status: number;
  packaging_box_id: number | null;
  created_at: string


  constructor(id: number, uuid: string, range_time: string, production_job: ProductionJob, box_number: string, production_job_id: number,
     status: number, packaging_box_id: number | null, crearted_at:string) {
    this.id = id;
    this.uuid = uuid;
    this.range_time = range_time;
    this.production_job = production_job;
    this.box_number = box_number;
    this.production_job_id = production_job_id;
    this.status = status;
    this.packaging_box_id = packaging_box_id;
    this.created_at = crearted_at
  }
}
