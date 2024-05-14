import {ProductionJob} from "./production-job.model";

export class ProductionHarnessModel{
  id: number;
  uuid: string;
  range_time: string;
  production_job: ProductionJob

  constructor(id: number, uuid: string, range_time: string,production_job : ProductionJob) {
    this.id = id;
    this.uuid = uuid;
    this.range_time = range_time;
    this.production_job = production_job
  }
}
